/**
     * Private: Initialize pizza data
     * @returns {Object[]} Array of pizza objects
     */
    _initializePizzaData() {
        return [
            this._createPizza({
                id: 5,
                name: "Parmigiana",
                description: "Pomodoro San Marzano DOP, provola di Agerola, parmigiana di melanzane, grattugia di parmigiano reggiano 24 mesi DOP, olio Evo \"Monocultivar Peranzana\", basilico",
                price: "€10.00",
                category: [PIZZA_CATEGORIES.PIZZE_AUTORE],
                tags: [PIZZA_TAGS.PREMIUM, PIZZA_TAGS.HEALTHY],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZyKurSYt4p9lvXYQxfq-feEkyx7SkAdWmokbV46rNgR0OcCPJOCFtYWccZ6ePzmNEqsd0JdyDyB0WPovHf7TQpNh9O7vH7CN45gXrfbLk7NJomEJyx-vrnatvI290dBuaxcaKTIZejiB32HlyhGlGokDgj2vUTtE_YW9mxGCoXBIwu5V3POcAkWitks8CMEAJe1eKYxpU6Otjd2-7C2GuWJL6cFb4CCRhrybn4cepYFWJ-IjQXuN5wC4Duz7KY4r4j6_-0-BDBeD1"
            }),
            this._createPizza({
                id: 6,
                name: "Regina dell'Orto",
                description: "Verdure di stagione saltate in padella, fiordilatte di Agerola, olio Evo \"Monocultivar Peranzana\" , basilico",
                price: "€9.00",
                category: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.VEGANA],
                tags: [PIZZA_TAGS.BESTSELLER, PIZZA_TAGS.HEALTHY],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPZBgigWCIxTe6k3hP6dA2dvCag9o-hJMha1lI-c1XDnm-rhwv86mIzFI4iB6cJBdjKBVpYL8MSTosbvORwYXO7O9MNgAy5bQFY7STzEiCEChXp0LpI8oj9pLddbTMmEsWq92KWrRe2R-_0-WZsWSsdo-Fp2EZ62VRVZQKSQ-NmiQJB9qp7rDsady6e32xnkOcTwOLpRTQf4XpabGTYt74o5v_WRFSCI_oVXrGcmr-iriIaHAyi5SCIkv30AdNBx9KnrqpCLRD51u"
            }),
            this._createPizza({
                id: 7,
                name: "Rusticana",
                description: "Salsiccia di maialino nero di razza Casertana, patate al forno aromatizzate, provola di Agerola, olio Evo, basilico",
                price: "€10.00",
                category: [PIZZA_CATEGORIES.PIZZE_AUTORE],
                tags: [PIZZA_TAGS.HEARTY, PIZZA_TAGS.PROTEIN],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrdl7yJBmMcPFFAz3L8G9bwEFKYg3GNJdxIAHu4qP8uBe9Qz7GBD0CVg2jXuMQ5gyeylCIHyUtiaxPh0vA4SwFq4ryJjC7muzxECt6O3kj4RqGPzBuDGVMUyEhjyt4it-DpKiazQslD7fJJOKZcynfaXa2Naj9-hY3_MBfIYsqLxmKq6QzAQpYxajU66bRe6cUDVnTBuCkMKLVKBXxwE1rqlhapqiOynX5eqTpbIvdfB7d0ROWt3CxzyWYPPUgXlIeh-AfnP-82m2A"
            }),
            this._createPizza({
                id: 8,
                name: "Marinara Pizzaingrammi",
                description: "Crema ai 3 pomodori,capperi di Salina,olive CAIAZZANE denocciolate a mano*, origano di Sicilia, acciughe del mar Cantabrico, pomodorini semi dry, olio Evo, basilico",
                price: "€11.00",
                category: [PIZZA_CATEGORIES.PIZZE_AUTORE, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.GOURMET, PIZZA_TAGS.TRADITIONAL],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBrdl7yJBmMcPFFAz3L8G9bwEFKYg3GNJdxIAHu4qP8uBe9Qz7GBD0CVg2jXuMQ5gyeylCIHyUtiaxPh0vA4SwFq4ryJjC7muzxECt6O3kj4RqGPzBuDGVMUyEhjyt4it-DpKiazQslD7fJJOKZcynfaXa2Naj9-hY3_MBfIYsqLxmKq6QzAQpYxajU66bRe6cUDVnTBuCkMKLVKBXxwE1rqlhapqiOynX5eqTpbIvdfB7d0ROWt3CxzyWYPPUgXlIeh-AfnP-82m2A"
            }),
            this._createPizza({
                id: 9,
                name: "Nduja",
                description: "Pomodoro giallo del Vesuvio, provola di Agerola, salsiccia a punta di coltello, nduja di Spilinga, olio Evo \"Monocultivar Peranzana\", basilico",
                price: "€10.00",
                category: [PIZZA_CATEGORIES.PIZZE_AUTORE],
                tags: [PIZZA_TAGS.HOT, PIZZA_TAGS.PROTEIN],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPZBgigWCIxTe6k3hP6dA2dvCag9o-hJMha1lI-c1XDnm-rhwv86mIzFI4iB6cJBdjKBVpYL8MSTosbvORwYXO7O9MNgAy5bQFY7STzEiCEChXp0LpI8oj9pLddbTMmEsWq92KWrRe2R-_0-WZsWSsdo-Fp2EZ62VRVZQKSQ-NmiQJB9qp7rDsady6e32xnkOcTwOLpRTQf4XpabGTYt74o5v_WRFSCI_oVXrGcmr-iriIaHAyi5SCIkv30AdNBx9KnrqpCLRD51u"
            }),
            this._createPizza({
                id: 10,
                name: "Genovese",
                description: "Cipolle ramate di Montoro, spezzatino di muscolo di scottona, provola di Agerola,spolverata di Parmigiano Reggiano stagionato 18 mesi D.O.P. ,olio Evo,basilico",
                price: "€10.00",
                category: [PIZZA_CATEGORIES.PIZZE_AUTORE, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.POPULAR, PIZZA_TAGS.PROTEIN],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
            }),
            this._createPizza({
                id: 11,
                name: "New Polpetta",
                description: "Polpettine di manzo al Ragu' Napoletano, provola di Agerola, ciuffi di ricotta di bufala, pepe cuvèe, olio evo \"Monocultivar Peranzana\", basilico",
                price: "€10.00",
                category: [PIZZA_CATEGORIES.PIZZE_AUTORE],
                tags: [PIZZA_TAGS.POPULAR, PIZZA_TAGS.HEARTY],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
            }),
            this._createPizza({
                id: 12,
                name: "Cacio e Pepe",
                description: "Crema di cacio con pepe cuvè,porchetta di Ariccia,fior di latte di Agerola,cipolle rosse essiccate al mosto cotto d'uva,basilico e olio Evo",
                price: "€12.00",
                category: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.TRADITIONAL, PIZZA_TAGS.CHEESE],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-SsdZRBl9wrH-3eLTIXGoTX11EVLNCVYntvp8UdVIgcHvQ38AbdX_Yd0p2FEIAP4Lnl8lzuGXMhX4j4bZAJcTyb24MpAx3t7T1E0oGNxTSiw8Ua_oLUdcOG-UVFzrVwGbks3RcaBT0zKda0Chwe7EjdnyrLfJXjoU41StjFt8BntUEIMUQfKe6nO7FlInC75lQYAoo9eQOSQbDIyL11fZR__isKhEqGIZ9NzwmystCOS1Y7d0KqBAXYNc-XqJRtiv6qw0ZXsuI-s_"
            }),
            this._createPizza({
                id: 13,
                name: "Crudo di Parma",
                description: "Fior di latte di Agerola , rucola, prosciutto crudo di Parma, scaglie di parmigiano reggiano 24 mesi, olio Evo",
                price: "€12.00",
                category: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.PREMIUM, PIZZA_TAGS.PROTEIN],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDi-9_LecMm6SeNNdIIN9KdHUeXn6BRyGQSD4ybb-3_csq5cAoPp60iVeuH86cXLM7Ve9rpRbS0elB2McFXzxPtBOzLJ_I14JKEdt9odyExUlJpzvua_oJ1cvXB7giiGxLUQE6_OUv0b2DJexfJGKaSFkk0MK4B49aEvHG5e3zp-yIPLELdrAbF-aUHkucJX0g_kLyijc3zpLtQkVgTpTslSbomoiqxlzf5Fqx7jFEWXMsnr1OO_SvRtJLcludsmTnime2hqgNtL9"
            }),
            this._createPizza({
                id: 14,
                name: "Salsiccia e Friarielli",
                description: "Salsiccia di maiale nero casertano, provola di agerola, friarielli secondo tradizione napoletana",
                price: "€11.00",
                category: [PIZZA_CATEGORIES.PIZZE_AUTORE, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.TRADITIONAL, PIZZA_TAGS.PROTEIN],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCZyKurSYt4p9lvXYQxfq-feEkyx7SkAdWmokbV46rNgR0OcCPJOCFtYWccZ6ePzmNEqsd0JdyDyB0WPovHf7TQpNh9O7vH7CN45gXrfbLk7NJomEJyx-vrnatvI290dBuaxcaKTIZejiB32HlyhGlGokDgj2vUTtE_YW9mxGCoXBIwu5V3POcAkWitks8CMEAJe1eKYxpU6Otjd2-7C2GuWJL6cFb4CCRhrybn4cepYFWJ-IjQXuN5wC4Duz7KY4r4j6_-0-BDBeD1"
            }),
            this._createPizza({
                id: 15,
                name: "Pistacchio e Mortadella",
                description: "Crema di pistacchio di Sicilia, fiordilatte di Agerola, mortadella, granella di pistacchio, olio Evo \"Monocultivar Peranzana\" basilico",
                price: "€11.00",
                category: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.BESTSELLER, PIZZA_TAGS.GOURMET],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVPZBgigWCIxTe6k3hP6dA2dvCag9o-hJMha1lI-c1XDnm-rhwv86mIzFI4iB6cJBdjKBVpYL8MSTosbvORwYXO7O9MNgAy5bQFY7STzEiCEChXp0LpI8oj9pLddbTMmEsWq92KWrRe2R-_0-WZsWSsdo-Fp2EZ62VRVZQKSQ-NmiQJB9qp7rDsady6e32xnkOcTwOLpRTQf4XpabGTYt74o5v_WRFSCI_oVXrGcmr-iriIaHAyi5SCIkv30AdNBx9KnrqpCLRD51u"
            })
        ];
    }
                id: 1,
                name: "Margherita",
                description: "Pomodoro San Marzano DOP fiordilatte di Agerola, olio Evo Monocultivar Peranzana basilico",
                price: "€6.50",
                category: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.POPULAR, PIZZA_TAGS.TRADITIONAL],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYmfVx4LN8rA343zEfsayV1W3o7A1NM5c1gz1T-xIBUc9TzCUM3P9CyNHV6rFCSPcOMyUguuxOe91xD5Ec5gNxW9ytNSeUqdsnjoM1iYbhduVTqIB3zDlMJa4EPo3dRgiR7gVPZP7D2znVYVpWpQ_z2ERkuMyxjAgEjBVuyBLt-7sswBVrGuc3Ld6qGzoIHfgCULimb6xdDBXPEfXdKlcTUrtUj6F8moDKzfcnjXtzSNijuPP3r_Id20eEPTx4NPkZS_R5cUWJ5oYi"
            }),
            this._createPizza({
                id: 2,
                name: "Calzone",
                description: "Ricotta di bufala, fordilatte di Agerola. salame Napoli pomodoro San Marzano DOP, olio Evo Monocultivar Peranzana, basilico",
                price: "€10.00",
                category: [PIZZA_CATEGORIES.CLASSICA],
                tags: [PIZZA_TAGS.TRADITIONAL, PIZZA_TAGS.HEARTY],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-SsdZRBl9wrH-3eLTIXGoTX11EVLNCVYntvp8UdVIgcHvQ38AbdX_Yd0p2FEIAP4Lnl8lzuGXMhX4j4bZAJcTyb24MpAx3t7T1E0oGNxTSiw8Ua_oLUdcOG-UVFzrVwGbks3RcaBT0zKda0Chwe7EjdnyrLfJXjoU41StjFt8BntUEIMUQfKe6nO7FlInC75lQYAoo9eQOSQbDIyL11fZR__isKhEqGIZ9NzwmystCOS1Y7d0KqBAXYNc-XqJRtiv6qw0ZXsuI-s_"
            }),
            this._createPizza({
                id: 3,
                name: "Regina",
                description: "Pomodoro Sam Arzano DOP. Mozzarella di bufala Campana, olio Evo Monocultivar Peranzana, basilico",
                price: "€10.00",
                category: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.HOT, PIZZA_TAGS.PREMIUM],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDi-9_LecMm6SeNNdIIN9KdHUeXn6BRyGQSD4ybb-3_csq5cAoPp60iVeuH86cXLM7Ve9rpRbS0elB2McFXzxPtBOzLJ_I14JKEdt9odyExUlJpzvua_oJ1cvXB7giiGxLUQE6_OUv0b2DJexfJGKaSFkk0MK4B49aEvHG5e3zp-yIPLELdrAbF-aUHkucJX0g_kLyijc3zpLtQkVgTpTslSbomoiqxlzf5Fqx7jFEWXMsnr1OO_SvRtJLcludsmTnime2hqgNtL9"
            }),
            this._createPizza({
                id: 4,
                name: "Capricciosa",
                description: "Pomodoro San Marzano D.O.P. , fior di latte di Agerola, funghi champignon freschi, prosciutto cotto, salame Napoli, carciofini in olio Evo, olive di Gaeta denocciolate a mano*, olio Evo, basilico",
                price: "€11.00",
                category: [PIZZA_CATEGORIES.PIZZE_AUTORE],
                tags: [PIZZA_TAGS.GOURMET, PIZZA_TAGS.CHEESE, PIZZA_TAGS.PROTEIN],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuATc60KNXWy7ikNsywVHyN45SdOG_82gKfoAp9j4dAemydfjjm0wipAf9tJQg1rL_4IXjP42-NikhG1cel-DCwytypP2Gm87N589eR2n2mCyp0t-J5mkY1f8SuhE6RZtUatoeYBppH5HA26Q82Q3vKUekROJClR85fsbbUFn-QBmYLmmocgFwGcgB90QbtDFQhMw12a1FvDCTH3NM_5jmyASWDhgnvimtkts2R5O31h_GqkBjT4Vx9lZegc5tRjGRLMKy-8eHqDRmY-"
            }),
            this._createPizza({/**
 * Pizza Repository
 * Manages pizza data with validation and access methods
 */

import { PIZZA_CATEGORIES, PIZZA_TAGS, DEFAULT_VALUES } from '../core/Constants.js';

export class PizzaRepository {
    constructor() {
        this._pizzas = this._initializePizzaData();
        this._validateData();
    }

    /**
     * Get all pizzas
     * @returns {Object[]} Array of pizza objects
     */
    getAll() {
        return [...this._pizzas];
    }

    /**
     * Get pizza by ID
     * @param {number} id - Pizza ID
     * @returns {Object|null} Pizza object or null
     */
    getById(id) {
        return this._pizzas.find(pizza => pizza.id === id) || null;
    }

    /**
     * Get pizzas by category
     * @param {string} category - Pizza category
     * @returns {Object[]} Filtered pizzas
     */
    getByCategory(category) {
        if (category === PIZZA_CATEGORIES.ALL) {
            return this.getAll();
        }
        return this._pizzas.filter(pizza => pizza.category.includes(category));
    }

    /**
     * Get pizzas by tags
     * @param {string[]} tags - Array of tags
     * @returns {Object[]} Filtered pizzas
     */
    getByTags(tags) {
        if (!Array.isArray(tags) || tags.length === 0) {
            return this.getAll();
        }
        return this._pizzas.filter(pizza => 
            tags.some(tag => pizza.tags.includes(tag))
        );
    }

    /**
     * Get pizzas by multiple filters
     * @param {Object} filters - Filter criteria
     * @returns {Object[]} Filtered pizzas
     */
    getByFilters(filters) {
        let result = this.getAll();

        if (filters.category && filters.category !== PIZZA_CATEGORIES.ALL) {
            result = result.filter(pizza => pizza.category.includes(filters.category));
        }

        if (filters.tags && filters.tags.length > 0) {
            result = result.filter(pizza => 
                filters.tags.some(tag => pizza.tags.includes(tag))
            );
        }

        if (filters.priceRange) {
            result = result.filter(pizza => {
                const price = this._extractPrice(pizza.price);
                return price >= filters.priceRange.min && price <= filters.priceRange.max;
            });
        }

        return result;
    }

    /**
     * Search pizzas by text
     * @param {string} searchTerm - Search term
     * @returns {Object[]} Matching pizzas
     */
    search(searchTerm) {
        if (!searchTerm || typeof searchTerm !== 'string') {
            return [];
        }

        const term = searchTerm.toLowerCase().trim();
        return this._pizzas.filter(pizza =>
            pizza.name.toLowerCase().includes(term) ||
            pizza.description.toLowerCase().includes(term)
        );
    }

    /**
     * Get unique categories
     * @returns {string[]} Array of categories
     */
    getCategories() {
        const categories = new Set();
        this._pizzas.forEach(pizza => {
            pizza.category.forEach(cat => categories.add(cat));
        });
        return Array.from(categories);
    }

    /**
     * Get unique tags
     * @returns {string[]} Array of tags
     */
    getTags() {
        const tags = new Set();
        this._pizzas.forEach(pizza => {
            pizza.tags.forEach(tag => tags.add(tag));
        });
        return Array.from(tags);
    }

    /**
     * Get repository statistics
     * @returns {Object} Statistics object
     */
    getStatistics() {
        const stats = {
            totalPizzas: this._pizzas.length,
            categories: {},
            tags: {},
            priceRange: { min: Infinity, max: -Infinity }
        };

        this._pizzas.forEach(pizza => {
            // Category counts
            pizza.category.forEach(cat => {
                stats.categories[cat] = (stats.categories[cat] || 0) + 1;
            });

            // Tag counts
            pizza.tags.forEach(tag => {
                stats.tags[tag] = (stats.tags[tag] || 0) + 1;
            });

            // Price range
            const price = this._extractPrice(pizza.price);
            if (price > 0) {
                stats.priceRange.min = Math.min(stats.priceRange.min, price);
                stats.priceRange.max = Math.max(stats.priceRange.max, price);
            }
        });

        return stats;
    }

    /**
     * Private: Initialize pizza data
     * @returns {Object[]} Array of pizza objects
     */
    _initializePizzaData() {
        return [
            this._createPizza({
                id: 1,
                name: "Margherita",
                description: "Pomodoro San Marzano DOP fiordilatte di Agerola, olio Evo Monocultivar Peranzana basilico",
                price: "€6.50",
                category: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.POPULAR, PIZZA_TAGS.TRADITIONAL],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuBYmfVx4LN8rA343zEfsayV1W3o7A1NM5c1gz1T-xIBUc9TzCUM3P9CyNHV6rFCSPcOMyUguuxOe91xD5Ec5gNxW9ytNSeUqdsnjoM1iYbhduVTqIB3zDlMJa4EPo3dRgiR7gVPZP7D2znVYVpWpQ_z2ERkuMyxjAgEjBVuyBLt-7sswBVrGuc3Ld6qGzoIHfgCULimb6xdDBXPEfXdKlcTUrtUj6F8moDKzfcnjXtzSNijuPP3r_Id20eEPTx4NPkZS_R5cUWJ5oYi"
            }),
            this._createPizza({
                id: 2,
                name: "Calzone",
                description: "Ricotta di bufala, fordilatte di Agerola. salame Napoli pomodoro San Marzano DOP, olio Evo Monocultivar Peranzana, basilico",
                price: "€10.00",
                category: [PIZZA_CATEGORIES.CLASSICA],
                tags: [PIZZA_TAGS.TRADITIONAL, PIZZA_TAGS.HEARTY],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuD-SsdZRBl9wrH-3eLTIXGoTX11EVLNCVYntvp8UdVIgcHvQ38AbdX_Yd0p2FEIAP4Lnl8lzuGXMhX4j4bZAJcTyb24MpAx3t7T1E0oGNxTSiw8Ua_oLUdcOG-UVFzrVwGbks3RcaBT0zKda0Chwe7EjdnyrLfJXjoU41StjFt8BntUEIMUQfKe6nO7FlInC75lQYAoo9eQOSQbDIyL11fZR__isKhEqGIZ9NzwmystCOS1Y7d0KqBAXYNc-XqJRtiv6qw0ZXsuI-s_"
            }),
            this._createPizza({
                id: 3,
                name: "Regina",
                description: "Pomodoro Sam Arzano DOP. Mozzarella di bufala Campana, olio Evo Monocultivar Peranzana, basilico",
                price: "€10.00",
                category: [PIZZA_CATEGORIES.CLASSICA, PIZZA_CATEGORIES.SENZA_GLUTINE],
                tags: [PIZZA_TAGS.HOT, PIZZA_TAGS.PREMIUM],
                image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVDi-9_LecMm6SeNNdIIN9KdHUeXn6BRyGQSD4ybb-3_csq5cAoPp60iVeuH86cXLM7Ve9rpRbS0elB2McFXzxPtBOzLJ_I14JKEdt9odyExUlJpzvua_oJ1cvXB7giiGxLUQE6_OUv0b2DJexfJGKaSFkk0MK4B49aEvHG5e3zp-yIPLELdrAbF-aUHkucJX0g_kLyijc3zpLtQkVgTpTslSbomoiqxlzf5Fqx7jFEWXMsnr1OO_SvRtJLcludsmTnime2hqgNtL9"
            }),
            // Add more pizzas here...
        ];
    }

    /**
     * Private: Create normalized pizza object
     * @param {Object} pizzaData - Raw pizza data
     * @returns {Object} Normalized pizza object
     */
    _createPizza(pizzaData) {
        return {
            id: pizzaData.id,
            name: pizzaData.name || '',
            description: pizzaData.description || '',
            price: pizzaData.price || '€0.00',
            category: Array.isArray(pizzaData.category) ? pizzaData.category : [pizzaData.category],
            tags: Array.isArray(pizzaData.tags) ? pizzaData.tags : [],
            image: pizzaData.image || DEFAULT_VALUES.PIZZA_IMAGE
        };
    }

    /**
     * Private: Extract numeric price from string
     * @param {string} priceString - Price string (e.g., "€10.50")
     * @returns {number} Numeric price
     */
    _extractPrice(priceString) {
        if (typeof priceString !== 'string') return 0;
        const cleanPrice = priceString.replace(/[€$£¥₹]/g, '').replace(',', '.');
        const price = parseFloat(cleanPrice);
        return isNaN(price) ? 0 : price;
    }

    /**
     * Private: Validate pizza data integrity
     */
    _validateData() {
        this._pizzas.forEach((pizza, index) => {
            if (!pizza.id || !pizza.name) {
                console.warn(`Pizza at index ${index} missing required fields`);
            }
            if (!Array.isArray(pizza.category) || pizza.category.length === 0) {
                console.warn(`Pizza "${pizza.name}" has invalid category`);
            }
            if (!Array.isArray(pizza.tags)) {
                console.warn(`Pizza "${pizza.name}" has invalid tags`);
            }
        });
    }
}