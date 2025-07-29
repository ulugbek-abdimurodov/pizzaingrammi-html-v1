/**
 * Pizza Item Component
 * Renders individual pizza items
 */

import { eventBus } from '../core/EventBus.js';
import { EVENT_TYPES, CSS_CLASSES } from '../core/Constants.js';

export class PizzaItemComponent {
    constructor(pizzaRepository) {
        this._pizzaRepository = pizzaRepository;
        this._element = null;
        this._currentPizzas = [];
    }

    /**
     * Render pizza items
     * @param {Object[]} pizzas - Array of pizza objects
     * @returns {string} HTML string for pizza items
     */
    render(pizzas = []) {
        this._currentPizzas = pizzas;
        
        if (pizzas.length === 0) {
            return this._renderEmptyState();
        }

        const pizzaItems = pizzas
            .map(pizza => this._renderPizzaItem(pizza))
            .join('');

        return `
            <div class="pizza-items-container">
                ${pizzaItems}
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

        container.innerHTML = this.render(this._currentPizzas);
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
        this._currentPizzas = [];
    }

    /**
     * Update with new pizza data
     * @param {Object[]} pizzas - New pizza data
     */
    updatePizzas(pizzas) {
        this._currentPizzas = pizzas;
        
        if (this._element && this._element.parentNode) {
            const container = this._element.parentNode;
            this._animateOut(() => {
                this.unmount();
                this.mount(container);
                this._animateIn();
            });
        }
    }

    /**
     * Get DOM element
     * @returns {HTMLElement|null} Pizza items element
     */
    getElement() {
        return this._element;
    }

    /**
     * Get current pizzas
     * @returns {Object[]} Current pizza data
     */
    getCurrentPizzas() {
        return [...this._currentPizzas];
    }

    /**
     * Private: Render individual pizza item
     * @param {Object} pizza - Pizza data
     * @returns {string} HTML for pizza item
     */
    _renderPizzaItem(pizza) {
        const badges = this._renderBadges(pizza.category);
        const tags = this._renderTags(pizza.tags);

        return `
            <div class="p-4 ${CSS_CLASSES.PIZZA.ITEM} ${CSS_CLASSES.PIZZA.FADE_IN}" 
                 data-category="${pizza.category.join(' ')}" 
                 data-name="${pizza.name.toLowerCase()}" 
                 data-id="${pizza.id}">
                <div class="flex items-stretch justify-between gap-4 rounded-xl ${CSS_CLASSES.PIZZA.CONTENT}">
                    <div class="flex flex-[2_2_0px] flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <div class="flex gap-2 items-center flex-wrap">
                                ${tags}
                                ${badges}
                            </div>
                            <p class="text-white text-base font-bold leading-tight pizza-name">
                                ${pizza.name}
                            </p>
                            <p class="text-[#cbc190] text-sm font-normal leading-normal pizza-description">
                                ${pizza.description}
                            </p>
                        </div>
                        <div class="text-white text-lg font-bold pizza-price">
                            ${pizza.price}
                        </div>
                    </div>
                    <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1 ${CSS_CLASSES.PIZZA.IMAGE}" 
                         style='background-image: url("${pizza.image}");'
                         loading="lazy"></div>
                </div>
            </div>
        `;
    }

    /**
     * Private: Render category badges
     * @param {string[]} categories - Pizza categories
     * @returns {string} HTML for badges
     */
    _renderBadges(categories) {
        return categories
            .map(category => {
                const badgeClass = this._getBadgeClass(category);
                const displayName = this._getCategoryDisplayName(category);
                return `<span class="badge ${badgeClass}">${displayName}</span>`;
            })
            .join('');
    }

    /**
     * Private: Render tags
     * @param {string[]} tags - Pizza tags
     * @returns {string} HTML for tags
     */
    _renderTags(tags) {
        if (!tags || tags.length === 0) return '';
        
        // Show only the first tag to avoid clutter
        const primaryTag = tags[0];
        const displayName = this._getTagDisplayName(primaryTag);
        
        return `<p class="text-[#cbc190] text-sm font-normal leading-normal">${displayName}</p>`;
    }

    /**
     * Private: Render empty state
     * @returns {string} HTML for empty state
     */
    _renderEmptyState() {
        return `
            <div class="pizza-items-container">
                <div class="p-8 text-center">
                    <div class="text-[#cbc190] text-6xl mb-4">🍕</div>
                    <h3 class="text-white text-xl font-bold mb-2">Nessuna pizza trovata</h3>
                    <p class="text-[#cbc190]">Prova a modificare i filtri o la ricerca</p>
                </div>
            </div>
        `;
    }

    /**
     * Private: Get badge CSS class for category
     * @param {string} category - Pizza category
     * @returns {string} CSS class
     */
    _getBadgeClass(category) {
        return CSS_CLASSES.BADGE[category.toUpperCase()] || CSS_CLASSES.BADGE.CLASSICA;
    }

    /**
     * Private: Get display name for category
     * @param {string} category - Category key
     * @returns {string} Display name
     */
    _getCategoryDisplayName(category) {
        const displayNames = {
            'classica': 'Classica',
            'Pizze-d\'autore': 'D\'autore',
            'Vegana': 'Vegana',
            'senza-glutine': 'Senza Glutine'
        };
        return displayNames[category] || category;
    }

    /**
     * Private: Get display name for tag
     * @param {string} tag - Tag key
     * @returns {string} Display name
     */
    _getTagDisplayName(tag) {
        const displayNames = {
            'popular': 'Popolare',
            'traditional': 'Tradizionale',
            'hot': 'Piccante',
            'healthy': 'Leggera',
            'gourmet': 'Gourmet',
            'cheese': 'Formaggio',
            'premium': 'Premium',
            'bestseller': 'Bestseller',
            'hearty': 'Sostanziosa',
            'protein': 'Proteica'
        };
        return displayNames[tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
    }

    /**
     * Private: Bind event listeners
     */
    _bindEvents() {
        if (!this._element) return;

        // Handle pizza item clicks
        this._element.addEventListener('click', (e) => {
            const pizzaItem = e.target.closest(`.${CSS_CLASSES.PIZZA.ITEM}`);
            
            if (pizzaItem) {
                const pizzaId = parseInt(pizzaItem.dataset.id);
                const pizza = this._pizzaRepository.getById(pizzaId);
                
                if (pizza) {
                    // Add visual feedback
                    this._addClickFeedback(pizzaItem);
                    
                    // Publish pizza selection event
                    eventBus.publish(EVENT_TYPES.PIZZA_SELECTED, {
                        pizza: pizza,
                        source: 'pizza_item_component'
                    });
                }
            }
        });

        // Handle hover effects
        this._element.addEventListener('mouseenter', (e) => {
            const pizzaItem = e.target.closest(`.${CSS_CLASSES.PIZZA.ITEM}`);
            if (pizzaItem) {
                pizzaItem.style.transform = 'translateY(-2px)';
                pizzaItem.style.transition = 'transform 0.2s ease';
            }
        }, true);

        this._element.addEventListener('mouseleave', (e) => {
            const pizzaItem = e.target.closest(`.${CSS_CLASSES.PIZZA.ITEM}`);
            if (pizzaItem) {
                pizzaItem.style.transform = 'translateY(0)';
            }
        }, true);
    }

    /**
     * Private: Add visual click feedback
     * @param {HTMLElement} element - Element to animate
     */
    _addClickFeedback(element) {
        element.style.transform = 'scale(0.98)';
        element.style.transition = 'transform 0.1s ease';
        
        setTimeout(() => {
            element.style.transform = 'scale(1)';
        }, 100);
    }

    /**
     * Private: Animate items out
     * @param {Function} callback - Callback after animation
     */
    _animateOut(callback) {
        if (!this._element) {
            callback();
            return;
        }

        const items = this._element.querySelectorAll(`.${CSS_CLASSES.PIZZA.ITEM}`);
        
        items.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add(CSS_CLASSES.PIZZA.HIDDEN);
            }, index * 50);
        });

        setTimeout(callback, items.length * 50 + 300);
    }

    /**
     * Private: Animate items in
     */
    _animateIn() {
        if (!this._element) return;

        const items = this._element.querySelectorAll(`.${CSS_CLASSES.PIZZA.ITEM}`);
        
        items.forEach((item, index) => {
            item.style.opacity = '0';
            item.style.transform = 'translateY(20px)';
            
            setTimeout(() => {
                item.style.transition = 'all 0.5s ease';
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            }, index * 100 + 50);
        });
    }
}