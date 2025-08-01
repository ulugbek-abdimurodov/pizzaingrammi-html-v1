// Beverage Database
const BeverageDatabase = {
    menuItems: [
        {
            id: 1,
            name: "Acqua Naturale",
            description: "Acqua naturale 500ml",
            price: "€2.00",
            category: ["acqua"],
            tags: ["popular"],
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 2,
            name: "Acqua Frizzante",
            description: "Acqua frizzante 500ml",
            price: "€2.00",
            category: ["acqua"],
            tags: ["popular"],
            image: "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 3,
            name: "Coca Cola",
            description: "Coca Cola 330ml",
            price: "€3.50",
            category: ["bibite"],
            tags: ["popular"],
            image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 4,
            name: "Fanta",
            description: "Fanta 330ml",
            price: "€3.50",
            category: ["bibite"],
            tags: ["popular"],
            image: "https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 5,
            name: "Birra Peroni",
            description: "Birra Peroni 330ml",
            price: "€4.50",
            category: ["alcolici"],
            tags: ["alcolici"],
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 6,
            name: "Vino della Casa",
            description: "Vino della casa 1L",
            price: "€8.00",
            category: ["alcolici"],
            tags: ["alcolici"],
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=400&h=300&fit=crop&crop=center"
        }
    ],

    filterOptions: [
        { id: 'all', label: 'Tutti', active: true },
        { id: 'acqua', label: 'Acqua', active: false },
        { id: 'bibite', label: 'Bibite', active: false },
        { id: 'alcolici', label: 'Alcolici', active: false }
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
            'acqua': 'badge-acqua',
            'bibite': 'badge-bibite',
            'alcolici': 'badge-alcolici'
        };
        return badgeClasses[category] || 'badge-acqua';
    }
}; 