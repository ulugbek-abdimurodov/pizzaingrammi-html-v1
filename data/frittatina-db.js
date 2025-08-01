// Frittatina Database
const FrittatinaDatabase = {
    menuItems: [
        {
            id: 1,
            name: "Frittatina Classica",
            description: "Pasta fritta con ricotta di bufala, provola di Agerola, pepe nero",
            price: "€4.50",
            category: ["classica"],
            tags: ["popular"],
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 2,
            name: "Frittatina al Ragu",
            description: "Pasta fritta con ragù napoletano, ricotta di bufala, parmigiano reggiano",
            price: "€5.50",
            category: ["classica"],
            tags: ["traditional"],
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 3,
            name: "Frittatina ai Funghi",
            description: "Pasta fritta con funghi champignon, ricotta di bufala, provola affumicata",
            price: "€5.00",
            category: ["vegetariana"],
            tags: ["vegetariana"],
            image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 4,
            name: "Frittatina al Salame",
            description: "Pasta fritta con salame Napoli, ricotta di bufala, pecorino romano",
            price: "€5.50",
            category: ["classica"],
            tags: ["hearty"],
            image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 5,
            name: "Frittatina ai Carciofi",
            description: "Pasta fritta con carciofini in olio, ricotta di bufala, parmigiano",
            price: "€5.00",
            category: ["vegetariana"],
            tags: ["vegetariana"],
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 6,
            name: "Frittatina ai Friarielli",
            description: "Pasta fritta con friarielli, ricotta di bufala, provola di Agerola",
            price: "€5.00",
            category: ["vegetariana"],
            tags: ["vegetariana"],
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center"
        }
    ],

    filterOptions: [
        { id: 'all', label: 'Tutti', active: true },
        { id: 'classica', label: 'Classica', active: false },
        { id: 'vegetariana', label: 'Vegetariana', active: false }
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
            'classica': 'badge-classica',
            'vegetariana': 'badge-vegetariana'
        };
        return badgeClasses[category] || 'badge-classica';
    }
}; 