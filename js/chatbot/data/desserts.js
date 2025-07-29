/**
 * Desserts Database for Chatbot
 * Structured data for dessert recommendations based on pizza categories
 */

import { PIZZA_CATEGORIES } from '../core/Constants.js';

export const dessertsData = {
    [PIZZA_CATEGORIES.CLASSICA]: [
        {
            id: 'dess_001',
            name: 'Tiramisù della Casa',
            description: 'Il classico tiramisù con mascarpone, caffè e cacao',
            price: '€6.50',
            category: 'traditional_italian',
            isGlutenFree: false,
            isVegan: false,
            preparationTime: '4 hours',
            image: 'https://via.placeholder.com/150/8B4513/FFFFFF?text=Tiramisù',
            tags: ['classic', 'coffee', 'mascarpone'],
            ingredients: ['mascarpone', 'caffè', 'savoiardi', 'cacao', 'uova'],
            allergens: ['uova', 'glutine', 'lattosio']
        },
        {
            id: 'dess_002',
            name: 'Cannoli Siciliani',
            description: 'Cannoli croccanti con ricotta dolce e gocce di cioccolato',
            price: '€5.50',
            category: 'traditional_sicilian',
            isGlutenFree: false,
            isVegan: false,
            preparationTime: '2 hours',
            image: 'https://via.placeholder.com/150/F5DEB3/8B4513?text=Cannoli',
            tags: ['sicilian', 'crispy', 'ricotta'],
            ingredients: ['ricotta', 'scorza di cannella', 'gocce di cioccolato', 'pasta di cannolo'],
            allergens: ['glutine', 'lattosio']
        },
        {
            id: 'dess_003',
            name: 'Gelato Artigianale (2 gusti)',
            description: 'Gelato fatto in casa con ingredienti freschi',
            price: '€4.50',
            category: 'gelato',
            isGlutenFree: true,
            isVegan: false,
            preparationTime: 'ready',
            image: 'https://via.placeholder.com/150/FFB6C1/8B0000?text=Gelato',
            tags: ['artisanal', 'fresh', 'creamy'],
            flavors: ['vaniglia', 'cioccolato', 'fragola', 'pistacchio'],
            allergens: ['lattosio']
        },
        {
            id: 'dess_004',
            name: 'Panna Cotta ai Frutti di Bosco',
            description: 'Panna cotta cremosa con composta di frutti di bosco',
            price: '€5.00',
            category: 'traditional_italian',
            isGlutenFree: true,
            isVegan: false,
            preparationTime: '4 hours',
            image: 'https://via.placeholder.com/150/DDA0DD/800080?text=Panna+Cotta',
            tags: ['creamy', 'berries', 'elegant'],
            ingredients: ['panna', 'gelatina', 'frutti di bosco', 'zucchero'],
            allergens: ['lattosio']
        }
    ],

    [PIZZA_CATEGORIES.PIZZE_AUTORE]: [
        {
            id: 'dess_005',
            name: 'Tiramisù Decostruito',
            description: 'Interpretazione moderna del tiramisù con sfera di mascarpone',
            price: '€9.50',
            category: 'modern_italian',
            isGlutenFree: false,
            isVegan: false,
            preparationTime: '6 hours',
            image: 'https://via.placeholder.com/150/CD853F/000000?text=Deconstructed',
            tags: ['modern', 'deconstructed', 'artistic'],
            ingredients: ['sfera di mascarpone', 'biscotto al caffè', 'mousse di cacao', 'oro alimentare'],
            allergens: ['uova', 'glutine', 'lattosio']
        },
        {
            id: 'dess_006',
            name: 'Cannolo Gourmet al Pistacchio',
            description: 'Cannolo con crema di pistacchio di Bronte e granella',
            price: '€8.00',
            category: 'gourmet_sicilian',
            isGlutenFree: false,
            isVegan: false,
            preparationTime: '3 hours',
            image: 'https://via.placeholder.com/150/9ACD32/000000?text=Pistachio+Cannolo',
            tags: ['gourmet', 'pistacchio', 'bronte'],
            ingredients: ['pistacchio di Bronte DOP', 'ricotta di pecora', 'pasta di cannolo artigianale'],
            allergens: ['glutine', 'lattosio', 'frutta secca']
        },
        {
            id: 'dess_007',
            name: 'Soufflé al Cioccolato Fondente',
            description: 'Soufflé caldo con cuore di cioccolato fondente 70%',
            price: '€10.00',
            category: 'french_inspired',
            isGlutenFree: true,
            isVegan: false,
            preparationTime: '45 minutes',
            image: 'https://via.placeholder.com/150/654321/FFFFFF?text=Chocolate+Soufflé',
            tags: ['warm', 'chocolate', 'elegant'],
            ingredients: ['cioccolato fondente 70%', 'uova', 'burro', 'zucchero a velo'],
            allergens: ['uova', 'lattosio']
        },
        {
            id: 'dess_008',
            name: 'Gelato all\'Azoto Liquido',
            description: 'Gelato preparato al momento con azoto liquido',
            price: '€7.50',
            category: 'molecular_gastronomy',
            isGlutenFree: true,
            isVegan: false,
            preparationTime: '5 minutes',
            image: 'https://via.placeholder.com/150/87CEEB/000000?text=Liquid+Nitrogen',
            tags: ['molecular', 'spectacular', 'innovative'],
            flavors: ['vaniglia Madagascar', 'cioccolato ecuadoriano', 'fragola candita'],
            allergens: ['lattosio']
        }
    ],

    [PIZZA_CATEGORIES.VEGANA]: [
        {
            id: 'dess_009',
            name: 'Tiramisù Vegano',
            description: 'Tiramisù con crema di anacardi e latte di cocco',
            price: '€7.00',
            category: 'vegan_italian',
            isGlutenFree: false,
            isVegan: true,
            preparationTime: '6 hours',
            image: 'https://via.placeholder.com/150/228B22/FFFFFF?text=Vegan+Tiramisù',
            tags: ['vegan', 'coconut', 'cashew'],
            ingredients: ['anacardi', 'latte di cocco', 'caffè', 'cacao', 'biscotti vegani'],
            allergens: ['frutta secca', 'glutine']
        },
        {
            id: 'dess_010',
            name: 'Panna Cotta di Latte di Mandorla',
            description: 'Panna cotta vegana con latte di mandorla e agar agar',
            price: '€6.00',
            category: 'vegan_elegant',
            isGlutenFree: true,
            isVegan: true,
            preparationTime: '4 hours',
            image: 'https://via.placeholder.com/150/F0E68C/8B4513?text=Almond+Panna+Cotta',
            tags: ['vegan', 'almond', 'light'],
            ingredients: ['latte di mandorla', 'agar agar', 'sciroppo di agave', 'frutti rossi'],
            allergens: ['frutta secca']
        },
        {
            id: 'dess_011',
            name: 'Gelato Vegano ai Frutti Tropicali',
            description: 'Gelato a base di latte di cocco con mango e passion fruit',
            price: '€5.50',
            category: 'vegan_gelato',
            isGlutenFree: true,
            isVegan: true,
            preparationTime: 'ready',
            image: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=Tropical+Gelato',
            tags: ['tropical', 'coconut', 'refreshing'],
            flavors: ['mango', 'passion fruit', 'cocco', 'lime'],
            ingredients: ['latte di cocco', 'mango', 'passion fruit', 'sciroppo di agave'],
            allergens: []
        },
        {
            id: 'dess_012',
            name: 'Mousse di Cioccolato e Avocado',
            description: 'Mousse cremosa con cioccolato fondente e avocado',
            price: '€6.50',
            category: 'vegan_innovative',
            isGlutenFree: true,
            isVegan: true,
            preparationTime: '2 hours',
            image: 'https://via.placeholder.com/150/556B2F/FFFFFF?text=Avocado+Mousse',
            tags: ['healthy', 'innovative', 'chocolate'],
            ingredients: ['avocado maturo', 'cioccolato fondente', 'sciroppo di acero', 'vaniglia'],
            allergens: []
        }
    ],

    [PIZZA_CATEGORIES.SENZA_GLUTINE]: [
        {
            id: 'dess_013',
            name: 'Tiramisù Senza Glutine Certificato',
            description: 'Tiramisù classico con savoiardi certificati senza glutine',
            price: '€7.50',
            category: 'gluten_free_traditional',
            isGlutenFree: true,
            isCertified: true,
            isVegan: false,
            preparationTime: '24 hours',
            image: 'https://via.placeholder.com/150/DEB887/8B4513?text=GF+Tiramisù',
            tags: ['certified', 'traditional', 'safe'],
            ingredients: ['mascarpone', 'caffè', 'savoiardi senza glutine', 'cacao'],
            certifications: ['AIC', 'Gluten Free'],
            allergens: ['uova', 'lattosio']
        },
        {
            id: 'dess_014',
            name: 'Cannoli Senza Glutine',
            description: 'Cannoli con pasta certificata senza glutine e ricotta siciliana',
            price: '€6.50',
            category: 'gluten_free_sicilian',
            isGlutenFree: true,
            isCertified: true,
            isVegan: false,
            preparationTime: '3 hours',
            image: 'https://via.placeholder.com/150/F4A460/8B4513?text=GF+Cannoli',
            tags: ['certified', 'sicilian', 'crispy'],
            ingredients: ['ricotta siciliana', 'pasta senza glutine', 'gocce di cioccolato'],
            certifications: ['AIC'],
            allergens: ['lattosio']
        },
        {
            id: 'dess_015',
            name: 'Torta di Riso Certificata',
            description: 'Torta tradizionale lombarda con riso e uvetta',
            price: '€5.50',
            category: 'gluten_free_traditional',
            isGlutenFree: true,
            isCertified: true,
            isVegan: false,
            preparationTime: '2 hours',
            image: 'https://via.placeholder.com/150/F5F5DC/8B4513?text=Rice+Cake',
            tags: ['certified', 'lombard', 'comforting'],
            ingredients: ['riso', 'latte', 'uova', 'uvetta', 'limone'],
            certifications: ['AIC', 'Gluten Free'],
            allergens: ['uova', 'lattosio']
        },
        {
            id: 'dess_016',
            name: 'Gelato Senza Glutine Assortito',
            description: 'Selezione di gelati certificati senza glutine',
            price: '€5.00',
            category: 'gluten_free_gelato',
            isGlutenFree: true,
            isCertified: true,
            isVegan: false,
            preparationTime: 'ready',
            image: 'https://via.placeholder.com/150/FFB6C1/8B0000?text=GF+Gelato',
            tags: ['certified', 'variety', 'safe'],
            flavors: ['vaniglia', 'cioccolato fondente', 'frutti di bosco', 'limone'],
            certifications: ['AIC'],
            allergens: ['lattosio']
        }
    ]
};

/**
 * Get desserts by pizza category
 * @param {string} pizzaCategory - Pizza category
 * @returns {Object[]} Array of dessert objects
 */
export function getDessertsByCategory(pizzaCategory) {
    return dessertsData[pizzaCategory] || dessertsData[PIZZA_CATEGORIES.CLASSICA];
}

/**
 * Get dessert by ID
 * @param {string} dessertId - Dessert ID
 * @returns {Object|null} Dessert object or null if not found
 */
export function getDessertById(dessertId) {
    for (const category of Object.values(dessertsData)) {
        const dessert = category.find(d => d.id === dessertId);
        if (dessert) return dessert;
    }
    return null;
}

/**
 * Get all gluten-free desserts
 * @returns {Object[]} Array of gluten-free desserts
 */
export function getGlutenFreeDesserts() {
    const allDesserts = Object.values(dessertsData).flat();
    return allDesserts.filter(dessert => dessert.isGlutenFree);
}

/**
 * Get all vegan desserts
 * @returns {Object[]} Array of vegan desserts
 */
export function getVeganDesserts() {
    const allDesserts = Object.values(dessertsData).flat();
    return allDesserts.filter(dessert => dessert.isVegan);
}

/**
 * Get desserts by preparation time
 * @param {string} category - Pizza category
 * @param {string} timeFilter - 'ready', 'quick' (under 2h), 'medium' (2-6h), 'long' (over 6h)
 * @returns {Object[]} Filtered desserts
 */
export function getDessertsByPrepTime(category, timeFilter) {
    const categoryDesserts = getDessertsByCategory(category);
    
    switch(timeFilter) {
        case 'ready':
            return categoryDesserts.filter(d => d.preparationTime === 'ready');
        case 'quick':
            return categoryDesserts.filter(d => {
                const time = d.preparationTime;
                return time !== 'ready' && (time.includes('minutes') || parseInt(time) <= 2);
            });
        case 'medium':
            return categoryDesserts.filter(d => {
                const hours = parseInt(d.preparationTime);
                return hours > 2 && hours <= 6;
            });
        case 'long':
            return categoryDesserts.filter(d => {
                const hours = parseInt(d.preparationTime);
                return hours > 6;
            });
        default:
            return categoryDesserts;
    }
}

/**
 * Filter desserts by allergens (exclude desserts with specified allergens)
 * @param {string} category - Pizza category
 * @param {string[]} excludeAllergens - Allergens to avoid
 * @returns {Object[]} Filtered desserts
 */
export function filterDessertsByAllergens(category, excludeAllergens) {
    const categoryDesserts = getDessertsByCategory(category);
    if (!excludeAllergens || excludeAllergens.length === 0) return categoryDesserts;
    
    return categoryDesserts.filter(dessert => 
        !dessert.allergens.some(allergen => excludeAllergens.includes(allergen))
    );
}

/**
 * Filter desserts by tags
 * @param {string} category - Pizza category
 * @param {string[]} tags - Tags to filter by
 * @returns {Object[]} Filtered desserts
 */
export function filterDessertsByTags(category, tags) {
    const categoryDesserts = getDessertsByCategory(category);
    if (!tags || tags.length === 0) return categoryDesserts;
    
    return categoryDesserts.filter(dessert => 
        tags.some(tag => dessert.tags.includes(tag))
    );
}