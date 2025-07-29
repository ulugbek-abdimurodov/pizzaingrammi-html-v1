/**
 * Featured Repository
 * Manages featured items and promotional content
 */

export class FeaturedRepository {
    constructor() {
        this._featuredItems = this._initializeFeaturedItems();
    }

    /**
     * Get all featured items
     * @returns {Object[]} Array of featured item objects
     */
    getAll() {
        return [...this._featuredItems];
    }

    /**
     * Get featured item by ID
     * @param {string} id - Featured item ID
     * @returns {Object|null} Featured item or null
     */
    getById(id) {
        return this._featuredItems.find(item => item.id === id) || null;
    }

    /**
     * Get active featured items
     * @returns {Object[]} Array of active featured items
     */
    getActive() {
        return this._featuredItems.filter(item => item.active);
    }

    /**
     * Get featured items by type
     * @param {string} type - Featured item type
     * @returns {Object[]} Array of featured items of specified type
     */
    getByType(type) {
        return this._featuredItems.filter(item => item.type === type);
    }

    /**
     * Private: Initialize featured items
     * @returns {Object[]} Array of featured item objects
     */
    _initializeFeaturedItems() {
        return [
            this._createFeaturedItem({
                id: 'featured-1',
                title: 'Pizza del giorno',
                description: 'Goditi la nostra pizza speciale quotidiana a un prezzo scontato',
                type: 'daily_special',
                active: true,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDGAPbZ39PyoD98IvOeqBztNFFsrCAQp_v8g7r5GKHO7czaNnMbHnfE-QXkiuqhbY5Xbi96Fl3nsls_xpSI9EFAU-XWbkjpKcW3kEKS-096wt3R4I707ogCK4qSozPk_gJw45dOE-NpiS0d3RJwrW6sMcnQcNq_a6erOy_eqRYrkQJ8sfkUt_ezJNVSlKQ-o5Md17iOCnNEr6e_uNRT6jwgyHyUHEm4LazDMlBj4xCBQChCIDCt1ipfc_2T4aQgEyIBq7aVJX0df3mp',
                priority: 1
            }),
            this._createFeaturedItem({
                id: 'featured-2',
                title: 'Offerta speciale',
                description: 'Ottieni un lato gratuito con qualsiasi grande ordine della pizza',
                type: 'promotion',
                active: true,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuABH9_S7PmJXjaWdJ4htCBbktBtfAaI69Ed9CMiUEzFB6XhO0VdDrswoHubX5Twsr67IoFlmu6vVgx_RalaJYTwWQybOR1uhODTlFo3VLVICoUBxpToc_ebSatx2jcQoqr_5HAzMpFb2wPL9xmnUewK2ell2TcPpu91193Bd8OjINdYwm7yr4OIOJvEvQ4cXhqKFKw2ysv9z1hX4MnQ4gpch4cUUbDLIjU6y4Dpfs7CBQE3AYwIxGp64Szudgz1yXHvgdLR2QlSWvDw',
                priority: 2
            }),
            this._createFeaturedItem({
                id: 'featured-3',
                title: 'Nuovo nel menu',
                description: 'Prova la nostra ultima creazione di pizza con condimenti unici',
                type: 'new_item',
                active: true,
                image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuA9_xQ0vt3-p_kZ1ketd2HeFUaq1xJBUEyJCO-IjYJx-3m-nZQYI81L1HK17o2XVLbPpd7tsUmAPxJluud5g97j-FOHYAqzz5GGReZuc8ohPDo7E6E4njr641s-5V-eGNG6VfKisPNKPh7_0FEews0ydEDG2GuqTBahYHAHgMNk6uxFFEztA7RLLhdZa8diAjpU3yS2RlvV1OSm2kZxYiMSbSfxYd5TVjluYKCkZ9QxlmLrVPiZvvLjArRvvvrX3nfcN9CBWf9Rmdrn',
                priority: 3
            })
        ];
    }

    /**
     * Private: Create normalized featured item object
     * @param {Object} itemData - Raw featured item data
     * @returns {Object} Normalized featured item
     */
    _createFeaturedItem(itemData) {
        return {
            id: itemData.id,
            title: itemData.title || '',
            description: itemData.description || '',
            type: itemData.type || 'general',
            active: itemData.active || false,
            image: itemData.image || '',
            priority: itemData.priority || 0
        };
    }
}