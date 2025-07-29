/**
 * Chat Interface Component
 * Handles the chatbot UI creation, rendering, and interactions
 */

import { CSS_CLASSES, UI_TIMING } from '../core/Constants.js';

export class ChatInterface {
    constructor() {
        this.isOpen = false;
        this.containerElement = null;
        this.buttonElement = null;
        this.messagesElement = null;
        this.optionsElement = null;
        this.typingElement = null;
    }

    /**
     * Initialize the chat interface
     */
    async init() {
        this._createStyles();
        this._createChatbotHTML();
        this._bindEvents();
    }

    /**
     * Open the chatbot interface
     */
    async open() {
        if (this.isOpen) return;

        this.isOpen = true;
        
        if (this.containerElement && this.buttonElement) {
            this.containerElement.classList.remove('hidden');
            this.buttonElement.style.display = 'none';
            
            await this._delay(10);
            this.containerElement.classList.remove('translate-y-full', 'opacity-0');
            this.containerElement.classList.add('translate-y-0', 'opacity-100', 'opening');
        }
    }

    /**
     * Close the chatbot interface
     */
    async close() {
        if (!this.isOpen) return;

        this.isOpen = false;
        
        if (this.containerElement && this.buttonElement) {
            this.containerElement.classList.remove('translate-y-0', 'opacity-100', 'opening');
            this.containerElement.classList.add('translate-y-full', 'opacity-0');
            
            await this._delay(500);
            this.containerElement.classList.add('hidden');
            this.buttonElement.style.display = 'block';
        }
    }

    /**
     * Show user message
     * @param {string} message - User message content
     */
    showUserMessage(message) {
        if (!this.messagesElement) return;

        const messageElement = document.createElement('div');
        messageElement.className = 'message-container user-message message-fade-in';
        messageElement.innerHTML = `
            <div class="message-bubble user-message">
                ${this._escapeHtml(message)}
            </div>
        `;
        
        this.messagesElement.appendChild(messageElement);
        this._scrollToBottom();
    }

    /**
     * Show bot message with typing animation
     * @param {string} message - Bot message content
     * @param {number} delay - Delay before showing message
     */
    async showBotMessage(message, delay = 0) {
        if (!this.messagesElement) return;

        if (delay > 0) {
            await this._delay(delay);
        }

        await this._showTypingIndicator();
        
        const messageElement = document.createElement('div');
        messageElement.className = 'message-container message-fade-in';
        messageElement.innerHTML = `
            <div class="message-avatar">🍕</div>
            <div class="message-bubble bot-message">
                ${this._escapeHtml(message)}
            </div>
        `;
        
        this.messagesElement.appendChild(messageElement);
        this._scrollToBottom();
    }

    /**
     * Show option buttons
     * @param {Object[]} options - Array of option objects
     */
    showOptions(options) {
        if (!this.optionsElement) return;

        this.optionsElement.innerHTML = '';
        
        options.forEach((option, index) => {
            setTimeout(() => {
                const button = document.createElement('button');
                button.className = 'option-button';
                
                button.innerHTML = `
                    <div class="option-button-title">${this._escapeHtml(option.text)}</div>
                    ${option.description ? `<div class="option-button-description">${this._escapeHtml(option.description)}</div>` : ''}
                `;
                
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this._handleOptionClick(option);
                });
                
                this.optionsElement.appendChild(button);
            }, index * UI_TIMING.OPTION_STAGGER_DELAY);
        });
    }

    /**
     * Show pizza card in chat
     * @param {Object} pizza - Pizza object
     * @returns {HTMLElement} Pizza card element
     */
    showPizzaCard(pizza) {
        if (!this.messagesElement) return null;

        const cardElement = document.createElement('div');
        cardElement.className = 'message-fade-in';
        
        const badgesHTML = pizza.category.map(cat => {
            const badgeClass = this._getBadgeClass(cat);
            return `<span class="text-xs px-2 py-1 rounded-full ${badgeClass}">${cat}</span>`;
        }).join('');
        
        cardElement.innerHTML = `
            <div class="pizza-card-message pizza-card-hover" data-pizza-id="${pizza.id}">
                <div class="pizza-card-content">
                    <img src="${pizza.image}" alt="${pizza.name}" class="pizza-card-image" loading="lazy">
                    <div class="pizza-card-info">
                        <h4 class="pizza-card-name">${this._escapeHtml(pizza.name)}</h4>
                        <p class="pizza-card-description">${this._escapeHtml(pizza.description)}</p>
                        <div class="pizza-card-footer">
                            <div class="pizza-card-badges">
                                ${badgesHTML}
                            </div>
                            <span class="pizza-card-price">${pizza.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        this.messagesElement.appendChild(cardElement);
        this._scrollToBottom();
        
        return cardElement.querySelector('.pizza-card-message');
    }

    /**
     * Show companion card in chat
     * @param {Object} companion - Companion object
     * @returns {HTMLElement} Companion card element
     */
    showCompanionCard(companion) {
        if (!this.messagesElement) return null;

        const cardElement = document.createElement('div');
        cardElement.className = 'message-fade-in';
        
        cardElement.innerHTML = `
            <div class="companion-card" data-companion-id="${companion.id}">
                <div class="companion-card-header">
                    <h4 class="companion-card-name">${this._escapeHtml(companion.name)}</h4>
                    <span class="companion-card-price">${companion.price}</span>
                </div>
                <p class="companion-card-description">${this._escapeHtml(companion.description)}</p>
            </div>
        `;
        
        this.messagesElement.appendChild(cardElement);
        this._scrollToBottom();
        
        return cardElement.querySelector('.companion-card');
    }

    /**
     * Clear all messages
     */
    clearMessages() {
        if (this.messagesElement) {
            this.messagesElement.innerHTML = '';
        }
    }

    /**
     * Clear option buttons
     */
    clearOptions() {
        if (this.optionsElement) {
            this.optionsElement.innerHTML = '';
        }
    }

    /**
     * Check if chatbot is open
     * @returns {boolean} True if open
     */
    isOpened() {
        return this.isOpen;
    }

    /**
     * Private: Create chatbot styles
     */
    _createStyles() {
        const existingStyles = document.getElementById('enhanced-chatbot-styles');
        if (existingStyles) {
            return; // Styles already exist
        }

        const styles = `
            <style id="enhanced-chatbot-styles">
                @keyframes typing-indicator {
                    0%, 20% { opacity: 0.2; }
                    50% { opacity: 1; }
                    100% { opacity: 0.2; }
                }
                
                .typing-dot {
                    animation: typing-indicator 1.4s infinite;
                }
                
                .typing-dot:nth-child(2) { animation-delay: 0.2s; }
                .typing-dot:nth-child(3) { animation-delay: 0.4s; }
                
                .message-fade-in {
                    animation: fadeInUp 0.5s ease-out;
                }
                
                @keyframes fadeInUp {
                    from { opacity: 0; transform: translateY(15px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                
                .option-hover:hover {
                    transform: translateX(5px);
                    background-color: #5a4d2a;
                }
                
                .pizza-card-hover:hover {
                    transform: scale(1.02);
                    box-shadow: 0 6px 20px rgba(238, 200, 11, 0.3);
                }
            </style>
        `;
        
        document.head.insertAdjacentHTML('beforeend', styles);
    }

    /**
     * Private: Create chatbot HTML structure
     */
    _createChatbotHTML() {
        // Remove existing chatbot if present
        const existingChatbot = document.getElementById('chatbot-container');
        if (existingChatbot) {
            existingChatbot.remove();
        }

        const existingButton = document.getElementById('chatbot-button');
        if (existingButton) {
            existingButton.remove();
        }

        const chatbotHTML = `
            <!-- Enhanced Chatbot Button -->
            <div id="chatbot-button" class="chatbot-button">
                <button class="bg-gradient-to-r from-[#eec80b] to-[#f4d42c] hover:from-[#d4b509] hover:to-[#eec80b] text-[#232010] rounded-full p-4 shadow-xl transition-all duration-300 transform hover:scale-110 hover:shadow-2xl">
                    <svg class="w-7 h-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                    <div class="chatbot-online-indicator"></div>
                </button>
            </div>

            <!-- Enhanced Chatbot Container -->
            <div id="chatbot-container" class="chatbot-container hidden translate-y-full opacity-0">
                <!-- Enhanced Header -->
                <div class="chatbot-header">
                    <div class="chatbot-header-info">
                        <div class="chatbot-status-dot"></div>
                        <div class="chatbot-header-text">
                            <h3>Pizza Assistant</h3>
                            <p>Pronto ad aiutarti!</p>
                        </div>
                    </div>
                    <button id="chatbot-close" class="chatbot-close-button">
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Enhanced Messages Area -->
                <div id="chatbot-messages" class="chatbot-messages">
                    <!-- Messages will be dynamically added here -->
                </div>

                <!-- Enhanced Options Area -->
                <div id="chatbot-options" class="chatbot-options">
                    <!-- Options will be dynamically added here -->
                </div>

                <!-- Typing Indicator -->
                <div id="typing-indicator" class="typing-indicator hidden">
                    <div class="typing-dots">
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                        <div class="typing-dot"></div>
                    </div>
                    <span class="typing-text">Pizza Assistant sta scrivendo...</span>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);

        // Store references to elements
        this.containerElement = document.getElementById('chatbot-container');
        this.buttonElement = document.getElementById('chatbot-button');
        this.messagesElement = document.getElementById('chatbot-messages');
        this.optionsElement = document.getElementById('chatbot-options');
        this.typingElement = document.getElementById('typing-indicator');
    }

    /**
     * Private: Bind event listeners
     */
    _bindEvents() {
        if (this.buttonElement) {
            this.buttonElement.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.open();
            });
        }

        const closeBtn = document.getElementById('chatbot-close');
        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.close();
            });
        }

        // Close chatbot when clicking outside
        document.addEventListener('click', (e) => {
            if (this.isOpen && this.containerElement && 
                !this.containerElement.contains(e.target) && 
                !this.buttonElement?.contains(e.target)) {
                this.close();
            }
        });
    }

    /**
     * Private: Handle option click
     * @param {Object} option - Selected option
     */
    _handleOptionClick(option) {
        // Show user message
        this.showUserMessage(option.text);
        this.clearOptions();
        
        // Emit custom event for option selection
        const event = new CustomEvent('chatbot-option-selected', {
            detail: option
        });
        document.dispatchEvent(event);
    }

    /**
     * Private: Show typing indicator
     */
    async _showTypingIndicator() {
        if (!this.typingElement) return;

        this.typingElement.classList.remove('hidden');
        this._scrollToBottom();
        
        await this._delay(UI_TIMING.TYPING_INDICATOR_DURATION);
        
        this.typingElement.classList.add('hidden');
    }

    /**
     * Private: Scroll messages to bottom
     */
    _scrollToBottom() {
        if (this.messagesElement) {
            this.messagesElement.scrollTop = this.messagesElement.scrollHeight;
        }
    }

    /**
     * Private: Get badge class for pizza category
     * @param {string} category - Pizza category
     * @returns {string} CSS class
     */
    _getBadgeClass(category) {
        const badgeClasses = {
            'classica': 'bg-blue-600 text-white',
            'Pizze-d\'autore': 'bg-purple-600 text-white',
            'Vegana': 'bg-green-600 text-white',
            'senza-glutine': 'bg-red-600 text-white'
        };
        return badgeClasses[category] || 'bg-gray-600 text-white';
    }

    /**
     * Private: Escape HTML to prevent XSS
     * @param {string} text - Text to escape
     * @returns {string} Escaped text
     */
    _escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Private: Delay utility
     * @param {number} ms - Milliseconds to delay
     * @returns {Promise} Promise that resolves after delay
     */
    _delay(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }
}