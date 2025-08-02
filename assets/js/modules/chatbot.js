// Complete Working Chatbot for Pizzaingrammi - FIXED VERSION
// assets/js/modules/chatbot.js

// Chatbot Responses
const ChatbotResponses = {
    responses: {
        greeting: {
            message: "Ciao! 👋 Benvenuto da Pizzaingrammi! Sono qui per aiutarti a scegliere la pizza perfetta. Cosa ti va di mangiare oggi?",
            options: [
                { text: "🍕 Pizze classiche", value: "classic_preference" },
                { text: "🎨 Pizze d'autore", value: "author_preference" },
                { text: "🌱 Pizze vegane", value: "vegan_preference" },
                { text: "🚫 Pizze senza glutine", value: "gluten_free_preference" },
                { text: "📋 Tutte le pizze", value: "show_all_pizzas" }
            ]
        },
        
        classic_preference: {
            message: "Perfetto! Le nostre pizze classiche sono preparate con ingredienti tradizionali napoletani. Ecco le nostre pizze classiche:",
            filterBy: "classica"
        },

        author_preference: {
            message: "Ottima scelta! Le nostre Pizze d'autore sono creative e raffinate. Ecco le nostre creazioni speciali:",
            filterBy: "Pizze-d'autore"
        },

        vegan_preference: {
            message: "Fantastico! Ecco le nostre opzioni vegane deliziose:",
            filterBy: "Vegana"
        },

        gluten_free_preference: {
            message: "Perfetto! Ecco tutte le nostre opzioni senza glutine:",
            filterBy: "senza-glutine"
        },

        show_all_pizzas: {
            message: "Ecco tutto il nostro menu pizze! Scegli quella che ti ispira di più:",
            filterBy: "all"
        }
    },

    getGreeting() {
        return this.responses.greeting;
    },

    getResponse(key) {
        return this.responses[key] || null;
    },

    getContinueOptions() {
        return {
            options: [
                { text: "🔍 Vedi altre categorie", value: "show_categories" },
                { text: "📋 Tutte le pizze", value: "show_all_pizzas" },
                { text: "🔄 Ricomincia", value: "restart_chat" }
            ]
        };
    },

    getCategoryOptions() {
        return {
            message: "Che tipo di pizza preferisci?",
            options: [
                { text: "🍕 Classiche", value: "classic_preference" },
                { text: "🎨 Pizze d'autore", value: "author_preference" },
                { text: "🌱 Vegane", value: "vegan_preference" },
                { text: "🚫 Senza glutine", value: "gluten_free_preference" },
                { text: "📋 Tutte", value: "show_all_pizzas" }
            ]
        };
    },

    getCompanionOptions() {
        return {
            message: "Vuoi che ti consigli qualcosa da accompagnare?",
            options: [
                { text: "🍟 Frittatine", value: "sides" },
                { text: "🥤 Bevande", value: "beverages" },
                { text: "🧁 Dessert", value: "desserts" },
                { text: "✅ No grazie, solo la pizza", value: "pizza_only" }
            ]
        };
    },

    getFinalOptions() {
        return {
            options: [
                { text: "🔍 Altre categorie", value: "show_categories" },
                { text: "📱 Menu completo", value: "show_full_menu" },
                { text: "🔄 Ricomincia", value: "restart_chat" }
            ]
        };
    }
};

// Chatbot Logic
const ChatbotLogic = {
    userPreferences: {
        selectedPizza: null,
        selectedCategory: null
    },

    processUserChoice(choice, chatbot) {
        const response = ChatbotResponses.getResponse(choice);
        
        if (response) {
            chatbot.showMessage(response.message, 'bot');
            
            if (response.filterBy) {
                setTimeout(() => {
                    this.showFilteredPizzas(response.filterBy, chatbot);
                }, 1000);
            }
        } else {
            this.handleAction(choice, chatbot);
        }
    },

    showFilteredPizzas(filterBy, chatbot) {
        // Switch to pizza database
        if (typeof dbManager !== 'undefined') {
            dbManager.setCategory('pizzas');
        }
        
        let filteredPizzas = [];
        
        if (filterBy === "all") {
            filteredPizzas = typeof dbManager !== 'undefined' ? dbManager.getMenuItems() : PizzaDatabase.menuItems;
        } else {
            const menuItems = typeof dbManager !== 'undefined' ? dbManager.getMenuItems() : PizzaDatabase.menuItems;
            filteredPizzas = menuItems.filter(pizza => 
                pizza.category.includes(filterBy)
            );
        }
        
        if (filteredPizzas.length === 0) {
            chatbot.showMessage("Mi dispiace, non abbiamo pizze in questa categoria al momento.", 'bot');
            setTimeout(() => {
                const categoryOptions = ChatbotResponses.getCategoryOptions();
                chatbot.showMessage(categoryOptions.message, 'bot');
                chatbot.showOptions(categoryOptions.options);
            }, 1000);
            return;
        }

        // Show pizza cards
        filteredPizzas.forEach((pizza, index) => {
            setTimeout(() => {
                const cardElement = chatbot.showPizzaCard(pizza);
                if (cardElement) {
                    cardElement.addEventListener('click', (e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        this.selectPizza(pizza, chatbot);
                    });
                }
            }, index * 200);
        });
        
        // Show continue options after all pizzas are displayed
        setTimeout(() => {
            const continueOptions = ChatbotResponses.getContinueOptions();
            chatbot.showOptions(continueOptions.options);
        }, filteredPizzas.length * 200 + 500);
    },

    selectPizza(pizza, chatbot) {
        chatbot.userPreferences.selectedPizza = pizza;
        
        const message = `Ottima scelta! ${pizza.name} è deliziosa! 😋`;
        chatbot.showMessage(message, 'user');
        
        setTimeout(() => {
            chatbot.showMessage("Perfetto! Vuoi che ti consigli qualcosa da accompagnare?", 'bot', 300);
            
            setTimeout(() => {
                const companionOptions = ChatbotResponses.getCompanionOptions();
                chatbot.showOptions(companionOptions.options);
            }, 1000);
        }, 600);
    },

    handleAction(action, chatbot) {
        switch(action) {
            case 'show_full_menu':
                chatbot.showMessage("Ti porto al menu completo! 📋", 'bot');
                setTimeout(() => {
                    chatbot.closeChatbot();
                    const menuSection = document.getElementById('menu-items');
                    if (menuSection) {
                        menuSection.scrollIntoView({ behavior: 'smooth' });
                    }
                }, 1000);
                break;
                
            case 'restart_chat':
                chatbot.restartConversation();
                break;
                
            case 'show_categories':
                const categoryOptions = ChatbotResponses.getCategoryOptions();
                chatbot.showMessage(categoryOptions.message, 'bot');
                chatbot.showOptions(categoryOptions.options);
                break;
                
            case 'pizza_only':
                chatbot.showMessage("Perfetto! Goditi la tua pizza! 🍕", 'bot');
                setTimeout(() => {
                    const finalOptions = ChatbotResponses.getFinalOptions();
                    chatbot.showOptions(finalOptions.options);
                }, 800);
                break;
                
            case 'sides':
                this.showCategoryInfo('frittatine', chatbot);
                break;
                
            case 'beverages':
                this.showCategoryInfo('bevande', chatbot);
                break;

            case 'desserts':
                this.showCategoryInfo('desserts', chatbot);
                break;
                
            case 'opening_hours':
                this.showOpeningHours(chatbot);
                break;
        }
    },

    showCategoryInfo(categoryName, chatbot) {
        // Switch to appropriate database
        let dbCategory = '';
        let displayName = '';
        
        switch(categoryName) {
            case 'frittatine':
                dbCategory = 'frittatinas';
                displayName = 'Frittatine';
                break;
            case 'bevande':
                dbCategory = 'beverages';
                displayName = 'Bevande';
                break;
            case 'desserts':
                dbCategory = 'desserts';
                displayName = 'Dessert';
                break;
        }
        
        if (dbCategory && typeof dbManager !== 'undefined' && dbManager.setCategory(dbCategory)) {
            const items = dbManager.getMenuItems();
            
            if (items && items.length > 0) {
                chatbot.showMessage(`Ecco le nostre ${displayName}:`, 'bot');
                
                items.forEach((item, index) => {
                    setTimeout(() => {
                        const cardElement = chatbot.showPizzaCard(item);
                        if (cardElement) {
                            cardElement.addEventListener('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.selectItem(item, chatbot);
                            });
                        }
                    }, index * 200);
                });
                
                setTimeout(() => {
                    const finalOptions = ChatbotResponses.getFinalOptions();
                    chatbot.showOptions(finalOptions.options);
                }, items.length * 200 + 500);
            } else {
                chatbot.showMessage(`Al momento non abbiamo ${displayName} disponibili. 😔`, 'bot');
                setTimeout(() => {
                    const finalOptions = ChatbotResponses.getFinalOptions();
                    chatbot.showOptions(finalOptions.options);
                }, 2000);
            }
        } else {
            // Fallback - try to use individual database objects
            let database = null;
            switch(categoryName) {
                case 'frittatine':
                    database = typeof FrittatinaDatabase !== 'undefined' ? FrittatinaDatabase : null;
                    displayName = 'Frittatine';
                    break;
                case 'bevande':
                    database = typeof BeverageDatabase !== 'undefined' ? BeverageDatabase : null;
                    displayName = 'Bevande';
                    break;
                case 'desserts':
                    database = typeof DessertDatabase !== 'undefined' ? DessertDatabase : null;
                    displayName = 'Dessert';
                    break;
            }
            
            if (database && database.menuItems && database.menuItems.length > 0) {
                chatbot.showMessage(`Ecco le nostre ${displayName}:`, 'bot');
                
                database.menuItems.forEach((item, index) => {
                    setTimeout(() => {
                        const cardElement = chatbot.showPizzaCard(item);
                        if (cardElement) {
                            cardElement.addEventListener('click', (e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                this.selectItem(item, chatbot);
                            });
                        }
                    }, index * 200);
                });
                
                setTimeout(() => {
                    const finalOptions = ChatbotResponses.getFinalOptions();
                    chatbot.showOptions(finalOptions.options);
                }, database.menuItems.length * 200 + 500);
            } else {
                chatbot.showMessage(`Al momento stiamo preparando il menu delle ${displayName}. Torneremo presto! 🔜`, 'bot');
                setTimeout(() => {
                    const finalOptions = ChatbotResponses.getFinalOptions();
                    chatbot.showOptions(finalOptions.options);
                }, 2000);
            }
        }
    },

    selectItem(item, chatbot) {
        const message = `Ottima scelta! ${item.name} è perfetto! 😋`;
        chatbot.showMessage(message, 'user');
        
        setTimeout(() => {
            chatbot.showMessage("Vuoi aggiungere altro al tuo ordine?", 'bot', 300);
            
            setTimeout(() => {
                const companionOptions = ChatbotResponses.getCompanionOptions();
                chatbot.showOptions(companionOptions.options);
            }, 1000);
        }, 600);
    },

    showOpeningHours(chatbot) {
        chatbot.showMessage("Siamo aperti tutti i giorni dalle 11:00 alle 23:00! 🕐", 'bot');
        setTimeout(() => {
            const finalOptions = ChatbotResponses.getFinalOptions();
            chatbot.showOptions(finalOptions.options);
        }, 2000);
    }
};

// Main Chatbot Class
class PizzaChatbot {
    constructor() {
        this.isOpen = false;
        this.isInitialized = false;
        this.userPreferences = {
            dietary: null,
            category: null,
            selectedPizza: null
        };
        this.conversationHistory = [];
    }

    init() {
        // Prevent double initialization
        if (this.isInitialized) {
            console.log('Chatbot already initialized');
            return;
        }

        this.createChatbotUI();
        this.bindEvents();
        this.isInitialized = true;
        console.log('Pizzaingrammi Chatbot initialized successfully!');
    }

    createChatbotUI() {
        // Check if chatbot UI already exists
        if (document.getElementById('chatbot-button')) {
            console.log('Chatbot UI already exists');
            return;
        }

        // Add styles only once
        if (!document.getElementById('chatbot-styles')) {
            const styles = `
                <style id="chatbot-styles">
                    @keyframes fade-in {
                        from { opacity: 0; transform: translateY(10px); }
                        to { opacity: 1; transform: translateY(0); }
                    }
                    
                    .animate-fade-in { animation: fade-in 0.3s ease-out; }
                    
                    .line-clamp-2 {
                        display: -webkit-box;
                        -webkit-line-clamp: 2;
                        -webkit-box-orient: vertical;
                        overflow: hidden;
                    }
                    
                    #chatbot-messages::-webkit-scrollbar { width: 4px; }
                    #chatbot-messages::-webkit-scrollbar-track { background: transparent; }
                    #chatbot-messages::-webkit-scrollbar-thumb { background-color: #494222; border-radius: 2px; }

                    .pizza-recommendation {
                        transition: all 0.2s ease;
                    }

                    .pizza-recommendation:hover {
                        transform: translateY(-2px);
                        box-shadow: 0 4px 12px rgba(238, 200, 11, 0.3);
                    }
                </style>
            `;
            document.head.insertAdjacentHTML('beforeend', styles);
        }

        // Create chatbot HTML
        const chatbotHTML = `
            <!-- Chatbot Button -->
            <div id="chatbot-button" class="fixed bottom-6 right-6 z-50">
                <button class="bg-[#eec80b] hover:bg-[#d4b509] text-[#232010] rounded-full p-4 shadow-lg transition-all duration-300 transform hover:scale-110">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                    </svg>
                </button>
            </div>

            <!-- Chatbot Container -->
            <div id="chatbot-container" class="fixed bottom-6 right-6 w-80 h-[500px] bg-[#232010] rounded-lg shadow-xl z-40 transform translate-y-full opacity-0 transition-all duration-300 border border-[#494222] hidden flex flex-col">
                <!-- Header -->
                <div class="bg-[#eec80b] text-[#232010] p-3 rounded-t-lg flex justify-between items-center flex-shrink-0">
                    <div class="flex items-center gap-2">
                        <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                        <span class="font-bold text-sm">Pizzaingrammi Assistant</span>
                    </div>
                    <button id="chatbot-close" class="hover:bg-[#d4b509] rounded p-1 transition-colors">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <!-- Messages Area -->
                <div id="chatbot-messages" class="flex-1 p-3 overflow-y-auto space-y-3 min-h-0">
                    <!-- Messages will be dynamically added here -->
                </div>

                <!-- Input Area -->
                <div id="chatbot-options" class="p-3 border-t border-[#494222] flex-shrink-0 max-h-40 overflow-y-auto">
                    <!-- Options will be dynamically added here -->
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatbotHTML);
    }

    bindEvents() {
        const button = document.getElementById('chatbot-button');
        const closeBtn = document.getElementById('chatbot-close');

        if (button) {
            // Remove any existing event listeners first
            const newButton = button.cloneNode(true);
            button.parentNode.replaceChild(newButton, button);
            
            newButton.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.openChatbot();
            });
        }

        if (closeBtn) {
            closeBtn.addEventListener('click', (e) => {
                e.preventDefault();
                e.stopPropagation();
                this.closeChatbot();
            });
        }

        // Close chatbot when clicking outside (only bind once)
        if (!this.outsideClickBound) {
            document.addEventListener('click', (e) => {
                const container = document.getElementById('chatbot-container');
                const button = document.getElementById('chatbot-button');
                if (this.isOpen && container && !container.contains(e.target) && !button?.contains(e.target)) {
                    this.closeChatbot();
                }
            });
            this.outsideClickBound = true;
        }
    }

    openChatbot() {
        this.isOpen = true;
        const container = document.getElementById('chatbot-container');
        const button = document.getElementById('chatbot-button');
        
        if (container && button) {
            container.classList.remove('hidden');
            button.style.display = 'none';
            
            setTimeout(() => {
                container.classList.remove('translate-y-full', 'opacity-0');
                container.classList.add('translate-y-0', 'opacity-100');
            }, 10);
        }

        // Start conversation if it's the first time
        if (this.conversationHistory.length === 0) {
            setTimeout(() => {
                this.startConversation();
            }, 500);
        }
    }

    closeChatbot() {
        this.isOpen = false;
        const container = document.getElementById('chatbot-container');
        const button = document.getElementById('chatbot-button');
        
        if (container && button) {
            container.classList.remove('translate-y-0', 'opacity-100');
            container.classList.add('translate-y-full', 'opacity-0');
            
            setTimeout(() => {
                container.classList.add('hidden');
                button.style.display = 'block';
            }, 300);
        }
    }

    startConversation() {
        // Clear any existing messages first
        this.clearMessages();
        this.conversationHistory = [];
        
        setTimeout(() => {
            const greeting = ChatbotResponses.getGreeting();
            this.showMessage(greeting.message, 'bot');
            setTimeout(() => {
                this.showOptions(greeting.options);
            }, 1000);
        }, 300);
    }

    showMessage(message, sender = 'bot', delay = 0) {
        setTimeout(() => {
            const messagesContainer = document.getElementById('chatbot-messages');
            if (!messagesContainer) return;

            const messageElement = document.createElement('div');
            
            if (sender === 'bot') {
                messageElement.className = 'flex gap-2 items-start animate-fade-in';
                messageElement.innerHTML = `
                    <div class="w-8 h-8 bg-[#eec80b] rounded-full flex items-center justify-center text-[#232010] text-sm font-bold flex-shrink-0">
                        🍕
                    </div>
                    <div class="bg-[#494422] text-white p-3 rounded-lg max-w-64 text-sm leading-relaxed">
                        ${message}
                    </div>
                `;
            } else {
                messageElement.className = 'flex justify-end animate-fade-in';
                messageElement.innerHTML = `
                    <div class="bg-[#eec80b] text-[#232010] p-3 rounded-lg max-w-64 text-sm leading-relaxed font-medium">
                        ${message}
                    </div>
                `;
            }
            
            messagesContainer.appendChild(messageElement);
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
            
            this.conversationHistory.push({ message, sender, timestamp: Date.now() });
        }, delay);
    }

    showOptions(options) {
        const optionsContainer = document.getElementById('chatbot-options');
        if (!optionsContainer) return;

        // Clear existing options
        optionsContainer.innerHTML = '';
        
        options.forEach((option, index) => {
            setTimeout(() => {
                const button = document.createElement('button');
                button.className = 'w-full text-left p-2 mb-1 bg-[#494422] hover:bg-[#5a4d2a] text-white rounded-lg transition-all duration-200 text-xs transform hover:scale-[1.02] last:mb-0 break-words';
                button.textContent = option.text;
                button.style.wordWrap = 'break-word';
                button.style.whiteSpace = 'normal';
                
                // Create a new event listener for each button
                button.addEventListener('click', (e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    this.handleOptionClick(option);
                });
                
                optionsContainer.appendChild(button);
            }, index * 100);
        });
    }

    handleOptionClick(option) {
        // Clear options immediately to prevent double clicks
        this.clearOptions();
        
        // Show user message
        this.showMessage(option.text, 'user');
        
        // Process choice after a short delay
        setTimeout(() => {
            ChatbotLogic.processUserChoice(option.value, this);
        }, 500);
    }

    clearOptions() {
        const optionsContainer = document.getElementById('chatbot-options');
        if (optionsContainer) {
            optionsContainer.innerHTML = '';
        }
    }

    showPizzaCard(pizza) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const cardElement = document.createElement('div');
        cardElement.className = 'animate-fade-in';
        
        const badgesHTML = pizza.category.map(cat => {
            const badgeClass = typeof PizzaDatabase !== 'undefined' && PizzaDatabase.getBadgeClass ? 
                PizzaDatabase.getBadgeClass(cat) : 'bg-gray-600 text-white';
            return `<span class="text-xs px-2 py-1 rounded-full ${badgeClass}">${cat}</span>`;
        }).join('');
        
        cardElement.innerHTML = `
            <div class="bg-[#494422] rounded-lg p-3 mb-2 hover:bg-[#5a4d2a] transition-colors cursor-pointer pizza-recommendation border border-[#685f31]" data-pizza-id="${pizza.id}">
                <div class="flex gap-3">
                    <img src="${pizza.image}" alt="${pizza.name}" class="w-16 h-16 object-cover rounded-lg flex-shrink-0" loading="lazy">
                    <div class="flex-1 min-w-0">
                        <h4 class="text-white font-bold text-sm mb-1">${pizza.name}</h4>
                        <p class="text-[#cbc190] text-xs mb-2 line-clamp-2">${pizza.description}</p>
                        <div class="flex justify-between items-center">
                            <div class="flex gap-1 flex-wrap">
                                ${badgesHTML}
                            </div>
                            <span class="text-[#eec80b] font-bold text-sm">${pizza.price}</span>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        messagesContainer.appendChild(cardElement);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        
        return cardElement.querySelector('.pizza-recommendation');
    }

    restartConversation() {
        this.userPreferences = {
            dietary: null,
            category: null,
            selectedPizza: null
        };
        
        this.startConversation();
    }

    clearMessages() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (messagesContainer) {
            messagesContainer.innerHTML = '';
        }
    }
}

// Global chatbot instance
let globalChatbot = null;

// Check if user is visiting for the first time
function isFirstTimeVisitor() {
    const hasVisited = localStorage.getItem('pizzaingrammi_visited');
    if (!hasVisited) {
        localStorage.setItem('pizzaingrammi_visited', 'true');
        return true;
    }
    return false;
}

// Check if page was refreshed or newly loaded
function shouldShowChatbot() {
    // Always show chatbot on page load (first visit or refresh)
    return true;
}

// Initialize chatbot when DOM is ready
function initializeChatbot() {
    // Prevent double initialization
    if (globalChatbot && globalChatbot.isInitialized) {
        console.log('Chatbot already initialized, skipping...');
        return globalChatbot;
    }
    
    try {
        globalChatbot = new PizzaChatbot();
        globalChatbot.init();
        
        // Auto-open chatbot on every page load (first visit or refresh)
        if (shouldShowChatbot()) {
            setTimeout(() => {
                globalChatbot.openChatbot();
            }, 2000); // Open after 2 seconds to let page load
        }
        
        // Mark as visited for tracking purposes (optional)
        isFirstTimeVisitor();
        
        // Make chatbot globally available
        window.PizzaChatbot = globalChatbot;
        
        console.log('Pizzaingrammi Chatbot initialized successfully!');
        return globalChatbot;
    } catch (error) {
        console.error('Error initializing chatbot:', error);
        return null;
    }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        setTimeout(initializeChatbot, 1000);
    });
} else {
    setTimeout(initializeChatbot, 1000);
}