/**
 * Filter Service
 * Business logic for filtering operations
 */

import { PIZZA_CATEGORIES, EVENT_TYPES } from '../core/Constants.js';
import { eventBus } from '../core/EventBus.js';

export class FilterService {
    constructor(pizzaRepository, filterRepository) {
        this._pizzaRepository = pizzaRepository;
        this._filterRepository = filterRepository;
        this._activeFilters = [PIZZA_CATEGORIES.ALL];
    }

    /**
     * Apply filter by ID
     * @param {string} filterId - Filter ID to apply
     * @returns {Object[]} Filtered pizza results
     */
    applyFilter(filterId) {
        this._validateFilterId(filterId);

        if (filterId === PIZZA_CATEGORIES.ALL) {
            this._activeFilters = [PIZZA_CATEGORIES.ALL];
        } else {
            this._activeFilters = this._activeFilters.filter(f => f !== PIZZA_CATEGORIES.ALL);
            
            if (this._activeFilters.includes(filterId)) {
                this._activeFilters = this._activeFilters.filter(f => f !== filterId);
            } else {
                this._activeFilters.push(filterId);
            }
            
            if (this._activeFilters.length === 0) {
                this._activeFilters = [PIZZA_CATEGORIES.ALL];
            }
        }

        this._updateFilterRepository();
        const results = this._getFilteredResults();
        
        eventBus.publish(EVENT_TYPES.FILTER_CHANGED, {
            activeFilters: [...this._activeFilters],
            results: results,
            resultCount: results.length
        });

        return results;
    }

    /**
     * Get currently active filters
     * @returns {string[]} Array of active filter IDs
     */
    getActiveFilters() {
        return [...this._activeFilters];
    }

    /**
     * Reset all filters to default state
     * @returns {Object[]} All pizzas (unfiltered)
     */
    resetFilters() {
        this._activeFilters = [PIZZA_CATEGORIES.ALL];
        this._filterRepository.resetToDefault();
        
        const results = this._pizzaRepository.getAll();
        
        eventBus.publish(EVENT_TYPES.FILTER_CHANGED, {
            activeFilters: [...this._activeFilters],
            results: results,
            resultCount: results.length,
            action: 'reset'
        });

        return results;
    }

    /**
     * Check if specific filter is active
     * @param {string} filterId - Filter ID to check
     * @returns {boolean} True if filter is active
     */
    isFilterActive(filterId) {
        return this._activeFilters.includes(filterId);
    }

    /**
     * Get filter statistics
     * @returns {Object} Filter usage statistics
     */
    getFilterStatistics() {
        const results = this._getFilteredResults();
        
        return {
            activeFilters: this._activeFilters.length,
            totalResults: results.length,
            availableFilters: this._filterRepository.getAll().length,
            filterDistribution: this._calculateFilterDistribution(results)
        };
    }

    /**
     * Apply multiple filters at once
     * @param {string[]} filterIds - Array of filter IDs
     * @returns {Object[]} Filtered results
     */
    applyMultipleFilters(filterIds) {
        if (!Array.isArray(filterIds) || filterIds.length === 0) {
            return this.resetFilters();
        }

        this._activeFilters = filterIds.includes(PIZZA_CATEGORIES.ALL) 
            ? [PIZZA_CATEGORIES.ALL] 
            : filterIds;

        this._updateFilterRepository();
        const results = this._getFilteredResults();
        
        eventBus.publish(EVENT_TYPES.FILTER_CHANGED, {
            activeFilters: [...this._activeFilters],
            results: results,
            resultCount: results.length,
            action: 'multiple'
        });

        return results;
    }

    /**
     * Get available filter options with counts
     * @returns {Object[]} Filter options with result counts
     */
    getFilterOptionsWithCounts() {
        const allPizzas = this._pizzaRepository.getAll();
        const filterOptions = this._filterRepository.getAll();

        return filterOptions.map(filter => {
            let count = 0;
            
            if (filter.id === PIZZA_CATEGORIES.ALL) {
                count = allPizzas.length;
            } else {
                count = this._pizzaRepository.getByCategory(filter.id).length;
            }

            return {
                ...filter,
                count: count,
                available: count > 0
            };
        });
    }

    /**
     * Private: Get filtered results based on active filters
     * @returns {Object[]} Filtered pizza results
     */
    _getFilteredResults() {
        if (this._activeFilters.includes(PIZZA_CATEGORIES.ALL)) {
            return this._pizzaRepository.getAll();
        }

        return this._pizzaRepository.getByFilters({
            category: this._activeFilters.length === 1 ? this._activeFilters[0] : null,
            categories: this._activeFilters.length > 1 ? this._activeFilters : null
        });
    }

    /**
     * Private: Update filter repository active states
     */
    _updateFilterRepository() {
        const allFilters = this._filterRepository.getAll();
        
        allFilters.forEach(filter => {
            filter.active = this._activeFilters.includes(filter.id);
        });
    }

    /**
     * Private: Calculate filter distribution in results
     * @param {Object[]} results - Filtered results
     * @returns {Object} Distribution statistics
     */
    _calculateFilterDistribution(results) {
        const distribution = {};
        
        Object.values(PIZZA_CATEGORIES).forEach(category => {
            distribution[category] = 0;
        });

        results.forEach(pizza => {
            pizza.category.forEach(cat => {
                if (distribution.hasOwnProperty(cat)) {
                    distribution[cat]++;
                }
            });
        });

        return distribution;
    }

    /**
     * Private: Validate filter ID
     * @param {string} filterId - Filter ID to validate
     */
    _validateFilterId(filterId) {
        if (!filterId || typeof filterId !== 'string') {
            throw new Error('Filter ID must be a non-empty string');
        }

        if (!Object.values(PIZZA_CATEGORIES).includes(filterId)) {
            throw new Error(`Invalid filter ID: ${filterId}`);
        }
    }
}