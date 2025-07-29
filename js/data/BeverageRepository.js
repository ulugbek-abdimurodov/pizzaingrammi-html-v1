/**
 * Beverage Repository
 * Manages beverage data and recommendations
 */

import { PIZZA_CATEGORIES, DEFAULT_VALUES } from '../core/Constants.js';

export class BeverageRepository {
    constructor() {
        this._beverages = this._initializeBeverageData();
        this._validateData();
    }

    /**
     * Get all beverages
     * @returns {Object[]} Array of beverage objects
     */
    getAll() {
        return [...this._beverages];
    }

    /**
     * Get beverage by ID
     * @param {string} id - Beverage ID
     * @returns {Object|null} Beverage object or null
     */
    getById(id) {
        return this._beverages.find(beverage => beverage.id === id) || null;
    }

    /**
     * Get beverages by pizza category
     * @param {string} pizzaCategory - Pizza category
     * @returns {Object[]} Recommended beverages
     */
    getByPizzaCategory(pizzaCategory) {
        return this._beverages.filter(beverage => 
            beverage.recommendedFor.includes(pizzaCategory) ||
            beverage.recommendedFor.includes(PIZZA_CATEGORIES.ALL)
        );
    }

    /**
     * Get gluten-free beverages
     * @returns {Object[]} Gluten-free beverages
     */
    getGlutenFree() {
        return this._beverages.filter(beverage => beverage.isGlutenFree);
    }

    /**
     * Get beverages by type
     * @param {string} type - Beverage type
     * @returns {Object[]} Beverages of specified type
     */
    getByType(type) {
        return this._beverages.filter(beverage => beverage.type === type);
    }

    /**
     * Private: Initialize beverage data
     * @returns {Object[]} Array of beverage objects
     */
    _initializeBeverageData() {
        return [
            this._createBeverage({
                id: 'bev_001',
                name: 'Coca Cola Classica',
                description: 'La classica coca cola per accompagnare le pizze tradizionali',
                price: '€3.50',
                type: 'soft_drink',
                isGlutenFree: true,
                isAlcoholic: false,
                recommendedFor: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.ALL],
                image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Coca+Cola'
            }),
            this._createBeverage({
                id: 'bev_002',
                name: 'Birra Peroni',
                description: 'Birra italiana perfetta con le pizze classiche',
                price: '€4.50',
                type: 'beer',
                isGlutenFree: false,
                isAlcoholic: true,
                alcoholContent: '5.1%',
                recommendedFor: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.PIZZE_AUTORE],
                image: 'https://via.placeholder.com/150/FFD700/000000?text=Peroni'
            }),
            this._createBeverage({
                id: 'bev_003',
                name: 'Prosecco DOCG',
                description: 'Prosecco di Valdobbiadene per occasioni speciali',
                price: '€8.00',
                type: 'sparkling_wine',
                isGlutenFree: true,
                isAlcoholic: true,
                alcoholContent: '11%',
                recommendedFor: [PIZZA_CATEGORIES.PIZZE_AUTORE],
                image: 'https://via.placeholder.com/150/E6E6FA/000000?text=Prosecco'
            }),
            this._createBeverage({
                id: 'bev_004',
                name: 'Succo Bio Detox',
                description: 'Mix di verdure verdi biologiche e limone',
                price: '€5.50',
                type: 'fresh_juice',
                isGlutenFree: true,
                isAlcoholic: false,
                isOrganic: true,
                recommendedFor: [PIZZA_CATEGORIES.VEGANA],
                image: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=Green+Juice'
            }),
            this._createBeverage({
                id: 'bev_005',
                name: 'Acqua Naturale San Pellegrino',
                description: 'Acqua naturale premium italiana',
                price: '€2.50',
                type: 'water',
                isGlutenFree: true,
                isAlcoholic: false,
                recommendedFor: [PIZZA_CATEGORIES.ALL, PIZZA_CATEGORIES.SENZA_GLUTINE],
                image: 'https://via.placeholder.com/150/0099CC/FFFFFF?text=San+Pellegrino'
            })
        ];
    }

    /**
     * Private: Create normalized beverage object
     * @param {Object} beverageData - Raw beverage data
     * @returns {Object} Normalized beverage object
     */
    _createBeverage(beverageData) {
        return {
            id: beverageData.id,
            name: beverageData.name || '',
            description: beverageData.description || '',
            price: beverageData.price || '€0.00',
            type: beverageData.type || 'other',
            isGlutenFree: beverageData.isGlutenFree || false,
            isAlcoholic: beverageData.isAlcoholic || false,
            alcoholContent: beverageData.alcoholContent || null,
            isOrganic: beverageData.isOrganic || false,
            recommendedFor: Array.isArray(beverageData.recommendedFor) ? beverageData.recommendedFor : [],
            image: beverageData.image || DEFAULT_VALUES.PIZZA_IMAGE
        };
    }

    /**
     * Private: Validate beverage data
     */
    _validateData() {
        this._beverages.forEach((beverage, index) => {
            if (!beverage.id || !beverage.name) {
                console.warn(`Beverage at index ${index} missing required fields`);
            }
            if (!Array.isArray(beverage.recommendedFor)) {
                console.warn(`Beverage "${beverage.name}" has invalid recommendedFor field`);
            }
        });
    }
}