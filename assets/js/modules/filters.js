// Filter Management Module
let Components = null;

// Function to set Components reference
const setComponents = (componentsModule) => {
    Components = componentsModule;
};

const FilterManager = {
    activeFilters: ['all'],

    init() {
        this.bindFilterEvents();
        this.bindCategoryEvents();
    },

    bindFilterEvents() {
        document.addEventListener('click', async (e) => {
            if (e.target.closest('.filter-btn')) {
                e.preventDefault();
                const button = e.target.closest('.filter-btn');
                const filter = button.dataset.filter;
                await this.toggleFilter(filter);
            }
        });
    },

    bindCategoryEvents() {
        document.addEventListener('click', async (e) => {
            if (e.target.closest('[data-category]')) {
                const categoryLink = e.target.closest('[data-category]');
                if (categoryLink.getAttribute('href') === '#') {
                    e.preventDefault();
                    const category = categoryLink.dataset.category;
                    await this.switchMenuCategory(category);
                }
            }
        });
    },

    async toggleFilter(filterId) {
        console.log('🔄 Toggling filter:', filterId);
        console.log('📊 Current active filters:', this.activeFilters);
        
        if (filterId === 'all') {
            this.activeFilters = ['all'];
        } else {
            // Remove 'all' if selecting specific filter
            this.activeFilters = this.activeFilters.filter(f => f !== 'all');
            
            // Toggle the specific filter
            if (this.activeFilters.includes(filterId)) {
                this.activeFilters = this.activeFilters.filter(f => f !== filterId);
            } else {
                this.activeFilters.push(filterId);
            }
            
            // If no filters selected, default to 'all'
            if (this.activeFilters.length === 0) {
                this.activeFilters = ['all'];
            }
        }
        
        console.log('📊 New active filters:', this.activeFilters);

        this.updateFilterUI();
        await this.applyFilters();
    },

    updateFilterUI() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        filterButtons.forEach(button => {
            const filter = button.dataset.filter;
            if (this.activeFilters.includes(filter)) {
                button.classList.add('active');
            } else {
                button.classList.remove('active');
            }
        });
    },

    async switchMenuCategory(categoryId) {
        // Update category UI
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

        // Switch database and re-render components
        if (dbManager.setCategory(categoryId)) {
            await this.reloadCategoryContent();
        } else {
            this.showEmptyState(categoryId);
        }
    },

    async reloadCategoryContent() {
        // Re-render filter section with new database
        const filterElement = document.getElementById('filter-section');
        if (filterElement) {
            filterElement.innerHTML = Components.createFilterSection();
        }

        // Reset filters and apply
        this.activeFilters = ['all'];
        this.updateFilterUI();
        await this.applyFilters();
    },

    showEmptyState(categoryId) {
        const container = document.getElementById('menu-items');
        if (!container) return;

        const categoryName = categoryId.charAt(0).toUpperCase() + categoryId.slice(1);
        container.innerHTML = `
            <div class="p-8 text-center">
                <div class="text-[#cbc190] text-6xl mb-4">🔜</div>
                <h3 class="text-white text-xl font-bold mb-2">${categoryName} Coming Soon</h3>
                <p class="text-[#cbc190]">We're working on bringing you amazing ${categoryName.toLowerCase()}. Stay tuned!</p>
            </div>
        `;
    },

    async applyFilters() {
        try {
            console.log('🔍 Applying filters:', this.activeFilters);
            const filteredItems = await dbManager.getFilteredItems(this.activeFilters);
            console.log('📊 Filtered items result:', filteredItems);
            this.animateFilterChange(filteredItems);
            this.updateResultsCount(filteredItems.length);
        } catch (error) {
            console.error('Error applying filters:', error);
        }
    },

    animateFilterChange(filteredItems) {
        const existingItems = document.querySelectorAll('.pizza-item');
        
        // Hide existing items
        existingItems.forEach(item => {
            item.classList.add('hidden');
        });

        // Wait for hide animation, then show new items
        setTimeout(() => {
            Components.renderMenuItems(filteredItems);
            
            // Trigger fade-in animation
            setTimeout(() => {
                const newItems = document.querySelectorAll('.pizza-item');
                newItems.forEach((item, index) => {
                    setTimeout(() => {
                        item.style.opacity = '0';
                        item.style.transform = 'translateY(20px)';
                        
                        setTimeout(() => {
                            item.style.transition = 'all 0.5s ease';
                            item.style.opacity = '1';
                            item.style.transform = 'translateY(0)';
                        }, 50);
                    }, index * 100);
                });
            }, 50);
        }, 300);
    },

    updateResultsCount(count) {
        // Update filter section with results count if needed
        const filterSection = document.getElementById('filter-section');
        if (!filterSection) return;

        const filterContainer = filterSection.querySelector('.filter-container');
        if (!filterContainer) return;

        let countElement = filterSection.querySelector('.results-count');
        if (!countElement) {
            countElement = document.createElement('p');
            countElement.className = 'results-count text-[#cbc190] text-sm mt-2';
            filterContainer.parentNode.appendChild(countElement);
        }

        if (count === 0) {
            countElement.textContent = 'No items found';
            countElement.className = 'results-count text-red-400 text-sm mt-2';
        } else if (this.activeFilters.includes('all')) {
            countElement.textContent = '';
        } else {
            countElement.textContent = `${count} item${count !== 1 ? 's' : ''} found`;
            countElement.className = 'results-count text-[#cbc190] text-sm mt-2';
        }
    },

    async reset() {
        this.activeFilters = ['all'];
        this.updateFilterUI();
        await this.applyFilters();
    }
};

// Export for ES6 modules
export { FilterManager, setComponents };
export default FilterManager;