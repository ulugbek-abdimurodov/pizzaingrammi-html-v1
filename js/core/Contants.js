/**
 * Application Constants
 * Central source of truth for all application constants
 */

export const PIZZA_CATEGORIES = {
    ALL: 'all',
    CLASSICA: 'classica',
    PIZZE_AUTORE: 'Pizze-d\'autore',
    VEGANA: 'Vegana',
    SENZA_GLUTINE: 'senza-glutine'
};

export const PIZZA_TAGS = {
    POPULAR: 'popular',
    TRADITIONAL: 'traditional',
    HOT: 'hot',
    HEALTHY: 'healthy',
    GOURMET: 'gourmet',
    CHEESE: 'cheese',
    PREMIUM: 'premium',
    BESTSELLER: 'bestseller',
    HEARTY: 'hearty',
    PROTEIN: 'protein'
};

export const MENU_SECTIONS = {
    PIZZAS: 'pizzas',
    BEVERAGES: 'beverages',
    FRITTATINAS: 'frittatinas',
    DESSERTS: 'desserts'
};

export const CSS_CLASSES = {
    FILTER: {
        BUTTON: 'filter-btn',
        ACTIVE: 'active',
        CONTAINER: 'filter-container'
    },
    PIZZA: {
        ITEM: 'pizza-item',
        CONTENT: 'pizza-item-content',
        IMAGE: 'pizza-item-image',
        HIDDEN: 'hidden',
        FADE_IN: 'fade-in'
    },
    BADGE: {
        CLASSICA: 'badge-classica',
        PIZZE_AUTORE: 'badge-Pizze-d\'autore',
        VEGANA: 'badge-Vegana',
        SENZA_GLUTINE: 'badge-senza-glutine'
    }
};

export const DOM_SELECTORS = {
    HEADER: '#header',
    FEATURED_SECTION: '#featured-section',
    MENU_NAVIGATION: '#menu-navigation',
    FILTER_SECTION: '#filter-section',
    MENU_ITEMS: '#menu-items'
};

export const EVENT_TYPES = {
    FILTER_CHANGED: 'filterChanged',
    PIZZA_SELECTED: 'pizzaSelected',
    CATEGORY_CHANGED: 'categoryChanged',
    SEARCH_PERFORMED: 'searchPerformed',
    DATA_LOADED: 'dataLoaded',
    ERROR_OCCURRED: 'errorOccurred'
};

export const ANIMATION_TIMINGS = {
    FAST: 200,
    NORMAL: 300,
    SLOW: 500,
    FILTER_ANIMATION: 300,
    CARD_STAGGER: 100
};

export const UI_CONFIG = {
    MAX_PIZZAS_PER_PAGE: 50,
    SEARCH_DEBOUNCE_MS: 300,
    ERROR_DISPLAY_DURATION_MS: 5000
};

export const VALIDATION_RULES = {
    PIZZA: {
        REQUIRED_FIELDS: ['id', 'name', 'description', 'price', 'category'],
        MAX_NAME_LENGTH: 100,
        MAX_DESCRIPTION_LENGTH: 500,
        MIN_PRICE: 0,
        MAX_PRICE: 1000
    }
};

export const DEFAULT_VALUES = {
    PIZZA_IMAGE: 'https://via.placeholder.com/300x200/494222/eec80b?text=Pizza',
    EMPTY_ARRAY: Object.freeze([]),
    EMPTY_OBJECT: Object.freeze({})
};