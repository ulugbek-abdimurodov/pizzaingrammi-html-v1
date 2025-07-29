/**
 * Filter Manager
 * Manages filter state and coordinates with services and components
 */

import { eventBus } from '../core/EventBus.js';
import { EVENT_TYPES, PIZZA_CATEGORIES } from '../core/Constants.js';

export class FilterManager {
    constructor(filterService, pizzaItemComponent, filterComponent) {
        this._filterService = filterService;
        this._pizzaItemComponent = pizzaItemComponent;
        this._filterComponent = filterComponent;
        this._isInitialized = false;
        
        this.activeFilters = [PIZZA_CATEGORIES.ALL];
    }

    /**
     * Initialize filter manager
     */
    init() {
        if (this._isInitialized) {
            return;
        }

        this._bindEvents();
        this._isInitialized = true;
    }

    /**
     * Toggle a filter
     * @param {string} filterId - Filter ID to toggle
     */
    toggleFilter(filterId) {
        try {
            const results = this._filterService.applyFilter(filterId);
            this.activeFilters = this._filterService.getActiveFilters();
            
            this._updateComponents(results);
            
        } catch (error) {
            console.error('Error toggling filter:', error);
            eventBus.publish(EVENT_TYPES.ERROR_OCCURRED, {
                message: 'Failed to apply filter',
                error: error
            });
        }
    }

    /**
     * Apply multiple filters
     * @param {string[]} filterIds - Array of filter IDs
     */
    applyMultipleFilters(filterIds) {
        try {
            const results = this._filterService.applyMultipleFilters(filterIds);
            this.activeFilters = this._filterService.getActiveFilters();
            
            this._updateComponents(results);
            
        } catch (error) {
            console.error('Error applying multiple filters:', error);
            eventBus.publish(EVENT_TYPES.ERROR_OCCURRED, {
                message: 'Failed to apply filters',
                error: error
            });
        }
    }

    /**
     * Reset all filters
     */
    reset() {
        try {
            const results = this._filterService.resetFilters();
            this.activeFilters = this._filterService.getActiveFilters();
            
            this._updateComponents(results);
            
        } catch (error) {
            console.error('Error resetting filters:', error);
            eventBus.publish(EVENT_TYPES.ERROR_OCCURRED, {
                message: 'Failed to reset filters',
                error: error
            });
        }
    }

    /**
     * Get current active filters
     * @returns {string[]} Array of active filter IDs
     */
    getActiveFilters() {
        return [...this.activeFilters];
    }

    /**
     * Check if specific filter is active
     * @param {string} filterId - Filter ID to check
     * @returns {boolean} True if filter is active
     */
    isFilterActive(filterId) {
        return this.activeFilters.includes(filterId);
    }

    /**
     * Get filter statistics
     * @returns {Object} Current filter statistics
     */
    getStatistics() {
        return this._filterService.getFilterStatistics();
    }

    /**
     * Get available filter options with counts
     * @returns {Object[]} Filter options with result counts
     */
    getFilterOptionsWithCounts() {
        return this._filterService.getFilterOptionsWithCounts();
    }

    /**
     * Destroy filter manager
     */
    destroy() {
        this._unbindEvents();
        this._isInitialized = false;
        this.activeFilters = [];
    }

    /**
     * Private: Bind event listeners
     */
    _bindEvents() {
        // Listen for filter change events from components
        this._filterChangeSubscription = eventBus.subscribe(
            EVENT_TYPES.FILTER_CHANGED,
            (data) => this._handleFilterChangeEvent(data),
            this
        );

        // Listen for category changes
        this._categoryChangeSubscription = eventBus.subscribe(
            EVENT_TYPES.CATEGORY_CHANGED,
            (data) => this._handleCategoryChangeEvent(data),
            this
        );
    }

    /**
     * Private: Unbind event listeners
     */
    _unbindEvents() {
        if (this._filterChangeSubscription) {
            this._filterChangeSubscription();
        }
        if (this._categoryChangeSubscription) {
            this._categoryChangeSubscription();
        }
    }

    /**
     * Private: Handle filter change events
     * @param {Object} data - Event data
     */
    _handleFilterChangeEvent(data) {
        // Avoid infinite loops by checking source
        if (data.source === 'filter_service') {
            return;
        }

        if (data.filterId) {
            this.toggleFilter(data.filterId);
        } else if (data.action === 'reset') {
            this.reset();
        } else if (data.filterIds) {
            this.applyMultipleFilters(data.filterIds);
        }
    }

    /**
     * Private: Handle category change events
     * @param {Object} data - Event data
     */
    _handleCategoryChangeEvent(data) {
        if (data.categoryId && data.categoryId !== 'pizzas') {
            // Handle non-pizza categories (beverages, desserts, etc.)
            this._handleNonPizzaCategory(data.categoryId);
        }
    }

    /**
     * Private: Update components with new results
     * @param {Object[]} results - Filter results
     */
    _updateComponents(results) {
        // Update pizza items component
        if (this._pizzaItemComponent) {
            this._pizzaItemComponent.updatePizzas(results);
        }

        // Update filter component states
        if (this._filterComponent) {
            this._filterComponent.updateFilterStates(this.activeFilters);
            this._filterComponent.updateResultsCount(results.length, this.activeFilters);
        }
    }

    /**
     * Private: Handle non-pizza categories
     * @param {string} categoryId - Category ID
     */
    _handleNonPizzaCategory(categoryId) {
        // Show empty state or coming soon message for non-pizza categories
        if (this._pizzaItemComponent) {
            this._pizzaItemComponent.updatePizzas([]);
        }

        // Could be extended to show different content types
        eventBus.publish(EVENT_TYPES.CATEGORY_CHANGED, {
            categoryId: categoryId,
            isEmpty: true,
            message: this._getEmptyStateMessage(categoryId)
        });
    }

    /**
     * Private: Get empty state message for category
     * @param {string} categoryId - Category ID
     * @returns {string} Empty state message
     */
    _getEmptyStateMessage(categoryId) {
        const messages = {
            'beverages': 'Le bevande arriveranno presto! 🥤',
            'frittatinas': 'Le frittatine sono in preparazione! 🍟',
            'desserts': 'I dolci sono in arrivo! 🧁'
        };

        return messages[categoryId] || 'Contenuto in arrivo presto!';
    }

    /**
     * Private: Validate filter ID
     * @param {string} filterId - Filter ID to validate
     * @returns {boolean} True if valid
     */
    _isValidFilterId(filterId) {
        return Object.values(PIZZA_CATEGORIES).includes(filterId);
    }

    /**
     * Private: Log filter action for debugging
     * @param {string} action - Action performed
     * @param {Object} data - Action data
     */
    _logFilterAction(action, data) {
        if (process.env.NODE_ENV === 'development') {
            console.log(`[FilterManager] ${action}:`, data);
        }
    }
}