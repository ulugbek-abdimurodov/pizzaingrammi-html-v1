// Database Manager - Clean Architecture with Google Sheets Integration
import GoogleSheetsService from './google-sheets-service.js';

class DatabaseManager {
    constructor() {
        this.currentCategory = 'pizzas';
        this.googleSheetsService = new GoogleSheetsService();
        this.isGoogleSheetsEnabled = false;
        this.isInitialized = false;
        
        // Initialize Google Sheets
        this.initializeGoogleSheets();
    }

    // Initialize Google Sheets integration
    async initializeGoogleSheets() {
        try {
            // Test if Google Sheets is properly configured
            await this.googleSheetsService.fetchSheetData('pizzas');
            this.isGoogleSheetsEnabled = true;
            this.isInitialized = true;
            console.log('✅ Google Sheets integration enabled');
            
            // Emit event that Google Sheets is ready
            window.dispatchEvent(new CustomEvent('googleSheetsReady'));
        } catch (error) {
            console.warn('⚠️ Google Sheets not available, using fallback databases:', error.message);
            this.isGoogleSheetsEnabled = false;
            this.isInitialized = true;
        }
    }

    // Get current database based on active category
    async getCurrentDatabase() {
        console.log(`🔍 Getting database for category: ${this.currentCategory}`);
        console.log(`📊 Google Sheets enabled: ${this.isGoogleSheetsEnabled}`);
        
        if (this.isGoogleSheetsEnabled) {
            try {
                const sheetName = this.getSheetNameForCategory();
                console.log(`📋 Fetching from sheet: ${sheetName}`);
                const data = await this.googleSheetsService.fetchSheetData(sheetName);
                console.log(`📊 Raw data from sheet:`, data);
                
                const db = this.createDatabaseFromData(data, this.currentCategory);
                console.log(`🏗️ Created database:`, db);
                console.log(`🔍 Database menuItems:`, db.menuItems);
                return db;
            } catch (error) {
                console.error('Error fetching from Google Sheets, falling back to local data:', error);
                return this.getFallbackDatabase();
            }
        }
        
        console.log(`⚠️ Using fallback database for ${this.currentCategory}`);
        return this.getFallbackDatabase();
    }

    // Get sheet name for current category
    getSheetNameForCategory() {
        const sheetMap = {
            'pizzas': 'pizzas',
            'frittatinas': 'frittatinas',
            'beverages': 'beverages',
            'desserts': 'desserts'
        };
        return sheetMap[this.currentCategory] || 'pizzas';
    }

    // Create database object from Google Sheets data
    createDatabaseFromData(data, category) {
        console.log(`🏗️ Creating database for category: ${category}`);
        console.log(`📊 Input data:`, data);
        
        const db = {
            menuItems: data,
            filterOptions: this.generateFilterOptions(data),
            getFilteredItems: (activeFilters) => this.filterItems(data, activeFilters),
            getBadgeClass: (cat) => this.getBadgeClassForCategory(cat, category)
        };
        
        console.log(`🏗️ Created database object:`, db);
        console.log(`🍕 Database menuItems:`, db.menuItems);
        
        return db;
    }

    // Generate filter options from data
    generateFilterOptions(data) {
        console.log('🔍 Generating filter options from data:', data);
        
        const categories = new Set();
        const tags = new Set();
        
        data.forEach(item => {
            if (item.category) {
                if (Array.isArray(item.category)) {
                    item.category.forEach(cat => categories.add(cat));
                } else {
                    categories.add(item.category);
                }
            }
            if (item.tags) {
                if (Array.isArray(item.tags)) {
                    item.tags.forEach(tag => tags.add(tag));
                } else {
                    tags.add(item.tags);
                }
            }
        });

        const result = {
            categories: Array.from(categories),
            tags: Array.from(tags)
        };
        
        console.log('✅ Generated filter options:', result);
        return result;
    }

    // Filter items based on active filters
    filterItems(data, activeFilters) {
        console.log('🔍 Filtering items with filters:', activeFilters);
        console.log('📊 Data to filter:', data);
        
        // Handle array format from FilterManager
        if (Array.isArray(activeFilters)) {
            // If 'all' is selected, return all items
            if (activeFilters.includes('all')) {
                console.log('✅ Returning all items (all filter active)');
                return data;
            }
            
            // Filter by categories and tags
            return data.filter(item => {
                // Check if item matches any of the active filters
                const matchesFilter = activeFilters.some(filter => {
                    // Check category
                    if (item.category) {
                        if (Array.isArray(item.category)) {
                            if (item.category.includes(filter)) return true;
                        } else if (item.category === filter) return true;
                    }
                    
                    // Check tags
                    if (item.tags) {
                        if (Array.isArray(item.tags)) {
                            if (item.tags.includes(filter)) return true;
                        } else if (item.tags === filter) return true;
                    }
                    
                    return false;
                });
                
                return matchesFilter;
            });
        }
        
        // Handle object format (legacy support)
        if (!activeFilters || Object.keys(activeFilters).length === 0) {
            return data;
        }

        return data.filter(item => {
            // Category filter
            if (activeFilters.category && activeFilters.category !== 'all') {
                if (Array.isArray(item.category)) {
                    if (!item.category.includes(activeFilters.category)) {
                        return false;
                    }
                } else if (item.category !== activeFilters.category) {
                    return false;
                }
            }

            // Tag filter
            if (activeFilters.tag && activeFilters.tag !== 'all') {
                if (Array.isArray(item.tags)) {
                    if (!item.tags.includes(activeFilters.tag)) {
                        return false;
                    }
                } else if (item.tags !== activeFilters.tag) {
                    return false;
                }
            }

            // Price filter
            if (activeFilters.priceRange) {
                const price = parseFloat(item.price.replace('€', ''));
                if (activeFilters.priceRange === 'low' && price > 8) return false;
                if (activeFilters.priceRange === 'medium' && (price <= 8 || price > 12)) return false;
                if (activeFilters.priceRange === 'high' && price <= 12) return false;
            }

            return true;
        });
    }

    // Get badge class for category
    getBadgeClassForCategory(category, menuType) {
        const badgeClasses = {
            'classica': 'badge-primary',
            'senza-glutine': 'badge-success',
            'vegetariana': 'badge-info',
            'Pizze-d\'autore': 'badge-warning',
            'popular': 'badge-primary',
            'traditional': 'badge-secondary',
            'gourmet': 'badge-warning',
            'hot': 'badge-danger'
        };
        
        return badgeClasses[category] || 'badge-default';
    }

    // Get fallback database (empty when Google Sheets is not available)
    getFallbackDatabase() {
        console.warn(`No data available for ${this.currentCategory} - Google Sheets not connected`);
        return { 
            menuItems: [], 
            filterOptions: { categories: [], tags: [] }, 
            getFilteredItems: () => [], 
            getBadgeClass: () => 'badge-default' 
        };
    }

    // Get menu items for current category
    async getMenuItems() {
        console.log(`🔍 Getting menu items for category: ${this.currentCategory}`);
        
        console.log(`⏳ About to call getCurrentDatabase...`);
        const db = await this.getCurrentDatabase();
        console.log(`📊 Database returned:`, db);
        console.log(`🔍 Database type:`, typeof db);
        console.log(`🔍 Database keys:`, Object.keys(db));
        
        const items = db.menuItems || [];
        console.log(`🍕 Menu items found: ${items.length}`, items);
        console.log(`🔍 Items type:`, typeof items);
        console.log(`🔍 Is array:`, Array.isArray(items));
        
        return items;
    }

    // Get filter options for current category
    async getFilterOptions() {
        const db = await this.getCurrentDatabase();
        return db.filterOptions || {};
    }

    // Get filtered items based on active filters
    async getFilteredItems(activeFilters) {
        const db = await this.getCurrentDatabase();
        return db.getFilteredItems ? db.getFilteredItems(activeFilters) : this.getMenuItems();
    }

    // Get badge class for a category
    async getBadgeClass(category) {
        const db = await this.getCurrentDatabase();
        return db.getBadgeClass ? db.getBadgeClass(category) : 'badge-default';
    }

    // Change current category
    setCategory(category) {
        const validCategories = ['pizzas', 'frittatinas', 'beverages', 'desserts'];
        if (validCategories.includes(category)) {
            this.currentCategory = category;
            return true;
        }
        return false;
    }

    // Get all menu categories
    async getMenuCategories() {
        if (this.isGoogleSheetsEnabled) {
            try {
                const appData = await this.googleSheetsService.fetchSheetData('app_data');
                const processedData = this.googleSheetsService.processAppData(appData);
                
                if (processedData.menuCategories && processedData.menuCategories.length > 0) {
                    return processedData.menuCategories;
                } else {
                    console.warn('No menu categories found in app_data, using defaults');
                }
            } catch (error) {
                console.warn('Error fetching menu categories from Google Sheets:', error);
            }
        }
        
        // Default categories when Google Sheets is not available or no data
        return ['Pizze', 'Bevande', 'Frittatine', 'Dessert'];
    }

    // Get featured items
    async getFeaturedItems() {
        if (this.isGoogleSheetsEnabled) {
            try {
                const appData = await this.googleSheetsService.fetchSheetData('app_data');
                const processedData = this.googleSheetsService.processAppData(appData);
                
                if (processedData.featuredItems && processedData.featuredItems.length > 0) {
                    return processedData.featuredItems;
                } else {
                    console.warn('No featured items found in app_data');
                }
            } catch (error) {
                console.warn('Error fetching featured items from Google Sheets:', error);
            }
        }
        
        // Empty array when Google Sheets is not available or no data
        return [];
    }

    // Refresh data from Google Sheets
    async refreshData() {
        if (this.isGoogleSheetsEnabled) {
            try {
                await this.googleSheetsService.refreshAllData();
                console.log('✅ Data refreshed from Google Sheets');
                return true;
            } catch (error) {
                console.error('Error refreshing data:', error);
                return false;
            }
        }
        return false;
    }

    // Check if Google Sheets is enabled
    isGoogleSheetsAvailable() {
        return this.isGoogleSheetsEnabled;
    }

    // Wait for Google Sheets to be ready
    async waitForInitialization() {
        if (this.isInitialized) {
            return this.isGoogleSheetsEnabled;
        }
        
        return new Promise((resolve) => {
            const checkReady = () => {
                if (this.isInitialized) {
                    resolve(this.isGoogleSheetsEnabled);
                } else {
                    setTimeout(checkReady, 100);
                }
            };
            checkReady();
        });
    }
}

// Initialize global database manager
const dbManager = new DatabaseManager();

// Export for ES6 modules
export { dbManager };
export default dbManager;

// Make it globally available immediately
window.dbManager = dbManager; 