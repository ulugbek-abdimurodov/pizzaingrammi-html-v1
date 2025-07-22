// UI Components Module
const Components = {
    // Header component
    createHeader() {
        return `
            <div class="flex items-center bg-[#232010] p-4 pb-2 justify-between">
                <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] flex-1 text-center pl-12">
                    Pizzaingrammi
                </h2>
                <div class="flex w-12 items-center justify-end">
                    <button class="flex max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-full h-12 bg-transparent text-white gap-2 text-base font-bold leading-normal tracking-[0.015em] min-w-0 p-0">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z"></path>
                        </svg>
                    </button>
                </div>
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
            <h2 class="section-title">Featured</h2>
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
                <h3 class="text-white text-lg font-bold leading-tight tracking-[-0.015em] pb-3">Filter Options</h3>
                <div class="filter-container flex gap-2 flex-wrap">
                    ${filterButtons}
                </div>
            </div>
        `;
    },

    // Menu item component
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
                        <button class="price-btn">
                            <span class="truncate">${item.price}</span>
                        </button>
                    </div>
                    <div class="w-full bg-center bg-no-repeat aspect-video bg-cover rounded-xl flex-1 pizza-item-image" 
                         style='background-image: url("${item.image}");'></div>
                </div>
            </div>
        `;
    },

    // Bottom navigation component
    createBottomNav() {
        const navItems = [
            { icon: 'House', label: 'Home', active: true },
            { icon: 'Pizza', label: 'Menu', active: false },
            { icon: 'ShoppingCart', label: 'Cart', active: false },
            { icon: 'User', label: 'Profile', active: false }
        ];

        const navHTML = navItems.map(item => {
            const textColor = item.active ? 'text-white' : 'text-[#cbc190]';
            const iconFill = item.icon === 'Pizza' && item.label === 'Menu' ? 'fill' : 'regular';
            
            let iconPath = '';
            switch(item.icon) {
                case 'House':
                    iconPath = 'M218.83,103.77l-80-75.48a1.14,1.14,0,0,1-.11-.11,16,16,0,0,0-21.53,0l-.11.11L37.17,103.77A16,16,0,0,0,32,115.55V208a16,16,0,0,0,16,16H96a16,16,0,0,0,16-16V160h32v48a16,16,0,0,0,16,16h48a16,16,0,0,0,16-16V115.55A16,16,0,0,0,218.83,103.77ZM208,208H160V160a16,16,0,0,0-16-16H112a16,16,0,0,0-16,16v48H48V115.55l.11-.1L128,40l79.9,75.43.11.1Z';
                    break;
                case 'Pizza':
                    iconPath = iconFill === 'fill' 
                        ? 'M239.54,63a15.91,15.91,0,0,0-7.25-9.9,201.49,201.49,0,0,0-208.58,0,16,16,0,0,0-5.37,22l96,157.27a16,16,0,0,0,27.36,0l96-157.27A15.82,15.82,0,0,0,239.54,63Zm-55.1,68.53a40,40,0,0,0-41.38,67.77L128,224,96.5,172.43a40,40,0,1,0-41.35-67.76L48.8,94.26a152,152,0,0,1,158.39,0Z'
                        : 'M239.54,63a15.91,15.91,0,0,0-7.25-9.9,201.49,201.49,0,0,0-208.58,0,16,16,0,0,0-5.37,22l96,157.27a16,16,0,0,0,27.36,0l96-157.27A15.82,15.82,0,0,0,239.54,63Z';
                    break;
                case 'ShoppingCart':
                    iconPath = 'M222.14,58.87A8,8,0,0,0,216,56H54.68L49.79,29.14A16,16,0,0,0,34.05,16H16a8,8,0,0,0,0,16h18L59.56,172.29a24,24,0,0,0,5.33,11.27,28,28,0,1,0,44.4,8.44h45.42A27.75,27.75,0,0,0,152,204a28,28,0,1,0,28-28H83.17a8,8,0,0,1-7.87-6.57L72.13,152h116a24,24,0,0,0,23.61-19.71l12.16-66.86A8,8,0,0,0,222.14,58.87ZM96,204a12,12,0,1,1-12-12A12,12,0,0,1,96,204Zm96,0a12,12,0,1,1-12-12A12,12,0,0,1,192,204Zm4-74.57A8,8,0,0,1,188.1,136H69.22L57.59,72H206.41Z';
                    break;
                case 'User':
                    iconPath = 'M230.92,212c-15.23-26.33-38.7-45.21-66.09-54.16a72,72,0,1,0-73.66,0C63.78,166.78,40.31,185.66,25.08,212a8,8,0,1,0,13.85,8c18.84-32.56,52.14-52,89.07-52s70.23,19.44,89.07,52a8,8,0,1,0,13.85-8ZM72,96a56,56,0,1,1,56,56A56.06,56.06,0,0,1,72,96Z';
                    break;
            }

            return `
                <a class="just flex flex-1 flex-col items-center justify-end gap-1 ${textColor}" href="#">
                    <div class="${textColor} flex h-8 items-center justify-center">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24px" height="24px" fill="currentColor" viewBox="0 0 256 256">
                            <path d="${iconPath}"></path>
                        </svg>
                    </div>
                    <p class="${textColor} text-xs font-medium leading-normal tracking-[0.015em]">${item.label}</p>
                </a>
            `;
        }).join('');

        return `
            <div class="fixed bottom-0 left-0 right-0 bg-[#342f18] border-t border-[#494222]">
                <div class="flex gap-2 px-4 pb-3 pt-2">
                    ${navHTML}
                </div>
                <div class="h-5 bg-[#342f18]"></div>
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