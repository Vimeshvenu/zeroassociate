/* Version 15 — lightweight JS: nav toggle, smooth scroll, form AJAX for Netlify/Formspree */
document.addEventListener('DOMContentLoaded', function () {
  // Nav toggle (mobile)
  var nav = document.getElementById('primaryNav');
  var toggle = document.getElementById('navToggle');
  if (toggle && nav) {
    toggle.addEventListener('click', function () {
      var expanded = toggle.getAttribute('aria-expanded') === 'true';
      toggle.setAttribute('aria-expanded', (!expanded).toString());
      nav.style.display = (nav.style.display === 'block') ? 'none' : 'block';
    });
  }

  // Smooth scroll for in-page anchors
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var href = this.getAttribute('href');
      if (href.length > 1) {
        var target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // hide nav on mobile
          if (window.innerWidth < 700 && nav) nav.style.display = 'none';
        }
      }
    });
  });

  // Form handling — try AJAX submit; fallback to native (Netlify/formspree)
  var form = document.getElementById('contactForm');
  var statusBox = document.getElementById('formStatus');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      var formData = new FormData(form);
      var action = form.getAttribute('action') || window.location.href;
      fetch(action, {
        method: form.getAttribute('method') || 'POST',
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      }).then(function (resp) {
        if (resp.ok) {
          showStatus('Thanks — your message was sent.', true);
          form.reset();
        } else {
          return resp.json().then(function (data) {
            var err = data && data.error ? data.error : 'Submission failed. Please try again later.';
            showStatus(err, false);
          }).catch(function () {
            showStatus('Submission failed. Please try again later.', false);
          });
        }
      }).catch(function () {
        showStatus('Network error — please try again or email us directly.', false);
      });
    });
  }

  // helper to show status
  function showStatus(msg, ok) {
    if (!statusBox) return;
    statusBox.hidden = false;
    statusBox.textContent = msg;
    statusBox.style.color = ok ? '#0b7a53' : '#b33';
    setTimeout(function () {
      statusBox.hidden = true;
    }, 7000);
  }

  // auto year
  var y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
});
