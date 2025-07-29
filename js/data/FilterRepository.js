/**
 * Filter Repository
 * Manages filter configuration and options
 */

import { PIZZA_CATEGORIES } from '../core/Constants.js';

export class FilterRepository {
    constructor() {
        this._filterOptions = this._initializeFilterOptions();
    }

    /**
     * Get all filter options
     * @returns {Object[]} Array of filter option objects
     */
    getAll() {
        return [...this._filterOptions];
    }

    /**
     * Get filter option by ID
     * @param {string} id - Filter ID
     * @returns {Object|null} Filter option or null
     */
    getById(id) {
        return this._filterOptions.find(filter => filter.id === id) || null;
    }

    /**
     * Get active filters
     * @returns {Object[]} Array of active filter options
     */
    getActive() {
        return this._filterOptions.filter(filter => filter.active);
    }

    /**
     * Get inactive filters
     * @returns {Object[]} Array of inactive filter options
     */
    getInactive() {
        return this._filterOptions.filter(filter => !filter.active);
    }

    /**
     * Update filter active state
     * @param {string} id - Filter ID
     * @param {boolean} active - Active state
     * @returns {boolean} Success status
     */
    updateActiveState(id, active) {
        const filter = this.getById(id);
        if (filter) {
            filter.active = active;
            return true;
        }
        return false;
    }

    /**
     * Reset all filters to default state
     */
    resetToDefault() {
        this._filterOptions.forEach(filter => {
            filter.active = filter.id === PIZZA_CATEGORIES.ALL;
        });
    }

    /**
     * Get filter statistics
     * @returns {Object} Filter statistics
     */
    getStatistics() {
        return {
            totalFilters: this._filterOptions.length,
            activeFilters: this.getActive().length,
            inactiveFilters: this.getInactive().length
        };
    }

    /**
     * Private: Initialize filter options
     * @returns {Object[]} Array of filter option objects
     */
    _initializeFilterOptions() {
        return [
            this._createFilterOption({
                id: PIZZA_CATEGORIES.ALL,
                label: 'Tutti',
                active: true,
                description: 'Mostra tutte le pizze',
                icon: '🍕'
            }),
            this._createFilterOption({
                id: PIZZA_CATEGORIES.CLASSICA,
                label: 'Classica',
                active: false,
                description: 'Pizze tradizionali napoletane',
                icon: '🏛️'
            }),
            this._createFilterOption({
                id: PIZZA_CATEGORIES.PIZZE_AUTORE,
                label: 'Pizze d\'autore',
                active: false,
                description: 'Creazioni gourmet e innovative',
                icon: '🎨'
            }),
            this._createFilterOption({
                id: PIZZA_CATEGORIES.VEGANA,
                label: 'Vegana',
                active: false,
                description: 'Opzioni completamente vegane',
                icon: '🌱'
            }),
            this._createFilterOption({
                id: PIZZA_CATEGORIES.SENZA_GLUTINE,
                label: 'Senza glutine',
                active: false,
                description: 'Sicure per celiaci',
                icon: '🚫'
            })
        ];
    }

    /**
     * Private: Create normalized filter option object
     * @param {Object} filterData - Raw filter data
     * @returns {Object} Normalized filter option
     */
    _createFilterOption(filterData) {
        return {
            id: filterData.id,
            label: filterData.label || '',
            active: filterData.active || false,
            description: filterData.description || '',
            icon: filterData.icon || '🍕'
        };
    }
}