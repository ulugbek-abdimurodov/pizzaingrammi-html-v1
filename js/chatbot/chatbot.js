/**
 * Main Chatbot Orchestrator
 * Coordinates all chatbot components and services
 */

import { ConversationState } from './core/ConversationState.js';
import { messageBus } from './core/MessageBus.js';
import { DataService } from './services/DataService.js';
import { RecommendationService } from './services/RecommendationService.js';
import { FilterIntegrationService } from './services/FilterIntegrationService.js';
import { ChatInterface } from './components/ChatInterface.js';
import { ConversationFlowHandler } from './handlers/ConversationFlowHandler.js';
import { 
    CONVERSATION_STEPS, 
    EVENT_TYPES, 
    UI_TIMING,
    RESPONSE_TEMPLATES 
} from './core/Constants.js';

export class PizzaChatbot {
    constructor() {
        this.isInitialized = false;
        this.isOpen = false;
        this.services = {};
        this.components = {};
        this.handlers = {};
        this.conversationState = new ConversationState();
    }

    /**
     * Initialize the chatbot system
     */
    async init() {
        if (this.isInitialized) {
            console.warn('Chatbot already initialized');
            return;
        }

        try {
            await this._initializeServices();
            await this._initializeComponents();
            await this._initializeHandlers();
            this._bindEvents();
            
            this.isInitialized = true;
            console.log('🍕 Pizzaingrammi Chatbot initialized successfully!');
            
            // Publish initialization event
            messageBus.publish(EVENT_TYPES.CHATBOT_OPENED, {
                timestamp: Date.now()
            });

        } catch (error) {
            console.error('Error initializing chatbot:', error);
            throw new Error('Failed to initialize chatbot');
        }
    }

    /**
     * Open the chatbot interface
     */
    async openChatbot() {
        if (!this.isInitialized) {
            await this.init();
        }

        if (this.isOpen) {
            return;
        }

        this.isOpen = true;
        await this.components.chatInterface.open();
        
        // Start conversation if this is the first time
        if (this.conversationState.getConversationHistory().length === 0) {
            await this._startConversation();
        }

        messageBus.publish(EVENT_TYPES.CHATBOT_OPENED, {
            timestamp: Date.now()
        });
    }

    /**
     * Close the chatbot interface
     */
    async closeChatbot() {
        if (!this.isOpen) {
            return;
        }

        this.isOpen = false;
        await this.components.chatInterface.close();

        messageBus.publish(EVENT_TYPES.CHATBOT_CLOSED, {
            timestamp: Date.now()
        });
    }

    /**
     * Process user input/choice
     * @param {string} userChoice - User's choice or input
     * @param {Object} metadata - Additional metadata about the choice
     */
    async processUserChoice(userChoice, metadata = {}) {
        if (!this.isInitialized) {
            console.error('Chatbot not initialized');
            return;
        }

        try {
            // Add user message to conversation history
            this.conversationState.addToHistory({
                content: userChoice,
                sender: 'user',
                metadata
            });

            // Show user message in UI
            this.components.chatInterface.showUserMessage(userChoice);

            // Process the choice through the flow handler
            await this.handlers.conversationFlow.processUserChoice(userChoice, metadata);

        } catch (error) {
            console.error('Error processing user choice:', error);
            await this._handleError(error);
        }
    }

    /**
     * Reset conversation to beginning
     */
    async restartConversation() {
        this.conversationState.resetState();
        this.components.chatInterface.clearMessages();
        await this._startConversation();
    }

    /**
     * Get conversation state (for debugging or persistence)
     * @returns {Object} Current conversation state
     */
    getConversationState() {
        return this.conversationState.getStateSnapshot();
    }

    /**
     * Check if chatbot is ready to use
     * @returns {boolean} True if chatbot is ready
     */
    isReady() {
        return this.isInitialized && 
               this.services.dataService.isDataSourceValid();
    }

    /**
     * Get chatbot capabilities and status
     * @returns {Object} Chatbot status information
    */
    getStatus() {
        return {
            isInitialized: this.isInitialized,
            isOpen: this.isOpen,
            isReady: this.isReady(),
            currentStep: this.conversationState.getCurrentStep(),
            dataSourceValid: this.services.dataService?.isDataSourceValid() || false,
            filterIntegrationAvailable: this.services.filterIntegration?.getFilterManagerCapabilities().available || false,
            conversationHistory: this.conversationState.getConversationHistory().length
        };
    }

    /**
     * Private: Initialize all services
     */
    async _initializeServices() {
        this.services.dataService = new DataService();
        this.services.recommendationService = new RecommendationService(this.services.dataService);
        this.services.filterIntegration = new FilterIntegrationService();

        // Validate data service
        if (!this.services.dataService.isDataSourceValid()) {
            throw new Error('Data source not available');
        }
    }

    /**
     * Private: Initialize UI components
     */
    async _initializeComponents() {
        this.components.chatInterface = new ChatInterface();
        await this.components.chatInterface.init();
    }

    /**
     * Private: Initialize conversation handlers
     */
    async _initializeHandlers() {
        this.handlers.conversationFlow = new ConversationFlowHandler(
            this.conversationState,
            this.services,
            this.components
        );
    }

    /**
     * Private: Bind global events
     */
    _bindEvents() {
        // Listen for conversation step changes
        messageBus.subscribe(EVENT_TYPES.CONVERSATION_STEP_CHANGED, (event) => {
            this._onConversationStepChanged(event.data);
        });

        // Listen for pizza selection
        messageBus.subscribe(EVENT_TYPES.PIZZA_SELECTED, (event) => {
            this._onPizzaSelected(event.data);
        });

        // Listen for companion selection
        messageBus.subscribe(EVENT_TYPES.COMPANION_SELECTED, (event) => {
            this._onCompanionSelected(event.data);
        });

        // Handle window events
        window.addEventListener('beforeunload', () => {
            this._cleanup();
        });
    }

    /**
     * Private: Start the conversation
     */
    async _startConversation() {
        this.conversationState.setCurrentStep(CONVERSATION_STEPS.GREETING);
        
        await this._delay(UI_TIMING.CHATBOT_OPEN_DELAY);
        
        await this.components.chatInterface.showBotMessage(
            RESPONSE_TEMPLATES.GREETING
        );

        // Show initial options
        const greetingOptions = this.handlers.conversationFlow.getGreetingOptions();
        await this._delay(UI_TIMING.MESSAGE_ANIMATION_DELAY);
        this.components.chatInterface.showOptions(greetingOptions);
    }

    /**
     * Private: Handle conversation step changes
     * @param {Object} stepData - Step change data
     */
    _onConversationStepChanged(stepData) {
        console.log(`Conversation step changed to: ${stepData.newStep}`);
        
        // Apply any necessary UI updates based on step
        this._updateUIForStep(stepData.newStep);
    }

    /**
     * Private: Handle pizza selection
     * @param {Object} pizzaData - Selected pizza data
     */
    _onPizzaSelected(pizzaData) {
        console.log(`Pizza selected: ${pizzaData.pizza.name}`);
        
        // Apply filter to main UI if available
        if (this.conversationState.getSelectedCategory()) {
            this.services.filterIntegration.synchronizeWithMainUI(
                this.conversationState.getSelectedCategory()
            );
        }
    }

    /**
     * Private: Handle companion selection
     * @param {Object} companionData - Selected companion data
     */
    _onCompanionSelected(companionData) {
        console.log(`Companion selected: ${companionData.companion.name}`);
    }

    /**
     * Private: Update UI for specific conversation step
     * @param {string} step - Conversation step
     */
    _updateUIForStep(step) {
        switch (step) {
            case CONVERSATION_STEPS.PIZZA_SELECTION:
                // Could highlight menu section
                break;
            case CONVERSATION_STEPS.ORDER_SUMMARY:
                // Could show summary in a special format
                break;
        }
    }

    /**
     * Private: Handle errors gracefully
     * @param {Error} error - Error that occurred
     */
    async _handleError(error) {
        console.error('Chatbot error:', error);
        
        const errorMessage = "Mi dispiace, si è verificato un errore. Riprova o ricomincia la conversazione. 😅";
        await this.components.chatInterface.showBotMessage(errorMessage);
        
        // Show restart option
        const restartOptions = [
            {
                text: "🔄 Ricomincia conversazione",
                value: "restart_conversation"
            }
        ];
        
        this.components.chatInterface.showOptions(restartOptions);
    }

    /**
     * Private: Cleanup resources
     */
    _cleanup() {
        // Clear any timeouts or intervals
        // Unsubscribe from events
        messageBus.clearAllListeners();
    }

    /**
     * Private: Utility delay function
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} Promise that resolves after delay
     */
    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}

// Initialize chatbot when DOM is ready
let chatbotInstance = null;

export function initializeChatbot() {
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => {
            setTimeout(() => {
                chatbotInstance = new PizzaChatbot();
                window.PizzaChatbot = chatbotInstance;
            }, 100);
        });
    } else {
        setTimeout(() => {
            chatbotInstance = new PizzaChatbot();
            window.PizzaChatbot = chatbotInstance;
        }, 100);
    }
}

// Auto-initialize
initializeChatbot();