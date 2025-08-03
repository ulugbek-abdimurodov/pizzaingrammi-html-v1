// Dessert Database
const DessertDatabase = {
    menuItems: [
        {
            id: 1,
            name: "Tiramisù Classico",
            description: "Un classico italiano servito in eleganti monoporzioni: morbidi strati di savoiardi inzuppati nel caffè, alternati a una vellutata crema al mascarpone",
            price: "€6.00",
            category: ["classici"],
            tags: ["popular"],
            image: "./assets/images/desserts/tiramisu.jpg?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 2,
            name: "Tiramisù al Caramello Salato",
            description: "Crema vellutata, caramello salato, cacao amaro e biscotto al caffè: un’esplosione di dolcezza cremosa",
            price: "€6.00",
            category: ["classici"],
            tags: ["popular"],
            image: "./assets/images/desserts/tiramisu-caramello.jpg?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 3,
            name: "Tiramisù al Limone",
            description: "Fresco e leggero, con crema al limone, panna montata e scaglie di cioccolato bianco: un dolce estivo irresistibile",
            price: "€6.00",
            category: ["classici"],
            tags: ["popular"],
            image: "./assets/images/desserts/tiramisu-limone.jpg?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 4,
            name: "Crostatina",
            description: "Crostatina con frutta fresca e gelato",
            price: "€6.00",
            category: ["classici"],
            tags: ["popular"],
            image: "./assets/images/desserts/crostatina.jpg?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 5,
            name: "Baba\' Pizzaingrammi",
            description: "Anche gluten free: solo sedi di Pomigliano",
            price: "€7.00",
            category: ["classici", "gluten-free"],
            tags: ["popular"],
            image: "./assets/images/desserts/baba-pizzaingrammi.jpg?w=400&h=300&fit=crop&crop=center"            
        }
    ],

    filterOptions: [
        { id: 'all', label: 'Tutti', active: true },
        { id: 'classici', label: 'Classici', active: false },
        { id: 'gluten-free', label: 'Gluten-free', active: false }
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
            'gluten-free': 'badge-gluten-free'
        };
        return badgeClasses[category] || 'badge-classici';
    }
}; 