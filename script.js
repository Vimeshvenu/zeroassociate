// ===== Scroll reveal =====
const revealElements = document.querySelectorAll('.section, .service-card, .gallery-grid img, .faq-item, .mission-card');
const revealObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
revealElements.forEach(el => revealObserver.observe(el));

// ===== FAQ accordion =====
document.querySelectorAll('.faq-question').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = answer.style.display === 'block';
    // close others
    document.querySelectorAll('.faq-answer').forEach(a => a.style.display = 'none');
    document.querySelectorAll('.faq-question').forEach(q => q.classList.remove('active'));
    if (!isOpen) {
      answer.style.display = 'block';
      btn.classList.add('active');
    }
  });
});

// ===== Chatbot UI & canned replies =====
const fab = document.getElementById('chatbot-fab');
const win = document.getElementById('chatbot-window');
const closeBtn = document.getElementById('chatbot-close');
const bodyEl = document.getElementById('chatbot-body');
const quicks = document.querySelectorAll('.chat-quick-reply');

function addMessage(text, sender='bot') {
  const wrap = document.createElement('div');
  wrap.className = 'chat-message ' + (sender === 'user' ? 'user' : 'bot');
  const bubble = document.createElement('div');
  bubble.className = 'chat-bubble';
  bubble.innerHTML = text;
  wrap.appendChild(bubble);
  bodyEl.appendChild(wrap);
  bodyEl.scrollTop = bodyEl.scrollHeight;
}

fab.addEventListener('click', () => win.classList.toggle('active'));
closeBtn.addEventListener('click', () => win.classList.remove('active'));

const botAnswers = {
  "Our Services": "We provide AC & Refrigeration, Specialised Cleaning, Hospitality Cleaning, Electrical & Plumbing, Painting, Construction & Food Trading. For detailed scope, please tell which service you need.",
  "Request Quote": "To request a quote, share your project details (location, service, preferred date) — or use the contact form. We'll reply within 24 hours.",
  "Contact Info": "Office: West Bay, Doha, Qatar. Phone: +974 5509 2962. Email: info@zeroassociate.com.",
  "Careers": "For careers/HR: Send CV to hr@zeroassociate.com with subject 'Job Application - [Position]'.",
  "Location": "Our service area: Doha and surrounding regions in Qatar."
};

quicks.forEach(btn => {
  btn.addEventListener('click', e => {
    const key = e.target.dataset.reply;
    addMessage(key, 'user');
    setTimeout(() => addMessage(botAnswers[key] || "Sorry, I don't have that information right now."), 500);
  });
});

// ===== Contact form -> Google Sheets (Apps Script) =====
const scriptURL = 'YOUR_SCRIPT_WEB_APP_URL'; // <-- replace with your Apps Script Web App URL
const form = document.forms['submit-to-google-sheet'];
const formMessage = document.getElementById('form-message');

if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    formMessage.textContent = 'Sending...';
    const data = new FormData(form);
    fetch(scriptURL, { method: 'POST', body: data })
      .then(resp => {
        formMessage.textContent = 'Thank you! Your message has been sent.';
        formMessage.className = 'form-message success';
        form.reset();
        setTimeout(() => { formMessage.textContent = ''; formMessage.className = 'form-message'; }, 5000);
      })
      .catch(err => {
        console.error(err);
        formMessage.textContent = 'Error sending. Please try again.';
        formMessage.className = 'form-message error';
      });
  });
}
