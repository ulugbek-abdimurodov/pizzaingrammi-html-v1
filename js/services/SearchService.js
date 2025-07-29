/**
 * Search Service
 * Handles search functionality with advanced features
 */

import { EVENT_TYPES, UI_CONFIG } from '../core/Constants.js';
import { eventBus } from '../core/EventBus.js';

export class SearchService {
    constructor(pizzaRepository) {
        this._pizzaRepository = pizzaRepository;
        this._searchHistory = [];
        this._debounceTimer = null;
    }

    /**
     * Search pizzas with debouncing
     * @param {string} searchTerm - Search term
     * @param {Object} options - Search options
     * @returns {Promise<Object[]>} Search results
     */
    searchWithDebounce(searchTerm, options = {}) {
        return new Promise((resolve) => {
            if (this._debounceTimer) {
                clearTimeout(this._debounceTimer);
            }

            this._debounceTimer = setTimeout(() => {
                const results = this.search(searchTerm, options);
                resolve(results);
            }, options.debounceMs || UI_CONFIG.SEARCH_DEBOUNCE_MS);
        });
    }

    /**
     * Immediate search pizzas
     * @param {string} searchTerm - Search term
     * @param {Object} options - Search options
     * @returns {Object[]} Search results
     */
    search(searchTerm, options = {}) {
        const cleanTerm = this._cleanSearchTerm(searchTerm);
        
        if (!cleanTerm) {
            return this._pizzaRepository.getAll();
        }

        this._addToSearchHistory(cleanTerm);

        let results = this._pizzaRepository.search(cleanTerm);

        // Apply additional filters if provided
        if (options.category) {
            results = results.filter(pizza => 
                pizza.category.includes(options.category)
            );
        }

        if (options.tags && options.tags.length > 0) {
            results = results.filter(pizza =>
                options.tags.some(tag => pizza.tags.includes(tag))
            );
        }

        // Apply sorting
        if (options.sortBy) {
            results = this._sortResults(results, options.sortBy);
        }

        // Apply pagination
        if (options.limit) {
            results = results.slice(0, options.limit);
        }

        const searchResult = {
            query: cleanTerm,
            results: results,
            resultCount: results.length,
            hasResults: results.length > 0,
            suggestions: this._generateSuggestions(cleanTerm, results),
            timestamp: Date.now()
        };

        eventBus.publish(EVENT_TYPES.SEARCH_PERFORMED, searchResult);

        return results;
    }

    /**
     * Get search suggestions based on partial input
     * @param {string} partialTerm - Partial search term
     * @param {number} maxSuggestions - Maximum suggestions to return
     * @returns {string[]} Array of suggestions
     */
    getSuggestions(partialTerm, maxSuggestions = 5) {
        const cleanTerm = this._cleanSearchTerm(partialTerm);
        
        if (!cleanTerm || cleanTerm.length < 2) {
            return this._getPopularSearchTerms(maxSuggestions);
        }

        const allPizzas = this._pizzaRepository.getAll();
        const suggestions = new Set();

        // Add pizza names that match
        allPizzas.forEach(pizza => {
            if (pizza.name.toLowerCase().includes(cleanTerm)) {
                suggestions.add(pizza.name);
            }
        });

        // Add from search history
        this._searchHistory
            .filter(term => term.includes(cleanTerm))
            .forEach(term => suggestions.add(term));

        return Array.from(suggestions).slice(0, maxSuggestions);
    }

    /**
     * Get search history
     * @param {number} limit - Maximum history items to return
     * @returns {string[]} Array of recent search terms
     */
    getSearchHistory(limit = 10) {
        return this._searchHistory.slice(-limit).reverse();
    }

    /**
     * Clear search history
     */
    clearSearchHistory() {
        this._searchHistory = [];
    }

    /**
     * Get search statistics
     * @returns {Object} Search usage statistics
     */
    getSearchStatistics() {
        const termFrequency = {};
        this._searchHistory.forEach(term => {
            termFrequency[term] = (termFrequency[term] || 0) + 1;
        });

        const mostSearched = Object.entries(termFrequency)
            .sort(([,a], [,b]) => b - a)
            .slice(0, 5)
            .map(([term, count]) => ({ term, count }));

        return {
            totalSearches: this._searchHistory.length,
            uniqueTerms: Object.keys(termFrequency).length,
            mostSearched: mostSearched,
            recentSearches: this.getSearchHistory(5)
        };
    }

    /**
     * Private: Clean and normalize search term
     * @param {string} searchTerm - Raw search term
     * @returns {string} Cleaned search term
     */
    _cleanSearchTerm(searchTerm) {
        if (!searchTerm || typeof searchTerm !== 'string') {
            return '';
        }

        return searchTerm
            .toLowerCase()
            .trim()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, ''); // Remove accents
    }

    /**
     * Private: Add term to search history
     * @param {string} term - Search term to add
     */
    _addToSearchHistory(term) {
        // Remove if already exists
        this._searchHistory = this._searchHistory.filter(t => t !== term);
        
        // Add to end
        this._searchHistory.push(term);
        
        // Keep only last 50 searches
        if (this._searchHistory.length > 50) {
            this._searchHistory = this._searchHistory.slice(-50);
        }
    }

    /**
     * Private: Sort search results
     * @param {Object[]} results - Results to sort
     * @param {string} sortBy - Sort criteria
     * @returns {Object[]} Sorted results
     */
    _sortResults(results, sortBy) {
        switch (sortBy) {
            case 'name':
                return results.sort((a, b) => a.name.localeCompare(b.name));
            case 'price':
                return results.sort((a, b) => this._extractPrice(a.price) - this._extractPrice(b.price));
            case 'category':
                return results.sort((a, b) => a.category[0].localeCompare(b.category[0]));
            case 'relevance':
            default:
                return results; // Already sorted by relevance from repository
        }
    }

    /**
     * Private: Generate search suggestions based on results
     * @param {string} searchTerm - Original search term
     * @param {Object[]} results - Search results
     * @returns {string[]} Array of suggestions
     */
    _generateSuggestions(searchTerm, results) {
        if (results.length > 0) {
            return [];
        }

        const suggestions = [];
        const allPizzas = this._pizzaRepository.getAll();

        // Find similar pizza names
        allPizzas.forEach(pizza => {
            const similarity = this._calculateSimilarity(searchTerm, pizza.name.toLowerCase());
            if (similarity > 0.3) {
                suggestions.push(pizza.name);
            }
        });

        return suggestions.slice(0, 3);
    }

    /**
     * Private: Get popular search terms
     * @param {number} count - Number of terms to return
     * @returns {string[]} Popular search terms
     */
    _getPopularSearchTerms(count) {
        const popularPizzas = this._pizzaRepository.getAll()
            .filter(pizza => pizza.tags.includes('popular') || pizza.tags.includes('bestseller'))
            .slice(0, count)
            .map(pizza => pizza.name);

        return popularPizzas;
    }

    /**
     * Private: Calculate string similarity
     * @param {string} str1 - First string
     * @param {string} str2 - Second string
     * @returns {number} Similarity score (0-1)
     */
    _calculateSimilarity(str1, str2) {
        const longer = str1.length > str2.length ? str1 : str2;
        const shorter = str1.length > str2.length ? str2 : str1;
        
        if (longer.length === 0) {
            return 1.0;
        }
        
        const editDistance = this._levenshteinDistance(longer, shorter);
        return (longer.length - editDistance) / longer.length;
    }

    /**
     * Private: Calculate Levenshtein distance
     * @param {string} str1 - First string
     * @param {string} str2 - Second string
     * @returns {number} Edit distance
     */
    _levenshteinDistance(str1, str2) {
        const matrix = [];

        for (let i = 0; i <= str2.length; i++) {
            matrix[i] = [i];
        }

        for (let j = 0; j <= str1.length; j++) {
            matrix[0][j] = j;
        }

        for (let i = 1; i <= str2.length; i++) {
            for (let j = 1; j <= str1.length; j++) {
                if (str2.charAt(i - 1) === str1.charAt(j - 1)) {
                    matrix[i][j] = matrix[i - 1][j - 1];
                } else {
                    matrix[i][j] = Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );
                }
            }
        }

        return matrix[str2.length][str1.length];
    }

    /**
     * Private: Extract numeric price from string
     * @param {string} priceString - Price string
     * @returns {number} Numeric price
     */
    _extractPrice(priceString) {
        if (typeof priceString !== 'string') return 0;
        const cleanPrice = priceString.replace(/[€$£¥₹]/g, '').replace(',', '.');
        const price = parseFloat(cleanPrice);
        return isNaN(price) ? 0 : price;
    }
}