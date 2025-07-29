/**
 * Header Component
 * Renders the application header
 */

export class HeaderComponent {
    constructor() {
        this._element = null;
    }

    /**
     * Render header component
     * @returns {string} HTML string for header
     */
    render() {
        return `
            <div class="flex items-center bg-[#232010] p-4 pb-2 justify-center">
                <h2 class="text-white text-lg font-bold leading-tight tracking-[-0.015em]">
                    Pizzaingrammi
                </h2>
            </div>
        `;
    }

    /**
     * Mount component to DOM element
     * @param {HTMLElement} container - Container element
     */
    mount(container) {
        if (!container) {
            throw new Error('Container element is required');
        }

        container.innerHTML = this.render();
        this._element = container.firstElementChild;
        this._bindEvents();
    }

    /**
     * Unmount component from DOM
     */
    unmount() {
        if (this._element && this._element.parentNode) {
            this._element.parentNode.removeChild(this._element);
        }
        this._element = null;
    }

    /**
     * Update header title
     * @param {string} title - New title
     */
    updateTitle(title) {
        if (this._element) {
            const titleElement = this._element.querySelector('h2');
            if (titleElement) {
                titleElement.textContent = title;
            }
        }
    }

    /**
     * Get DOM element
     * @returns {HTMLElement|null} Header element
     */
    getElement() {
        return this._element;
    }

    /**
     * Private: Bind event listeners
     */
    _bindEvents() {
        // Header currently has no interactive elements
        // This method is here for future enhancements
    }
}