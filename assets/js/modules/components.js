// Components Module
const Components = {
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
    createFeatured() {
        const featuredItems = dbManager.getFeaturedItems();
        const featuredHTML = featuredItems.map(item => `
            <div class="flex-shrink-0 w-64">
                <div class="bg-center bg-no-repeat aspect-video bg-cover rounded-xl mb-3" 
                     style='background-image: url("${item.image}");'></div>
                <h3 class="text-white text-base font-bold leading-tight mb-1">${item.title}</h3>
                <p class="text-[#cbc190] text-sm font-normal leading-normal">${item.description}</p>
            </div>
        `).join('');

        return `
            <h2 class="section-title">Hot</h2>
            <div class="flex overflow-y-auto scroll-container">
                <div class="flex items-stretch p-4 gap-3">
                    ${featuredHTML}
                </div>
            </div>
        `;
    },

    // Menu navigation component
    createMenuNavigation() {
        const navItems = dbManager.getMenuCategories().map(category => {
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

        return `
            <h2 class="section-title">Menu</h2>
            <div class="pb-3">
                <div class="flex border-b border-[#685f31] px-4 gap-8">
                    ${navItems}
                </div>
            </div>
        `;
    },

    // Filter section component
    createFilterSection() {
        const filterButtons = dbManager.getFilterOptions().map(filter => {
            const activeClass = filter.active ? 'active' : '';
            return `
                <button class="filter-btn ${activeClass}" data-filter="${filter.id}">
                    <p class="text-sm font-medium leading-normal">${filter.label}</p>
                </button>
            `;
        }).join('');

        return `
            <div class="px-4 py-3">
                <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Filter</h3>
                <div class="filter-container flex gap-2 flex-wrap">
                    ${filterButtons}
                </div>
            </div>
        `;
    },

    // Menu item component - removed price button
    createMenuItem(item) {
        const badges = item.category.map(cat => 
            `<span class="badge ${dbManager.getBadgeClass(cat)}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>`
        ).join('');

        const tags = item.tags.length > 0 
            ? `<p class="text-[#cbc190] text-sm font-normal leading-normal">${item.tags[0].charAt(0).toUpperCase() + item.tags[0].slice(1)}</p>`
            : '';

        return `
            <div class="p-4 pizza-item fade-in" data-category="${item.category.join(' ')}" data-name="${item.name.toLowerCase()}" data-id="${item.id}">
                <div class="flex items-stretch justify-between gap-4 rounded-xl pizza-item-content">
                    <div class="flex flex-[2_2_0px] flex-col gap-4">
                        <div class="flex flex-col gap-1">
                            <div class="flex gap-2 items-center flex-wrap">
                                ${tags}
                                ${badges}
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
    },

    // Render all menu items
    renderMenuItems(items = null) {
        const container = document.getElementById('menu-items');
        if (!container) return;

        const menuItems = items || dbManager.getMenuItems();
        container.innerHTML = menuItems.map(item => this.createMenuItem(item)).join('');
    }
};