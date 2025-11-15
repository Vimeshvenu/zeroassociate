/* script.js - Consolidated ZeroAssociate site script (SVG-inline FABs version)
   - Mobile nav toggle + dropdown accessibility
   - Active link highlight on scroll/load
   - Contact form submission (Google Script) - placeholder URL
   - FAQ accordion
   - Floating FABs: WhatsApp, Call, Chatbot + chat window (inline SVGs)
*/

document.addEventListener('DOMContentLoaded', function() {

  /* ---------------------------
     1) Mobile Navigation Toggle
     --------------------------- */
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', function() {
      const isExpanded = this.getAttribute('aria-expanded') === 'true';
      this.setAttribute('aria-expanded', !isExpanded);
      navMenu.classList.toggle('active');
      navMenu.setAttribute('aria-hidden', String(isExpanded));
    });

    navMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        if (navMenu.classList.contains('active')) {
          navToggle.click();
        }
      });
    });
  }

  /* ---------------------------
     2) Dropdown accessibility (desktop + mobile)
     --------------------------- */
  document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
      const dd = btn.nextElementSibling;
      if (dd) dd.style.display = expanded ? 'none' : 'block';
    });
  });

  /* ------------------------------------------------
     3) Active Link Highlight on Scroll / Page Load
     ------------------------------------------------ */
  const navLinks = document.querySelectorAll('.nav-menu a');

  function highlightActiveLink() {
    const currentPath = window.location.pathname.split('/').pop();
    let currentSection = '';

    if (!currentPath || currentPath === '' || currentPath === 'index.html') {
      const sections = document.querySelectorAll('section[id]');
      sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
        const sectionBottom = sectionTop + section.offsetHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionBottom) {
          currentSection = section.id;
        }
      });

      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        if ((href === 'index.html' || href === './' || href === '/') && !currentSection) {
          link.classList.add('active');
        }
        if (href.startsWith('#') && href.slice(1) === currentSection) {
          link.classList.add('active');
        }
      });
    } else {
      navLinks.forEach(link => {
        link.classList.remove('active');
        const href = link.getAttribute('href') || '';
        if (href.endsWith(currentPath) || href.includes(currentPath)) {
          link.classList.add('active');
        }
      });
      document.querySelectorAll('.nav-menu .dropdown a').forEach(slink => {
        const href = slink.getAttribute('href') || '';
        if (href.endsWith(currentPath) || href.includes(currentPath)) {
          const drop = slink.closest('.dropdown');
          if (drop) {
            const btn = drop.querySelector('.dropbtn');
            if (btn) btn.classList.add('active');
          }
        }
      });
    }
  }

  window.addEventListener('scroll', highlightActiveLink);
  window.addEventListener('load', highlightActiveLink);
  highlightActiveLink();

  /* ---------------------------
     4) Contact Form Submission (Google Script)
     --------------------------- */
  const contactForm = document.getElementById('contact-form');
  const formMessageEl = document.getElementById('form-message');
  const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec';

  if (contactForm && formMessageEl) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formMessageEl.textContent = 'Sending...';
      formMessageEl.className = 'form-message';

      if (!scriptURL || scriptURL.includes('YOUR_SCRIPT_ID')) {
        formMessageEl.textContent = 'Error: Google Apps Script URL is not configured.';
        formMessageEl.classList.add('error');
        console.error('Google Apps Script URL not configured.');
        return;
      }

      fetch(scriptURL, { method: 'POST', body: new FormData(contactForm) })
        .then(response => {
          if (response.ok) {
            formMessageEl.textContent = 'Message sent successfully!';
            formMessageEl.classList.add('success');
            contactForm.reset();
          } else {
            return response.text().then(text => { throw new Error(`Server error: ${response.status} - ${text}`); });
          }
        })
        .catch(error => {
          formMessageEl.textContent = 'Error sending message. Please try again later.';
          formMessageEl.classList.add('error');
          console.error('Contact form error:', error);
        });
    });
  }

  /* ---------------------------
     5) FAQ Accordion
     --------------------------- */
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const isExpanded = this.getAttribute('aria-expanded') === 'true';

      faqQuestions.forEach(q => {
        if (q !== this && q.getAttribute('aria-expanded') === 'true') {
          q.setAttribute('aria-expanded', 'false');
          const a = q.nextElementSibling;
          if (a) {
            a.setAttribute('aria-hidden', 'true');
            a.style.maxHeight = '0';
            a.style.paddingTop = '0';
            a.style.paddingBottom = '0';
          }
        }
      });

      this.setAttribute('aria-expanded', String(!isExpanded));
      if (!isExpanded) {
        answer.setAttribute('aria-hidden', 'false');
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.style.paddingTop = '15px';
        answer.style.paddingBottom = '15px';
      } else {
        answer.setAttribute('aria-hidden', 'true');
        answer.style.maxHeight = '0';
        answer.style.paddingTop = '0';
        answer.style.paddingBottom = '0';
      }
    });
  });

  /* ---------------------------
     6) Chatbot & Floating Action Buttons (FABs) - inline SVG icons
     --------------------------- */

  // Inline SVG helpers
  function whatsappSVG() {
    return `
      <svg viewBox="0 0 24 24" width="22" height="22" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path fill="#fff" d="M20.52 3.48A11.82 11.82 0 0012 0C5.373 0 .003 5.373 0 12c0 2.116.55 4.185 1.59 6.02L0 24l6.23-1.62A11.96 11.96 0 0012 24c6.627 0 12-5.373 12-12 0-3.2-1.24-6.2-3.48-8.52zM12 21.5c-1.35 0-2.676-.33-3.84-.95l-.27-.14-3.7.97.98-3.61-.18-.31A8.5 8.5 0 013.5 12c0-4.69 3.81-8.5 8.5-8.5 2.27 0 4.4.88 6.01 2.49A8.45 8.45 0 0120.5 12c0 4.69-3.81 8.5-8.5 8.5z"/>
        <path fill="#fff" d="M17.09 14.2c-.25-.13-1.48-.73-1.71-.82-.23-.1-.4-.13-.57.13-.17.25-.66.82-.81.99-.15.17-.3.19-.55.06-.25-.13-1.06-.39-2.02-1.25-.75-.66-1.25-1.48-1.39-1.73-.14-.25-.02-.38.11-.51.11-.11.25-.3.37-.45.12-.16.16-.27.25-.45.08-.18.04-.34-.02-.47-.06-.13-.57-1.37-.78-1.88-.2-.5-.41-.43-.57-.44-.15-.01-.33-.01-.5-.01-.17 0-.45.06-.69.28-.24.22-.93.9-.93 2.2 0 1.3.95 2.56 1.08 2.73.13.17 1.86 2.95 4.52 4.02 2.66 1.07 2.66.71 3.14.67.48-.04 1.48-.6 1.69-1.18.21-.58.21-1.08.15-1.18-.06-.1-.23-.17-.48-.3z"/>
      </svg>`;
  }

  function callSVG() {
    return `
      <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path fill="#fff" d="M6.6 10.8c1.1 2.1 2.7 4 4.7 5.4l1.8-1.8c.2-.2.5-.3.8-.2 1 .3 2 .5 3.1.5.5 0 1 .4 1 1V20c0 .6-.4 1-1 1-8.8 0-16-6.2-16-14 0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.1.2 2.1.6 3.1.1.3 0 .6-.2.8L6.6 10.8z"/>
      </svg>`;
  }

  function chatSVG() {
    return `
      <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">
        <path fill="#fff" d="M4 4h16v12H7l-3 3V4z"/>
      </svg>`;
  }

  // WhatsApp FAB
  if (!document.querySelector('.fab.whatsapp')) {
    const wa = document.createElement('a');
    wa.className = 'fab whatsapp';
    wa.href = 'https://wa.me/97455092962?text=' + encodeURIComponent("Hello Zero Associate — I'd like a quote.");
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'WhatsApp Zero Associate');
    wa.innerHTML = whatsappSVG();
    // If you prefer to use a PNG in assets, replace innerHTML with:
    // wa.innerHTML = '<img src="assets/whatsapp-icon.png" alt="WhatsApp">';
    document.body.appendChild(wa);
  }

  // Call FAB
  if (!document.querySelector('.fab.call')) {
    const call = document.createElement('a');
    call.className = 'fab call';
    call.href = 'tel:+97455092962';
    call.setAttribute('aria-label', 'Call Zero Associate');
    call.innerHTML = callSVG();
    document.body.appendChild(call);
  }

  // Chatbot FAB + window
  if (!document.querySelector('.fab.chatbot')) {
    const chatFab = document.createElement('button');
    chatFab.className = 'fab chatbot';
    chatFab.type = 'button';
    chatFab.setAttribute('aria-label', 'Open chat');
    chatFab.innerHTML = chatSVG();
    document.body.appendChild(chatFab);

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
    if (zaChatClose) zaChatClose.addEventListener('click', () => zaChatWindow.classList.remove('active'));

    const zaChatSend = document.getElementById('za-chat-send');
    const zaChatInput = document.getElementById('za-chat-input');
    const zaChatBody = document.querySelector('#za-chat-window .chat-body');

    if (zaChatSend && zaChatInput && zaChatBody) {
      function appendUserMsg(text) {
        const um = document.createElement('div');
        um.className = 'user-message';
        um.style.cssText = 'background:var(--primary);color:white;padding:8px;border-radius:8px;margin-bottom:8px;align-self:flex-end;max-width:80%';
        um.textContent = text;
        zaChatBody.appendChild(um);
        zaChatBody.scrollTop = zaChatBody.scrollHeight;
      }
      function appendBotMsg(html) {
        const bm = document.createElement('div');
        bm.className = 'bot-message';
        bm.style.cssText = 'background:var(--light-bg);padding:8px;border-radius:8px;margin-bottom:8px;max-width:80%';
        bm.innerHTML = html;
        zaChatBody.appendChild(bm);
        zaChatBody.scrollTop = zaChatBody.scrollHeight;
      }

      zaChatSend.addEventListener('click', () => {
        const txt = zaChatInput.value.trim();
        if (!txt) return;
        appendUserMsg(txt);
        zaChatInput.value = '';

        setTimeout(() => {
          const lower = txt.toLowerCase();
          if (lower.includes('price') || lower.includes('quote')) {
            appendBotMsg('Please share brief details of your request (service, location, timeframe). For urgent quotes call +974 5509 2962.');
          } else if (lower.includes('services')) {
            appendBotMsg('We provide AC, refrigeration, specialised cleaning, electrical & plumbing, painting, construction & more. Which one are you interested in?');
          } else if (lower.includes('hello') || lower.includes('hi')) {
            appendBotMsg('Hello! How can I help you today?');
          } else {
            appendBotMsg('Thanks — we received your message. We will contact you shortly.');
          }
        }, 500);
      });

      zaChatInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') zaChatSend.click();
      });
    }
  }

}); // DOMContentLoaded end                formMessage.textContent = 'Error: Google Apps Script URL is not configured. Please replace "YOUR_SCRIPT_ID" in js/script.js.';
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
