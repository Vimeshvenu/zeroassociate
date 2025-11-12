// ===== Final script.js for Zero Associate (Scroll, FAQ, Chatbot, Google Sheets) =====

// ---------- Utility helpers ----------
const safeQuery = (sel) => document.querySelector(sel);
const safeQueryAll = (sel) => Array.from(document.querySelectorAll(sel));

// ---------- Fade-in on scroll (IntersectionObserver - reliable & performant) ----------
(function setupFadeIn() {
  const fadeEls = safeQueryAll('.fade-in');
  if (!fadeEls.length) return;

  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // optional: unobserve once visible
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  fadeEls.forEach(el => {
    // initialize hidden state (in case not already)
    el.classList.add('fade-in');
    io.observe(el);
  });
})();

// ---------- FAQ Toggle (click header to open/close answer) ----------
(function setupFAQ() {
  const faqs = safeQueryAll('.faq-item');
  if (!faqs.length) return;

  faqs.forEach(faq => {
    const hdr = faq.querySelector('h3') || faq.querySelector('summary') || faq;
    const ans = faq.querySelector('p');
    if (!ans) return;
    // hide initially via inline style if not hidden by CSS
    if (getComputedStyle(ans).display === 'block') ans.style.display = 'none';

    hdr.style.cursor = 'pointer';
    hdr.addEventListener('click', () => {
      const isOpen = ans.style.display === 'block';
      if (isOpen) {
        // close animation
        ans.style.display = 'none';
      } else {
        ans.style.display = 'block';
        ans.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  });
})();

// ---------- Chatbot UI & Logic ----------
(function setupChatbot() {
  const chatBtn = safeQuery('#chat-btn');
  const chatBox = safeQuery('#chat-box');
  const chatBody = safeQuery('#chat-body');
  const chatUserInput = safeQuery('#chat-user-input');
  const chatSend = safeQuery('#chat-send');

  if (!chatBtn || !chatBox || !chatBody) return;

  // Toggle chat box
  chatBtn.addEventListener('click', () => {
    const isVisible = chatBox.style.display === 'flex';
    chatBox.style.display = isVisible ? 'none' : 'flex';
    chatBox.setAttribute('aria-hidden', isVisible ? 'true' : 'false');
  });

  // Quick buttons (if present)
  safeQueryAll('.chat-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const replyKey = (e.target.dataset.reply || '').toString().trim().toLowerCase();
      handleUserMessage(replyKey, true);
    });
  });

  // helper to append messages
  function appendMessage(who, text) {
    const wrap = document.createElement('div');
    wrap.style.marginTop = '8px';
    const whoEl = document.createElement('strong');
    whoEl.innerText = who + ': ';
    const textEl = document.createElement('span');
    textEl.innerText = text;
    wrap.appendChild(whoEl);
    wrap.appendChild(textEl);
    chatBody.appendChild(wrap);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Basic reply logic (keyword-based small assistant)
  function generateReply(userText) {
    const t = (userText || '').toLowerCase();
    if (/quote|estimate|price|cost|quotation/.test(t)) {
      return 'To get a quotation please share: project type, location, approximate size/scope and contact number. Or use Request a Quote form.';
    }
    if (/jobs|career|vacancy|hr|recruit/.test(t)) {
      return 'For careers send CV to hr@zeroassociate.com with subject: Job Application - [Position]';
    }
    if (/service|services|ac|air|conditioning|clean/i.test(t)) {
      return 'We offer AC, Cleaning, Electrical, Painting, Construction & Food Trading. Click Services for details or ask for a specific service.';
    }
    if (/contact|phone|email|call/i.test(t)) {
      return 'Contact: +974 5509 2962 | info@zeroassociate.com';
    }
    if (/location|where|address/i.test(t)) {
      return 'We are based in Al Wakra, Doha, Qatar. Use the map on Contact section for directions.';
    }
    // default fallback
    return 'Thanks — we received your question. For quick support call +974 5509 2962 or use the contact form. We will respond shortly.';
  }

  // handle messages triggered by quick buttons or manual input
  function handleUserMessage(text, fromQuick=false) {
    const userMsg = fromQuick ? text : (chatUserInput && chatUserInput.value.trim());
    if (!userMsg) return;
    appendMessage('You', userMsg);
    if (!fromQuick && chatUserInput) chatUserInput.value = '';

    // generate bot reply (simulate small delay)
    setTimeout(() => {
      const botReply = generateReply(userMsg);
      appendMessage('ZERO Assistant', botReply);
    }, 600);
  }

  // manual send
  if (chatSend && chatUserInput) {
    chatSend.addEventListener('click', () => handleUserMessage('', false));
    chatUserInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        handleUserMessage('', false);
      }
    });
  }
})();

// ---------- Google Sheets form integration (contact form) ----------
(function setupForm() {
  const scriptURL = 'YOUR_SCRIPT_WEB_APP_URL'; // <-- REPLACE with your published Apps Script web app URL
  const form = document.forms['submit-to-google-sheet'] || document.getElementById('contact-form');
  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    // disable submit button while sending (if present)
    const submitBtn = form.querySelector('button[type="submit"], input[type="submit"]');
    if (submitBtn) submitBtn.disabled = true;

    fetch(scriptURL, {
      method: 'POST',
      body: data
    })
    .then(response => {
      // you can check response.ok if Apps Script returns proper status
      alert('✅ Message sent successfully!');
      form.reset();
    })
    .catch(err => {
      console.error('Form submit error:', err);
      alert('❌ Sending failed. Please try again later.');
    })
    .finally(() => {
      if (submitBtn) submitBtn.disabled = false;
    });
  });
})();

// ---------- Small enhancement: close chat when clicking outside ----------
(function chatClickOutside() {
  const chatBox = safeQuery('#chat-box');
  const chatBtn = safeQuery('#chat-btn');
  if (!chatBox) return;
  document.addEventListener('click', (e) => {
    const target = e.target;
    if (!chatBox.contains(target) && !chatBtn.contains(target)) {
      // hide chat
      chatBox.style.display = 'none';
      chatBox.setAttribute('aria-hidden', 'true');
    }
  });
})();
