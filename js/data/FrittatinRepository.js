/**
 * Frittatina Repository
 * Manages frittatina data and recommendations
 */

import { PIZZA_CATEGORIES, DEFAULT_VALUES } from '../core/Constants.js';

export class FrittatinRepository {
    constructor() {
        this._frittatinas = this._initializeFrittatinData();
        this._validateData();
    }

    /**
     * Get all frittatinas
     * @returns {Object[]} Array of frittatina objects
     */
    getAll() {
        return [...this._frittatinas];
    }

    /**
     * Get frittatina by ID
     * @param {string} id - Frittatina ID
     * @returns {Object|null} Frittatina object or null
     */
    getById(id) {
        return this._frittatinas.find(frittatina => frittatina.id === id) || null;
    }

    /**
     * Get frittatinas by pizza category
     * @param {string} pizzaCategory - Pizza category
     * @returns {Object[]} Recommended frittatinas
     */
    getByPizzaCategory(pizzaCategory) {
        return this._frittatinas.filter(frittatina => 
            frittatina.recommendedFor.includes(pizzaCategory) ||
            frittatina.recommendedFor.includes(PIZZA_CATEGORIES.ALL)
        );
    }

    /**
     * Get gluten-free frittatinas
     * @returns {Object[]} Gluten-free frittatinas
     */
    getGlutenFree() {
        return this._frittatinas.filter(frittatina => frittatina.isGlutenFree);
    }

    /**
     * Get vegan frittatinas
     * @returns {Object[]} Vegan frittatinas
     */
    getVegan() {
        return this._frittatinas.filter(frittatina => frittatina.isVegan);
    }

    /**
     * Get frittatinas by preparation time
     * @param {number} maxMinutes - Maximum preparation time in minutes
     * @returns {Object[]} Quick frittatinas
     */
    getByPrepTime(maxMinutes) {
        return this._frittatinas.filter(frittatina => frittatina.prepTimeMinutes <= maxMinutes);
    }

    /**
     * Private: Initialize frittatina data
     * @returns {Object[]} Array of frittatina objects
     */
    _initializeFrittatinData() {
        return [
            this._createFrittatina({
                id: 'frit_001',
                name: 'Frittatina Classica Napoletana',
                description: 'Frittatina tradizionale con pasta, uova e parmigiano',
                price: '€4.50',
                type: 'traditional',
                isGlutenFree: false,
                isVegan: false,
                prepTimeMinutes: 15,
                recommendedFor: [PIZZA_CATEGORIES.CLASSICA],
                ingredients: ['pasta', 'uova', 'parmigiano', 'pepe'],
                image: 'https://via.placeholder.com/150/FFB347/000000?text=Frittatina'
            }),
            this._createFrittatina({
                id: 'frit_002',
                name: 'Arancino Siciliano',
                description: 'Arancino ripieno di ragù, mozzarella e piselli',
                price: '€5.00',
                type: 'traditional',
                isGlutenFree: false,
                isVegan: false,
                prepTimeMinutes: 20,
                recommendedFor: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.PIZZE_AUTORE],
                ingredients: ['riso', 'ragù', 'mozzarella', 'piselli'],
                image: 'https://via.placeholder.com/150/FF8C00/FFFFFF?text=Arancino'
            }),
            this._createFrittatina({
                id: 'frit_003',
                name: 'Crocchette Vegane ai Ceci',
                description: 'Crocchette vegane con ceci e verdure di stagione',
                price: '€5.50',
                type: 'vegan',
                isGlutenFree: true,
                isVegan: true,
                prepTimeMinutes: 18,
                recommendedFor: [PIZZA_CATEGORIES.VEGANA],
                ingredients: ['ceci', 'zucchine', 'carote', 'farina di riso'],
                image: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=Vegan+Crocchette'
            }),
            this._createFrittatina({
                id: 'frit_004',
                name: 'Supplì Gourmet al Tartufo',
                description: 'Supplì raffinato con riso, tartufo nero e pecorino',
                price: '€7.50',
                type: 'gourmet',
                isGlutenFree: false,
                isVegan: false,
                prepTimeMinutes: 25,
                recommendedFor: [PIZZA_CATEGORIES.PIZZE_AUTORE],
                ingredients: ['riso carnaroli', 'tartufo nero', 'pecorino', 'burro'],
                image: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Truffle+Supplì'
            }),
            this._createFrittatina({
                id: 'frit_005',
                name: 'Polpette di Riso Senza Glutine',
                description: 'Polpette certificate senza glutine con riso e verdure',
                price: '€5.00',
                type: 'gluten_free',
                isGlutenFree: true,
                isVegan: false,
                prepTimeMinutes: 22,
                isCertified: true,
                recommendedFor: [PIZZA_CATEGORIES.SENZA_GLUTINE],
                ingredients: ['riso', 'zucchine', 'parmigiano', 'farina di riso'],
                certifications: ['AIC'],
                image: 'https://via.placeholder.com/150/90EE90/000000?text=GF+Rice+Balls'
            })
        ];
    }

    /**
     * Private: Create normalized frittatina object
     * @param {Object} frittatinData - Raw frittatina data
     * @returns {Object} Normalized frittatina object
     */
    _createFrittatina(frittatinData) {
        return {
            id: frittatinData.id,
            name: frittatinData.name || '',
            description: frittatinData.description || '',
            price: frittatinData.price || '€0.00',
            type: frittatinData.type || 'other',
            isGlutenFree: frittatinData.isGlutenFree || false,
            isVegan: frittatinData.isVegan || false,
            isCertified: frittatinData.isCertified || false,
            prepTimeMinutes: frittatinData.prepTimeMinutes || 0,
            recommendedFor: Array.isArray(frittatinData.recommendedFor) ? frittatinData.recommendedFor : [],
            ingredients: Array.isArray(frittatinData.ingredients) ? frittatinData.ingredients : [],
            certifications: Array.isArray(frittatinData.certifications) ? frittatinData.certifications : [],
            image: frittatinData.image || DEFAULT_VALUES.PIZZA_IMAGE
        };
    }

    /**
     * Private: Validate frittatina data
     */
    _validateData() {
        this._frittatinas.forEach((frittatina, index) => {
            if (!frittatina.id || !frittatina.name) {
                console.warn(`Frittatina at index ${index} missing required fields`);
            }
            if (!Array.isArray(frittatina.recommendedFor)) {
                console.warn(`Frittatina "${frittatina.name}" has invalid recommendedFor field`);
            }
            if (!Array.isArray(frittatina.ingredients)) {
                console.warn(`Frittatina "${frittatina.name}" has invalid ingredients field`);
            }
        });
    }
}