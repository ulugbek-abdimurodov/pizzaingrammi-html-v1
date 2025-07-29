/**
 * Main Application
 * Orchestrates the entire application using clean architecture
 */

import { serviceLocator } from './core/ServiceLocator.js';
import { eventBus } from './core/EventBus.js';
import { EVENT_TYPES, DOM_SELECTORS } from './core/Constants.js';

// Data Repositories
import { PizzaRepository } from './data/PizzaRepository.js';
import { FilterRepository } from './data/FilterRepository.js';
import { MenuRepository } from './data/MenuRepository.js';
import { FeaturedRepository } from './data/FeaturedRepository.js';
import { BeverageRepository } from './data/BeverageRepository.js';
import { FrittatinRepository } from './data/FrittatinRepository.js';
import { DessertRepository } from './data/DessertRepository.js';

// Services
import { FilterService } from './services/FilterService.js';
import { SearchService } from './services/SearchService.js';

// Components
import { HeaderComponent } from './components/HeaderComponent.js';
import { FeaturedComponent } from './components/FeaturedComponent.js';
import { FilterComponent } from './components/FilterComponent.js';
import { PizzaItemComponent } from './components/PizzaItemComponent.js';

// Managers
import { FilterManager } from './managers/FilterManager.js';

class PizzaApp {
    constructor() {
        this.isInitialized = false;
        this.components = {};
        this.managers = {};
    }

    /**
     * Initialize the application
     */
    async init() {
        if (this.isInitialized) {
            console.warn('Application already initialized');
            return;
        }

        try {
            await this._registerServices();
            await this._initializeComponents();
            await this._initializeManagers();
            this._bindGlobalEvents();
            this._renderApplication();
            
            this.isInitialized = true;
            
            // Publish initialization complete event
            eventBus.publish(EVENT_TYPES.DATA_LOADED, {
                timestamp: Date.now(),
                message: 'Application initialized successfully'
            });
            
            console.log('🍕 Pizzaingrammi application initialized successfully!');
            
        } catch (error) {
            console.error('Failed to initialize application:', error);
            this._handleInitializationError(error);
        }
    }

    /**
     * Get application status
     * @returns {Object} Application status information
     */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            componentsLoaded: Object.keys(this.components).length,
            managersLoaded: Object.keys(this.managers).length,
            servicesRegistered: serviceLocator.getRegisteredServices().length
        };
    }

    /**
     * Destroy the application
     */
    destroy() {
        // Clean up managers
        Object.values(this.managers).forEach(manager => {
            if (manager.destroy) {
                manager.destroy();
            }
        });

        // Clean up components
        Object.values(this.components).forEach(component => {
            if (component.unmount) {
                component.unmount();
            }
        });

        // Clear event listeners
        eventBus.clearAllListeners();

        // Clear service locator
        serviceLocator.clear();

        this.isInitialized = false;
        this.components = {};
        this.managers = {};
    }

    /**
     * Private: Register all services with service locator
     */
    async _registerServices() {
        // Register repositories
        serviceLocator.register('pizzaRepository', PizzaRepository);
        serviceLocator.register('filterRepository', FilterRepository);
        serviceLocator.register('menuRepository', MenuRepository);
        serviceLocator.register('featuredRepository', FeaturedRepository);
        serviceLocator.register('beverageRepository', BeverageRepository);
        serviceLocator.register('frittatinRepository', FrittatinRepository);
        serviceLocator.register('dessertRepository', DessertRepository);

        // Register services with dependencies
        const pizzaRepo = serviceLocator.get('pizzaRepository');
        const filterRepo = serviceLocator.get('filterRepository');
        
        serviceLocator.register('filterService', new FilterService(pizzaRepo, filterRepo));
        serviceLocator.register('searchService', new SearchService(pizzaRepo));
    }

    /**
     * Private: Initialize UI components
     */
    async _initializeComponents() {
        const pizzaRepo = serviceLocator.get('pizzaRepository');
        const featuredRepo = serviceLocator.get('featuredRepository');
        const filterRepo = serviceLocator.get('filterRepository');

        // Initialize components
        this.components.header = new HeaderComponent();
        this.components.featured = new FeaturedComponent(featuredRepo);
        this.components.filter = new FilterComponent(filterRepo);
        this.components.pizzaItem = new PizzaItemComponent(pizzaRepo);
    }

    /**
     * Private: Initialize managers
     */
    async _initializeManagers() {
        const filterService = serviceLocator.get('filterService');
        
        // Initialize filter manager with component dependencies
        this.managers.filterManager = new FilterManager(
            filterService,
            this.components.pizzaItem,
            this.components.filter
        );

        // Initialize managers
        this.managers.filterManager.init();
    }

    /**
     * Private: Render the application UI
     */
    _renderApplication() {
        // Mount header
        const headerElement = document.querySelector(DOM_SELECTORS.HEADER);
        if (headerElement) {
            this.components.header.mount(headerElement);
        }

        // Mount featured section
        const featuredElement = document.querySelector(DOM_SELECTORS.FEATURED_SECTION);
        if (featuredElement) {
            this.components.featured.mount(featuredElement);
        }

        // Mount filter section
        const filterElement = document.querySelector(DOM_SELECTORS.FILTER_SECTION);
        if (filterElement) {
            this.components.filter.mount(filterElement);
        }

        // Mount pizza items with initial data
        const menuItemsElement = document.querySelector(DOM_SELECTORS.MENU_ITEMS);
        if (menuItemsElement) {
            const pizzaRepo = serviceLocator.get('pizzaRepository');
            const initialPizzas = pizzaRepo.getAll();
            this.components.pizzaItem.updatePizzas(initialPizzas);
            this.components.pizzaItem.mount(menuItemsElement);
        }

        // Render menu navigation (simplified for now)
        this._renderMenuNavigation();
    }

    /**
     * Private: Render menu navigation
     */
    _renderMenuNavigation() {
        const menuNavElement = document.querySelector(DOM_SELECTORS.MENU_NAVIGATION);
        if (!menuNavElement) return;

        const menuRepo = serviceLocator.get('menuRepository');
        const menuCategories = menuRepo.getAll();
        
        const navItems = menuCategories.map(category => {
            const activeClass = category.active 
                ? 'border-b-[3px] border-b-[#eec80b] text-white' 
                : 'border-b-[3px] border-b-transparent text-[#cbc190]';
            
            return `
                <a class="flex flex-col items-center justify-center ${activeClass} gap-2 pb-[7px] pt-2.5" 
                   href="#" data-category="${category.id}">
                    <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10"
                         style='background-image: url("${category.icon}");'></div>
                    <p class="text-sm font-bold leading-normal tracking-[0.015em]">${category.label}</p>
                </a>
            `;
        }).join('');

        menuNavElement.innerHTML = `
            <h2 class="section-title">Menu</h2>
            <div class="pb-3">
                <div class="flex border-b border-[#685f31] px-4 gap-8">
                    ${navItems}
                </div>
            </div>
        `;

        // Bind menu navigation events
        this._bindMenuNavigationEvents(menuNavElement);
    }

    /**
     * Private: Bind menu navigation events
     * @param {HTMLElement} menuElement - Menu navigation element
     */
    _bindMenuNavigationEvents(menuElement) {
        menuElement.addEventListener('click', (e) => {
            const categoryLink = e.target.closest('[data-category]');
            if (categoryLink && categoryLink.getAttribute('href') === '#') {
                e.preventDefault();
                
                const categoryId = categoryLink.dataset.category;
                
                // Update menu repository
                const menuRepo = serviceLocator.get('menuRepository');
                menuRepo.setActive(categoryId);
                
                // Publish category change event
                eventBus.publish(EVENT_TYPES.CATEGORY_CHANGED, {
                    categoryId: categoryId,
                    source: 'menu_navigation'
                });
                
                // Re-render navigation to update active states
                this._renderMenuNavigation();
            }
        });
    }

    /**
     * Private: Bind global events
     */
    _bindGlobalEvents() {
        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this._handleKeyboardShortcuts(e);
        });

        // Handle window resize
        window.addEventListener('resize', () => {
            this._handleResize();
        });

        // Handle scroll events
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            this._handleScroll(lastScrollTop);
            lastScrollTop = window.pageYOffset;
        }, { passive: true });

        // Listen for application events
        eventBus.subscribe(EVENT_TYPES.ERROR_OCCURRED, (data) => {
            this._handleApplicationError(data);
        });

        eventBus.subscribe(EVENT_TYPES.PIZZA_SELECTED, (data) => {
            this._handlePizzaSelection(data);
        });
    }

    /**
     * Private: Handle keyboard shortcuts
     * @param {KeyboardEvent} e - Keyboard event
     */
    _handleKeyboardShortcuts(e) {
        // Reset filters (Ctrl/Cmd + R)
        if ((e.ctrlKey || e.metaKey) && e.key === 'r' && !e.shiftKey) {
            e.preventDefault();
            if (this.managers.filterManager) {
                this.managers.filterManager.reset();
                this._showNotification('Filtri reimpostati!', 'info');
            }
        }

        // Focus search (Ctrl/Cmd + F)
        if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
            // Could implement search focus here
            // For now, just prevent default browser search
            e.preventDefault();
        }
    }

    /**
     * Private: Handle window resize
     */
    _handleResize() {
        // Update responsive layouts
        const filterContainer = document.querySelector('.filter-container');
        if (filterContainer) {
            if (window.innerWidth < 640) {
                filterContainer.classList.add('justify-center');
            } else {
                filterContainer.classList.remove('justify-center');
            }
        }
    }

    /**
     * Private: Handle scroll events
     * @param {number} lastScrollTop - Previous scroll position
     */
    _handleScroll(lastScrollTop) {
        const currentScrollTop = window.pageYOffset;
        const header = this.components.header?.getElement();
        
        if (header) {
            // Add/remove header shadow based on scroll position
            if (currentScrollTop > 10) {
                header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
            } else {
                header.style.boxShadow = 'none';
            }
        }
    }

    /**
     * Private: Handle pizza selection
     * @param {Object} data - Pizza selection data
     */
    _handlePizzaSelection(data) {
        console.log('Pizza selected:', data.pizza?.name);
        
        // Could implement pizza selection logic here
        // For example: show pizza details, add to cart, etc.
    }

    /**
     * Private: Handle application errors
     * @param {Object} errorData - Error data
     */
    _handleApplicationError(errorData) {
        console.error('Application error:', errorData);
        this._showNotification(errorData.message || 'Si è verificato un errore', 'error');
    }

    /**
     * Private: Handle initialization error
     * @param {Error} error - Initialization error
     */
    _handleInitializationError(error) {
        const errorMessage = 'Errore durante l\'inizializzazione dell\'applicazione';
        
        // Show error in UI
        document.body.innerHTML = `
            <div class="flex items-center justify-center min-h-screen bg-[#232010]">
                <div class="text-center p-8">
                    <div class="text-6xl mb-4">😕</div>
                    <h1 class="text-white text-2xl font-bold mb-4">${errorMessage}</h1>
                    <p class="text-[#cbc190] mb-4">Ricarica la pagina per riprovare</p>
                    <button onclick="window.location.reload()" 
                            class="bg-[#eec80b] text-[#232010] px-6 py-2 rounded-lg font-bold hover:bg-[#d4b509]">
                        Ricarica
                    </button>
                </div>
            </div>
        `;
    }

    /**
     * Private: Show notification to user
     * @param {string} message - Notification message
     * @param {string} type - Notification type (info, success, error, warning)
     */
    _showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.app-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `app-notification fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
        
        // Set colors based on type
        const typeClasses = {
            'success': 'bg-green-600 text-white',
            'error': 'bg-red-600 text-white',
            'warning': 'bg-yellow-600 text-white',
            'info': 'bg-blue-600 text-white'
        };
        
        notification.className += ` ${typeClasses[type] || typeClasses.info}`;
        notification.textContent = message;
        
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        }, 10);

        // Auto remove after 3 seconds
        setTimeout(() => {
            notification.classList.remove('translate-x-0');
            notification.classList.add('translate-x-full');
            
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }, 3000);
    }
}

// Initialize application when DOM is ready
function initializeApp() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            const app = new PizzaApp();
            app.init();
            
            // Make app globally available for debugging
            window.PizzaApp = app;
        });
    } else {
        const app = new PizzaApp();
        app.init();
        
        // Make app globally available for debugging
        window.PizzaApp = app;
    }
}

// Auto-initialize
initializeApp();