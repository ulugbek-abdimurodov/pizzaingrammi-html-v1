/**
 * Featured Component
 * Renders the featured items section
 */

import { eventBus } from '../core/EventBus.js';
import { EVENT_TYPES } from '../core/Constants.js';

export class FeaturedComponent {
    constructor(featuredRepository) {
        this._featuredRepository = featuredRepository;
        this._element = null;
    }

    /**
     * Render featured component
     * @returns {string} HTML string for featured section
     */
    render() {
        const featuredItems = this._featuredRepository.getActive();
        
        if (featuredItems.length === 0) {
            return this._renderEmptyState();
        }

        const featuredHTML = featuredItems
            .sort((a, b) => a.priority - b.priority)
            .map(item => this._renderFeaturedItem(item))
            .join('');

        return `
            <div class="featured-section">
                <h2 class="section-title">Hot</h2>
                <div class="flex overflow-y-auto scroll-container">
                    <div class="flex items-stretch p-4 gap-3">
                        ${featuredHTML}
                    </div>
                </div>
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
     * @returns {HTMLElement|null} Featured element
     */
    getElement() {
        return this._element;
    }

    /**
     * Private: Render individual featured item
     * @param {Object} item - Featured item data
     * @returns {string} HTML for featured item
     */
    _renderFeaturedItem(item) {
        return `
            <div class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60 featured-item" 
                 data-featured-id="${item.id}">
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col" 
                     style='background-image: url("${item.image}");'></div>
                <div>
                    <p class="text-white text-base font-medium leading-normal">${item.title}</p>
                    <p class="text-[#cbc190] text-sm font-normal leading-normal">${item.description}</p>
                    ${this._renderItemType(item.type)}
                </div>
            </div>
        `;
    }

    /**
     * Private: Render item type badge
     * @param {string} type - Item type
     * @returns {string} HTML for type badge
     */
    _renderItemType(type) {
        const typeLabels = {
            'daily_special': '🌟 Speciale del Giorno',
            'promotion': '🎉 Offerta',
            'new_item': '✨ Novità'
        };

        const label = typeLabels[type] || '';
        
        if (!label) return '';

        return `
            <span class="inline-block mt-2 text-xs px-2 py-1 bg-[#eec80b] text-[#232010] rounded-full font-medium">
                ${label}
            </span>
        `;
    }

    /**
     * Private: Render empty state
     * @returns {string} HTML for empty state
     */
    _renderEmptyState() {
        return `
            <div class="featured-section">
                <h2 class="section-title">Hot</h2>
                <div class="p-8 text-center">
                    <div class="text-[#cbc190] text-4xl mb-4">🍕</div>
                    <p class="text-[#cbc190] text-sm">Nessun elemento in evidenza al momento</p>
                </div>
            </div>
        `;
    }

    /**
     * Private: Bind event listeners
     */
    _bindEvents() {
        if (!this._element) return;

        // Handle featured item clicks
        this._element.addEventListener('click', (e) => {
            const featuredItem = e.target.closest('.featured-item');
            if (featuredItem) {
                const featuredId = featuredItem.dataset.featuredId;
                const item = this._featuredRepository.getById(featuredId);
                
                if (item) {
                    eventBus.publish(EVENT_TYPES.PIZZA_SELECTED, {
                        source: 'featured',
                        item: item
                    });
                }
            }
        });
    }
}