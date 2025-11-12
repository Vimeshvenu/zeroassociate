// ===== Scroll Animation =====
const sections = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect().top;
    if (rect < window.innerHeight - 100) sec.classList.add('visible');
  });
});

// ===== FAQ Toggle =====
const faqs = document.querySelectorAll('.faq-item');
faqs.forEach(faq => {
  faq.addEventListener('click', () => {
    const answer = faq.querySelector('p');
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

// ===== Chatbot =====
const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');
chatBtn.addEventListener('click', () => {
  chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
});

document.querySelectorAll('.chat-option').forEach(btn => {
  btn.addEventListener('click', e => {
    const reply = e.target.getAttribute('data-reply');
    const chatBody = document.getElementById('chat-body');
    let response = "";
    if (reply === "Our Services") response = "We offer AC, Cleaning, Electrical, Painting, Construction & Food Trading.";
    else if (reply === "Contact Info") response = "📧 info@zeroassociate.com | 📞 +974 5509 2962";
    else if (reply === "Location") response = "📍 Doha, Qatar";
    chatBody.innerHTML += `<p><strong>You:</strong> ${reply}</p><p><strong>Bot:</strong> ${response}</p>`;
  });
});

// ===== Google Sheet Integration =====
const scriptURL = 'YOUR_SCRIPT_WEB_APP_URL';
const form = document.forms['submit-to-google-sheet'];
form.addEventListener('submit', e => {
  e.preventDefault();
  fetch(scriptURL, { method: 'POST', body: new FormData(form) })
    .then(() => alert('Message sent successfully!'))
    .catch(() => alert('Error! Please try again.'));
});
