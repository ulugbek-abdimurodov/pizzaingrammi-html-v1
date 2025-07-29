/**
 * Conversation State Manager
 * Manages conversation flow state and user choices with immutable state pattern
 */

import { CONVERSATION_STEPS, PIZZA_CATEGORIES } from './Constants.js';

export class ConversationState {
    constructor() {
        this.resetState();
    }

    /**
     * Initialize state to default values
     */
    resetState() {
        this._state = {
            currentStep: CONVERSATION_STEPS.GREETING,
            userChoices: {
                selectedCategory: null,
                selectedTags: [],
                selectedPizza: null,
                selectedCompanions: []
            },
            conversationHistory: [],
            isGlutenFreeFlow: false
        };
    }

    /**
     * Get current conversation step
     * @returns {string} Current conversation step
     */
    getCurrentStep() {
        return this._state.currentStep;
    }

    /**
     * Set current conversation step
     * @param {string} step - New conversation step
     */
    setCurrentStep(step) {
        if (!this._isValidStep(step)) {
            throw new Error(`Invalid conversation step: ${step}`);
        }
        this._state.currentStep = step;
    }

    /**
     * Get user's selected category
     * @returns {string|null} Selected pizza category
     */
    getSelectedCategory() {
        return this._state.userChoices.selectedCategory;
    }

    /**
     * Set user's selected category
     * @param {string} category - Pizza category
     */
    setSelectedCategory(category) {
        if (!this._isValidCategory(category)) {
            throw new Error(`Invalid pizza category: ${category}`);
        }
        this._state.userChoices.selectedCategory = category;
        this._state.isGlutenFreeFlow = category === PIZZA_CATEGORIES.SENZA_GLUTINE;
    }

    /**
     * Get user's selected tags
     * @returns {string[]} Array of selected tags
     */
    getSelectedTags() {
        return [...this._state.userChoices.selectedTags];
    }

    /**
     * Add a tag to user's selection
     * @param {string} tag - Tag to add
     */
    addSelectedTag(tag) {
        if (!this._state.userChoices.selectedTags.includes(tag)) {
            this._state.userChoices.selectedTags.push(tag);
        }
    }

    /**
     * Remove a tag from user's selection
     * @param {string} tag - Tag to remove
     */
    removeSelectedTag(tag) {
        this._state.userChoices.selectedTags = this._state.userChoices.selectedTags.filter(t => t !== tag);
    }

    /**
     * Clear all selected tags
     */
    clearSelectedTags() {
        this._state.userChoices.selectedTags = [];
    }

    /**
     * Get user's selected pizza
     * @returns {Object|null} Selected pizza object
     */
    getSelectedPizza() {
        return this._state.userChoices.selectedPizza;
    }

    /**
     * Set user's selected pizza
     * @param {Object} pizza - Pizza object
     */
    setSelectedPizza(pizza) {
        if (!pizza || !pizza.id) {
            throw new Error('Invalid pizza object');
        }
        this._state.userChoices.selectedPizza = pizza;
    }

    /**
     * Get user's selected companions
     * @returns {Object[]} Array of selected companion objects
     */
    getSelectedCompanions() {
        return [...this._state.userChoices.selectedCompanions];
    }

    /**
     * Add a companion to user's selection
     * @param {Object} companion - Companion object
     */
    addSelectedCompanion(companion) {
        if (!companion || !companion.id) {
            throw new Error('Invalid companion object');
        }
        
        const existingIndex = this._state.userChoices.selectedCompanions.findIndex(c => c.id === companion.id);
        if (existingIndex === -1) {
            this._state.userChoices.selectedCompanions.push(companion);
        }
    }

    /**
     * Remove a companion from user's selection
     * @param {string} companionId - ID of companion to remove
     */
    removeSelectedCompanion(companionId) {
        this._state.userChoices.selectedCompanions = this._state.userChoices.selectedCompanions.filter(c => c.id !== companionId);
    }

    /**
     * Check if user is in gluten-free flow
     * @returns {boolean} True if gluten-free flow
     */
    isGlutenFreeFlow() {
        return this._state.isGlutenFreeFlow;
    }

    /**
     * Get conversation history
     * @returns {Object[]} Array of conversation messages
     */
    getConversationHistory() {
        return [...this._state.conversationHistory];
    }

    /**
     * Add message to conversation history
     * @param {Object} message - Message object with content, sender, timestamp
     */
    addToHistory(message) {
        if (!message || !message.content || !message.sender) {
            throw new Error('Invalid message object');
        }

        const messageWithTimestamp = {
            ...message,
            timestamp: message.timestamp || Date.now()
        };

        this._state.conversationHistory.push(messageWithTimestamp);
        this._trimHistoryIfNeeded();
    }

    /**
     * Get complete state snapshot (for debugging/persistence)
     * @returns {Object} Deep copy of current state
     */
    getStateSnapshot() {
        return JSON.parse(JSON.stringify(this._state));
    }

    /**
     * Check if category selection is complete
     * @returns {boolean} True if category is selected
     */
    hasCategorySelection() {
        return this._state.userChoices.selectedCategory !== null;
    }

    /**
     * Check if pizza selection is complete
     * @returns {boolean} True if pizza is selected
     */
    hasPizzaSelection() {
        return this._state.userChoices.selectedPizza !== null;
    }

    /**
     * Check if any companions are selected
     * @returns {boolean} True if companions are selected
     */
    hasCompanionSelection() {
        return this._state.userChoices.selectedCompanions.length > 0;
    }

    /**
     * Get next logical conversation step based on current state
     * @returns {string} Next conversation step
     */
    getNextLogicalStep() {
        if (!this.hasCategorySelection()) {
            return CONVERSATION_STEPS.CATEGORY_SELECTION;
        }
        
        if (this.isGlutenFreeFlow() && this._state.currentStep === CONVERSATION_STEPS.CATEGORY_SELECTION) {
            return CONVERSATION_STEPS.GLUTEN_FREE_ECOSYSTEM;
        }
        
        if (!this.hasPizzaSelection()) {
            return this._shouldShowTagRefinement() ? CONVERSATION_STEPS.TAG_REFINEMENT : CONVERSATION_STEPS.PIZZA_SELECTION;
        }
        
        if (!this.hasCompanionSelection() && this._state.currentStep !== CONVERSATION_STEPS.ORDER_SUMMARY) {
            return CONVERSATION_STEPS.COMPANION_SELECTION;
        }
        
        return CONVERSATION_STEPS.ORDER_SUMMARY;
    }

    /**
     * Private: Validate conversation step
     * @param {string} step - Step to validate
     * @returns {boolean} True if valid
     */
    _isValidStep(step) {
        return Object.values(CONVERSATION_STEPS).includes(step);
    }

    /**
     * Private: Validate pizza category
     * @param {string} category - Category to validate
     * @returns {boolean} True if valid
     */
    _isValidCategory(category) {
        return Object.values(PIZZA_CATEGORIES).includes(category);
    }

    /**
     * Private: Determine if tag refinement should be shown
     * @returns {boolean} True if tag refinement is beneficial
     */
    _shouldShowTagRefinement() {
        const category = this.getSelectedCategory();
        if (!category || category === PIZZA_CATEGORIES.ALL) {
            return false;
        }
        
        // Show tag refinement for categories with many options
        return category === PIZZA_CATEGORIES.CLASSICA || category === PIZZA_CATEGORIES.PIZZE_AUTORE;
    }

    /**
     * Private: Trim conversation history to prevent memory issues
     */
    _trimHistoryIfNeeded() {
        const MAX_HISTORY_LENGTH = 50;
        if (this._state.conversationHistory.length > MAX_HISTORY_LENGTH) {
            this._state.conversationHistory = this._state.conversationHistory.slice(-MAX_HISTORY_LENGTH);
        }
    }
}