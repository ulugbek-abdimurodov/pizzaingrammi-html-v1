/**
 * Recommendation Service
 * Provides intelligent recommendations based on user preferences and pizza categories
 */

import { PIZZA_CATEGORIES, UI_LIMITS } from '../core/Constants.js';
import { getBeveragesByCategory, getGlutenFreeBeverages } from '../data/beverages.js';
import { getFrittatinasbyCategory, getGlutenFreeFrittatinas } from '../data/frittatinas.js';
import { getDessertsByCategory, getGlutenFreeDesserts } from '../data/desserts.js';

export class RecommendationService {
    constructor(dataService) {
        this.dataService = dataService;
    }

    /**
     * Get pizza recommendations based on category and tags
     * @param {string} category - Pizza category
     * @param {string[]} tags - Selected tags for filtering
     * @returns {Object} Recommendation result with pizzas and metadata
     */
    getPizzaRecommendations(category, tags = []) {
        const pizzas = this.dataService.getPizzasByCategory(category);
        let filteredPizzas = pizzas;

        // Apply tag filtering if tags are provided
        if (tags.length > 0) {
            filteredPizzas = pizzas.filter(pizza =>
                tags.some(tag => pizza.tags.includes(tag))
            );
        }

        // Sort by relevance (popular tags first, then by category priority)
        const sortedPizzas = this._sortPizzasByRelevance(filteredPizzas, tags);

        return {
            pizzas: sortedPizzas.slice(0, UI_LIMITS.MAX_PIZZAS_PER_DISPLAY),
            totalCount: sortedPizzas.length,
            hasMore: sortedPizzas.length > UI_LIMITS.MAX_PIZZAS_PER_DISPLAY,
            appliedFilters: {
                category,
                tags: [...tags]
            }
        };
    }

    /**
     * Get available tags for a specific pizza category
     * @param {string} category - Pizza category
     * @returns {Object[]} Array of tag objects with metadata
     */
    getAvailableTagsForCategory(category) {
        const pizzas = this.dataService.getPizzasByCategory(category);
        const tagFrequency = new Map();

        // Count tag frequency to prioritize popular ones
        pizzas.forEach(pizza => {
            pizza.tags.forEach(tag => {
                tagFrequency.set(tag, (tagFrequency.get(tag) || 0) + 1);
            });
        });

        // Convert to objects with metadata
        const tagsWithMetadata = Array.from(tagFrequency.entries())
            .map(([tag, frequency]) => ({
                value: tag,
                displayName: this._getTagDisplayName(tag),
                description: this._getTagDescription(tag),
                frequency,
                popularity: this._calculateTagPopularity(frequency, pizzas.length)
            }))
            .sort((a, b) => b.popularity - a.popularity);

        return tagsWithMetadata;
    }

    /**
     * Get companion recommendations based on pizza category
     * @param {string} pizzaCategory - Selected pizza category
     * @param {string} companionType - Type of companion (beverages, frittatinas, desserts)
     * @returns {Object[]} Array of companion recommendations
     */
    getCompanionRecommendations(pizzaCategory, companionType) {
        const isGlutenFree = pizzaCategory === PIZZA_CATEGORIES.SENZA_GLUTINE;
        
        switch (companionType) {
            case 'beverages':
                return isGlutenFree 
                    ? getGlutenFreeBeverages().slice(0, UI_LIMITS.MAX_COMPANIONS_PER_TYPE)
                    : getBeveragesByCategory(pizzaCategory).slice(0, UI_LIMITS.MAX_COMPANIONS_PER_TYPE);
                    
            case 'frittatinas':
                return isGlutenFree
                    ? getGlutenFreeFrittatinas().slice(0, UI_LIMITS.MAX_COMPANIONS_PER_TYPE)
                    : getFrittatinasbyCategory(pizzaCategory).slice(0, UI_LIMITS.MAX_COMPANIONS_PER_TYPE);
                    
            case 'desserts':
                return isGlutenFree
                    ? getGlutenFreeDesserts().slice(0, UI_LIMITS.MAX_COMPANIONS_PER_TYPE)
                    : getDessertsByCategory(pizzaCategory).slice(0, UI_LIMITS.MAX_COMPANIONS_PER_TYPE);
                    
            default:
                throw new Error(`Invalid companion type: ${companionType}`);
        }
    }

    /**
     * Get complete gluten-free ecosystem recommendations
     * @returns {Object} Complete gluten-free menu with all categories
     */
    getGlutenFreeEcosystem() {
        return {
            pizzas: this.dataService.getPizzasByCategory(PIZZA_CATEGORIES.SENZA_GLUTINE)
                .slice(0, UI_LIMITS.MAX_PIZZAS_PER_DISPLAY),
            beverages: getGlutenFreeBeverages().slice(0, UI_LIMITS.MAX_COMPANIONS_PER_TYPE),
            frittatinas: getGlutenFreeFrittatinas().slice(0, UI_LIMITS.MAX_COMPANIONS_PER_TYPE),
            desserts: getGlutenFreeDesserts().slice(0, UI_LIMITS.MAX_COMPANIONS_PER_TYPE),
            certificationInfo: {
                standard: 'AIC Certified',
                description: 'Tutti i prodotti sono certificati senza glutine secondo gli standard AIC'
            }
        };
    }

    /**
     * Get personalized recommendations based on conversation history
     * @param {Object} userChoices - User's choices throughout the conversation
     * @returns {Object} Personalized recommendations
     */
    getPersonalizedRecommendations(userChoices) {
        const { selectedCategory, selectedTags, selectedPizza } = userChoices;
        
        // If user has selected a pizza, recommend similar ones
        if (selectedPizza) {
            return this._getSimilarPizzaRecommendations(selectedPizza);
        }

        // If user has category and tags, get refined recommendations
        if (selectedCategory && selectedTags.length > 0) {
            return this.getPizzaRecommendations(selectedCategory, selectedTags);
        }

        // Fallback to popular pizzas across all categories
        return this._getPopularPizzaRecommendations();
    }

    /**
     * Calculate recommendation confidence score
     * @param {string} category - Pizza category
     * @param {string[]} tags - Selected tags
     * @param {Object} pizza - Pizza to score
     * @returns {number} Confidence score (0-1)
     */
    calculateRecommendationConfidence(category, tags, pizza) {
        let score = 0;

        // Category match
        if (pizza.category.includes(category)) {
            score += 0.4;
        }

        // Tag matches
        const tagMatches = tags.filter(tag => pizza.tags.includes(tag)).length;
        if (tags.length > 0) {
            score += (tagMatches / tags.length) * 0.4;
        }

        // Popularity bonus
        if (pizza.tags.includes('popular') || pizza.tags.includes('bestseller')) {
            score += 0.2;
        }

        return Math.min(score, 1);
    }

    /**
     * Private: Sort pizzas by relevance
     * @param {Object[]} pizzas - Pizzas to sort
     * @param {string[]} tags - User selected tags
     * @returns {Object[]} Sorted pizzas
     */
    _sortPizzasByRelevance(pizzas, tags) {
        return pizzas.sort((a, b) => {
            // Calculate relevance scores
            const scoreA = this._calculateRelevanceScore(a, tags);
            const scoreB = this._calculateRelevanceScore(b, tags);
            
            return scoreB - scoreA;
        });
    }

    /**
     * Private: Calculate relevance score for a pizza
     * @param {Object} pizza - Pizza object
     * @param {string[]} tags - User selected tags
     * @returns {number} Relevance score
     */
    _calculateRelevanceScore(pizza, tags) {
        let score = 0;

        // Tag match bonus
        const tagMatches = tags.filter(tag => pizza.tags.includes(tag)).length;
        score += tagMatches * 3;

        // Popularity bonus
        if (pizza.tags.includes('popular')) score += 2;
        if (pizza.tags.includes('bestseller')) score += 2;
        if (pizza.tags.includes('hot')) score += 1;

        // Premium penalty (might be overwhelming for some users)
        if (pizza.tags.includes('premium')) score -= 0.5;

        return score;
    }

    /**
     * Private: Get similar pizza recommendations
     * @param {Object} selectedPizza - Previously selected pizza
     * @returns {Object} Similar pizza recommendations
     */
    _getSimilarPizzaRecommendations(selectedPizza) {
        const allPizzas = this.dataService.getAllPizzas();
        
        const similarPizzas = allPizzas
            .filter(pizza => pizza.id !== selectedPizza.id)
            .map(pizza => ({
                ...pizza,
                similarity: this._calculateSimilarityScore(selectedPizza, pizza)
            }))
            .sort((a, b) => b.similarity - a.similarity)
            .slice(0, UI_LIMITS.MAX_PIZZAS_PER_DISPLAY);

        return {
            pizzas: similarPizzas,
            totalCount: similarPizzas.length,
            hasMore: false,
            basedOn: selectedPizza.name
        };
    }

    /**
     * Private: Calculate similarity score between two pizzas
     * @param {Object} pizza1 - First pizza
     * @param {Object} pizza2 - Second pizza
     * @returns {number} Similarity score
     */
    _calculateSimilarityScore(pizza1, pizza2) {
        let score = 0;

        // Category similarity
        const commonCategories = pizza1.category.filter(cat => pizza2.category.includes(cat));
        score += commonCategories.length * 2;

        // Tag similarity
        const commonTags = pizza1.tags.filter(tag => pizza2.tags.includes(tag));
        score += commonTags.length;

        return score;
    }

    /**
     * Private: Get popular pizza recommendations
     * @returns {Object} Popular pizza recommendations
     */
    _getPopularPizzaRecommendations() {
        const allPizzas = this.dataService.getAllPizzas();
        
        const popularPizzas = allPizzas
            .filter(pizza => 
                pizza.tags.includes('popular') || 
                pizza.tags.includes('bestseller')
            )
            .slice(0, UI_LIMITS.MAX_PIZZAS_PER_DISPLAY);

        return {
            pizzas: popularPizzas,
            totalCount: popularPizzas.length,
            hasMore: false,
            reason: 'popular'
        };
    }

    /**
     * Private: Calculate tag popularity
     * @param {number} frequency - Tag frequency
     * @param {number} totalPizzas - Total pizzas in category
     * @returns {number} Popularity score
     */
    _calculateTagPopularity(frequency, totalPizzas) {
        return (frequency / totalPizzas) * 100;
    }

    /**
     * Private: Get display name for tag
     * @param {string} tag - Tag value
     * @returns {string} Display name
     */
    _getTagDisplayName(tag) {
        const displayNames = {
            'popular': '⭐ Più Popolari',
            'traditional': '🏛️ Tradizionali',
            'hot': '🌶️ Piccanti',
            'healthy': '🥗 Leggere',
            'gourmet': '👨‍🍳 Gourmet',
            'cheese': '🧀 Extra Formaggio',
            'premium': '💎 Premium',
            'bestseller': '🏆 Bestseller',
            'hearty': '💪 Sostanziose',
            'protein': '🥩 Ricche di Proteine'
        };
        return displayNames[tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
    }

    /**
     * Private: Get description for tag
     * @param {string} tag - Tag value
     * @returns {string} Tag description
     */
    _getTagDescription(tag) {
        const descriptions = {
            'popular': 'Le pizze più amate dai nostri clienti',
            'traditional': 'Ricette classiche della tradizione',
            'hot': 'Per chi ama i sapori piccanti',
            'healthy': 'Opzioni più leggere e salutari',
            'gourmet': 'Ingredienti ricercati e preparazioni elaborate',
            'cheese': 'Generose porzioni di formaggi premium',
            'premium': 'I nostri ingredienti più pregiati',
            'bestseller': 'I nostri piatti più venduti',
            'hearty': 'Pizze abbondanti e sostanziose',
            'protein': 'Ricche di carni e proteine'
        };
        return descriptions[tag] || `Pizze caratterizzate da ${tag}`;
    }
}