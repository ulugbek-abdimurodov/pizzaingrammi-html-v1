// Data Management Module
const PizzaData = {
    // Featured items data
    featuredItems: [
        {
            id: "featured-1",
            title: "Pizza del giorno",
            description: "Goditi la nostra pizza speciale quotidiana a un prezzo scontato",
            image: "https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: "featured-2",
            title: "Offerta speciale",
            description: "Ottieni un lato gratuito con qualsiasi grande ordine della pizza",
            image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=400&h=300&fit=crop&crop=center"
        },
        {
            id: "featured-3",
            title: "Nuovo nel menu",
            description: "Prova la nostra ultima creazione di pizza con condimenti unici",
            image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=300&fit=crop&crop=center"
        }
    ],

    // Menu categories
    menuCategories: [
        {
            id: 'pizzas',
            label: 'Pizze',
            active: true,
            icon: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?w=80&h=80&fit=crop&crop=center'
        },
        {
            id: 'beverages',
            label: 'Bevande',
            active: false,
            icon: 'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=80&h=80&fit=crop&crop=center'
        },
        {
            id: 'frittatinas',
            label: 'Frittatine',
            active: false,
            icon: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ca4b?w=80&h=80&fit=crop&crop=center'
        },
        {
            id: 'desserts',
            label: 'Dessert',
            active: false,
            icon: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=80&h=80&fit=crop&crop=center'
        }
    ]
};