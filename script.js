document.addEventListener('DOMContentLoaded', function() {
    // --- 1. Mobile Navigation Toggle ---
    const mobileNavToggle = document.getElementById('mobile-nav-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (mobileNavToggle && navMenu) {
        mobileNavToggle.addEventListener('click', function() {
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;
            this.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
            // Toggle visibility for accessibility
            navMenu.setAttribute('aria-hidden', isExpanded);
        });

        // Close mobile menu when a link is clicked
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                if (navMenu.classList.contains('active')) {
                    mobileNavToggle.click(); // Simulate click to close
                }
            });
        });

        // Handle dropdown toggle for mobile
        const dropdown = navMenu.querySelector('.dropdown');
        if (dropdown) {
            const dropbtn = dropdown.querySelector('.dropbtn');
            dropbtn.addEventListener('click', (e) => {
                // Prevent default navigation for the services link itself on mobile
                // On desktop, the hover handles it
                if (window.innerWidth <= 992) {
                    e.preventDefault();
                    dropdown.classList.toggle('active');
                    const isDropdownExpanded = dropdown.classList.contains('active');
                    dropbtn.setAttribute('aria-expanded', isDropdownExpanded);
                }
            });
        }

    } else {
        console.warn('Mobile navigation toggle or menu not found.');
    }

    // --- 2. Active Link Highlight on Scroll (or current page) ---
    const navLinks = document.querySelectorAll('.nav-menu a');

    function highlightActiveLink() {
        const currentPath = window.location.pathname.split('/').pop();
        let currentSection = '';

        // If on index.html, highlight based on scroll position
        if (currentPath === '' || currentPath === 'index.html') {
            const sections = document.querySelectorAll('section');
            sections.forEach(section => {
                const sectionTop = section.offsetTop - 150; // Offset for fixed header
                const sectionBottom = sectionTop + section.offsetHeight;
                if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
                    currentSection = section.id;
                }
            });

            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === 'index.html' && currentSection === '') { // Highlight Home if at top
                    link.classList.add('active');
                } else if (link.getAttribute('href') && link.getAttribute('href').includes(currentSection)) {
                    link.classList.add('active');
                }
            });
        } else {
            // For service pages, highlight the exact link
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href').split('/').pop() === currentPath) {
                    link.classList.add('active');
                }
                // Also highlight the "Services" dropdown button if a service page is active
                if (link.closest('.dropdown') && link.getAttribute('href').startsWith('services/')) {
                    if (link.getAttribute('href').split('/').pop() === currentPath) {
                        link.closest('.dropdown').querySelector('.dropbtn').classList.add('active');
                    }
                }
            });
        }
    }

    window.addEventListener('scroll', highlightActiveLink);
    window.addEventListener('load', highlightActiveLink);
    // Initial call on page load to set the active link correctly
    highlightActiveLink();


    // --- 3. Contact Form Submission (Google Sheet) ---
    const contactForm = document.getElementById('contact-form');
    const formMessage = document.getElementById('form-message');

    // IMPORTANT: Replace 'YOUR_SCRIPT_ID' with your actual Google Apps Script ID
    // Example: https://script.google.com/macros/s/AKfycbz_YOUR_SCRIPT_ID_HERE_g/exec
    const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec"; 

    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', e => {
            e.preventDefault();
            formMessage.textContent = 'Sending...';
            formMessage.className = 'form-message'; // Reset class

            if (scriptURL === "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec") {
                formMessage.textContent = 'Error: Google Apps Script URL is not configured. Please replace "YOUR_SCRIPT_ID" in js/script.js.';
                formMessage.classList.add('error');
                console.error('Google Apps Script URL not configured.');
                return;
            }

            fetch(scriptURL, { method: 'POST', body: new FormData(contactForm)})
                .then(response => {
                    if (response.ok) {
                        formMessage.textContent = 'Message sent successfully!';
                        formMessage.classList.add('success');
                        contactForm.reset();
                    } else {
                        // Attempt to parse error message from response if available
                        return response.text().then(text => {
                            throw new Error(`Server error: ${response.status} - ${text}`);
                        });
                    }
                })
                .catch(error => {
                    formMessage.textContent = 'Error sending message. Please try again later.';
                    formMessage.classList.add('error');
                    console.error('Error!', error.message || error);
                });
        });
    } else {
        console.warn('Contact form or form message element not found.');
    }


    // --- 4. FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', function() {
            const answer = this.nextElementSibling; // The div containing the answer
            const isExpanded = this.getAttribute('aria-expanded') === 'true' || false;

            // Close all other open FAQs
            faqQuestions.forEach(q => {
                if (q !== this && q.getAttribute('aria-expanded') === 'true') {
                    q.setAttribute('aria-expanded', 'false');
                    q.nextElementSibling.setAttribute('aria-hidden', 'true');
                    q.nextElementSibling.style.maxHeight = '0';
                    q.nextElementSibling.style.paddingTop = '0';
                    q.nextElementSibling.style.paddingBottom = '0';
                }
            });

            // Toggle current FAQ
            this.setAttribute('aria-expanded', !isExpanded);
            answer.setAttribute('aria-hidden', isExpanded);

            if (!isExpanded) {
                // Open: Set maxHeight to scrollHeight to allow smooth animation
                answer.style.maxHeight = answer.scrollHeight + 'px';
                answer.style.paddingTop = '15px'; // Restore padding
                answer.style.paddingBottom = '15px';
            } else {
                // Close
                answer.style.maxHeight = '0';
                answer.style.paddingTop = '0'; // Remove padding
                answer.style.paddingBottom = '0';
            }
        });
    });


    // --- 5. Chatbot Functionality ---
    const chatbotFab = document.getElementById('chatbot-fab');
    const chatbotWindow = document.getElementById('chatbot-window');
    const chatbotClose = document.getElementById('chatbot-close');
    const chatbotBody = document.getElementById('chatbot-body');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSend = document.getElementById('chatbot-send');
    const chatQuickReplies = document.querySelector('.chat-quick-replies');

    if (chatbotFab && chatbotWindow && chatbotClose && chatbotBody && chatbotInput && chatbotSend) {
        chatbotFab.addEventListener('click', () => {
            chatbotWindow.classList.toggle('chatbot-visible');
            const isChatbotVisible = chatbotWindow.classList.contains('chatbot-visible');
            chatbotWindow.setAttribute('aria-hidden', !isChatbotVisible);
            chatbotWindow.setAttribute('aria-modal', isChatbotVisible);
            if (isChatbotVisible) chatbotInput.focus();
        });

        chatbotClose.addEventListener('click', () => {
            chatbotWindow.classList.remove('chatbot-visible');
            chatbotWindow.setAttribute('aria-hidden', 'true');
            chatbotWindow.setAttribute('aria-modal', 'false');
        });

        function addMessage(text, sender) {
            const messageDiv = document.createElement('div');
            messageDiv.classList.add('chat-message', `${sender}-message`);
            messageDiv.textContent = text;
            chatbotBody.appendChild(messageDiv);
            chatbotBody.scrollTop = chatbotBody.scrollHeight; // Scroll to bottom
        }

        function getBotResponse(userMessage) {
            const lowerCaseMessage = userMessage.toLowerCase();
            let botResponse = "I'm sorry, I don't understand that. You can try asking about 'services', 'quote', or 'contact'.";

            if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
                botResponse = "Hello! How can I help you today?";
            } else if (lowerCaseMessage.includes('services')) {
                botResponse = "Zero Associate offers a wide range of services including AC & Refrigeration, Specialised Cleaning, Electrical & Plumbing, Painting, Construction, Flooring, Hospitality Cleaning, Food Trading, and General Maintenance. Visit our services page for more details!";
            } else if (lowerCaseMessage.includes('quote') || lowerCaseMessage.includes('price') || lowerCaseMessage.includes('cost')) {
                botResponse = "Please fill out our contact form or email us at info@zeroassociate.com for a detailed quote tailored to your needs.";
            } else if (lowerCaseMessage.includes('contact')) {
                botResponse = "You can contact us via phone: +974 5509 2962, or email: info@zeroassociate.com. Our address is Zone 90, Street 720, Building 186, Floor 1, Al Wakra, Qatar.";
            } else if (lowerCaseMessage.includes('thank you') || lowerCaseMessage.includes('thanks')) {
                botResponse = "You're welcome! Is there anything else I can assist you with?";
            }

            setTimeout(() => addMessage(botResponse, 'bot'), 500);
        }

        chatbotSend.addEventListener('click', () => {
            const userMessage = chatbotInput.value.trim();
            if (userMessage) {
                addMessage(userMessage, 'user');
                chatbotInput.value = '';
                getBotResponse(userMessage);
            }
        });

        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                chatbotSend.click();
            }
        });

        if (chatQuickReplies) {
            chatQuickReplies.addEventListener('click', (e) => {
                if (e.target.classList.contains('chat-quick-reply')) {
                    const quickReplyMessage = e.target.dataset.message;
                    addMessage(quickReplyMessage, 'user');
                    getBotResponse(quickReplyMessage);
                }
            });
        }

    } else {
        console.warn('Chatbot elements not found.');
    }
});
