/**
 * Filter Component
 * Renders the filter section with interactive buttons
 */

import { eventBus } from '../core/EventBus.js';
import { EVENT_TYPES, CSS_CLASSES } from '../core/Constants.js';

export class FilterComponent {
    constructor(filterRepository) {
        this._filterRepository = filterRepository;
        this._element = null;
        this._resultsCountElement = null;
    }

    /**
     * Render filter component
     * @returns {string} HTML string for filter section
     */
    render() {
        const filterOptions = this._filterRepository.getAll();
        
        const filterButtons = filterOptions
            .map(filter => this._renderFilterButton(filter))
            .join('');

        return `
            <div class="filter-section px-4 py-3">
                <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">
                    Filter
                </h3>
                <div class="${CSS_CLASSES.FILTER.CONTAINER} flex gap-2 flex-wrap">
                    ${filterButtons}
                </div>
                <div class="results-count-container mt-2"></div>
            </div>
        `;
    }

    /**
     * Mount component to DOM element
     * @param {HTMLElement} container - Container element
     */
    mount(container) {
        if (!container) {
            throw new Error('Container element is required');
        }

        container.innerHTML = this.render();
        this._element = container.firstElementChild;
        this._resultsCountElement = this._element.querySelector('.results-count-container');
        this._bindEvents();
    }

    /**
     * Unmount component from DOM
     */
    unmount() {
        if (this._element && this._element.parentNode) {
            this._element.parentNode.removeChild(this._element);
        }
        this._element = null;
        this._resultsCountElement = null;
    }

    /**
     * Update filter button states
     * @param {string[]} activeFilters - Array of active filter IDs
     */
    updateFilterStates(activeFilters) {
        if (!this._element) return;

        const filterButtons = this._element.querySelectorAll(`.${CSS_CLASSES.FILTER.BUTTON}`);
        
        filterButtons.forEach(button => {
            const filterId = button.dataset.filter;
            const isActive = activeFilters.includes(filterId);
            
            button.classList.toggle(CSS_CLASSES.FILTER.ACTIVE, isActive);
        });
    }

    /**
     * Update results count display
     * @param {number} count - Number of results
     * @param {string[]} activeFilters - Active filters
     */
    updateResultsCount(count, activeFilters) {
        if (!this._resultsCountElement) return;

        let countText = '';
        
        if (count === 0) {
            countText = '<p class="text-red-400 text-sm">Nessun risultato trovato</p>';
        } else if (activeFilters.includes('all')) {
            countText = ''; // Don't show count for "all" filter
        } else {
            const itemText = count === 1 ? 'pizza trovata' : 'pizze trovate';
            countText = `<p class="text-[#cbc190] text-sm">${count} ${itemText}</p>`;
        }

        this._resultsCountElement.innerHTML = countText;
    }

    /**
     * Refresh component with latest data
     */
    refresh() {
        if (this._element && this._element.parentNode) {
            const container = this._element.parentNode;
            this.unmount();
            this.mount(container);
        }
    }

    /**
     * Get DOM element
     * @returns {HTMLElement|null} Filter element
     */
    getElement() {
        return this._element;
    }

    /**
     * Private: Render individual filter button
     * @param {Object} filter - Filter option data
     * @returns {string} HTML for filter button
     */
    _renderFilterButton(filter) {
        const activeClass = filter.active ? CSS_CLASSES.FILTER.ACTIVE : '';
        
        return `
            <button class="${CSS_CLASSES.FILTER.BUTTON} ${activeClass}" 
                    data-filter="${filter.id}"
                    title="${filter.description}"
                    aria-pressed="${filter.active}">
                <span class="filter-icon">${filter.icon}</span>
                <span class="filter-label text-sm font-medium leading-normal">${filter.label}</span>
            </button>
        `;
    }

    /**
     * Private: Bind event listeners
     */
    _bindEvents() {
        if (!this._element) return;

        // Handle filter button clicks
        this._element.addEventListener('click', (e) => {
            const filterButton = e.target.closest(`.${CSS_CLASSES.FILTER.BUTTON}`);
            
            if (filterButton) {
                e.preventDefault();
                
                const filterId = filterButton.dataset.filter;
                
                // Update visual state immediately for better UX
                this._toggleButtonState(filterButton);
                
                // Publish filter change event
                eventBus.publish(EVENT_TYPES.FILTER_CHANGED, {
                    filterId: filterId,
                    source: 'filter_component'
                });
            }
        });

        // Handle keyboard navigation
        this._element.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                const filterButton = e.target.closest(`.${CSS_CLASSES.FILTER.BUTTON}`);
                if (filterButton) {
                    e.preventDefault();
                    filterButton.click();
                }
            }
        });
    }

    /**
     * Private: Toggle button visual state
     * @param {HTMLElement} button - Button element
     */
    _toggleButtonState(button) {
        const isActive = button.classList.contains(CSS_CLASSES.FILTER.ACTIVE);
        const filterId = button.dataset.filter;
        
        // Handle "all" filter logic
        if (filterId === 'all') {
            // Deactivate all other buttons
            const allButtons = this._element.querySelectorAll(`.${CSS_CLASSES.FILTER.BUTTON}`);
            allButtons.forEach(btn => {
                btn.classList.remove(CSS_CLASSES.FILTER.ACTIVE);
                btn.setAttribute('aria-pressed', 'false');
            });
            
            // Activate "all" button
            button.classList.add(CSS_CLASSES.FILTER.ACTIVE);
            button.setAttribute('aria-pressed', 'true');
        } else {
            // Deactivate "all" button if activating specific filter
            const allButton = this._element.querySelector(`[data-filter="all"]`);
            if (allButton && !isActive) {
                allButton.classList.remove(CSS_CLASSES.FILTER.ACTIVE);
                allButton.setAttribute('aria-pressed', 'false');
            }
            
            // Toggle current button
            button.classList.toggle(CSS_CLASSES.FILTER.ACTIVE);
            button.setAttribute('aria-pressed', (!isActive).toString());
        }
    }
}