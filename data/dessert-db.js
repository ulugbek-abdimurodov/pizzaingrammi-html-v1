// Dessert Database
const DessertDatabase = {
    menuItems: [
        {
            id: 1,
            name: "Tiramisù",
            description: "Tiramisù classico con mascarpone, savoiardi e caffè",
            price: "€6.00",
            category: ["classici"],
            tags: ["popular"],
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 2,
            name: "Panna Cotta",
            description: "Panna cotta con vaniglia e salsa ai frutti di bosco",
            price: "€5.50",
            category: ["classici"],
            tags: ["popular"],
            image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 3,
            name: "Cannolo Siciliano",
            description: "Cannolo siciliano con ricotta fresca e gocce di cioccolato",
            price: "€4.50",
            category: ["classici"],
            tags: ["traditional"],
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 4,
            name: "Gelato Artigianale",
            description: "Gelato artigianale alla vaniglia, cioccolato o fragola",
            price: "€3.50",
            category: ["gelati"],
            tags: ["popular"],
            image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 5,
            name: "Profiteroles",
            description: "Profiteroles con crema chantilly e salsa al cioccolato",
            price: "€6.50",
            category: ["classici"],
            tags: ["premium"],
            image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 6,
            name: "Sorbetto al Limone",
            description: "Sorbetto al limone di Sorrento",
            price: "€3.00",
            category: ["gelati"],
            tags: ["refreshing"],
            image: "https://images.unsplash.com/photo-1551024506-0bccd828d307?w=400&h=300&fit=crop&crop=center"
        }
    ],

    filterOptions: [
        { id: 'all', label: 'Tutti', active: true },
        { id: 'classici', label: 'Classici', active: false },
        { id: 'gelati', label: 'Gelati', active: false }
    ],

    getFilteredItems(activeFilters) {
        let filtered = this.menuItems;

        if (activeFilters.length > 0 && !activeFilters.includes('all')) {
            filtered = filtered.filter(item => 
                activeFilters.some(filter => item.category.includes(filter))
            );
        }

        return filtered;
    },

    getBadgeClass(category) {
        const badgeClasses = {
            'classici': 'badge-classici',
            'gelati': 'badge-gelati'
        };
        return badgeClasses[category] || 'badge-classici';
    }
}; 