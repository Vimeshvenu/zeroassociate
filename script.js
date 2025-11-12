// Scroll animations
const sections = document.querySelectorAll('.fade-in');
const obsOptions = { threshold: 0.15 };
const obs = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
}, obsOptions);
document.querySelectorAll('.fade-in').forEach(s => obs.observe(s));

// Service detail content
const serviceData = {
  ac: `<h2>Air Conditioning & Refrigeration</h2><p>Full installation, maintenance, gas refill, preventive contracts, VRF support and certified technicians.</p>`,
  clean: `<h2>Cleaning & Maintenance</h2><p>Commercial cleaning, facility management, periodic cleaning contracts and specialised post-construction cleaning.</p>`,
  electrical: `<h2>Electrical & Plumbing</h2><p>Licensed electricians, emergency repairs, panel work, plumbing and water system services.</p>`,
  painting: `<h2>Painting & Technical Works</h2><p>Project painting, protective coatings, finishing and technical painting solutions.</p>`,
  construction: `<h2>Construction & Fit-Out</h2><p>Turnkey fit-outs, civil works, supervision and site management for small-medium projects.</p>`,
  food: `<h2>Food Trading & Supply</h2><p>Wholesale distribution, warehousing, cold storage partners, vendor management and logistic solutions.</p>`
};

// modal open
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('click', () => {
    const key = card.getAttribute('data-detail');
    document.getElementById('modal-content').innerHTML = serviceData[key] || '<p>Details coming soon</p>';
    document.getElementById('service-modal').classList.remove('hidden');
  });
});
document.getElementById('modal-close').addEventListener('click', () => {
  document.getElementById('service-modal').classList.add('hidden');
});

// FAQ toggle
document.querySelectorAll('.faq-item').forEach(f => {
  f.addEventListener('click', () => {
    const p = f.querySelector('p');
    p.style.display = (p.style.display === 'block') ? 'none' : 'block';
  });
});

// Chatbot basic
const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');
chatBtn.addEventListener('click', () => chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex');
document.querySelectorAll('.chat-option').forEach(btn => {
  btn.addEventListener('click', (e) => {
    const r = e.target.dataset.reply;
    const chatBody = document.getElementById('chat-body');
    let resp = '';
    if (r === 'Our Services') resp = 'We offer AC, Cleaning, Electrical, Painting, Construction & Food Trading.';
    if (r === 'Contact Info') resp = 'Email: info@zeroassociate.com | Phone: +974 5509 2962';
    if (r === 'Location') resp = 'Doha, Qatar';
    chatBody.innerHTML += `<p><strong>You:</strong> ${r}</p><p><strong>Bot:</strong> ${resp}</p>`;
  });
});

// Google Sheets form submit - replace scriptURL with your Apps Script web app URL
const scriptURL = 'YOUR_SCRIPT_WEB_APP_URL';
const form = document.forms['submit-to-google-sheet'] || document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(() => { alert('Message sent!'); form.reset(); })
      .catch(() => alert('Send failed. Try again.'));
  });
}
