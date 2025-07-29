/**
 * Frittatinas Database
 * Structured data for frittatina recommendations based on pizza categories
 */

import { PIZZA_CATEGORIES } from '../core/Constants.js';

export const frittatinasData = {
    [PIZZA_CATEGORIES.CLASSICA]: [
        {
            id: 'frit_001',
            name: 'Frittatina Classica Napoletana',
            description: 'Frittatina tradizionale con pasta, uova e parmigiano',
            price: '€4.50',
            category: 'traditional',
            isGlutenFree: false,
            preparationTime: '15 min',
            image: 'https://via.placeholder.com/150/frittatina-classica',
            tags: ['traditional', 'napoletana', 'popular'],
            ingredients: ['pasta', 'uova', 'parmigiano', 'pepe']
        },
        {
            id: 'frit_002',
            name: 'Arancino Siciliano',
            description: 'Arancino ripieno di ragù, mozzarella e piselli',
            price: '€5.00',
            category: 'traditional',
            isGlutenFree: false,
            preparationTime: '20 min',
            image: 'https://via.placeholder.com/150/arancino',
            tags: ['sicilian', 'stuffed', 'hearty'],
            ingredients: ['riso', 'ragù', 'mozzarella', 'piselli', 'pangrattato']
        },
        {
            id: 'frit_003',
            name: 'Supplì Romano',
            description: 'Supplì con riso, sugo e mozzarella filante',
            price: '€4.00',
            category: 'traditional',
            isGlutenFree: false,
            preparationTime: '18 min',
            image: 'https://via.placeholder.com/150/suppli',
            tags: ['roman', 'cheesy', 'comfort'],
            ingredients: ['riso', 'sugo', 'mozzarella', 'uova', 'pangrattato']
        },
        {
            id: 'frit_004',
            name: 'Crocchè di Patate',
            description: 'Crocchette di patate cremose impanate e fritte',
            price: '€3.50',
            category: 'comfort',
            isGlutenFree: false,
            preparationTime: '12 min',
            image: 'https://via.placeholder.com/150/crocche',
            tags: ['comfort', 'creamy', 'crispy'],
            ingredients: ['patate', 'uova', 'parmigiano', 'prezzemolo', 'pangrattato']
        }
    ],

    [PIZZA_CATEGORIES.PIZZE_AUTORE]: [
        {
            id: 'frit_005',
            name: 'Frittatina Gourmet al Tartufo',
            description: 'Frittatina raffinata con tartufo nero e pecorino',
            price: '€8.50',
            category: 'gourmet',
            isGlutenFree: false,
            preparationTime: '25 min',
            image: 'https://via.placeholder.com/150/frittatina-tartufo',
            tags: ['gourmet', 'truffle', 'premium'],
            ingredients: ['pasta', 'uova', 'tartufo nero', 'pecorino', 'olio evo']
        },
        {
            id: 'frit_006',
            name: 'Arancino Decostruito',
            description: 'Interpretazione moderna dell\'arancino con sphere di riso',
            price: '€9.00',
            category: 'modern',
            isGlutenFree: false,
            preparationTime: '30 min',
            image: 'https://via.placeholder.com/150/arancino-decostruito',
            tags: ['modern', 'deconstructed', 'artistic'],
            ingredients: ['riso carnaroli', 'sfera di mozzarella', 'ragù di manzo', 'chips di parmigiano']
        },
        {
            id: 'frit_007',
            name: 'Baccalà Mantecato in Crosta',
            description: 'Baccalà mantecato avvolto in pasta brisée',
            price: '€7.50',
            category: 'seafood_gourmet',
            isGlutenFree: false,
            preparationTime: '35 min',
            image: 'https://via.placeholder.com/150/baccala-crosta',
            tags: ['seafood', 'refined', 'venetian'],
            ingredients: ['baccalà', 'pasta brisée', 'olio evo', 'aglio', 'prezzemolo']
        },
        {
            id: 'frit_008',
            name: 'Crocchetta di Burrata e Nduja',
            description: 'Crocchetta cremosa con burrata pugliese e nduja piccante',
            price: '€6.50',
            category: 'fusion',
            isGlutenFree: false,
            preparationTime: '20 min',
            image: 'https://via.placeholder.com/150/burrata-nduja',
            tags: ['fusion', 'spicy', 'creamy'],
            ingredients: ['burrata', 'nduja', 'patate', 'pangrattato', 'basilico']
        }
    ],

    [PIZZA_CATEGORIES.VEGANA]: [
        {
            id: 'frit_009',
            name: 'Frittatina Vegana ai Ceci',
            description: 'Frittatina a base di farina di ceci con verdure',
            price: '€5.50',
            category: 'vegan',
            isGlutenFree: true,
            preparationTime: '18 min',
            isVegan: true,
            image: 'https://via.placeholder.com/150/frittatina-ceci',
            tags: ['vegan', 'protein-rich', 'healthy'],
            ingredients: ['farina di ceci', 'zucchine', 'pomodorini', 'basilico', 'lievito nutrizionale']
        },
        {
            id: 'frit_010',
            name: 'Polpette di Quinoa e Verdure',
            description: 'Polpette vegane con quinoa, carote e spinaci',
            price: '€6.00',
            category: 'vegan_protein',
            isGlutenFree: true,
            preparationTime: '22 min',
            isVegan: true,
            image: 'https://via.placeholder.com/150/polpette-quinoa',
            tags: ['superfood', 'protein', 'colorful'],
            ingredients: ['quinoa', 'carote', 'spinaci', 'semi di lino', 'pangrattato di riso']
        },
        {
            id: 'frit_011',
            name: 'Crocchette di Miglio e Funghi',
            description: 'Crocchette croccanti con miglio e funghi porcini',
            price: '€5.00',
            category: 'vegan_comfort',
            isGlutenFree: true,
            preparationTime: '25 min',
            isVegan: true,
            image: 'https://via.placeholder.com/150/crocchette-miglio',
            tags: ['earthy', 'mushroom', 'comfort'],
            ingredients: ['miglio', 'funghi porcini', 'cipolla', 'timo', 'farina di riso']
        },
        {
            id: 'frit_012',
            name: 'Falafel Mediterranei',
            description: 'Falafel speziati con ceci e erbe aromatiche',
            price: '€4.50',
            category: 'mediterranean_vegan',
            isGlutenFree: true,
            preparationTime: '20 min',
            isVegan: true,
            image: 'https://via.placeholder.com/150/falafel',
            tags: ['mediterranean', 'spiced', 'traditional'],
            ingredients: ['ceci', 'prezzemolo', 'coriandolo', 'cumino', 'aglio']
        }
    ],

    [PIZZA_CATEGORIES.SENZA_GLUTINE]: [
        {
            id: 'frit_013',
            name: 'Frittatina Senza Glutine Certificata',
            description: 'Frittatina preparata con farina di riso certificata',
            price: '€6.00',
            category: 'gluten_free_traditional',
            isGlutenFree: true,
            preparationTime: '20 min',
            isCertified: true,
            image: 'https://via.placeholder.com/150/frittatina-gf',
            tags: ['certified', 'safe', 'traditional'],
            ingredients: ['farina di riso', 'uova', 'parmigiano', 'prezzemolo'],
            certifications: ['AIC', 'Gluten Free']
        },
        {
            id: 'frit_014',
            name: 'Arancino Senza Glutine',
            description: 'Arancino tradizionale con panatura senza glutine',
            price: '€6.50',
            category: 'gluten_free_traditional',
            isGlutenFree: true,
            preparationTime: '25 min',
            isCertified: true,
            image: 'https://via.placeholder.com/150/arancino-gf',
            tags: ['certified', 'sicilian', 'safe'],
            ingredients: ['riso', 'ragù', 'mozzarella', 'pangrattato senza glutine'],
            certifications: ['AIC']
        },
        {
            id: 'frit_015',
            name: 'Crocchette di Patate Certificate',
            description: 'Crocchette con patate e panatura certificata senza glutine',
            price: '€5.50',
            category: 'gluten_free_comfort',
            isGlutenFree: true,
            preparationTime: '18 min',
            isCertified: true,
            image: 'https://via.placeholder.com/150/crocchette-gf',
            tags: ['certified', 'comfort', 'crispy'],
            ingredients: ['patate', 'uova', 'farina di mais', 'pangrattato certificato'],
            certifications: ['AIC', 'Gluten Free']
        },
        {
            id: 'frit_016',
            name: 'Polpette di Riso Certificate',
            description: 'Polpette di riso con verdure, completamente senza glutine',
            price: '€5.00',
            category: 'gluten_free_healthy',
            isGlutenFree: true,
            preparationTime: '22 min',
            isCertified: true,
            image: 'https://via.placeholder.com/150/polpette-riso-gf',
            tags: ['certified', 'light', 'vegetarian'],
            ingredients: ['riso', 'zucchine', 'carote', 'parmigiano', 'farina di riso'],
            certifications: ['AIC']
        }
    ]
};

/**
 * Get frittatinas by pizza category
 * @param {string} pizzaCategory - Pizza category
 * @returns {Object[]} Array of frittatina objects
 */
export function getFrittatinasbyCategory(pizzaCategory) {
    return frittatinasData[pizzaCategory] || frittatinasData[PIZZA_CATEGORIES.CLASSICA];
}

/**
 * Get frittatina by ID
 * @param {string} frittatinId - Frittatina ID
 * @returns {Object|null} Frittatina object or null if not found
 */
export function getFrittatinById(frittatinId) {
    for (const category of Object.values(frittatinasData)) {
        const frittatina = category.find(f => f.id === frittatinId);
        if (frittatina) return frittatina;
    }
    return null;
}

/**
 * Get all gluten-free frittatinas
 * @returns {Object[]} Array of gluten-free frittatinas
 */
export function getGlutenFreeFrittatinas() {
    const allFrittatinas = Object.values(frittatinasData).flat();
    return allFrittatinas.filter(frittatina => frittatina.isGlutenFree);
}

/**
 * Get all vegan frittatinas
 * @returns {Object[]} Array of vegan frittatinas
 */
export function getVeganFrittatinas() {
    const allFrittatinas = Object.values(frittatinasData).flat();
    return allFrittatinas.filter(frittatina => frittatina.isVegan);
}

/**
 * Filter frittatinas by preparation time
 * @param {string} category - Pizza category
 * @param {number} maxTime - Maximum preparation time in minutes
 * @returns {Object[]} Filtered frittatinas
 */
export function filterFrittatinasbyPrepTime(category, maxTime) {
    const categoryFrittatinas = getFrittatinasbyCategory(category);
    return categoryFrittatinas.filter(frittatina => {
        const prepTime = parseInt(frittatina.preparationTime);
        return prepTime <= maxTime;
    });
}

/**
 * Filter frittatinas by tags
 * @param {string} category - Pizza category
 * @param {string[]} tags - Tags to filter by
 * @returns {Object[]} Filtered frittatinas
 */
export function filterFrittatinasbyTags(category, tags) {
    const categoryFrittatinas = getFrittatinasbyCategory(category);
    if (!tags || tags.length === 0) return categoryFrittatinas;
    
    return categoryFrittatinas.filter(frittatina => 
        tags.some(tag => frittatina.tags.includes(tag))
    );
}