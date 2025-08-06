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
            image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDi-9_LecMm6SeNNdIIN9KdHUeXn6BRyGQSD4ybb-3_csq5cAoPp60iVeuH86cXLM7Ve9rpRbS0elB2McFXzxPtBOzLJ_I14JKEdt9odyExUlJpzvua_oJ1cvXB7giiGxLUQE6_OUv0b2DJexfJGKaSFkk0MK4B49aEvHG5e3zp-yIPLELdrAbF-aUHkucJX0g_kLyijc3zpLtQkVgTpTslSbomoiqxlzf5Fqx7jFEWXMsnr1OO_SvRtJLcludsmTnime2hqgNtL9"
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
            icon: './assets/images/beverages/coca-cola-icon.jpg?w=80&h=80&fit=crop&crop=center'
        },
        {
            id: 'frittatinas',
            label: 'Frittatine',
            active: false,
            icon: './assets/images/frittatine/frittatina-icon.jpg?w=80&h=80&fit=crop&crop=center'
        },
        {
            id: 'desserts',
            label: 'Dessert',
            active: false,
            icon: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=80&h=80&fit=crop&crop=center'
        }
    ]
};