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

        // Render footer
        const footerElement = document.getElementById('footer');
        if (footerElement) {
            footerElement.innerHTML = Components.createFooter();
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
        const isMobile = window.innerWidth < 768;
        const appContainer = document.querySelector('.app-container');
        
        if (appContainer) {
            if (isMobile) {
                appContainer.classList.add('mobile-layout');
            } else {
                appContainer.classList.remove('mobile-layout');
            }
        }
    }

    handleKeyboardShortcuts(e) {
        // Reset filters with Ctrl/Cmd + R
        if ((e.ctrlKey || e.metaKey) && e.key === 'r') {
            e.preventDefault();
            FilterManager.reset();
            this.showNotification('Filters reset successfully!', 'success');
        }
    }

    showNotification(message, type = 'info') {
        // Create notification element
        const notification = document.createElement('div');
        notification.className = `fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg transition-all duration-300 transform translate-x-full`;
        
        // Set notification styles based on type
        switch(type) {
            case 'success':
                notification.className += ' bg-green-500 text-white';
                break;
            case 'error':
                notification.className += ' bg-red-500 text-white';
                break;
            case 'warning':
                notification.className += ' bg-yellow-500 text-black';
                break;
            default:
                notification.className += ' bg-blue-500 text-white';
        }
        
        notification.textContent = message;
        
        // Add to DOM
        document.body.appendChild(notification);
        
        // Animate in
        setTimeout(() => {
            notification.classList.remove('translate-x-full');
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            notification.classList.add('translate-x-full');
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 3000);
    }

    // Category switching method
    switchCategory(categoryId) {
        // Update active category in menu navigation
        const categoryLinks = document.querySelectorAll('[data-category]');
        categoryLinks.forEach(link => {
            const category = link.dataset.category;
            if (category === categoryId) {
                link.classList.remove('border-b-transparent', 'text-[#cbc190]');
                link.classList.add('border-b-[#ffa500]', 'text-white');
            } else {
                link.classList.remove('border-b-[#ffa500]', 'text-white');
                link.classList.add('border-b-transparent', 'text-[#cbc190]');
            }
        });

        // Update database and re-render
        if (dbManager.setCategory(categoryId)) {
            // Re-render filter section with new database
            const filterElement = document.getElementById('filter-section');
            if (filterElement) {
                filterElement.innerHTML = Components.createFilterSection();
            }

            // Re-render menu items
            Components.renderMenuItems();
            
            // Reset filters
            FilterManager.reset();
        }
    }

    // Filter by category method
    filterByCategory(category) {
        // This method can be called from external components
        FilterManager.toggleFilter(category);
    }
}

// Initialize the app
const app = new PizzaApp();

// Make app globally available for debugging
window.PizzaApp = app;