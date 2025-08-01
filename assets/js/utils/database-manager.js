// Database Manager - Clean Architecture
class DatabaseManager {
    constructor() {
        this.currentCategory = 'pizzas';
        this.databases = {
            pizzas: PizzaDatabase,
            frittatinas: FrittatinaDatabase,
            beverages: BeverageDatabase,
            desserts: DessertDatabase
        };
    }

    // Get current database based on active category
    getCurrentDatabase() {
        return this.databases[this.currentCategory] || this.databases.pizzas;
    }

    // Get menu items for current category
    getMenuItems() {
        const db = this.getCurrentDatabase();
        return db.menuItems || [];
    }

    // Get filter options for current category
    getFilterOptions() {
        const db = this.getCurrentDatabase();
        return db.filterOptions || [];
    }

    // Get filtered items based on active filters
    getFilteredItems(activeFilters) {
        const db = this.getCurrentDatabase();
        return db.getFilteredItems ? db.getFilteredItems(activeFilters) : this.getMenuItems();
    }

    // Get badge class for a category
    getBadgeClass(category) {
        const db = this.getCurrentDatabase();
        return db.getBadgeClass ? db.getBadgeClass(category) : 'badge-default';
    }

    // Change current category
    setCategory(category) {
        if (this.databases[category]) {
            this.currentCategory = category;
            return true;
        }
        return false;
    }

    // Get all menu categories
    getMenuCategories() {
        return PizzaData.menuCategories || [];
    }

    // Get featured items
    getFeaturedItems() {
        return PizzaData.featuredItems || [];
    }
}

// Initialize global database manager
const dbManager = new DatabaseManager(); 