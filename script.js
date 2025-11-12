// ===== Scroll Animation =====
const sections = document.querySelectorAll('.fade-in');
function handleScroll() {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect().top;
    if (rect < window.innerHeight - 100) sec.classList.add('visible');
  });
}
window.addEventListener('scroll', handleScroll);
window.addEventListener('load', handleScroll);

// ===== FAQ Toggle =====
const faqs = document.querySelectorAll('.faq-item');
faqs.forEach(faq => {
  faq.addEventListener('click', () => {
    const answer = faq.querySelector('p');
    if (!answer) return;
    if (answer.style.display === 'block') answer.style.display = 'none';
    else answer.style.display = 'block';
  });
});

// ===== Chatbot =====
const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');
if (chatBtn && chatBox) {
  chatBtn.addEventListener('click', () => {
    const isOpen = chatBox.style.display === 'flex';
    chatBox.style.display = isOpen ? 'none' : 'flex';
    chatBox.setAttribute('aria-hidden', isOpen ? 'true' : 'false');
  });
}

document.querySelectorAll('.chat-option').forEach(btn => {
  btn.addEventListener('click', e => {
    const reply = e.target.getAttribute('data-reply');
    const chatBody = document.getElementById('chat-body');
    let response = "";
    if (reply === "Our Services") response = "We offer AC, Cleaning, Electrical, Painting, Construction & Food Trading. Click services section for full details.";
    else if (reply === "Contact Info") response = "📧 info@zeroassociate.com | hr@zeroassociate.com | 📞 +974 5509 2962";
    else if (reply === "Location") response = "📍 Doha, Qatar";
    chatBody.innerHTML += `<p><strong>You:</strong> ${reply}</p><p><strong>Bot:</strong> ${response}</p>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  });
});

// ===== Google Sheet Integration =====
// Replace the URL with your deployed Apps Script web app URL
const scriptURL = 'YOUR_SCRIPT_WEB_APP_URL';
const form = document.forms['submit-to-google-sheet'];
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    fetch(scriptURL, { method: 'POST', body: new FormData(form)})
      .then(() => { alert('Message sent successfully!'); form.reset(); })
      .catch(err => { console.error(err); alert('Error! Please try again.'); });
  });
}
