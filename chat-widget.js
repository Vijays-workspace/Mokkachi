/**
 * Mokkaachi Custom Chat Widget
 * Interactive chat functionality with automated responses
 */

(function () {
    // Chat Widget Configuration
    const CONFIG = {
        botName: 'Mokkaachi Support',
        welcomeMessage: "Hello! 👋 Welcome to Mokkaachi Maintenance Services. How can I help you today?",
        typingDelay: 1500,
        contactInfo: {
            phone: '+91 90036 19899',
            whatsapp: '919003619899',
            email: 'mokkasu@gmail.com',
            address: 'Madurai, Tamil Nadu'
        }
    };

    // Automated Responses
    const RESPONSES = {
        services: {
            keywords: ['service', 'services', 'what do you offer', 'offerings', 'provide'],
            response: "We offer a wide range of maintenance services! 🔧",
            quickReplies: ['Electrical', 'HVAC', 'Hydraulics', 'Construction']
        },
        electrical: {
            keywords: ['electrical', 'wiring', 'plc', 'vfd', 'motor', 'panel'],
            response: "⚡ Our Electrical Services include:\n• Electrical Panel Boards\n• All kinds of motors & pumps\n• PLC & VFD systems\n• Industrial & domestic wiring\n\nWould you like to get a quote?"
        },
        hvac: {
            keywords: ['hvac', 'ac', 'air condition', 'chiller', 'cooling', 'temperature'],
            response: "❄️ Our HVAC Services include:\n• Industrial Chillers\n• All types of AC service\n• Cooling Towers\n• Temperature control systems\n\nNeed a technician visit?"
        },
        hydraulics: {
            keywords: ['hydraulic', 'pneumatic', 'pressure', 'cylinder', 'hose'],
            response: "🔩 Our Hydraulics & Pneumatics services:\n• Hydraulic system repair\n• Pneumatic valve servicing\n• Pressure system optimization\n• Cylinder & hose replacement"
        },
        construction: {
            keywords: ['construction', 'building', 'fabrication', 'roof', 'plumbing', 'steel'],
            response: "🏗️ Our Construction & Fabrication services:\n• Building construction\n• Roof sheet installation\n• Fabrication work\n• Structural steel work\n• Plumbing services"
        },
        pricing: {
            keywords: ['price', 'cost', 'quote', 'how much', 'charges', 'rate', 'estimate'],
            response: "For accurate pricing, we'd need to understand your specific requirements. Would you like to:\n\n📞 Talk to our team for a free consultation?"
        },
        contact: {
            keywords: ['contact', 'call', 'phone', 'reach', 'talk', 'speak', 'number'],
            response: "📞 You can reach us at:\n\n• Phone: +91 90036 19899\n• Phone 2: +91 87781 05540\n• WhatsApp: Quick chat available\n• Email: mokkasu@gmail.com\n\nOr choose a contact option below:"
        },
        hours: {
            keywords: ['hours', 'timing', 'when', 'open', 'available', 'time'],
            response: "⏰ Our working hours:\n\n• Monday - Saturday: 9 AM - 6 PM\n• Sunday: Emergency services only\n\nFor emergencies, we're always here for you! 🚨"
        },
        location: {
            keywords: ['location', 'where', 'address', 'area', 'madurai', 'come'],
            response: "📍 We're located at:\n\n2/125 Veerapandiyan Nagar,\nKaruppayurani (P.O),\nMadurai, Tamil Nadu - 625020\n\nWe serve Madurai and surrounding areas!"
        },
        emergency: {
            keywords: ['emergency', 'urgent', 'breakdown', 'not working', 'problem', 'issue', 'help'],
            response: "🚨 For emergency services:\n\nCall us immediately at +91 90036 19899 or +91 87781 05540\n\nWe provide 24/7 emergency support for critical industrial breakdowns!"
        },
        thanks: {
            keywords: ['thank', 'thanks', 'bye', 'okay', 'ok', 'great', 'good'],
            response: "You're welcome! 😊 Feel free to reach out anytime. Have a great day!\n\n⭐ Mokkaachi - Your Trusted Maintenance Partner"
        },
        greeting: {
            keywords: ['hi', 'hello', 'hey', 'good morning', 'good afternoon', 'good evening'],
            response: "Hello! 👋 Great to connect with you! How can Mokkaachi help you today?\n\nYou can ask about our services, request a quote, or get contact information."
        }
    };

    // Default response when no match found
    const DEFAULT_RESPONSE = "I'd be happy to help! You can ask me about:\n\n• Our maintenance services\n• Pricing & quotes\n• Contact information\n• Emergency support\n\nOr connect with our team directly:";

    // Initialize Chat Widget
    function initChatWidget() {
        createChatHTML();
        attachEventListeners();

        // Hide the old WhatsApp float button if exists
        const oldWhatsAppBtn = document.querySelector('.whatsapp-float');
        if (oldWhatsAppBtn) {
            oldWhatsAppBtn.style.display = 'none';
        }
    }

    // Create Chat Widget HTML
    function createChatHTML() {
        const chatHTML = `
            <!-- Chat Toggle Button -->
            <button class="chat-widget-btn" id="chatToggleBtn" aria-label="Open chat">
                <span class="chat-badge" id="chatBadge">1</span>
                <svg class="chat-icon" viewBox="0 0 24 24">
                    <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2zm0 14H6l-2 2V4h16v12z"/>
                    <path d="M7 9h10v2H7zm0-3h10v2H7zm0 6h7v2H7z"/>
                </svg>
                <svg class="close-icon" viewBox="0 0 24 24">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
            </button>

            <!-- Chat Window -->
            <div class="chat-widget-window" id="chatWindow">
                <!-- Header -->
                <div class="chat-header">
                    <div class="chat-avatar">
                        <span class="chat-avatar-placeholder">🔧</span>
                    </div>
                    <div class="chat-header-info">
                        <div class="chat-header-title">Mokkaachi Support</div>
                        <div class="chat-header-status">
                            <span class="status-dot"></span>
                            Online • Replies instantly
                        </div>
                    </div>
                    <button class="chat-close-btn" id="chatCloseBtn" aria-label="Close chat">
                        <svg viewBox="0 0 24 24">
                            <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                        </svg>
                    </button>
                </div>

                <!-- Messages -->
                <div class="chat-messages" id="chatMessages">
                    <!-- Messages will be added here dynamically -->
                </div>

                <!-- Input Area -->
                <div class="chat-input-area">
                    <div class="chat-input-wrapper">
                        <input type="text" class="chat-input" id="chatInput" placeholder="Type your message..." autocomplete="off">
                    </div>
                    <button class="chat-send-btn" id="chatSendBtn" aria-label="Send message">
                        <svg viewBox="0 0 24 24">
                            <path d="M2.01 21L23 12 2.01 3 2 10l15 2-15 2z"/>
                        </svg>
                    </button>
                </div>

                <!-- Powered By -->
                <div class="chat-powered">
                    Powered by <a href="#contact">Mokkaachi</a>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', chatHTML);
    }

    // Attach Event Listeners
    function attachEventListeners() {
        const toggleBtn = document.getElementById('chatToggleBtn');
        const closeBtn = document.getElementById('chatCloseBtn');
        const chatWindow = document.getElementById('chatWindow');
        const chatInput = document.getElementById('chatInput');
        const sendBtn = document.getElementById('chatSendBtn');
        const badge = document.getElementById('chatBadge');

        let chatOpened = false;

        // Toggle chat window
        toggleBtn.addEventListener('click', () => {
            const isActive = chatWindow.classList.toggle('active');
            toggleBtn.classList.toggle('active');

            if (isActive && !chatOpened) {
                chatOpened = true;
                badge.style.display = 'none';
                showWelcomeMessage();
            }

            if (isActive) {
                chatInput.focus();
            }
        });

        // Close button
        closeBtn.addEventListener('click', () => {
            chatWindow.classList.remove('active');
            toggleBtn.classList.remove('active');
        });

        // Send message
        sendBtn.addEventListener('click', sendMessage);

        // Enter key to send
        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessage();
            }
        });

        // Quick reply click handler (delegated)
        document.getElementById('chatMessages').addEventListener('click', (e) => {
            if (e.target.classList.contains('quick-reply-btn')) {
                const text = e.target.textContent;
                addUserMessage(text);
                processBotResponse(text);
            }
        });
    }

    // Show welcome message
    function showWelcomeMessage() {
        setTimeout(() => {
            addBotMessage(CONFIG.welcomeMessage);

            setTimeout(() => {
                addQuickReplies(['Our Services', 'Get a Quote', 'Contact Us', 'Emergency']);
            }, 500);
        }, 300);
    }

    // Send message
    function sendMessage() {
        const input = document.getElementById('chatInput');
        const message = input.value.trim();

        if (message) {
            addUserMessage(message);
            input.value = '';
            processBotResponse(message);
        }
    }

    // Add user message
    function addUserMessage(text) {
        const messagesContainer = document.getElementById('chatMessages');
        const time = getCurrentTime();

        const messageHTML = `
            <div class="chat-message user">
                <div class="message-content">
                    <div class="message-bubble">${escapeHTML(text)}</div>
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    // Add bot message
    function addBotMessage(text, includeContactOptions = false) {
        const messagesContainer = document.getElementById('chatMessages');
        const time = getCurrentTime();

        let contactOptionsHTML = '';
        if (includeContactOptions) {
            contactOptionsHTML = `
                <div class="contact-options">
                    <a href="tel:+919003619899" class="contact-option phone">
                        <span class="contact-option-icon">📞</span>
                        <span class="contact-option-text">Call Now</span>
                    </a>
                    <a href="https://wa.me/919003619899?text=Hello%20Mokkaachi!" target="_blank" class="contact-option whatsapp">
                        <span class="contact-option-icon">💬</span>
                        <span class="contact-option-text">WhatsApp</span>
                    </a>
                    <a href="mailto:mokkasu@gmail.com" class="contact-option email">
                        <span class="contact-option-icon">✉️</span>
                        <span class="contact-option-text">Email Us</span>
                    </a>
                    <a href="#contact" class="contact-option location" onclick="document.getElementById('chatWindow').classList.remove('active'); document.getElementById('chatToggleBtn').classList.remove('active');">
                        <span class="contact-option-icon">📍</span>
                        <span class="contact-option-text">Visit Us</span>
                    </a>
                </div>
            `;
        }

        const messageHTML = `
            <div class="chat-message bot">
                <div class="message-avatar">🔧</div>
                <div class="message-content">
                    <div class="message-bubble">${formatMessage(text)}</div>
                    ${contactOptionsHTML}
                    <span class="message-time">${time}</span>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', messageHTML);
        scrollToBottom();
    }

    // Show typing indicator
    function showTypingIndicator() {
        const messagesContainer = document.getElementById('chatMessages');

        const typingHTML = `
            <div class="chat-message bot typing-message">
                <div class="message-avatar">🔧</div>
                <div class="message-content">
                    <div class="typing-indicator">
                        <span></span>
                        <span></span>
                        <span></span>
                    </div>
                </div>
            </div>
        `;

        messagesContainer.insertAdjacentHTML('beforeend', typingHTML);
        scrollToBottom();
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingMessage = document.querySelector('.typing-message');
        if (typingMessage) {
            typingMessage.remove();
        }
    }

    // Add quick replies
    function addQuickReplies(options) {
        const messagesContainer = document.getElementById('chatMessages');

        const repliesHTML = `
            <div class="quick-replies">
                ${options.map(opt => `<button class="quick-reply-btn">${opt}</button>`).join('')}
            </div>
        `;

        const lastBotMessage = messagesContainer.querySelector('.chat-message.bot:last-of-type .message-content');
        if (lastBotMessage) {
            lastBotMessage.insertAdjacentHTML('beforeend', repliesHTML);
        }
        scrollToBottom();
    }

    // Process bot response
    function processBotResponse(userMessage) {
        showTypingIndicator();

        const lowerMessage = userMessage.toLowerCase();
        let response = null;
        let quickReplies = null;
        let includeContactOptions = false;

        // Check for matching keywords
        for (const [key, data] of Object.entries(RESPONSES)) {
            const hasMatch = data.keywords.some(keyword => lowerMessage.includes(keyword));
            if (hasMatch) {
                response = data.response;
                quickReplies = data.quickReplies;
                break;
            }
        }

        // Handle specific cases
        if (lowerMessage.includes('quote') || lowerMessage.includes('price') || lowerMessage.includes('contact')) {
            includeContactOptions = true;
        }

        if (!response) {
            response = DEFAULT_RESPONSE;
            includeContactOptions = true;
        }

        // Simulate typing delay
        setTimeout(() => {
            removeTypingIndicator();
            addBotMessage(response, includeContactOptions);

            if (quickReplies) {
                setTimeout(() => {
                    addQuickReplies(quickReplies);
                }, 300);
            } else if (!includeContactOptions) {
                setTimeout(() => {
                    addQuickReplies(['Our Services', 'Get a Quote', 'Contact Us']);
                }, 300);
            }
        }, CONFIG.typingDelay);
    }

    // Helper Functions
    function getCurrentTime() {
        return new Date().toLocaleTimeString('en-US', {
            hour: 'numeric',
            minute: '2-digit',
            hour12: true
        });
    }

    function escapeHTML(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    function formatMessage(text) {
        return text.replace(/\n/g, '<br>');
    }

    function scrollToBottom() {
        const messagesContainer = document.getElementById('chatMessages');
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initChatWidget);
    } else {
        initChatWidget();
    }
})();
