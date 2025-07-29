/**
 * Filter Integration Service
 * Handles integration with the main application's filter system
 */

import { FILTER_INTEGRATION, EVENT_TYPES } from '../core/Constants.js';
import { messageBus } from '../core/MessageBus.js';

export class FilterIntegrationService {
    constructor() {
        this.filterManager = null;
        this.initializeFilterManagerReference();
    }

    /**
     * Initialize reference to the main filter manager
     */
    initializeFilterManagerReference() {
        if (typeof window !== 'undefined' && window[FILTER_INTEGRATION.FILTER_MANAGER_REFERENCE]) {
            this.filterManager = window[FILTER_INTEGRATION.FILTER_MANAGER_REFERENCE];
            this._bindFilterEvents();
        } else {
            console.warn('FilterManager not found. Filter integration may not work properly.');
        }
    }

    /**
     * Apply filter to the main application UI
     * @param {string} category - Category to filter by
     */
    applyMainUIFilter(category) {
        if (!this._isFilterManagerAvailable()) {
            console.warn('FilterManager not available. Cannot apply filter.');
            return false;
        }

        try {
            this.filterManager.toggleFilter(category);
            
            // Publish event for other components
            messageBus.publish(EVENT_TYPES.FILTER_APPLIED, {
                category,
                source: 'chatbot',
                timestamp: Date.now()
            });

            return true;
        } catch (error) {
            console.error('Error applying filter:', error);
            return false;
        }
    }

    /**
     * Reset all filters in the main application
     */
    resetMainUIFilters() {
        if (!this._isFilterManagerAvailable()) {
            console.warn('FilterManager not available. Cannot reset filters.');
            return false;
        }

        try {
            this.filterManager.reset();
            
            messageBus.publish(EVENT_TYPES.FILTER_APPLIED, {
                category: 'all',
                action: 'reset',
                source: 'chatbot',
                timestamp: Date.now()
            });

            return true;
        } catch (error) {
            console.error('Error resetting filters:', error);
            return false;
        }
    }

    /**
     * Get currently active filters from main application
     * @returns {string[]} Array of active filter categories
     */
    getActiveFilters() {
        if (!this._isFilterManagerAvailable()) {
            return [];
        }

        try {
            return this.filterManager.activeFilters || [];
        } catch (error) {
            console.error('Error getting active filters:', error);
            return [];
        }
    }

    /**
     * Synchronize chatbot recommendations with main UI filters
     * @param {string} category - Category to synchronize
     */
    synchronizeWithMainUI(category) {
        const success = this.applyMainUIFilter(category);
        
        if (success) {
            // Scroll to menu section to show filtered results
            this._scrollToMenuSection();
        }

        return success;
    }

    /**
     * Check if a specific filter is currently active
     * @param {string} category - Category to check
     * @returns {boolean} True if filter is active
     */
    isFilterActive(category) {
        const activeFilters = this.getActiveFilters();
        return activeFilters.includes(category);
    }

    /**
     * Get filter manager capabilities
     * @returns {Object} Available filter manager methods and properties
     */
    getFilterManagerCapabilities() {
        if (!this._isFilterManagerAvailable()) {
            return {
                available: false,
                methods: []
            };
        }

        const capabilities = {
            available: true,
            methods: []
        };

        // Check available methods
        const methodsToCheck = ['toggleFilter', 'reset', 'applyFilters', 'updateFilterUI'];
        methodsToCheck.forEach(method => {
            if (typeof this.filterManager[method] === 'function') {
                capabilities.methods.push(method);
            }
        });

        return capabilities;
    }

    /**
     * Apply multiple filters at once
     * @param {string[]} categories - Array of categories to filter by
     * @returns {boolean} True if all filters were applied successfully
     */
    applyMultipleFilters(categories) {
        if (!this._isFilterManagerAvailable() || !Array.isArray(categories)) {
            return false;
        }

        let allSuccess = true;

        categories.forEach(category => {
            const success = this.applyMainUIFilter(category);
            if (!success) {
                allSuccess = false;
            }
        });

        return allSuccess;
    }

    /**
     * Get filter statistics from main application
     * @returns {Object} Filter usage statistics
     */
    getFilterStatistics() {
        if (!this._isFilterManagerAvailable()) {
            return {
                available: false,
                activeFilters: [],
                totalFilters: 0
            };
        }

        const activeFilters = this.getActiveFilters();
        
        return {
            available: true,
            activeFilters,
            totalFilters: activeFilters.length,
            lastUpdated: Date.now()
        };
    }

    /**
     * Register callback for filter changes
     * @param {Function} callback - Callback function to call when filters change
     * @returns {Function} Unsubscribe function
     */
    onFilterChange(callback) {
        return messageBus.subscribe(EVENT_TYPES.FILTER_APPLIED, callback);
    }

    /**
     * Refresh filter manager reference
     */
    refreshFilterManagerReference() {
        this.initializeFilterManagerReference();
    }

    /**
     * Private: Check if filter manager is available
     * @returns {boolean} True if filter manager is available
     */
    _isFilterManagerAvailable() {
        return !!(this.filterManager && typeof this.filterManager === 'object');
    }

    /**
     * Private: Bind to filter manager events
     */
    _bindFilterEvents() {
        if (!this._isFilterManagerAvailable()) {
            return;
        }

        // If filter manager has event system, bind to it
        if (typeof this.filterManager.on === 'function') {
            this.filterManager.on('filterChanged', (data) => {
                messageBus.publish(EVENT_TYPES.FILTER_APPLIED, {
                    ...data,
                    source: 'main_ui'
                });
            });
        }
    }

    /**
     * Private: Scroll to menu section
     */
    _scrollToMenuSection() {
        // Find menu section and scroll to it
        const menuSection = document.getElementById('menu-items') || 
                           document.querySelector('.menu-items') ||
                           document.querySelector('[data-section="menu"]');

        if (menuSection) {
            menuSection.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    }

    /**
     * Private: Create a debounced version of a function
     * @param {Function} func - Function to debounce
     * @param {number} wait - Wait time in milliseconds
     * @returns {Function} Debounced function
     */
    _debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
}