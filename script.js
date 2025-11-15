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
/* ====== ZEROASSOCIATE header + FAB behaviour (append to end of js/script.js) ====== */
(function(){
  // mobile nav toggle (button id mobile-nav-toggle)
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if(navToggle){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', !expanded);
      if(navMenu) navMenu.classList.toggle('active');
    });
  }

  // dropdown accessibility: set aria-expanded on click
  document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', !expanded);
      // toggle sibling dropdown-content
      const dd = btn.nextElementSibling;
      if(dd) dd.style.display = expanded ? 'none' : 'block';
    });
  });

  // Floating FABs: WhatsApp, Call, Chatbot - create elements if not present
  // WhatsApp FAB
  if(!document.querySelector('.fab.whatsapp')){
    const wa = document.createElement('a');
    wa.className = 'fab whatsapp';
    wa.href = 'https://wa.me/97455092962?text=' + encodeURIComponent("Hello Zero Associate — I'd like a quote.");
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.innerHTML = '<img src="/assets/whatsapp-icon.png" alt="WhatsApp">';
    document.body.appendChild(wa);
  }

  // Call FAB
  if(!document.querySelector('.fab.call')){
    const call = document.createElement('a');
    call.className = 'fab call';
    call.href = 'tel:+97455092962';
    call.setAttribute('aria-label','Call Zero Associate');
    call.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff"><path d="M6.6 10.8c1.1 2.1 2.7 4 4.7 5.4l1.8-1.8c.2-.2.5-.3.8-.2 1 .3 2 .5 3.1.5.5 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.2 21 3 14.8 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.1.2 2.1.6 3.1.1.3 0 .6-.2.8L6.6 10.8z"/></svg>';
    document.body.appendChild(call);
  }

  // Chatbot FAB + window
  if(!document.querySelector('.fab.chatbot')){
    const chatFab = document.createElement('button');
    chatFab.className = 'fab chatbot';
    chatFab.type = 'button';
    chatFab.setAttribute('aria-label','Open chat');
    chatFab.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff"><path d="M4 4h16v12H7l-3 3V4z"/></svg>';
    document.body.appendChild(chatFab);

    // chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'za-chat-window';
    chatWindow.innerHTML = `
      <div class="chat-header">Zero Assistant <button id="za-chat-close" style="background:none;border:none;color:white;font-weight:700;cursor:pointer">✕</button></div>
      <div class="chat-body"><div class="bot-msg" style="padding:8px;border-radius:8px;background:rgba(108,78,207,0.08);margin-bottom:8px;">Hi — welcome! How can I help you today?</div></div>
      <div class="chat-input"><input id="za-chat-input" type="text" placeholder="Type your message..." aria-label="Type message"><button id="za-chat-send" class="btn btn-primary">Send</button></div>
    `;
    document.body.appendChild(chatWindow);

    const zaChatWindow = document.getElementById('za-chat-window');
    const zaChatClose = document.getElementById('za-chat-close');
    chatFab.addEventListener('click', () => zaChatWindow.classList.toggle('active'));
    if(zaChatClose) zaChatClose.addEventListener('click', () => zaChatWindow.classList.remove('active'));

    // quick send (local, rule-based replies)
    const zaChatSend = document.getElementById('za-chat-send');
    const zaChatInput = document.getElementById('za-chat-input');
    const zaChatBody = document.querySelector('#za-chat-window .chat-body');
    if(zaChatSend && zaChatInput && zaChatBody){
      zaChatSend.addEventListener('click', () => {
        const txt = zaChatInput.value.trim();
        if(!txt) return;
        // append user msg
        const um = document.createElement('div'); um.className = 'user-message'; um.style.cssText = 'background:var(--primary);color:white;padding:8px;border-radius:8px;margin-bottom:8px;align-self:flex-end;max-width:80%'; um.textContent = txt;
        zaChatBody.appendChild(um);
        zaChatInput.value = '';
        // bot reply (simple)
        setTimeout(()=> {
          const bm = document.createElement('div'); bm.className='bot-message'; bm.style.cssText='background:var(--light-bg);padding:8px;border-radius:8px;margin-bottom:8px;max-width:80%'; bm.innerHTML = 'Thanks — we received your message. We will contact you shortly. For quick quotes call +974 5509 2962';
          zaChatBody.appendChild(bm);
          zaChatBody.scrollTop = zaChatBody.scrollHeight;
        }, 600);
      });
    }
  }
})();
