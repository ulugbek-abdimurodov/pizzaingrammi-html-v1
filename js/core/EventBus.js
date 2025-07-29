/**
 * Event Bus
 * Global event system for decoupled component communication
 */

import { EVENT_TYPES } from './Constants.js';

class EventBus {
    constructor() {
        this._listeners = new Map();
        this._isDebugMode = false;
    }

    /**
     * Subscribe to an event
     * @param {string} eventType - Event type from EVENT_TYPES
     * @param {Function} callback - Callback function
     * @param {Object} context - Optional context for callback
     * @returns {Function} Unsubscribe function
     */
    subscribe(eventType, callback, context = null) {
        this._validateEventType(eventType);
        this._validateCallback(callback);

        if (!this._listeners.has(eventType)) {
            this._listeners.set(eventType, []);
        }

        const listener = { callback, context, id: this._generateId() };
        this._listeners.get(eventType).push(listener);

        this._debug(`Subscribed to ${eventType}`, listener.id);

        return () => this._unsubscribe(eventType, listener.id);
    }

    /**
     * Publish an event
     * @param {string} eventType - Event type from EVENT_TYPES
     * @param {*} data - Event data
     */
    publish(eventType, data = null) {
        this._validateEventType(eventType);

        const listeners = this._listeners.get(eventType) || [];
        
        this._debug(`Publishing ${eventType} to ${listeners.length} listeners`, data);

        listeners.forEach(listener => {
            try {
                if (listener.context) {
                    listener.callback.call(listener.context, data);
                } else {
                    listener.callback(data);
                }
            } catch (error) {
                console.error(`Error in event listener for ${eventType}:`, error);
            }
        });
    }

    /**
     * Subscribe to event only once
     * @param {string} eventType - Event type
     * @param {Function} callback - Callback function
     * @param {Object} context - Optional context
     * @returns {Function} Unsubscribe function
     */
    subscribeOnce(eventType, callback, context = null) {
        const unsubscribe = this.subscribe(eventType, (data) => {
            unsubscribe();
            if (context) {
                callback.call(context, data);
            } else {
                callback(data);
            }
        });

        return unsubscribe;
    }

    /**
     * Clear all listeners for an event type
     * @param {string} eventType - Event type to clear
     */
    clearListeners(eventType) {
        if (this._listeners.has(eventType)) {
            this._listeners.delete(eventType);
            this._debug(`Cleared all listeners for ${eventType}`);
        }
    }

    /**
     * Clear all listeners
     */
    clearAllListeners() {
        this._listeners.clear();
        this._debug('Cleared all listeners');
    }

    /**
     * Enable debug mode
     * @param {boolean} enabled - Whether to enable debug mode
     */
    setDebugMode(enabled) {
        this._isDebugMode = enabled;
    }

    /**
     * Private: Unsubscribe a specific listener
     * @param {string} eventType - Event type
     * @param {string} listenerId - Listener ID
     */
    _unsubscribe(eventType, listenerId) {
        const listeners = this._listeners.get(eventType);
        if (listeners) {
            const index = listeners.findIndex(l => l.id === listenerId);
            if (index !== -1) {
                listeners.splice(index, 1);
                this._debug(`Unsubscribed from ${eventType}`, listenerId);
                
                if (listeners.length === 0) {
                    this._listeners.delete(eventType);
                }
            }
        }
    }

    /**
     * Private: Validate event type
     * @param {string} eventType - Event type to validate
     */
    _validateEventType(eventType) {
        if (!Object.values(EVENT_TYPES).includes(eventType)) {
            throw new Error(`Invalid event type: ${eventType}`);
        }
    }

    /**
     * Private: Validate callback function
     * @param {Function} callback - Callback to validate
     */
    _validateCallback(callback) {
        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }
    }

    /**
     * Private: Generate unique ID
     * @returns {string} Unique identifier
     */
    _generateId() {
        return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Private: Debug logging
     * @param {string} message - Debug message
     * @param {*} data - Optional data
     */
    _debug(message, data = null) {
        if (this._isDebugMode) {
            console.log(`[EventBus] ${message}`, data || '');
        }
    }
}

// Export singleton instance
export const eventBus = new EventBus();