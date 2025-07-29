/**
 * Menu Repository
 * Manages menu navigation structure and categories
 */

import { MENU_SECTIONS } from '../core/Constants.js';

export class MenuRepository {
    constructor() {
        this._menuCategories = this._initializeMenuCategories();
    }

    /**
     * Get all menu categories
     * @returns {Object[]} Array of menu category objects
     */
    getAll() {
        return [...this._menuCategories];
    }

    /**
     * Get menu category by ID
     * @param {string} id - Category ID
     * @returns {Object|null} Menu category or null
     */
    getById(id) {
        return this._menuCategories.find(category => category.id === id) || null;
    }

    /**
     * Get active menu category
     * @returns {Object|null} Active menu category or null
     */
    getActive() {
        return this._menuCategories.find(category => category.active) || null;
    }

    /**
     * Set active menu category
     * @param {string} id - Category ID to activate
     * @returns {boolean} Success status
     */
    setActive(id) {
        const category = this.getById(id);
        if (!category) {
            return false;
        }

        // Deactivate all categories
        this._menuCategories.forEach(cat => {
            cat.active = false;
        });

        // Activate selected category
        category.active = true;
        return true;
    }

    /**
     * Get available menu sections
     * @returns {Object[]} Array of available sections
     */
    getAvailableSections() {
        return this._menuCategories.filter(category => category.available);
    }

    /**
     * Private: Initialize menu categories
     * @returns {Object[]} Array of menu category objects
     */
    _initializeMenuCategories() {
        return [
            this._createMenuCategory({
                id: MENU_SECTIONS.PIZZAS,
                label: 'Pizze',
                active: true,
                available: true,
                icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAOzBxYAGjiUL--dz4GaCvPMEu6zlB_TOHf46sq-Wp5AeANX8kqrbVBclxR6OSH_mj2Pkj5WYhw9dKXW58pl6EaK93FO22325wUYSP93IseaGlAOxllyLBCUzwxK7rMygrM83aZhCAksWFqkZXXB1T9xxg0_yi7oClS6QGv3hYgY_Qogkp7dDJMNRFiljkF8WbewlagJTjWkMjmR5HBhBHhxFV_ToxuY3aL0wgGxCVBm71XDPCHk_QAT5GpZPfUjbUGHHsHmTeYyOnM',
                description: 'La nostra selezione di pizze artigianali'
            }),
            this._createMenuCategory({
                id: MENU_SECTIONS.BEVERAGES,
                label: 'Bevande',
                active: false,
                available: false,
                icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBGk6RVGFR4_qZrKEJbNjHYC6FxXq9bXEz7Jue21Ajo9g0J93qmrmY0GIKRlpXBcP4GEk3dM5a_pgnvarHYx5TEcFRd-Nu54lgGKvBK4aluSvht8f3FCK2jzsykaJejrwAyWDr70Sf_hCsjGGmrlmlrn1uyGGyy03SFlSEx3KJHsprqYw7a87DGuS7fwmuSYNFEb9Z45e8Flc5y3yIIe5fY9iJT0wBjvidtiyPGa4jMYz7aHsnt_QVhQq_nQO-kM9GCvYdnD_7J124l',
                description: 'Bevande per accompagnare le pizze'
            }),
            this._createMenuCategory({
                id: MENU_SECTIONS.FRITTATINAS,
                label: 'Frittatine',
                active: false,
                available: false,
                icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuB0BhfUAfjRZcmysDs33FaYEYacvbXAUSxQyS-Op1450aBA89CWFihuXH8iuCeFmnVcgD0KoaQp1_EXVBFUa1EY41OhinsmhCA8YTMUcRS2maidPVVAX8VwoSwW1llzxVifpJL0qtT1nSUgXXLQukTmwP9cdNZDTTwHb7WQX6SqhV6bR2Es7rPKtlXP8XjinpPitSW5c71WapRyKG7LauoECP5FDuC_1vjMuem61oreguVJFsTQ7BGsIg8O6DwutkL2TKQqsB6cOj4S',
                description: 'Antipasti e stuzzichini napoletani'
            }),
            this._createMenuCategory({
                id: MENU_SECTIONS.DESSERTS,
                label: 'Dessert',
                active: false,
                available: false,
                icon: 'https://lh3.googleusercontent.com/aida-public/AB6AXuChHQ8n-yoTAG8RHisLQrXHLpUKk8PdyCCyRZJ6EXpupFmEkTdpHhGjdmvZTU3NNXm4VXwbyp9JGHWQA1542ml_0o9e1SY_qtuE_K_iEPqYx8Y1uOK139m1_RBBmRChhPS0c9Z-LgFRqXOjG08E9n9-IUr1QiGtxqBD8L_Eh8VXKlpcJ6hBEe3OsRICOjpjnh5jjcwAaVZCl21uzwm00oIXtiF-MQVuLD2RxSK3e0Rdqw4jOUVI4JvEqBxdbMyu9kZ6Ox2XKXoFCAAN',
                description: 'Dolci della tradizione italiana'
            })
        ];
    }

    /**
     * Private: Create normalized menu category object
     * @param {Object} categoryData - Raw category data
     * @returns {Object} Normalized menu category
     */
    _createMenuCategory(categoryData) {
        return {
            id: categoryData.id,
            label: categoryData.label || '',
            active: categoryData.active || false,
            available: categoryData.available || false,
            icon: categoryData.icon || '',
            description: categoryData.description || ''
        };
    }
}