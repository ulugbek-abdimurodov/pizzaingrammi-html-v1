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
            
            console.log('Pizzaingrammi app initialized successfully!');
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

        // Render search section
        const searchElement = document.getElementById('search-section');
        if (searchElement) {
            searchElement.innerHTML = '';
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

        // Render bottom navigation
        // const bottomNavElement = document.getElementById('bottom-nav');
        // if (bottomNavElement) {
        //     bottomNavElement.innerHTML = Components.createBottomNav();
        // }

        // Render initial menu items
        Components.renderMenuItems();
    }

    initializeModules() {
        // Initialize filter manager
        FilterManager.init();
        
        // Initialize search manager
        SearchManager.init();
    }

    bindGlobalEvents() {
        // Handle price button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('.price-btn')) {
                e.preventDefault();
                const menuItem = e.target.closest('.pizza-item');
                if (menuItem) {
                    this.handleAddToCart(menuItem);
                }
            }
        });

        // Handle cart button clicks
        document.addEventListener('click', (e) => {
            if (e.target.closest('button')) {
                const button = e.target.closest('button');
                const svg = button.querySelector('svg');
                if (svg && svg.querySelector('path[d*="ShoppingCart"]')) {
                    this.handleCartClick();
                }
            }
        });

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

    handleAddToCart(menuItem) {
        const itemId = menuItem.dataset.id;
        const itemName = menuItem.dataset.name;
        
        // Add visual feedback
        this.showAddToCartAnimation(menuItem);
        
        // In a real app, this would add to cart state
        console.log(`Added ${itemName} to cart (ID: ${itemId})`);
        
        // Show temporary success message
        this.showNotification(`${itemName} added to cart!`, 'success');
    }

    showAddToCartAnimation(menuItem) {
        const priceBtn = menuItem.querySelector('.price-btn');
        if (!priceBtn) return;

        // Store original text
        const originalText = priceBtn.innerHTML;
        
        // Change to success state
        priceBtn.innerHTML = '<span class="truncate">Added!</span>';
        priceBtn.style.backgroundColor = '#16a34a';
        priceBtn.style.transform = 'scale(0.95)';
        
        // Reset after animation
        setTimeout(() => {
            priceBtn.style.transition = 'all 0.3s ease';
            priceBtn.innerHTML = originalText;
            priceBtn.style.backgroundColor = '#494222';
            priceBtn.style.transform = 'scale(1)';
        }, 1500);
    }

    handleCartClick() {
        console.log('Cart clicked');
        this.showNotification('Cart functionality coming soon!', 'info');
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

        // Optional: Hide/show header on scroll (uncomment if desired)
        /*
        if (currentScrollTop > lastScrollTop && currentScrollTop > 100) {
            // Scrolling down
            header.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            header.style.transform = 'translateY(0)';
        }
        */
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
        // Search shortcut (Ctrl/Cmd + K)
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
            e.preventDefault();
            const searchInput = document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
                searchInput.select();
            }
        }

        // Clear search (Escape)
        if (e.key === 'Escape') {
            const searchInput = document.getElementById('searchInput');
            if (searchInput && searchInput === document.activeElement) {
                SearchManager.clearSearch();
            }
        }

        // Reset filters (Ctrl/Cmd + R)
        if ((e.ctrlKey || e.metaKey) && e.key === 'r' && !e.shiftKey) {
            e.preventDefault();
            FilterManager.reset();
            SearchManager.clearSearch();
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
    addToCart(itemId) {
        const menuItem = document.querySelector(`[data-id="${itemId}"]`);
        if (menuItem) {
            this.handleAddToCart(menuItem);
        }
    }

    filterByCategory(category) {
        FilterManager.toggleFilter(category);
    }

    searchFor(term) {
        const searchInput = document.getElementById('searchInput');
        if (searchInput) {
            searchInput.value = term;
            SearchManager.performSearch(term);
        }
    }
}

// Initialize the app
const app = new PizzaApp();

// Make app globally available for debugging
window.PizzaApp = app;