/**
 * Service Locator
 * Dependency injection container for managing services
 */

class ServiceLocator {
    constructor() {
        this._services = new Map();
        this._singletons = new Map();
    }

    /**
     * Register a service
     * @param {string} name - Service name
     * @param {Function|Object} service - Service constructor or instance
     * @param {boolean} singleton - Whether to treat as singleton
     */
    register(name, service, singleton = true) {
        this._validateServiceName(name);
        this._validateService(service);

        this._services.set(name, { service, singleton });
        
        if (singleton && typeof service === 'function') {
            // Pre-instantiate singleton
            this._singletons.set(name, new service());
        } else if (singleton) {
            // Already an instance
            this._singletons.set(name, service);
        }
    }

    /**
     * Get a service instance
     * @param {string} name - Service name
     * @returns {Object} Service instance
     */
    get(name) {
        this._validateServiceName(name);

        if (!this._services.has(name)) {
            throw new Error(`Service '${name}' not registered`);
        }

        const { service, singleton } = this._services.get(name);

        if (singleton) {
            return this._singletons.get(name);
        }

        // Create new instance for non-singletons
        if (typeof service === 'function') {
            return new service();
        }

        return service;
    }

    /**
     * Check if service is registered
     * @param {string} name - Service name
     * @returns {boolean} True if registered
     */
    has(name) {
        return this._services.has(name);
    }

    /**
     * Unregister a service
     * @param {string} name - Service name
     */
    unregister(name) {
        this._services.delete(name);
        this._singletons.delete(name);
    }

    /**
     * Clear all services
     */
    clear() {
        this._services.clear();
        this._singletons.clear();
    }

    /**
     * Get all registered service names
     * @returns {string[]} Array of service names
     */
    getRegisteredServices() {
        return Array.from(this._services.keys());
    }

    /**
     * Private: Validate service name
     * @param {string} name - Service name to validate
     */
    _validateServiceName(name) {
        if (!name || typeof name !== 'string') {
            throw new Error('Service name must be a non-empty string');
        }
    }

    /**
     * Private: Validate service
     * @param {Function|Object} service - Service to validate
     */
    _validateService(service) {
        if (!service || (typeof service !== 'function' && typeof service !== 'object')) {
            throw new Error('Service must be a constructor function or object instance');
        }
    }
}

// Export singleton instance
export const serviceLocator = new ServiceLocator();