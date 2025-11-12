// ===== Scroll Animation =====
const sections = document.querySelectorAll('.fade-in');
window.addEventListener('scroll', () => {
  sections.forEach(sec => {
    const rect = sec.getBoundingClientRect().top;
    if (rect < window.innerHeight - 100) sec.classList.add('visible');
  });
});
window.addEventListener('load', () => {
  sections.forEach(s => s.classList.add('visible'));
});

// ===== FAQ Toggle =====
const faqs = document.querySelectorAll('.faq-item');
faqs.forEach(faq => {
  faq.addEventListener('click', () => {
    const answer = faq.querySelector('p');
    if (!answer) return;
    answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

// ===== Chatbot =====
const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');
if (chatBtn && chatBox) {
  chatBtn.addEventListener('click', () => {
    chatBox.style.display = chatBox.style.display === 'flex' ? 'none' : 'flex';
  });

  document.querySelectorAll('.chat-option').forEach(btn => {
    btn.addEventListener('click', e => {
      const reply = e.target.getAttribute('data-reply');
      const chatBody = document.getElementById('chat-body');
      let response = "";
      if (reply === "Our Services") response = "We offer AC, Cleaning, Electrical, Painting, Flooring, Construction fit-out & Food Trading.";
      else if (reply === "Contact Info") response = "📧 info@zeroassociate.com | 📞 +974 5509 2962";
      else if (reply === "HR") response = "For recruitment & HR: hr@zeroassociate.com";
      else if (reply === "Location") response = "📍 Zone 90, Street 720, Building 186, Floor 1, Al Wakra, Doha, Qatar";
      chatBody.innerHTML += `<p><strong>You:</strong> ${reply}</p><p><strong>Bot:</strong> ${response}</p>`;
      chatBody.scrollTop = chatBody.scrollHeight;
    });
  });
}

// ===== Google Sheet Integration (replace with your script URL) =====
const scriptURL = 'YOUR_SCRIPT_WEB_APP_URL';
const form = document.forms['submit-to-google-sheet'];
if (form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    if (!scriptURL || scriptURL === 'YOUR_SCRIPT_WEB_APP_URL') {
      alert('Form submit URL not configured. Please update script.js with your Google Apps Script Web App URL.');
      return;
    }
    fetch(scriptURL, { method: 'POST', body: new FormData(form) })
      .then(() => {
        alert('Message sent successfully!');
        form.reset();
      })
      .catch(() => alert('Error! Please try again.'));
  });
}
