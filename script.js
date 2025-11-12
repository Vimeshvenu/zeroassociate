// ===== Scroll reveal =====
const revealEls = document.querySelectorAll('.reveal, .fade-in');
const obs = new IntersectionObserver((entries)=> {
  entries.forEach(e=>{
    if(e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
  });
},{threshold:0.12});
revealEls.forEach(el=>obs.observe(el));

// ===== FAQ accordion =====
document.querySelectorAll('.faq-question').forEach(btn=>{
  btn.addEventListener('click', ()=> {
    const answer = btn.nextElementSibling;
    const expanded = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!expanded));
    if(!expanded){
      answer.style.maxHeight = answer.scrollHeight + 'px';
    } else {
      answer.style.maxHeight = null;
    }
  });
});

// ===== Chatbot simple =====
const chatBtn = document.getElementById('chat-btn');
const chatBox = document.getElementById('chat-box');
const chatBody = document.getElementById('chat-body');
const chatOptions = document.querySelectorAll('.chat-option');
if(chatBtn){
  chatBtn.addEventListener('click', ()=> {
    if(chatBox.style.display === 'flex') chatBox.style.display = 'none';
    else chatBox.style.display = 'flex';
  });
}
chatOptions.forEach(btn=>{
  btn.addEventListener('click', e=>{
    const query = e.target.getAttribute('data-reply');
    let reply = '';
    if(query === 'Our Services') reply = 'We provide AC, Cleaning, Electrical, Painting, Flooring and Food Trading services. For details click Services section.';
    else if(query === 'Contact Info') reply = 'Call +974 5509 2962 or email info@zeroassociate.com';
    else if(query === 'Location') reply = 'Doha, Qatar';
    chatBody.innerHTML += `<p><strong>You:</strong> ${query}</p><p><strong>Bot:</strong> ${reply}</p>`;
    chatBody.scrollTop = chatBody.scrollHeight;
  });
});

// ===== Contact form -> Google Sheet (Apps Script) =====
// 1) deploy Google Apps Script as web app and paste URL below
const scriptURL = 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'; // <-- REPLACE

const form = document.forms['submit-to-google-sheet'] || document.getElementById('contact-form');
if(form){
  form.addEventListener('submit', e=>{
    e.preventDefault();
    const formMessage = document.getElementById('form-message');
    if(!scriptURL.includes('YOUR_SCRIPT_ID')){
      fetch(scriptURL, { method: 'POST', body: new FormData(form)})
        .then(resp=>{
          formMessage.textContent = 'Message sent successfully! We will contact you soon.';
          formMessage.className = 'form-message success';
          form.reset();
          setTimeout(()=>{ formMessage.textContent=''; formMessage.className='form-message'; }, 5000);
        }).catch(err=>{
          formMessage.textContent = 'Error sending message. Please try again later.';
          formMessage.className = 'form-message error';
        });
    } else {
      // Local fallback for testing
      formMessage.textContent = 'Form not connected to Apps Script yet. Please replace scriptURL in script.js';
      formMessage.className = 'form-message error';
    }
  });
}
