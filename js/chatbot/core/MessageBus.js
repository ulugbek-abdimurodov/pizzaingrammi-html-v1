/**
 * Message Bus for Component Communication
 * Implements Observer pattern for decoupled component communication
 */

import { EVENT_TYPES } from './Constants.js';

export class MessageBus {
    constructor() {
        this._listeners = new Map();
        this._eventHistory = [];
        this._isDebugMode = false;
    }

    /**
     * Subscribe to an event
     * @param {string} eventType - Type of event to listen for
     * @param {Function} callback - Function to call when event is triggered
     * @param {Object} context - Context for the callback (optional)
     * @returns {Function} Unsubscribe function
     */
    subscribe(eventType, callback, context = null) {
        if (!this._isValidEventType(eventType)) {
            throw new Error(`Invalid event type: ${eventType}`);
        }

        if (typeof callback !== 'function') {
            throw new Error('Callback must be a function');
        }

        if (!this._listeners.has(eventType)) {
            this._listeners.set(eventType, []);
        }

        const listener = {
            callback,
            context,
            id: this._generateListenerId()
        };

        this._listeners.get(eventType).push(listener);

        this._logDebug(`Subscribed to ${eventType}`, { listenerId: listener.id });

        // Return unsubscribe function
        return () => this._unsubscribe(eventType, listener.id);
    }

    /**
     * Publish an event
     * @param {string} eventType - Type of event to publish
     * @param {*} data - Data to send with the event
     */
    publish(eventType, data = null) {
        if (!this._isValidEventType(eventType)) {
            throw new Error(`Invalid event type: ${eventType}`);
        }

        const event = {
            type: eventType,
            data,
            timestamp: Date.now(),
            id: this._generateEventId()
        };

        this._addToHistory(event);
        this._logDebug(`Publishing ${eventType}`, { eventId: event.id, data });

        const listeners = this._listeners.get(eventType) || [];
        
        listeners.forEach(listener => {
            try {
                if (listener.context) {
                    listener.callback.call(listener.context, event);
                } else {
                    listener.callback(event);
                }
            } catch (error) {
                console.error(`Error in event listener for ${eventType}:`, error);
            }
        });

        this._logDebug(`Published ${eventType} to ${listeners.length} listeners`);
    }

    /**
     * Subscribe to multiple events with the same callback
     * @param {string[]} eventTypes - Array of event types
     * @param {Function} callback - Callback function
     * @param {Object} context - Context for callback
     * @returns {Function[]} Array of unsubscribe functions
     */
    subscribeToMultiple(eventTypes, callback, context = null) {
        return eventTypes.map(eventType => 
            this.subscribe(eventType, callback, context)
        );
    }

    /**
     * Subscribe to an event only once
     * @param {string} eventType - Type of event to listen for
     * @param {Function} callback - Function to call when event is triggered
     * @param {Object} context - Context for the callback
     * @returns {Function} Unsubscribe function
     */
    subscribeOnce(eventType, callback, context = null) {
        const unsubscribe = this.subscribe(eventType, (event) => {
            unsubscribe();
            if (context) {
                callback.call(context, event);
            } else {
                callback(event);
            }
        });

        return unsubscribe;
    }

    /**
     * Check if there are any listeners for an event type
     * @param {string} eventType - Event type to check
     * @returns {boolean} True if there are listeners
     */
    hasListeners(eventType) {
        const listeners = this._listeners.get(eventType);
        return listeners && listeners.length > 0;
    }

    /**
     * Get number of listeners for an event type
     * @param {string} eventType - Event type to check
     * @returns {number} Number of listeners
     */
    getListenerCount(eventType) {
        const listeners = this._listeners.get(eventType);
        return listeners ? listeners.length : 0;
    }

    /**
     * Clear all listeners for an event type
     * @param {string} eventType - Event type to clear
     */
    clearListeners(eventType) {
        if (this._listeners.has(eventType)) {
            this._listeners.delete(eventType);
            this._logDebug(`Cleared all listeners for ${eventType}`);
        }
    }

    /**
     * Clear all listeners for all events
     */
    clearAllListeners() {
        this._listeners.clear();
        this._logDebug('Cleared all listeners');
    }

    /**
     * Get event history (for debugging)
     * @param {number} limit - Maximum number of events to return
     * @returns {Object[]} Array of recent events
     */
    getEventHistory(limit = 10) {
        return this._eventHistory.slice(-limit);
    }

    /**
     * Enable or disable debug mode
     * @param {boolean} enabled - Whether to enable debug mode
     */
    setDebugMode(enabled) {
        this._isDebugMode = enabled;
        this._logDebug(`Debug mode ${enabled ? 'enabled' : 'disabled'}`);
    }

    /**
     * Wait for a specific event to be published
     * @param {string} eventType - Event type to wait for
     * @param {number} timeout - Timeout in milliseconds (optional)
     * @returns {Promise} Promise that resolves with the event data
     */
    waitForEvent(eventType, timeout = null) {
        return new Promise((resolve, reject) => {
            let timeoutId = null;
            
            const unsubscribe = this.subscribeOnce(eventType, (event) => {
                if (timeoutId) {
                    clearTimeout(timeoutId);
                }
                resolve(event);
            });

            if (timeout) {
                timeoutId = setTimeout(() => {
                    unsubscribe();
                    reject(new Error(`Timeout waiting for event: ${eventType}`));
                }, timeout);
            }
        });
    }

    /**
     * Private: Unsubscribe a specific listener
     * @param {string} eventType - Event type
     * @param {string} listenerId - ID of listener to remove
     */
    _unsubscribe(eventType, listenerId) {
        const listeners = this._listeners.get(eventType);
        if (listeners) {
            const index = listeners.findIndex(l => l.id === listenerId);
            if (index !== -1) {
                listeners.splice(index, 1);
                this._logDebug(`Unsubscribed from ${eventType}`, { listenerId });
                
                if (listeners.length === 0) {
                    this._listeners.delete(eventType);
                }
            }
        }
    }

    /**
     * Private: Validate event type
     * @param {string} eventType - Event type to validate
     * @returns {boolean} True if valid
     */
    _isValidEventType(eventType) {
        return typeof eventType === 'string' && 
               Object.values(EVENT_TYPES).includes(eventType);
    }

    /**
     * Private: Generate unique listener ID
     * @returns {string} Unique ID
     */
    _generateListenerId() {
        return `listener_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Private: Generate unique event ID
     * @returns {string} Unique ID
     */
    _generateEventId() {
        return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    }

    /**
     * Private: Add event to history
     * @param {Object} event - Event to add to history
     */
    _addToHistory(event) {
        this._eventHistory.push(event);
        
        // Keep only last 100 events to prevent memory issues
        if (this._eventHistory.length > 100) {
            this._eventHistory = this._eventHistory.slice(-100);
        }
    }

    /**
     * Private: Log debug information
     * @param {string} message - Debug message
     * @param {Object} data - Additional data
     */
    _logDebug(message, data = null) {
        if (this._isDebugMode) {
            console.log(`[MessageBus] ${message}`, data || '');
        }
    }
}

// Export singleton instance
export const messageBus = new MessageBus();