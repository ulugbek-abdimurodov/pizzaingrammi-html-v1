// UI Components Module
const Components = {
    // Header component
    createHeader() {
        return `
            <div class="flex items-center bg-[#232010] p-4 pb-2 justify-center">
                <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                    Pizzaingrammi
                </h2>
            </div>
        `;
    },

    // Featured section component
    createFeatured() {
        const featuredHTML = PizzaData.featuredItems.map(item => `
            <div class="flex h-full flex-1 flex-col gap-4 rounded-lg min-w-60">
                <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex flex-col" 
                     style='background-image: url("${item.image}");'></div>
                <div>
                    <p class="text-white text-base font-medium leading-normal">${item.title}</p>
                    <p class="text-[#cbc190] text-sm font-normal leading-normal">${item.description}</p>
                </div>
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
        const navItems = PizzaData.menuCategories.map(category => {
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
        const filterButtons = PizzaData.filterOptions.map(filter => {
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
            `<span class="badge ${PizzaData.getBadgeClass(cat)}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</span>`
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
    renderMenuItems(items = PizzaData.menuItems) {
        const container = document.getElementById('menu-items');
        if (!container) return;

        container.innerHTML = items.map(item => this.createMenuItem(item)).join('');
    }
};