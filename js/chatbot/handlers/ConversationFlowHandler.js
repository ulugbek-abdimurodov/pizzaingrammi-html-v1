/**
 * Conversation Flow Handler
 * Manages the chatbot conversation logic and flow
 */

import { CONVERSATION_STEPS, RESPONSE_TEMPLATES, PIZZA_CATEGORIES } from '../core/Constants.js';
import { getDessertsByCategory } from '../data/desserts.js';
import { getBeveragesByCategory } from '../data/beverages.js';
import { getFrittatinasbyCategory } from '../data/frittatinas.js';

export class ConversationFlowHandler {
    constructor(conversationState, services, components) {
        this.conversationState = conversationState;
        this.services = services;
        this.components = components;
        this.chatInterface = components.chatInterface;
    }

    /**
     * Process user choice and advance conversation
     * @param {string} choice - User's choice value
     * @param {Object} metadata - Additional choice metadata
     */
    async processUserChoice(choice, metadata = {}) {
        const currentStep = this.conversationState.getCurrentStep();
        
        try {
            switch (currentStep) {
                case CONVERSATION_STEPS.GREETING:
                    await this._handleGreetingChoice(choice);
                    break;
                case CONVERSATION_STEPS.TAG_REFINEMENT:
                    await this._handleTagChoice(choice);
                    break;
                case CONVERSATION_STEPS.PIZZA_SELECTION:
                    await this._handlePizzaSelection(choice);
                    break;
                case CONVERSATION_STEPS.COMPANION_SELECTION:
                    await this._handleCompanionChoice(choice);
                    break;
                case CONVERSATION_STEPS.GLUTEN_FREE_ECOSYSTEM:
                    await this._handleGlutenFreeChoice(choice);
                    break;
                default:
                    await this._handleSpecialAction(choice);
            }
        } catch (error) {
            console.error('Error processing user choice:', error);
            await this._handleError();
        }
    }

    /**
     * Get greeting options
     * @returns {Object[]} Array of greeting options
     */
    getGreetingOptions() {
        return [
            { 
                text: "🍕 Pizze Classiche Tradizionali", 
                value: PIZZA_CATEGORIES.CLASSICA,
                description: "Le nostre ricette napoletane autentiche" 
            },
            { 
                text: "🎨 Pizze d'Autore Gourmet", 
                value: PIZZA_CATEGORIES.PIZZE_AUTORE,
                description: "Creazioni uniche e raffinate" 
            },
            { 
                text: "🌱 Pizze Vegane", 
                value: PIZZA_CATEGORIES.VEGANA,
                description: "Deliziose opzioni plant-based" 
            },
            { 
                text: "🚫 Pizze Senza Glutine", 
                value: PIZZA_CATEGORIES.SENZA_GLUTINE,
                description: "Sicure per celiaci" 
            },
            { 
                text: "📋 Mostra Tutto il Menu", 
                value: PIZZA_CATEGORIES.ALL,
                description: "Esplora tutte le nostre pizze" 
            }
        ];
    }

    /**
     * Private: Handle greeting choice
     * @param {string} choice - Selected category
     */
    async _handleGreetingChoice(choice) {
        this.conversationState.setSelectedCategory(choice);
        
        if (choice === PIZZA_CATEGORIES.SENZA_GLUTINE) {
            this.conversationState.setCurrentStep(CONVERSATION_STEPS.GLUTEN_FREE_ECOSYSTEM);
            await this._showGlutenFreeEcosystem();
        } else {
            // Apply filter to main UI
            this._applyMainUIFilter(choice);
            
            // Show category response
            const response = RESPONSE_TEMPLATES.CATEGORY_SELECTED[choice];
            await this.chatInterface.showBotMessage(response);
            
            // Show available tags for refinement
            const tags = this._getTagsForCategory(choice);
            if (tags.length > 0) {
                this.conversationState.setCurrentStep(CONVERSATION_STEPS.TAG_REFINEMENT);
                await this._delay(800);
                await this._showTagOptions(tags);
            } else {
                this.conversationState.setCurrentStep(CONVERSATION_STEPS.PIZZA_SELECTION);
                await this._showPizzaSelection();
            }
        }
    }

    /**
     * Private: Handle tag choice
     * @param {string} choice - Selected tag or action
     */
    async _handleTagChoice(choice) {
        if (choice === 'skip_tags') {
            this.conversationState.setCurrentStep(CONVERSATION_STEPS.PIZZA_SELECTION);
            await this._showPizzaSelection();
        } else {
            this.conversationState.addSelectedTag(choice);
            this.conversationState.setCurrentStep(CONVERSATION_STEPS.PIZZA_SELECTION);
            await this._showPizzaSelection();
        }
    }

    /**
     * Private: Handle pizza selection
     * @param {string} choice - Selected pizza ID or action
     */
    async _handlePizzaSelection(choice) {
        if (choice.startsWith('pizza_')) {
            const pizzaId = parseInt(choice.replace('pizza_', ''));
            const pizza = this.services.dataService.getPizzaById(pizzaId);
            
            if (pizza) {
                this.conversationState.setSelectedPizza(pizza);
                this.conversationState.setCurrentStep(CONVERSATION_STEPS.COMPANION_SELECTION);
                
                const message = `Ottima scelta! ${pizza.name} è deliziosa! 😋`;
                await this.chatInterface.showBotMessage(message);
                
                await this._delay(600);
                await this.chatInterface.showBotMessage(RESPONSE_TEMPLATES.PIZZA_SELECTION_COMPLETED);
                
                await this._delay(800);
                await this._showCompanionOptions();
            }
        } else {
            await this._handleSpecialAction(choice);
        }
    }

    /**
     * Private: Handle companion choice
     * @param {string} choice - Selected companion type or action
     */
    async _handleCompanionChoice(choice) {
        const selectedCategory = this.conversationState.getSelectedCategory();
        
        switch (choice) {
            case 'beverages':
                await this._showCompanions('beverages', selectedCategory);
                break;
            case 'frittatinas':
                await this._showCompanions('frittatinas', selectedCategory);
                break;
            case 'desserts':
                await this._showCompanions('desserts', selectedCategory);
                break;
            case 'no_companions':
                await this._finishConversation();
                break;
            default:
                // Handle specific companion selection
                await this._handleSpecificCompanionSelection(choice);
        }
    }

    /**
     * Private: Handle gluten-free ecosystem choice
     * @param {string} choice - Gluten-free option choice
     */
    async _handleGlutenFreeChoice(choice) {
        switch (choice) {
            case 'show_gluten_free_pizzas':
                await this._showGlutenFreePizzas();
                break;
            case 'gluten_free_beverages':
                await this._showGlutenFreeBeverages();
                break;
            case 'gluten_free_frittatinas':
                await this._showGlutenFreeFrittatinas();
                break;
            case 'gluten_free_desserts':
                await this._showGlutenFreeDesserts();
                break;
            case 'complete_gluten_free':
                await this._showCompleteGlutenFreeMenu();
                break;
            default:
                await this._handleSpecialAction(choice);
        }
    }

    /**
     * Private: Handle special actions
     * @param {string} action - Special action
     */
    async _handleSpecialAction(action) {
        switch (action) {
            case 'restart_chat':
                await this._restartConversation();
                break;
            case 'show_categories':
                await this._showCategoryOptions();
                break;
            case 'show_all_pizzas':
                await this._showAllPizzas();
                break;
            case 'view_full_menu':
                await this._viewFullMenu();
                break;
            default:
                await this._handleUnknownAction(action);
        }
    }

    /**
     * Private: Show gluten-free ecosystem
     */
    async _showGlutenFreeEcosystem() {
        await this.chatInterface.showBotMessage(RESPONSE_TEMPLATES.GLUTEN_FREE_ECOSYSTEM);
        
        await this._delay(1000);
        
        const options = [
            { text: "🍕 Vedi Pizze Senza Glutine", value: "show_gluten_free_pizzas" },
            { text: "🥤 Include anche Bevande SG", value: "gluten_free_beverages" },
            { text: "🍟 Include Frittatine SG", value: "gluten_free_frittatinas" },
            { text: "🧁 Include Dessert SG", value: "gluten_free_desserts" },
            { text: "🎯 Menu Completo Senza Glutine", value: "complete_gluten_free" }
        ];
        
        this.chatInterface.showOptions(options);
    }

    /**
     * Private: Show tag options for category
     * @param {string[]} tags - Available tags
     */
    async _showTagOptions(tags) {
        const message = "Perfetto! Cosa ti ispira di più tra queste opzioni?";
        await this.chatInterface.showBotMessage(message);
        
        const options = tags.map(tag => ({
            text: this._getTagDisplayName(tag),
            value: tag,
            description: this._getTagDescription(tag)
        }));
        
        // Add skip option
        options.push({
            text: "📋 Mostra tutte le pizze di questa categoria",
            value: "skip_tags",
            description: "Vedi tutte senza filtri specifici"
        });
        
        this.chatInterface.showOptions(options);
    }

    /**
     * Private: Show pizza selection
     */
    async _showPizzaSelection() {
        const selectedCategory = this.conversationState.getSelectedCategory();
        const selectedTags = this.conversationState.getSelectedTags();
        
        const recommendations = this.services.recommendationService.getPizzaRecommendations(
            selectedCategory, 
            selectedTags
        );
        
        let message = selectedTags.length > 0 
            ? `Ecco le nostre pizze ${selectedCategory} con le caratteristiche che hai scelto:`
            : `Ecco le nostre pizze ${selectedCategory}:`;

        await this.chatInterface.showBotMessage(message);
        await this._delay(500);
        
        // Show pizza cards
        for (const [index, pizza] of recommendations.pizzas.entries()) {
            await this._delay(index * 200);
            const cardElement = this.chatInterface.showPizzaCard(pizza);
            
            if (cardElement) {
                cardElement.addEventListener('click', () => {
                    this.processUserChoice(`pizza_${pizza.id}`);
                });
            }
        }
        
        // Show continue options
        await this._delay(recommendations.pizzas.length * 200 + 500);
        const continueOptions = this._getContinueOptions();
        this.chatInterface.showOptions(continueOptions);
    }

    /**
     * Private: Show companion options
     */
    async _showCompanionOptions() {
        const options = [
            { text: "🥤 Bevande", value: "beverages" },
            { text: "🍟 Frittatine", value: "frittatinas" },
            { text: "🧁 Dessert", value: "desserts" },
            { text: "✅ Solo la pizza, grazie", value: "no_companions" }
        ];
        
        this.chatInterface.showOptions(options);
    }

    /**
     * Private: Show companions of specific type
     * @param {string} type - Companion type
     * @param {string} category - Pizza category
     */
    async _showCompanions(type, category) {
        let companions = [];
        let typeLabel = '';
        
        switch (type) {
            case 'beverages':
                companions = getBeveragesByCategory(category);
                typeLabel = 'bevande';
                break;
            case 'frittatinas':
                companions = getFrittatinasbyCategory(category);
                typeLabel = 'frittatine';
                break;
            case 'desserts':
                companions = getDessertsByCategory(category);
                typeLabel = 'dessert';
                break;
        }
        
        if (companions.length > 0) {
            await this.chatInterface.showBotMessage(`Ecco le nostre ${typeLabel} consigliate:`);
            await this._delay(500);
            
            for (const [index, companion] of companions.entries()) {
                await this._delay(index * 200);
                const cardElement = this.chatInterface.showCompanionCard(companion);
                
                if (cardElement) {
                    cardElement.addEventListener('click', () => {
                        this.processUserChoice(`companion_${companion.id}`);
                    });
                }
            }
        } else {
            await this.chatInterface.showBotMessage(`Le ${typeLabel} arriveranno presto! 🔜`);
        }
        
        await this._delay(1000);
        const finalOptions = this._getFinalOptions();
        this.chatInterface.showOptions(finalOptions);
    }

    /**
     * Private: Finish conversation
     */
    async _finishConversation() {
        this.conversationState.setCurrentStep(CONVERSATION_STEPS.ORDER_SUMMARY);
        await this.chatInterface.showBotMessage(RESPONSE_TEMPLATES.ORDER_COMPLETED);
        
        await this._delay(800);
        const finalOptions = this._getFinalOptions();
        this.chatInterface.showOptions(finalOptions);
    }

    /**
     * Private: Restart conversation
     */
    async _restartConversation() {
        this.conversationState.resetState();
        this.chatInterface.clearMessages();
        
        await this._delay(500);
        await this.chatInterface.showBotMessage(RESPONSE_TEMPLATES.GREETING);
        
        const greetingOptions = this.getGreetingOptions();
        this.chatInterface.showOptions(greetingOptions);
    }

    /**
     * Private: Get tags for category
     * @param {string} category - Pizza category
     * @returns {string[]} Available tags
     */
    _getTagsForCategory(category) {
        return this.services.recommendationService.getAvailableTagsForCategory(category)
            .map(tag => tag.value)
            .slice(0, 4); // Limit to 4 tags for better UX
    }

    /**
     * Private: Get continue options
     * @returns {Object[]} Continue options
     */
    _getContinueOptions() {
        return [
            { text: "🔍 Vedi altre categorie", value: "show_categories" },
            { text: "📋 Tutte le pizze", value: "show_all_pizzas" },
            { text: "🔄 Ricomincia", value: "restart_chat" }
        ];
    }

    /**
     * Private: Get final options
     * @returns {Object[]} Final options
     */
    _getFinalOptions() {
        return [
            { text: "🔍 Altre categorie", value: "show_categories" },
            { text: "📱 Menu completo", value: "view_full_menu" },
            { text: "🔄 Ricomincia", value: "restart_chat" }
        ];
    }

    /**
     * Private: Apply filter to main UI
     * @param {string} category - Category to filter by
     */
    _applyMainUIFilter(category) {
        if (this.services.filterIntegration) {
            this.services.filterIntegration.synchronizeWithMainUI(category);
        }
    }

    /**
     * Private: Get tag display name
     * @param {string} tag - Tag key
     * @returns {string} Display name
     */
    _getTagDisplayName(tag) {
        const displayNames = {
            'popular': '⭐ Più Popolari',
            'traditional': '🏛️ Tradizionali',
            'hot': '🌶️ Piccanti',
            'healthy': '🥗 Leggere',
            'gourmet': '👨‍🍳 Gourmet',
            'cheese': '🧀 Extra Formaggio',
            'premium': '💎 Premium',
            'bestseller': '🏆 Bestseller',
            'hearty': '💪 Sostanziose',
            'protein': '🥩 Ricche di Proteine'
        };
        return displayNames[tag] || tag.charAt(0).toUpperCase() + tag.slice(1);
    }

    /**
     * Private: Get tag description
     * @param {string} tag - Tag key
     * @returns {string} Tag description
     */
    _getTagDescription(tag) {
        const descriptions = {
            'popular': 'Le pizze più amate dai nostri clienti',
            'traditional': 'Ricette classiche della tradizione',
            'hot': 'Per chi ama i sapori piccanti',
            'healthy': 'Opzioni più leggere e salutari',
            'gourmet': 'Ingredienti ricercati e preparazioni elaborate',
            'cheese': 'Generose porzioni di formaggi premium',
            'premium': 'I nostri ingredienti più pregiati',
            'bestseller': 'I nostri piatti più venduti',
            'hearty': 'Pizze abbondanti e sostanziose',
            'protein': 'Ricche di carni e proteine'
        };
        return descriptions[tag] || `Pizze caratterizzate da ${tag}`;
    }

    /**
     * Private: Handle error
     */
    async _handleError() {
        const errorMessage = "Mi dispiace, si è verificato un errore. Riprova o ricomincia la conversazione. 😅";
        await this.chatInterface.showBotMessage(errorMessage);
        
        const restartOptions = [
            { text: "🔄 Ricomincia conversazione", value: "restart_chat" }
        ];
        
        this.chatInterface.showOptions(restartOptions);
    }

    /**
     * Private: Delay utility
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} Promise that resolves after delay
     */
    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    // Placeholder methods for incomplete functionality
    async _showGlutenFreePizzas() { await this._showPizzaSelection(); }
    async _showGlutenFreeBeverages() { await this._showCompanions('beverages', PIZZA_CATEGORIES.SENZA_GLUTINE); }
    async _showGlutenFreeFrittatinas() { await this._showCompanions('frittatinas', PIZZA_CATEGORIES.SENZA_GLUTINE); }
    async _showGlutenFreeDesserts() { await this._showCompanions('desserts', PIZZA_CATEGORIES.SENZA_GLUTINE); }
    async _showCompleteGlutenFreeMenu() { await this._showGlutenFreePizzas(); }
    async _showCategoryOptions() { const options = this.getGreetingOptions(); this.chatInterface.showOptions(options); }
    async _showAllPizzas() { this.conversationState.setSelectedCategory(PIZZA_CATEGORIES.ALL); await this._showPizzaSelection(); }
    async _viewFullMenu() { this.chatInterface.close(); }
    async _handleUnknownAction() { await this._handleError(); }
    async _handleSpecificCompanionSelection(choice) { 
        this.conversationState.addSelectedCompanion({ id: choice });
        await this._finishConversation(); 
    }
}