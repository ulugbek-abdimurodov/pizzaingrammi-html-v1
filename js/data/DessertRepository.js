/**
 * Dessert Repository
 * Manages dessert data and recommendations
 */

import { PIZZA_CATEGORIES, DEFAULT_VALUES } from '../core/Constants.js';

export class DessertRepository {
    constructor() {
        this._desserts = this._initializeDessertData();
        this._validateData();
    }

    /**
     * Get all desserts
     * @returns {Object[]} Array of dessert objects
     */
    getAll() {
        return [...this._desserts];
    }

    /**
     * Get dessert by ID
     * @param {string} id - Dessert ID
     * @returns {Object|null} Dessert object or null
     */
    getById(id) {
        return this._desserts.find(dessert => dessert.id === id) || null;
    }

    /**
     * Get desserts by pizza category
     * @param {string} pizzaCategory - Pizza category
     * @returns {Object[]} Recommended desserts
     */
    getByPizzaCategory(pizzaCategory) {
        return this._desserts.filter(dessert => 
            dessert.recommendedFor.includes(pizzaCategory) ||
            dessert.recommendedFor.includes(PIZZA_CATEGORIES.ALL)
        );
    }

    /**
     * Get gluten-free desserts
     * @returns {Object[]} Gluten-free desserts
     */
    getGlutenFree() {
        return this._desserts.filter(dessert => dessert.isGlutenFree);
    }

    /**
     * Get vegan desserts
     * @returns {Object[]} Vegan desserts
     */
    getVegan() {
        return this._desserts.filter(dessert => dessert.isVegan);
    }

    /**
     * Get desserts by preparation status
     * @param {boolean} readyToServe - Whether dessert is ready to serve
     * @returns {Object[]} Desserts matching preparation status
     */
    getByReadyStatus(readyToServe) {
        return this._desserts.filter(dessert => dessert.isReadyToServe === readyToServe);
    }

    /**
     * Get desserts by type
     * @param {string} type - Dessert type
     * @returns {Object[]} Desserts of specified type
     */
    getByType(type) {
        return this._desserts.filter(dessert => dessert.type === type);
    }

    /**
     * Private: Initialize dessert data
     * @returns {Object[]} Array of dessert objects
     */
    _initializeDessertData() {
        return [
            this._createDessert({
                id: 'dess_001',
                name: 'Tiramisù della Casa',
                description: 'Il classico tiramisù con mascarpone, caffè e cacao',
                price: '€6.50',
                type: 'traditional_italian',
                isGlutenFree: false,
                isVegan: false,
                isReadyToServe: true,
                preparationTime: '4 hours',
                recommendedFor: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.ALL],
                allergens: ['uova', 'glutine', 'lattosio'],
                image: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Tiramisù'
            }),
            this._createDessert({
                id: 'dess_002',
                name: 'Cannoli Siciliani',
                description: 'Cannoli croccanti con ricotta dolce e gocce di cioccolato',
                price: '€5.50',
                type: 'traditional_sicilian',
                isGlutenFree: false,
                isVegan: false,
                isReadyToServe: true,
                preparationTime: '2 hours',
                recommendedFor: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.PIZZE_AUTORE],
                allergens: ['glutine', 'lattosio'],
                image: 'https://via.placeholder.com/150/F5DEB3/8B4513?text=Cannoli'
            }),
            this._createDessert({
                id: 'dess_003',
                name: 'Mousse di Cioccolato Vegano',
                description: 'Mousse cremosa con cioccolato fondente e avocado',
                price: '€6.00',
                type: 'vegan_innovative',
                isGlutenFree: true,
                isVegan: true,
                isReadyToServe: true,
                preparationTime: '2 hours',
                recommendedFor: [PIZZA_CATEGORIES.VEGANA],
                allergens: [],
                image: 'https://via.placeholder.com/150/654321/FFFFFF?text=Vegan+Mousse'
            }),
            this._createDessert({
                id: 'dess_004',
                name: 'Soufflé al Pistacchio',
                description: 'Soufflé caldo con pistacchi di Bronte DOP',
                price: '€9.50',
                type: 'gourmet_hot',
                isGlutenFree: true,
                isVegan: false,
                isReadyToServe: false,
                preparationTime: '25 minutes',
                recommendedFor: [PIZZA_CATEGORIES.PIZZE_AUTORE],
                allergens: ['uova', 'lattosio', 'frutta secca'],
                image: 'https://via.placeholder.com/150/9ACD32/000000?text=Pistachio+Soufflé'
            }),
            this._createDessert({
                id: 'dess_005',
                name: 'Gelato Senza Glutine Assortito',
                description: 'Selezione di gelati certificati senza glutine',
                price: '€5.00',
                type: 'gluten_free_gelato',
                isGlutenFree: true,
                isVegan: false,
                isCertified: true,
                isReadyToServe: true,
                preparationTime: 'ready',
                recommendedFor: [PIZZA_CATEGORIES.SENZA_GLUTINE],
                flavors: ['vaniglia', 'cioccolato fondente', 'frutti di bosco'],
                certifications: ['AIC'],
                allergens: ['lattosio'],
                image: 'https://via.placeholder.com/150/FFB6C1/8B0000?text=GF+Gelato'
            })
        ];
    }

    /**
     * Private: Create normalized dessert object
     * @param {Object} dessertData - Raw dessert data
     * @returns {Object} Normalized dessert object
     */
    _createDessert(dessertData) {
        return {
            id: dessertData.id,
            name: dessertData.name || '',
            description: dessertData.description || '',
            price: dessertData.price || '€0.00',
            type: dessertData.type || 'other',
            isGlutenFree: dessertData.isGlutenFree || false,
            isVegan: dessertData.isVegan || false,
            isCertified: dessertData.isCertified || false,
            isReadyToServe: dessertData.isReadyToServe || true,
            preparationTime: dessertData.preparationTime || 'ready',
            recommendedFor: Array.isArray(dessertData.recommendedFor) ? dessertData.recommendedFor : [],
            allergens: Array.isArray(dessertData.allergens) ? dessertData.allergens : [],
            flavors: Array.isArray(dessertData.flavors) ? dessertData.flavors : [],
            certifications: Array.isArray(dessertData.certifications) ? dessertData.certifications : [],
            image: dessertData.image || DEFAULT_VALUES.PIZZA_IMAGE
        };
    }

    /**
     * Private: Validate dessert data
     */
    _validateData() {
        this._desserts.forEach((dessert, index) => {
            if (!dessert.id || !dessert.name) {
                console.warn(`Dessert at index ${index} missing required fields`);
            }
            if (!Array.isArray(dessert.recommendedFor)) {
                console.warn(`Dessert "${dessert.name}" has invalid recommendedFor field`);
            }
            if (!Array.isArray(dessert.allergens)) {
                console.warn(`Dessert "${dessert.name}" has invalid allergens field`);
            }
        });
    }
}