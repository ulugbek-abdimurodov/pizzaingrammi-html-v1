// Main Application Module
class PizzaApp {
    constructor() {
        this.isInitialized = false;
        this.init();
    }

    init() {
        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.initialize());
        } else {
            this.initialize();
        }
    }

    initialize() {
        if (this.isInitialized) return;
        
        try {
            this.renderComponents();
            this.initializeModules();
            this.bindGlobalEvents();
            this.isInitialized = true;
            
            console.log('Pizzaingrammi menu app initialized successfully!');
        } catch (error) {
            console.error('Error initializing app:', error);
        }
    }

    renderComponents() {
        // Render header
        const headerElement = document.getElementById('header');
        if (headerElement) {
            headerElement.innerHTML = Components.createHeader();
        }

        // Render featured section
        const featuredElement = document.getElementById('featured-section');
        if (featuredElement) {
            featuredElement.innerHTML = Components.createFeatured();
        }

        // Render menu navigation
        const menuNavElement = document.getElementById('menu-navigation');
        if (menuNavElement) {
            menuNavElement.innerHTML = Components.createMenuNavigation();
        }

        // Render filter section
        const filterElement = document.getElementById('filter-section');
        if (filterElement) {
            filterElement.innerHTML = Components.createFilterSection();
        }

        // Render initial menu items
        Components.renderMenuItems();
    }

    initializeModules() {
        // Initialize filter manager
        FilterManager.init();
    }

    bindGlobalEvents() {
        // Handle scroll events for header effects
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            this.handleScroll(lastScrollTop);
            lastScrollTop = window.pageYOffset;
        }, { passive: true });

        // Handle window resize for responsive adjustments
        window.addEventListener('resize', () => {
            this.handleResize();
        });

        // Handle keyboard shortcuts
        document.addEventListener('keydown', (e) => {
            this.handleKeyboardShortcuts(e);
        });
    }

    handleScroll(lastScrollTop) {
        const currentScrollTop = window.pageYOffset;
        const header = document.getElementById('header');
        
        if (!header) return;

        // Add/remove header shadow based on scroll position
        if (currentScrollTop > 10) {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        } else {
            header.style.boxShadow = 'none';
        }
    }

    handleResize() {
        // Adjust layout for different screen sizes
        const filterContainer = document.querySelector('.filter-container');
        if (!filterContainer) return;

        if (window.innerWidth < 640) {
            // Mobile adjustments
            filterContainer.classList.add('justify-center');
        } else {
            // Desktop adjustments
            filterContainer.classList.remove('justify-center');
        }
    }

    handleKeyboardShortcuts(e) {
        // Reset filters (Ctrl/Cmd + R)
        if ((e.ctrlKey || e.metaKey) && e.key === 'r' && !e.shiftKey) {
            e.preventDefault();
            FilterManager.reset();
            this.showNotification('Filters reset!', 'info');
        }
    }

    showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.app-notification');
        existingNotifications.forEach(notification => notification.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `app-notification fixed top-4 right-4 px-4 py-2 rounded-lg shadow-lg z-50 transition-all duration-300 transform translate-x-full`;
        
        // Set colors based on type
        switch(type) {
            case 'success':
                notification.classList.add('bg-green-600', 'text-white');
                break;
            case 'error':
                notification.classList.add('bg-red-600', 'text-white');
                break;
            case 'warning':
                notification.classList.add('bg-yellow-600', 'text-white');
                break;
            default:
                notification.classList.add('bg-blue-600', 'text-white');
        }

        notification.textContent = message;
        document.body.appendChild(notification);

        // Animate in
        requestAnimationFrame(() => {
            notification.classList.remove('translate-x-full');
            notification.classList.add('translate-x-0');
        });

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

    // Public API methods
    filterByCategory(category) {
        FilterManager.toggleFilter(category);
    }
}

// Initialize the app
const app = new PizzaApp();

// Make app globally available for debugging
window.PizzaApp = app;