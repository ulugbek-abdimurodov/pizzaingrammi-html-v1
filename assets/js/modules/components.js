// Components Module
export const Components = {
    // Header component
    createHeader() {
        return `
            <div class="flex items-center justify-between px-4 py-3">
                <h1 class="text-white text-xl font-bold leading-tight tracking-[-0.015em]">Pizzaingrammi</h1>
            </div>
        `;
    },

    // Footer component
    createFooter() {
        return `
            <footer class="mt-8 py-6 border-t border-[#685f31]">
                <div class="flex items-center justify-center gap-3">
                    <a href="https://www.linkedin.com/in/ulugbek-abdimurodov/" target="_blank" rel="noopener noreferrer" 
                       class="flex items-center gap-1 text-[#cbc190] hover:text-white transition-colors duration-200">
                        <span>Created by Ulugbek Abdimurodov</span>
                        <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                    </a>
                </div>
            </footer>
        `;
    },

    // Featured section component
    async createFeatured() {
        try {
            const featuredItems = await dbManager.getFeaturedItems();
            
            if (!featuredItems || featuredItems.length === 0) {
                return `
                    <h2 class="section-title">Hot 🔥</h2>
                    <div class="flex overflow-y-auto scroll-container">
                        <div class="flex items-stretch p-4 gap-3">
                            <p class="text-[#cbc190] text-center w-full">Loading featured items...</p>
                        </div>
                    </div>
                `;
            }
            
            const featuredHTML = featuredItems.map(item => `
                <div class="flex-shrink-0 w-64">
                    <div class="bg-center bg-no-repeat aspect-video bg-cover rounded-xl mb-3" 
                         style='background-image: url("${item.image}");'></div>
                    <h3 class="text-white text-base font-bold leading-tight mb-1">${item.name || item.title}</h3>
                    <p class="text-[#cbc190] text-sm font-normal leading-normal">${item.description}</p>
                </div>
            `).join('');

            return `
                <h2 class="section-title">Hot 🔥</h2>
                <div class="flex overflow-y-auto scroll-container">
                    <div class="flex items-stretch p-4 gap-3">
                        ${featuredHTML}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error creating featured section:', error);
            return `
                <h2 class="section-title">Hot 🔥</h2>
                <div class="flex overflow-y-auto scroll-container">
                    <div class="flex items-stretch p-4 gap-3">
                        <p class="text-[#cbc190] text-center w-full">Loading featured items...</p>
                    </div>
                </div>
            `;
        }
    },

    // Menu navigation component
    async createMenuNavigation() {
        try {
            const categories = await dbManager.getMenuCategories();
            
            // Create navigation items with proper data structure
            const navItems = categories.map((category, index) => {
                // Map category names to database manager category IDs
                const categoryMap = {
                    'Pizze': 'pizzas',
                    'Bevande': 'beverages', 
                    'Frittatine': 'frittatinas',
                    'Dessert': 'desserts'
                };
                
                const categoryId = categoryMap[category] || `category-${index}`;
                const categoryLabel = category;
                
                // Get the appropriate icon for each category
                let categoryIcon;
                switch (categoryId) {
                    case 'pizzas':
                        categoryIcon = './assets/images/pizzas/pizza-icon.JPG';
                        break;
                    case 'beverages':
                        categoryIcon = './assets/images/beverages/coca-cola-icon.jpg';
                        break;
                    case 'frittatinas':
                        categoryIcon = './assets/images/frittatine/frittatina-icon.jpg';
                        break;
                    case 'desserts':
                        categoryIcon = './assets/images/desserts/tiramisu.jpg';
                        break;
                    default:
                        categoryIcon = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJlY3Qgd2lkdGg9IjQwIiBoZWlnaHQ9IjQwIiByeD0iOCIgZmlsbD0iIzY4NWYzMSIvPgo8L3N2Zz4K';
                }
                
                // Set first category (Pizze) as active by default
                const isActive = index === 0;
                const activeClass = isActive ? 'border-b-[#ffa500] text-white' : 'border-b-transparent text-[#cbc190]';
                
                return `
                    <a class="flex flex-col items-center justify-center border-b-[3px] ${activeClass} gap-2 pb-[7px] pt-2.5" 
                       href="#" data-category="${categoryId}" onclick="window.switchCategory('${categoryId}')">
                        <div class="bg-center bg-no-repeat aspect-square bg-cover rounded-lg size-10"
                             style='background-image: url("${categoryIcon}");'></div>
                        <p class="text-sm font-bold leading-normal tracking-[0.015em]">${categoryLabel}</p>
                    </a>
                `;
            }).join('');

            return `
                <h2 class="section-title">Menu</h2>
                <div class="pb-3">
                    <div class="flex border-b border-[#685f31] px-4 gap-8">
                        ${navItems}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error creating menu navigation:', error);
            return `
                <h2 class="section-title">Menu</h2>
                <div class="pb-3">
                    <div class="flex border-b border-[#685f31] px-4 gap-8">
                        <p class="text-white">Loading...</p>
                    </div>
                </div>
            `;
        }
    },

    // Filter section component
    async createFilterSection() {
        try {
            const filterOptions = await dbManager.getFilterOptions();
            
            if (!filterOptions || !filterOptions.categories || filterOptions.categories.length === 0) {
                return `
                    <div class="px-4 py-3">
                        <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Filter</h3>
                        <div class="filter-container flex gap-2 flex-wrap">
                            <p class="text-white">No filters available yet</p>
                        </div>
                    </div>
                `;
            }
            
            const filterButtons = `
                <button class="filter-btn active" data-filter="all">
                    <p class="text-sm font-medium leading-normal">All</p>
                </button>
                ${filterOptions.categories.map(category => {
                    return `
                        <button class="filter-btn" data-filter="${category}">
                            <p class="text-sm font-medium leading-normal">${category.charAt(0).toUpperCase() + category.slice(1)}</p>
                        </button>
                    `;
                }).join('')}
            `;

            return `
                <div class="px-4 py-3">
                    <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Filter</h3>
                    <div class="filter-container flex gap-2 flex-wrap">
                        ${filterButtons}
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error creating filter section:', error);
            return `
                <div class="px-4 py-3">
                    <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Filter</h3>
                    <div class="filter-container flex gap-2 flex-wrap">
                        <p class="text-white">Loading filters...</p>
                    </div>
                </div>
            `;
        }
    },

    // Menu item component - removed price button
    async createMenuItem(item) {
        try {
            const badgePromises = item.category.map(async cat => {
                const badgeClass = await dbManager.getBadgeClass(cat);
                return `<span class="badge ${badgeClass}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>`;
            });
            
            const badges = await Promise.all(badgePromises);
            const badgesHTML = badges.join('');

            const tags = item.tags && item.tags.length > 0 
                ? `<p class="text-[#cbc190] text-sm font-normal leading-normal">${item.tags[0].charAt(0).toUpperCase() + item.tags[0].slice(1)}</p>`
                : '';

            return `
                <div class="p-4 pizza-item fade-in" data-category="${Array.isArray(item.category) ? item.category.join(' ') : item.category}" data-name="${item.name.toLowerCase()}" data-id="${item.id}">
                    <div class="flex items-stretch justify-between gap-4 rounded-xl pizza-item-content">
                        <div class="flex flex-[2_2_0px] flex-col gap-4">
                            <div class="flex flex-col gap-1">
                                <div class="flex gap-2 items-center flex-wrap">
                                    ${tags}
                                    ${badgesHTML}
                                </div>
                                <p class="text-white text-base font-bold leading-tight">${item.name}</p>
                                <p class="text-[#cbc190] text-sm font-normal leading-normal">${item.description}</p>
                            </div>
                            <div class="text-white text-lg font-bold">
                                ${item.price}
                            </div>
                        </div>
                        <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1 pizza-item-image" 
                             style='background-image: url("${item.image}");'></div>
                    </div>
                </div>
            `;
        } catch (error) {
            console.error('Error creating menu item:', error);
            return `
                <div class="p-4 pizza-item fade-in" data-id="${item.id}">
                    <div class="text-white text-center">Error loading item</div>
                </div>
            `;
        }
    },

    // Render all menu items
    async renderMenuItems(items = null) {
        const container = document.getElementById('menu-items');
        if (!container) return;

        try {
            let menuItems;
            
            if (items) {
                console.log('📋 Using passed items:', items);
                menuItems = items;
            } else {
                // Always await getMenuItems since it's async
                console.log('📋 Calling dbManager.getMenuItems()...');
                menuItems = await dbManager.getMenuItems();
                console.log('📋 Result from getMenuItems:', menuItems);
            }
            
            console.log('📋 Final menuItems:', menuItems);
            console.log('📋 Type of menuItems:', typeof menuItems);
            console.log('📋 Is array:', Array.isArray(menuItems));
            
            // Ensure menuItems is an array
            if (!Array.isArray(menuItems)) {
                console.warn('Menu items is not an array:', menuItems);
                container.innerHTML = '<p class="text-white text-center p-8">No menu items available</p>';
                return;
            }
            
            if (menuItems.length === 0) {
                container.innerHTML = '<p class="text-white text-center p-8">No items in this category yet</p>';
                return;
            }
            
            console.log(`🎯 Rendering ${menuItems.length} menu items`);
            
            const menuItemPromises = menuItems.map(item => this.createMenuItem(item));
            const menuItemHTMLs = await Promise.all(menuItemPromises);
            container.innerHTML = menuItemHTMLs.join('');
            
            console.log('✅ Menu items rendered successfully');
        } catch (error) {
            console.error('Error rendering menu items:', error);
            container.innerHTML = '<p class="text-white text-center p-8">Error loading menu items</p>';
        }
    }
};

// Default export for backward compatibility
export default Components;