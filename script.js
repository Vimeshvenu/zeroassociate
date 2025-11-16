/* global document, window, fetch */
document.addEventListener('DOMContentLoaded', function(){

  // Mobile nav toggle
  const navToggle = document.getElementById('mobile-nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  if(navToggle && navMenu){
    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', (!expanded).toString());
      navMenu.classList.toggle('active');
    });
  }

  // Close mobile nav when link clicked
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      if(navMenu.classList.contains('active')) {
        navToggle.click();
      }
    });
  });

  // Dropdown toggle accessible
  document.querySelectorAll('.dropbtn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', (!expanded).toString());
      const dd = btn.nextElementSibling;
      if(dd) dd.style.display = expanded ? 'none' : 'block';
    });
  });

  // FAQ accordion
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', function(){
      const answer = this.nextElementSibling;
      const expanded = this.getAttribute('aria-expanded') === 'true';
      // close others
      document.querySelectorAll('.faq-question').forEach(other => {
        if(other !== this) {
          other.setAttribute('aria-expanded','false');
          const a = other.nextElementSibling;
          if(a){ a.style.maxHeight = '0'; a.setAttribute('aria-hidden','true'); a.style.padding = '0'; }
        }
      });

      this.setAttribute('aria-expanded', (!expanded).toString());
      if(!expanded){
        answer.style.maxHeight = answer.scrollHeight + 'px';
        answer.setAttribute('aria-hidden','false');
        answer.style.padding = '12px 16px';
      } else {
        answer.style.maxHeight = '0';
        answer.setAttribute('aria-hidden','true');
        answer.style.padding = '0';
      }
    });
  });

  // Floating FABs: create if not present
  // WhatsApp
  if(!document.querySelector('.fab.whatsapp')){
    const wa = document.createElement('a');
    wa.className = 'fab whatsapp';
    wa.href = 'https://wa.me/97455092962?text=' + encodeURIComponent("Hello Zero Associate — I'd like a quote.");
    wa.target = '_blank';
    wa.rel = 'noopener';
    wa.innerHTML = '<img src="assets/whatsapp-icon.png" alt="WhatsApp">';
    document.body.appendChild(wa);
  }

  // Call
  if(!document.querySelector('.fab.call')){
    const call = document.createElement('a');
    call.className = 'fab call';
    call.href = 'tel:+97455092962';
    call.setAttribute('aria-label','Call Zero Associate');
    call.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff" width="22" height="22"><path d="M6.6 10.8c1.1 2.1 2.7 4 4.7 5.4l1.8-1.8c.2-.2.5-.3.8-.2 1 .3 2 .5 3.1.5.5 0 1 .4 1 1V20c0 .6-.4 1-1 1C9.2 21 3 14.8 3 6c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.1.2 2.1.6 3.1.1.3 0 .6-.2.8L6.6 10.8z"/></svg>';
    document.body.appendChild(call);
  }

  // Chatbot & chat window
  if(!document.querySelector('.fab.chatbot')){
    const chatFab = document.createElement('button');
    chatFab.className = 'fab chatbot';
    chatFab.type = 'button';
    chatFab.setAttribute('aria-label','Open chat');
    chatFab.innerHTML = '<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="#fff" width="22" height="22"><path d="M4 4h16v12H7l-3 3V4z"/></svg>';
    document.body.appendChild(chatFab);

    // chat window
    const chatWindow = document.createElement('div');
    chatWindow.id = 'za-chat-window';
    chatWindow.innerHTML = `
      <div class="chat-header">Zero Assistant <button id="za-chat-close" style="background:none;border:none;color:white;font-weight:700;cursor:pointer">✕</button></div>
      <div class="chat-body"><div class="bot-msg" style="padding:8px;border-radius:8px;background:rgba(108,78,207,0.08);margin-bottom:8px;">Hi — welcome! How can I help you today? Try: "services", "quote", "contact"</div></div>
      <div class="chat-input"><input id="za-chat-input" type="text" placeholder="Type your message..." aria-label="Type message"><button id="za-chat-send" class="btn btn-primary">Send</button></div>
    `;
    document.body.appendChild(chatWindow);

    const zaChatWindow = document.getElementById('za-chat-window');
    const zaChatClose = document.getElementById('za-chat-close');
    chatFab.addEventListener('click', () => zaChatWindow.classList.toggle('active'));
    if(zaChatClose) zaChatClose.addEventListener('click', () => zaChatWindow.classList.remove('active'));

    // simple rule-based assistant
    const zaChatSend = document.getElementById('za-chat-send');
    const zaChatInput = document.getElementById('za-chat-input');
    const zaChatBody = document.querySelector('#za-chat-window .chat-body');

    function appendMessage(text, sender='bot'){
      const div = document.createElement('div');
      div.className = sender === 'bot' ? 'bot-message' : 'user-message';
      div.style.cssText = (sender==='bot' ? 'background:var(--light-bg);padding:8px;border-radius:8px;margin-bottom:8px;max-width:80%;' : 'background:var(--primary);color:white;padding:8px;border-radius:8px;margin-bottom:8px;max-width:80%;align-self:flex-end;');
      div.textContent = text;
      zaChatBody.appendChild(div);
      zaChatBody.scrollTop = zaChatBody.scrollHeight;
    }

    zaChatSend.addEventListener('click', () => {
      const txt = zaChatInput.value.trim();
      if(!txt) return;
      appendMessage(txt,'user');
      zaChatInput.value = '';

      // rule-based responses
      const lower = txt.toLowerCase();
      setTimeout(()=> {
        if(lower.includes('hello')||lower.includes('hi')){
          appendMessage('Hello! How can I help? You can ask for "services", "quote", or "call".');
        } else if(lower.includes('service') || lower.includes('services')){
          appendMessage('We offer AC, Cleaning, Electrical, Painting, Construction, Flooring, Hospitality, Food Trading, Maintenance, Emptying & Sanitization. Which one do you want details for?');
        } else if(lower.includes('quote') || lower.includes('price')){
          appendMessage('Please share project details and contact number. Or submit the quote form on the Contact section.');
        } else if(lower.includes('call') || lower.includes('phone')){
          appendMessage('You can call us at +974 5509 2962. Would you like us to call you? Share your number.');
        } else {
          appendMessage('Thanks — we received your message. Our team will contact you. For urgent help call +974 5509 2962.');
        }
      }, 600);
    });

    zaChatInput.addEventListener('keypress', (e) => {
      if(e.key === 'Enter') zaChatSend.click();
    });
  }

  // Contact form submit -> Google Apps Script
  const contactForm = document.getElementById('contact-form');
  if(contactForm){
    contactForm.addEventListener('submit', function(e){
      e.preventDefault();
      const scriptUrl = document.getElementById('script-url').value.trim();
      const formMessage = document.getElementById('form-message');
      formMessage.textContent = 'Sending...';
      const formData = new FormData(contactForm);

      if(!scriptUrl || scriptUrl.includes('YOUR_SCRIPT_ID')){
        // If user hasn't replaced script URL, just show success locally and log
        setTimeout(()=> {
          formMessage.textContent = 'Saved locally — please configure Google Apps Script endpoint (script-url hidden field).';
          formMessage.className = 'form-message success';
          contactForm.reset();
        }, 800);
        return;
      }

      fetch(scriptUrl, { method: 'POST', body: formData })
      .then(res => {
        if(res.ok){
          formMessage.textContent = 'Message sent successfully! We will contact you shortly.';
          formMessage.className = 'form-message success';
          contactForm.reset();
        } else {
          return res.text().then(t => { throw new Error(t||'Server error'); });
        }
      })
      .catch(err => {
        formMessage.textContent = 'Error sending message. Please try again later.';
        formMessage.className = 'form-message error';
        console.error(err);
      });
    });
  }

}); // DOMContentLoaded
