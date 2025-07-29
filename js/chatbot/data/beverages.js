/**
 * Beverages Database for Chatbot
 * Structured data for beverage recommendations based on pizza categories
 */

import { PIZZA_CATEGORIES } from '../core/Constants.js';

export const beveragesData = {
    [PIZZA_CATEGORIES.CLASSICA]: [
        {
            id: 'bev_001',
            name: 'Coca Cola Classica',
            description: 'La classica coca cola per accompagnare le pizze tradizionali',
            price: '€3.50',
            category: 'soft_drinks',
            isGlutenFree: true,
            image: 'https://via.placeholder.com/150/FF0000/FFFFFF?text=Coca+Cola',
            tags: ['popular', 'classic']
        },
        {
            id: 'bev_002',
            name: 'Birra Peroni',
            description: 'Birra italiana perfetta con le pizze classiche',
            price: '€4.50',
            category: 'beer',
            isGlutenFree: false,
            alcoholContent: '5.1%',
            image: 'https://via.placeholder.com/150/FFD700/000000?text=Peroni',
            tags: ['italian', 'traditional']
        },
        {
            id: 'bev_003',
            name: 'Acqua Naturale San Pellegrino',
            description: 'Acqua naturale premium italiana',
            price: '€2.50',
            category: 'water',
            isGlutenFree: true,
            image: 'https://via.placeholder.com/150/0099CC/FFFFFF?text=San+Pellegrino',
            tags: ['premium', 'italian']
        },
        {
            id: 'bev_004',
            name: 'Vino Rosso della Casa',
            description: 'Vino rosso italiano selezionato dal nostro sommelier',
            price: '€18.00',
            category: 'wine',
            isGlutenFree: true,
            alcoholContent: '13%',
            image: 'https://via.placeholder.com/150/722F37/FFFFFF?text=Vino+Rosso',
            tags: ['premium', 'italian', 'sommelier']
        }
    ],

    [PIZZA_CATEGORIES.PIZZE_AUTORE]: [
        {
            id: 'bev_005',
            name: 'Birra Artigianale IPA',
            description: 'Birra artigianale locale con note luppolate',
            price: '€6.50',
            category: 'craft_beer',
            isGlutenFree: false,
            alcoholContent: '6.5%',
            image: 'https://via.placeholder.com/150/D2691E/FFFFFF?text=Craft+IPA',
            tags: ['craft', 'local', 'hoppy']
        },
        {
            id: 'bev_006',
            name: 'Cocktail Negroni',
            description: 'Cocktail italiano classico con gin, vermouth e Campari',
            price: '€8.00',
            category: 'cocktail',
            isGlutenFree: true,
            alcoholContent: '24%',
            image: 'https://via.placeholder.com/150/DC143C/FFFFFF?text=Negroni',
            tags: ['classic', 'italian', 'premium']
        },
        {
            id: 'bev_007',
            name: 'Prosecco DOCG',
            description: 'Prosecco di Valdobbiadene DOCG, bollicine raffinate',
            price: '€25.00',
            category: 'sparkling_wine',
            isGlutenFree: true,
            alcoholContent: '11%',
            image: 'https://via.placeholder.com/150/E6E6FA/8B008B?text=Prosecco',
            tags: ['docg', 'premium', 'celebration']
        },
        {
            id: 'bev_008',
            name: 'Acqua Frizzante Premium',
            description: 'Acqua frizzante con note minerali per palati raffinati',
            price: '€3.50',
            category: 'sparkling_water',
            isGlutenFree: true,
            image: 'https://via.placeholder.com/150/87CEEB/000000?text=Sparkling+Water',
            tags: ['premium', 'mineral', 'refined']
        }
    ],

    [PIZZA_CATEGORIES.VEGANA]: [
        {
            id: 'bev_009',
            name: 'Kombucha Bio',
            description: 'Bevanda fermentata biologica ricca di probiotici',
            price: '€4.50',
            category: 'fermented',
            isGlutenFree: true,
            isOrganic: true,
            image: 'https://via.placeholder.com/150/9ACD32/000000?text=Kombucha',
            tags: ['organic', 'probiotic', 'healthy']
        },
        {
            id: 'bev_010',
            name: 'Succo Verde Detox',
            description: 'Mix di verdure verdi, sedano, spinaci e limone',
            price: '€5.50',
            category: 'fresh_juice',
            isGlutenFree: true,
            isOrganic: true,
            image: 'https://via.placeholder.com/150/32CD32/FFFFFF?text=Green+Juice',
            tags: ['detox', 'organic', 'fresh']
        },
        {
            id: 'bev_011',
            name: 'Tè Verde Matcha',
            description: 'Tè verde giapponese in polvere, ricco di antiossidanti',
            price: '€4.00',
            category: 'tea',
            isGlutenFree: true,
            isCaffeinated: true,
            image: 'https://via.placeholder.com/150/228B22/FFFFFF?text=Matcha',
            tags: ['japanese', 'antioxidant', 'ceremonial']
        },
        {
            id: 'bev_012',
            name: 'Latte di Mandorla Artigianale',
            description: 'Latte di mandorla fatto in casa senza zuccheri aggiunti',
            price: '€3.50',
            category: 'plant_milk',
            isGlutenFree: true,
            isVegan: true,
            image: 'https://via.placeholder.com/150/F5DEB3/8B4513?text=Almond+Milk',
            tags: ['homemade', 'sugar-free', 'artisanal']
        }
    ],

    [PIZZA_CATEGORIES.SENZA_GLUTINE]: [
        {
            id: 'bev_013',
            name: 'Birra Senza Glutine Moretti',
            description: 'Birra italiana certificata senza glutine',
            price: '€5.00',
            category: 'gluten_free_beer',
            isGlutenFree: true,
            isCertified: true,
            alcoholContent: '4.6%',
            image: 'https://via.placeholder.com/150/FFD700/000000?text=Moretti+GF',
            tags: ['certified', 'italian', 'safe'],
            certifications: ['AIC', 'Gluten Free']
        },
        {
            id: 'bev_014',
            name: 'Vino Certificato Senza Glutine',
            description: 'Vino rosso con certificazione senza glutine',
            price: '€22.00',
            category: 'certified_wine',
            isGlutenFree: true,
            isCertified: true,
            alcoholContent: '12.5%',
            image: 'https://via.placeholder.com/150/800080/FFFFFF?text=Certified+Wine',
            tags: ['certified', 'premium', 'safe'],
            certifications: ['AIC']
        },
        {
            id: 'bev_015',
            name: 'Succo di Frutta Naturale',
            description: 'Succo 100% frutta senza additivi né conservanti',
            price: '€3.00',
            category: 'natural_juice',
            isGlutenFree: true,
            isNatural: true,
            image: 'https://via.placeholder.com/150/FF6347/FFFFFF?text=Natural+Juice',
            tags: ['natural', '100%', 'preservative-free']
        },
        {
            id: 'bev_016',
            name: 'Acqua Oligominerale',
            description: 'Acqua pura oligominerale ideale per celiaci',
            price: '€2.00',
            category: 'mineral_water',
            isGlutenFree: true,
            isLowMinerals: true,
            image: 'https://via.placeholder.com/150/B0E0E6/000000?text=Mineral+Water',
            tags: ['pure', 'low-minerals', 'safe']
        }
    ]
};

/**
 * Get beverages by pizza category
 * @param {string} pizzaCategory - Pizza category
 * @returns {Object[]} Array of beverage objects
 */
export function getBeveragesByCategory(pizzaCategory) {
    return beveragesData[pizzaCategory] || beveragesData[PIZZA_CATEGORIES.CLASSICA];
}

/**
 * Get beverage by ID
 * @param {string} beverageId - Beverage ID
 * @returns {Object|null} Beverage object or null if not found
 */
export function getBeverageById(beverageId) {
    for (const category of Object.values(beveragesData)) {
        const beverage = category.find(b => b.id === beverageId);
        if (beverage) return beverage;
    }
    return null;
}

/**
 * Get all gluten-free beverages
 * @returns {Object[]} Array of gluten-free beverages
 */
export function getGlutenFreeBeverages() {
    const allBeverages = Object.values(beveragesData).flat();
    return allBeverages.filter(beverage => beverage.isGlutenFree);
}

/**
 * Get all alcoholic beverages
 * @returns {Object[]} Array of alcoholic beverages
 */
export function getAlcoholicBeverages() {
    const allBeverages = Object.values(beveragesData).flat();
    return allBeverages.filter(beverage => beverage.alcoholContent);
}

/**
 * Get all non-alcoholic beverages
 * @returns {Object[]} Array of non-alcoholic beverages
 */
export function getNonAlcoholicBeverages() {
    const allBeverages = Object.values(beveragesData).flat();
    return allBeverages.filter(beverage => !beverage.alcoholContent);
}

/**
 * Get beverages by type
 * @param {string} category - Beverage category
 * @param {string} type - Beverage type
 * @returns {Object[]} Filtered beverages
 */
export function getBeveragesByType(category, type) {
    const categoryBeverages = getBeveragesByCategory(category);
    return categoryBeverages.filter(beverage => beverage.category === type);
}

/**
 * Filter beverages by tags
 * @param {string} category - Pizza category
 * @param {string[]} tags - Tags to filter by
 * @returns {Object[]} Filtered beverages
 */
export function filterBeveragesByTags(category, tags) {
    const categoryBeverages = getBeveragesByCategory(category);
    if (!tags || tags.length === 0) return categoryBeverages;
    
    return categoryBeverages.filter(beverage => 
        tags.some(tag => beverage.tags.includes(tag))
    );
}

/**
 * Filter beverages by price range
 * @param {string} category - Pizza category
 * @param {number} minPrice - Minimum price
 * @param {number} maxPrice - Maximum price
 * @returns {Object[]} Filtered beverages
 */
export function filterBeveragesByPrice(category, minPrice, maxPrice) {
    const categoryBeverages = getBeveragesByCategory(category);
    
    return categoryBeverages.filter(beverage => {
        const price = parseFloat(beverage.price.replace('€', ''));
        return price >= minPrice && price <= maxPrice;
    });
}

/**
 * Get organic beverages
 * @param {string} category - Pizza category
 * @returns {Object[]} Organic beverages
 */
export function getOrganicBeverages(category) {
    const categoryBeverages = getBeveragesByCategory(category);
    return categoryBeverages.filter(beverage => beverage.isOrganic);
}

/**
 * Get certified beverages (gluten-free certified)
 * @returns {Object[]} Certified beverages
 */
export function getCertifiedBeverages() {
    const allBeverages = Object.values(beveragesData).flat();
    return allBeverages.filter(beverage => beverage.isCertified);
}

/**
 * Get beverage recommendations based on pizza choice
 * @param {Object} pizza - Selected pizza object
 * @returns {Object[]} Recommended beverages
 */
export function getRecommendedBeverages(pizza) {
    if (!pizza || !pizza.category) {
        return getBeveragesByCategory(PIZZA_CATEGORIES.CLASSICA);
    }

    // Get beverages for the first category of the pizza
    const primaryCategory = pizza.category[0];
    let recommendations = getBeveragesByCategory(primaryCategory);

    // If pizza has specific tags, filter beverages accordingly
    if (pizza.tags) {
        if (pizza.tags.includes('hot') || pizza.tags.includes('spicy')) {
            // For spicy pizzas, recommend cooling beverages
            recommendations = recommendations.filter(bev => 
                bev.category === 'beer' || 
                bev.category === 'water' || 
                bev.category === 'fresh_juice'
            );
        } else if (pizza.tags.includes('premium') || pizza.tags.includes('gourmet')) {
            // For premium pizzas, recommend premium beverages
            recommendations = recommendations.filter(bev => 
                bev.tags.includes('premium') || 
                bev.category === 'wine' || 
                bev.category === 'cocktail'
            );
        }
    }

    return recommendations;
}