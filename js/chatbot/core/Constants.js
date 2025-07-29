/**
 * Constants and Enums for Chatbot System
 * Single source of truth for all magic strings and numbers
 */

export const CONVERSATION_STEPS = {
    GREETING: 'greeting',
    CATEGORY_SELECTION: 'category_selection',
    TAG_REFINEMENT: 'tag_refinement',
    PIZZA_SELECTION: 'pizza_selection',
    COMPANION_SELECTION: 'companion_selection',
    GLUTEN_FREE_ECOSYSTEM: 'gluten_free_ecosystem',
    ORDER_SUMMARY: 'order_summary'
};

export const PIZZA_CATEGORIES = {
    ALL: 'all',
    CLASSICA: 'classica',
    PIZZE_AUTORE: 'Pizze-d\'autore',
    VEGANA: 'Vegana',
    SENZA_GLUTINE: 'senza-glutine'
};

export const COMPANION_TYPES = {
    BEVERAGES: 'beverages',
    FRITTATINAS: 'frittatinas',
    DESSERTS: 'desserts'
};

export const MESSAGE_TYPES = {
    BOT: 'bot',
    USER: 'user',
    SYSTEM: 'system'
};

export const UI_TIMING = {
    TYPING_INDICATOR_DURATION: 1200,
    MESSAGE_ANIMATION_DELAY: 300,
    OPTION_STAGGER_DELAY: 100,
    CARD_ANIMATION_DELAY: 200,
    CHATBOT_OPEN_DELAY: 500
};

export const UI_LIMITS = {
    MAX_PIZZAS_PER_DISPLAY: 6,
    MAX_COMPANIONS_PER_TYPE: 4,
    MAX_MESSAGE_HISTORY: 50
};

export const CSS_CLASSES = {
    CHATBOT: {
        CONTAINER: 'chatbot-container',
        BUTTON: 'chatbot-button',
        MESSAGES: 'chatbot-messages',
        OPTIONS: 'chatbot-options',
        TYPING: 'typing-indicator'
    },
    ANIMATIONS: {
        FADE_IN: 'message-fade-in',
        OPTION_HOVER: 'option-hover',
        PIZZA_CARD_HOVER: 'pizza-card-hover'
    },
    STATES: {
        HIDDEN: 'hidden',
        VISIBLE: 'visible',
        ACTIVE: 'active'
    }
};

export const EVENT_TYPES = {
    CONVERSATION_STEP_CHANGED: 'conversationStepChanged',
    PIZZA_SELECTED: 'pizzaSelected',
    COMPANION_SELECTED: 'companionSelected',
    FILTER_APPLIED: 'filterApplied',
    CHATBOT_OPENED: 'chatbotOpened',
    CHATBOT_CLOSED: 'chatbotClosed'
};

export const FILTER_INTEGRATION = {
    FILTER_MANAGER_REFERENCE: 'FilterManager',
    PIZZA_DATA_REFERENCE: 'PizzaData'
};

export const RESPONSE_TEMPLATES = {
    GREETING: "Ciao! 👋 Benvenuto da Pizzaingrammi! Sono qui per aiutarti a trovare la pizza perfetta per te. Che tipo di esperienza culinaria cerchi oggi?",
    CATEGORY_SELECTED: {
        [PIZZA_CATEGORIES.CLASSICA]: "Eccellente scelta! Le nostre pizze classiche sono preparate secondo la tradizione napoletana con ingredienti DOP. Cosa ti ispira di più?",
        [PIZZA_CATEGORIES.PIZZE_AUTORE]: "Perfetto per gli intenditori! Le nostre pizze d'autore combinano creatività e qualità premium. Che sapore cerchi?",
        [PIZZA_CATEGORIES.VEGANA]: "Fantastico! Le nostre pizze vegane sono ricche di sapore e completamente plant-based. Quale tipo di esperienza preferisci?",
        [PIZZA_CATEGORIES.SENZA_GLUTINE]: "Ottima scelta! Tutte le nostre opzioni senza glutine sono certificate e sicure. Cosa ti attira di più?",
        [PIZZA_CATEGORIES.ALL]: "Ecco tutto il nostro menu! Hai qualche preferenza particolare?"
    },
    PIZZA_SELECTION_COMPLETED: "Ottima scelta! 🍕 Vuoi completare il tuo pasto con qualcosa di complementare?",
    GLUTEN_FREE_ECOSYSTEM: "Perfetto! Per le nostre opzioni senza glutine, posso consigliarti un'esperienza completa. Iniziamo con le pizze e poi ti suggerirò bevande, frittatine e dolci tutti certificati senza glutine!",
    ORDER_COMPLETED: "Perfetto! Spero che la tua scelta ti piaccia! 😊"
};

export const TAG_DISPLAY_NAMES = {
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

export const TAG_DESCRIPTIONS = {
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