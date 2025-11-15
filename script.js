document.addEventListener('DOMContentLoaded', function () {

  // Nav toggle
  var menuBtn = document.getElementById('menuBtn');
  var mainNav = document.getElementById('mainNav');
  if (menuBtn && mainNav) {
    menuBtn.addEventListener('click', function () {
      var shown = mainNav.style.display === 'block';
      mainNav.style.display = shown ? 'none' : 'block';
      menuBtn.setAttribute('aria-expanded', (!shown).toString());
    });
  }

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({behavior:'smooth',block:'start'});
          if (window.innerWidth < 700 && mainNav) mainNav.style.display = 'none';
        }
      }
    });
  });

  // Contact form (AJAX fallback); if action empty, show hint
  var form = document.getElementById('contactForm');
  var statusBox = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      if (!form.getAttribute('action')) {
        e.preventDefault();
        if (statusBox) {
          statusBox.hidden = false;
          statusBox.textContent = 'Form action not set. To receive messages, set Formspree action or deploy to Netlify.';
        }
        return;
      }
      e.preventDefault();
      statusBox.hidden = false;
      statusBox.textContent = 'Sending...';
      var fd = new FormData(form);
      fetch(form.action, {
        method: form.method || 'POST',
        body: fd,
        headers: {'Accept':'application/json'}
      }).then(function (resp) {
        if (resp.ok) {
          statusBox.textContent = 'Thanks — message sent.';
          form.reset();
          setTimeout(function(){ statusBox.hidden = true; }, 4000);
        } else {
          statusBox.textContent = 'Submission failed. Try again later.';
        }
      }).catch(function(){
        statusBox.textContent = 'Network error. Try again later.';
      });
    });
  }

  // Year auto
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* Chat widget behavior */
  var chatWidget = document.getElementById('chatWidget');
  var chatOpen = document.getElementById('chatOpen');
  var chatPanel = document.querySelector('.chat-panel');
  var chatClose = document.getElementById('chatClose');
  var chatBody = document.getElementById('chatBody');
  var chatForm = document.getElementById('chatForm');
  var chatInput = document.getElementById('chatInput');

  function openChat(){
    if (chatPanel) chatPanel.style.display = 'block';
    if (chatWidget) chatWidget.setAttribute('aria-hidden','false');
  }
  function closeChat(){
    if (chatPanel) chatPanel.style.display = 'none';
    if (chatWidget) chatWidget.setAttribute('aria-hidden','true');
  }

  if (chatOpen) chatOpen.addEventListener('click', openChat);
  if (chatClose) chatClose.addEventListener('click', closeChat);

  // simple simulated bot reply
  function appendMsg(text, who){
    var el = document.createElement('div');
    el.className = 'chat-msg ' + (who === 'user' ? 'user' : 'bot');
    el.textContent = text;
    if (chatBody) {
      chatBody.appendChild(el);
      chatBody.scrollTop = chatBody.scrollHeight;
    }
  }

  if (chatForm) {
    chatForm.addEventListener('submit', function(e){
      e.preventDefault();
      var val = chatInput.value.trim();
      if (!val) return;
      appendMsg(val, 'user');
      chatInput.value = '';
      // fake reply after delay
      setTimeout(function(){
        var reply = 'Thanks for your message. We will call you shortly. For urgent help WhatsApp us at +91 95677 72247.';
        appendMsg(reply, 'bot');
      }, 900);
    });
  }

});
