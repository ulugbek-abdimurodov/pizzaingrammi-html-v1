// Pizza Database
const PizzaDatabase = {
    menuItems: [
        {
            id: 1,
            name: "Margherita",
            description: "Pomodoro San Marzano DOP fiordilatte di Agerola, olio Evo Monocultivar Peranzana basilico",
            price: "€6.50",
            category: ["classica", "senza-glutine"],
            tags: ["popular"],
            image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 2,
            name: "Calzone",
            description: "Ricotta di bufala, fordilatte di Agerola. salame Napoli pomodoro San Marzano DOP, olio Evo Monocultivar Peranzana, basilico",
            price: "€10.00",
            category: ["classica", "Vegana"],
            tags: ["traditional", "Vegana"],
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 3,
            name: "Regina",
            description: "Pomodoro Sam Arzano DOP. Mozzarella di bufala Campana, olio Evo Monocultivar Peranzana, basilico",
            price: "€10.00",
            category: ["classica", "senza-glutine"],
            tags: ["hot", "senza-glutine"],
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 4,
            name: "Capricciosa",
            description: "Pomodoro San Marzano D.O.P. , fior di latte di Agerola, funghi champignon freschi, prosciutto cotto, salame Napoli, carciofini in olio Evo, olive di Gaeta denocciolate a mano*, olio Evo, basilico",
            price: "€11.00",
            category: ["Pizze-d'autore"],
            tags: ["gourmet", "cheese"],
            image: "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 5,
            name: "Parmigiana",
            description: "Pomodoro San Marzano DOP, provola di Agerola, parmigiana di melanzane, grattugia di parmigiano reggiano 24 mesi DOP, olio Evo \"Monocultivar Peranzana\", basilico",
            price: "€10.00",
            category: ["Pizze-d'autore"],
            tags: ["premium", "senza-glutine"],
            image: "https://images.unsplash.com/photo-1593560708920-61dd98c46a4e?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: 6,
            name: "Regina dell'Orto",
            description: "Verdure di stagione saltate in padella, fiordilatte di Agerola, olio Evo \"Monocultivar Peranzana\" , basilico",
            price: "€9.00",
            category: ["classica"],
            tags: ["bestseller"],
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center"
        }
    ],

    filterOptions: [
        { id: 'all', label: 'Tutti', active: true },
        { id: 'classica', label: 'Classica', active: false },
        { id: 'Pizze-d\'autore', label: 'Pizze d\'autore', active: false },
        { id: 'Vegana', label: 'Vegana', active: false },
        { id: 'senza-glutine', label: 'Senza glutine', active: false }
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
            'Pizze-d\'autore': 'badge-Pizze-d\'autore', 
            'Vegana': 'badge-Vegana',
            'senza-glutine': 'badge-senza-glutine'
        };
        return badgeClasses[category] || 'badge-classica';
    }
}; 