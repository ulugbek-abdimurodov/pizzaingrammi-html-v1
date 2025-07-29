/**
 * Data Service
 * Centralized data access layer for pizza and menu data
 */

import { PIZZA_CATEGORIES, FILTER_INTEGRATION } from '../core/Constants.js';

export class DataService {
    constructor() {
        this.pizzaData = null;
        this.initializeDataSource();
    }

    /**
     * Initialize data source reference
     */
    initializeDataSource() {
        // Reference to global PizzaData from existing system
        if (typeof window !== 'undefined' && window[FILTER_INTEGRATION.PIZZA_DATA_REFERENCE]) {
            this.pizzaData = window[FILTER_INTEGRATION.PIZZA_DATA_REFERENCE];
        } else {
            console.warn('PizzaData not found. Chatbot may not function properly.');
        }
    }

    /**
     * Get all pizzas
     * @returns {Object[]} Array of all pizza objects
     */
    getAllPizzas() {
        if (!this.pizzaData || !this.pizzaData.menuItems) {
            console.error('Pizza data not available');
            return [];
        }
        return [...this.pizzaData.menuItems];
    }

    /**
     * Get pizzas by category
     * @param {string} category - Pizza category
     * @returns {Object[]} Array of pizza objects in the category
     */
    getPizzasByCategory(category) {
        const allPizzas = this.getAllPizzas();
        
        if (category === PIZZA_CATEGORIES.ALL) {
            return allPizzas;
        }

        return allPizzas.filter(pizza => 
            pizza.category && pizza.category.includes(category)
        );
    }

    /**
     * Get pizzas by tags
     * @param {string[]} tags - Array of tags to filter by
     * @returns {Object[]} Array of pizza objects matching the tags
     */
    getPizzasByTags(tags) {
        if (!tags || tags.length === 0) {
            return this.getAllPizzas();
        }

        const allPizzas = this.getAllPizzas();
        return allPizzas.filter(pizza =>
            pizza.tags && tags.some(tag => pizza.tags.includes(tag))
        );
    }

    /**
     * Get pizzas by category and tags combined
     * @param {string} category - Pizza category
     * @param {string[]} tags - Array of tags to filter by
     * @returns {Object[]} Array of filtered pizza objects
     */
    getPizzasByCategoryAndTags(category, tags) {
        let filteredPizzas = this.getPizzasByCategory(category);

        if (tags && tags.length > 0) {
            filteredPizzas = filteredPizzas.filter(pizza =>
                pizza.tags && tags.some(tag => pizza.tags.includes(tag))
            );
        }

        return filteredPizzas;
    }

    /**
     * Get pizza by ID
     * @param {string|number} pizzaId - Pizza ID
     * @returns {Object|null} Pizza object or null if not found
     */
    getPizzaById(pizzaId) {
        const allPizzas = this.getAllPizzas();
        return allPizzas.find(pizza => pizza.id === pizzaId) || null;
    }

    /**
     * Search pizzas by name
     * @param {string} searchTerm - Search term
     * @returns {Object[]} Array of matching pizza objects
     */
    searchPizzasByName(searchTerm) {
        if (!searchTerm || searchTerm.trim() === '') {
            return [];
        }

        const allPizzas = this.getAllPizzas();
        const term = searchTerm.toLowerCase().trim();

        return allPizzas.filter(pizza =>
            pizza.name && pizza.name.toLowerCase().includes(term)
        );
    }

    /**
     * Get available categories
     * @returns {string[]} Array of available pizza categories
     */
    getAvailableCategories() {
        return Object.values(PIZZA_CATEGORIES);
    }

    /**
     * Get all unique tags from pizzas
     * @param {string} category - Optional category to filter tags by
     * @returns {string[]} Array of unique tags
     */
    getAvailableTags(category = null) {
        const pizzas = category ? this.getPizzasByCategory(category) : this.getAllPizzas();
        const allTags = new Set();

        pizzas.forEach(pizza => {
            if (pizza.tags) {
                pizza.tags.forEach(tag => allTags.add(tag));
            }
        });

        return Array.from(allTags);
    }

    /**
     * Get pizza statistics
     * @returns {Object} Statistics about the pizza menu
     */
    getPizzaStatistics() {
        const allPizzas = this.getAllPizzas();
        const stats = {
            totalPizzas: allPizzas.length,
            categoryCounts: {},
            tagCounts: {},
            averagePrice: 0,
            priceRange: { min: Infinity, max: -Infinity }
        };

        // Calculate category distribution
        Object.values(PIZZA_CATEGORIES).forEach(category => {
            stats.categoryCounts[category] = this.getPizzasByCategory(category).length;
        });

        // Calculate tag distribution and price statistics
        let totalPrice = 0;
        let validPrices = 0;

        allPizzas.forEach(pizza => {
            // Tag counts
            if (pizza.tags) {
                pizza.tags.forEach(tag => {
                    stats.tagCounts[tag] = (stats.tagCounts[tag] || 0) + 1;
                });
            }

            // Price statistics
            if (pizza.price) {
                const price = this._extractPriceValue(pizza.price);
                if (price > 0) {
                    totalPrice += price;
                    validPrices++;
                    stats.priceRange.min = Math.min(stats.priceRange.min, price);
                    stats.priceRange.max = Math.max(stats.priceRange.max, price);
                }
            }
        });

        stats.averagePrice = validPrices > 0 ? totalPrice / validPrices : 0;

        return stats;
    }

    /**
     * Validate pizza data integrity
     * @returns {Object} Validation results
     */
    validateDataIntegrity() {
        const allPizzas = this.getAllPizzas();
        const issues = [];

        allPizzas.forEach((pizza, index) => {
            // Check required fields
            if (!pizza.id) {
                issues.push(`Pizza at index ${index} missing ID`);
            }
            if (!pizza.name) {
                issues.push(`Pizza at index ${index} missing name`);
            }
            if (!pizza.category || pizza.category.length === 0) {
                issues.push(`Pizza "${pizza.name}" missing category`);
            }
            if (!pizza.price) {
                issues.push(`Pizza "${pizza.name}" missing price`);
            }

            // Check data types
            if (pizza.category && !Array.isArray(pizza.category)) {
                issues.push(`Pizza "${pizza.name}" category should be an array`);
            }
            if (pizza.tags && !Array.isArray(pizza.tags)) {
                issues.push(`Pizza "${pizza.name}" tags should be an array`);
            }
        });

        return {
            isValid: issues.length === 0,
            issues,
            totalPizzas: allPizzas.length
        };
    }

    /**
     * Get featured pizzas
     * @param {number} limit - Maximum number of featured pizzas
     * @returns {Object[]} Array of featured pizza objects
     */
    getFeaturedPizzas(limit = 3) {
        const allPizzas = this.getAllPizzas();
        
        // Prioritize pizzas with featured tags
        const featuredPizzas = allPizzas
            .filter(pizza => 
                pizza.tags && (
                    pizza.tags.includes('popular') ||
                    pizza.tags.includes('bestseller') ||
                    pizza.tags.includes('hot')
                )
            )
            .slice(0, limit);

        // If we don't have enough featured pizzas, fill with random ones
        if (featuredPizzas.length < limit) {
            const remainingSlots = limit - featuredPizzas.length;
            const nonFeatured = allPizzas.filter(pizza => 
                !featuredPizzas.some(featured => featured.id === pizza.id)
            );
            
            const shuffled = this._shuffleArray([...nonFeatured]);
            featuredPizzas.push(...shuffled.slice(0, remainingSlots));
        }

        return featuredPizzas;
    }

    /**
     * Get pizzas with price filtering
     * @param {number} minPrice - Minimum price
     * @param {number} maxPrice - Maximum price
     * @returns {Object[]} Array of pizza objects within price range
     */
    getPizzasByPriceRange(minPrice, maxPrice) {
        const allPizzas = this.getAllPizzas();
        
        return allPizzas.filter(pizza => {
            if (!pizza.price) return false;
            
            const price = this._extractPriceValue(pizza.price);
            return price >= minPrice && price <= maxPrice;
        });
    }

    /**
     * Get random pizza recommendations
     * @param {number} count - Number of random pizzas to return
     * @param {string[]} excludeIds - IDs of pizzas to exclude
     * @returns {Object[]} Array of random pizza objects
     */
    getRandomPizzas(count, excludeIds = []) {
        const allPizzas = this.getAllPizzas();
        const availablePizzas = allPizzas.filter(pizza => 
            !excludeIds.includes(pizza.id)
        );
        
        const shuffled = this._shuffleArray([...availablePizzas]);
        return shuffled.slice(0, count);
    }

    /**
     * Check if data source is available and valid
     * @returns {boolean} True if data source is valid
     */
    isDataSourceValid() {
        return !!(this.pizzaData && 
                 this.pizzaData.menuItems && 
                 Array.isArray(this.pizzaData.menuItems) &&
                 this.pizzaData.menuItems.length > 0);
    }

    /**
     * Refresh data source (useful if external data changes)
     */
    refreshDataSource() {
        this.initializeDataSource();
    }

    /**
     * Get data source metadata
     * @returns {Object} Metadata about the data source
     */
    getDataSourceMetadata() {
        if (!this.isDataSourceValid()) {
            return {
                isValid: false,
                error: 'Data source not available'
            };
        }

        const stats = this.getPizzaStatistics();
        
        return {
            isValid: true,
            source: FILTER_INTEGRATION.PIZZA_DATA_REFERENCE,
            lastUpdated: Date.now(),
            totalItems: stats.totalPizzas,
            categories: Object.keys(stats.categoryCounts),
            availableTags: this.getAvailableTags(),
            priceRange: stats.priceRange
        };
    }

    /**
     * Private: Extract numeric price value from price string
     * @param {string} priceString - Price string (e.g., "€10.50")
     * @returns {number} Numeric price value
     */
    _extractPriceValue(priceString) {
        if (typeof priceString !== 'string') return 0;
        
        // Remove currency symbols and extract number
        const cleanPrice = priceString.replace(/[€$£¥₹]/g, '').replace(',', '.');
        const price = parseFloat(cleanPrice);
        
        return isNaN(price) ? 0 : price;
    }

    /**
     * Private: Shuffle array using Fisher-Yates algorithm
     * @param {Array} array - Array to shuffle
     * @returns {Array} Shuffled array
     */
    _shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    /**
     * Private: Normalize string for comparison
     * @param {string} str - String to normalize
     * @returns {string} Normalized string
     */
    _normalizeString(str) {
        return str.toLowerCase()
                  .normalize('NFD')
                  .replace(/[\u0300-\u036f]/g, '') // Remove accents
                  .trim();
    }
}