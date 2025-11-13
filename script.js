// ===========================================================
// zeroassociate - script.js
// Final JS: scroll reveal, nav active, FAQ, chatbot, whatsapp, form -> Google Sheet
// Author: VIMESH VENU
// ===========================================================

document.addEventListener("DOMContentLoaded", () => {

  /* ===========================
     CONFIG - CHANGE THIS
     =========================== */
  // Replace with your Google Apps Script Web App URL (published as "Anyone, even anonymous" if needed)
  const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";

  // WhatsApp phone + message (use international format without +)
  const whatsappNumber = "97455092962"; // Qatari number without +
  const whatsappMessage = encodeURIComponent("Hello Zero Associate — I'd like a quote for your services.");

  /* ===========================
     MOBILE NAV TOGGLE
     =========================== */
  const navToggle = document.getElementById("mobile-nav-toggle");
  const navMenu = document.querySelector(".nav-menu");
  if (navToggle && navMenu) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.toggle("active");
      const isOpen = navMenu.classList.contains("active");
      navToggle.setAttribute("aria-expanded", isOpen);
      navToggle.innerHTML = isOpen ? '✕' : '&#9776;';
    });

    // close on nav link click
    navMenu.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        if (navMenu.classList.contains("active")) {
          navMenu.classList.remove("active");
          navToggle.setAttribute("aria-expanded", "false");
          navToggle.innerHTML = '&#9776;';
        }
      });
    });
  }

  /* ===========================
     ACTIVE NAV LINK ON SCROLL
     =========================== */
  const sections = document.querySelectorAll("section[id]");
  const navLinks = document.querySelectorAll(".nav-menu a");
  function setActiveNav() {
    let current = "";
    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      if (window.pageYOffset >= top) current = sec.getAttribute("id");
    });
    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${current}`);
    });
  }
  window.addEventListener("scroll", setActiveNav);
  setActiveNav();

  /* ===========================
     SCROLL REVEAL (IntersectionObserver)
     =========================== */
  const reveals = document.querySelectorAll(".reveal, .fade-in");
  const revealObserver = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  reveals.forEach(r => revealObserver.observe(r));

  /* ===========================
     FAQ ACCORDION
     - HTML structure expected:
       <div class="faq-item">
         <button class="faq-question">Question</button>
         <div class="faq-answer"><p>Answer</p></div>
       </div>
     =========================== */
  document.querySelectorAll(".faq-question").forEach(btn => {
    btn.addEventListener("click", () => {
      const parent = btn.closest(".faq-item");
      const answer = parent.querySelector(".faq-answer");
      const isOpen = btn.classList.contains("active");

      // close all
      document.querySelectorAll(".faq-question").forEach(q => q.classList.remove("active"));
      document.querySelectorAll(".faq-answer").forEach(a => a.classList.remove("active"));

      // toggle current
      if (!isOpen) {
        btn.classList.add("active");
        answer.classList.add("active");
      }
    });
  });

  /* ===========================
     CHATBOT (simple rule-based)
     HTML expected:
     - #chatbot-fab (button)
     - #chatbot-window (container)
     - .chat-quick-reply buttons with data-reply
     - #chatbot-body to append messages
     =========================== */
  const chatFab = document.getElementById("chatbot-fab");
  const chatWindow = document.getElementById("chatbot-window");
  const chatClose = document.getElementById("chatbot-close");
  const chatBody = document.getElementById("chatbot-body");

  const botReplies = {
    "Our Services": "We provide AC & Refrigeration, Specialised Cleaning, Hospitality Cleaning, Food Trading, Flooring & Painting. For details click the Services section or contact us.",
    "Contact Info": "Phone: +974 5509 2962\nEmail: info@zeroassociate.com",
    "Location": "Doha, Qatar"
  };

  function addChatMessage(text, sender = "bot") {
    const wrapper = document.createElement("div");
    wrapper.className = `chat-message ${sender}`;
    const bubble = document.createElement("div");
    bubble.className = "chat-bubble";
    // preserve line breaks
    bubble.innerHTML = text.replace(/\n/g, "<br>");
    wrapper.appendChild(bubble);
    chatBody.appendChild(wrapper);
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  if (chatFab) {
    chatFab.addEventListener("click", () => chatWindow.classList.toggle("active"));
  }
  if (chatClose) {
    chatClose.addEventListener("click", () => chatWindow.classList.remove("active"));
  }
  document.querySelectorAll(".chat-quick-reply").forEach(btn => {
    btn.addEventListener("click", () => {
      const q = btn.dataset.reply;
      addChatMessage(q, "user");
      setTimeout(() => {
        const r = botReplies[q] || "Sorry, I didn't get that. Please choose an option.";
        addChatMessage(r, "bot");
      }, 400);
    });
  });

  /* ===========================
     WHATSAPP FAB
     - element .whatsapp-fab expected, it opens chat
     =========================== */
  const waBtn = document.querySelector(".whatsapp-fab");
  if (waBtn) {
    waBtn.addEventListener("click", () => {
      const url = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;
      window.open(url, "_blank");
    });
  }

  /* ===========================
     CONTACT FORM -> Google Apps Script
     HTML expected:
     <form name="submit-to-google-sheet" id="contact-form"> ... </form>
     =========================== */
  const form = document.forms["submit-to-google-sheet"] || document.getElementById("contact-form");
  const formMessage = document.getElementById("form-message"); // optional element to show status

  if (form) {
    form.addEventListener("submit", e => {
      e.preventDefault();

      // basic client-side validation
      const formData = new FormData(form);
      const name = (formData.get("Name") || formData.get("name") || "").toString().trim();
      const email = (formData.get("Email") || formData.get("email") || "").toString().trim();
      const message = (formData.get("Message") || formData.get("message") || formData.get("msg") || "").toString().trim();

      if (!name || !email || !message) {
        alert("Please fill all required fields.");
        return;
      }

      // UX: disable submit while sending
      const submitButton = form.querySelector("button[type='submit']") || form.querySelector("button");
      if (submitButton) { submitButton.disabled = true; submitButton.innerText = "Sending..."; }

      fetch(scriptURL, { method: "POST", body: formData })
        .then(resp => {
          // success UX
          if (submitButton) { submitButton.disabled = false; submitButton.innerText = "Send Message"; }
          if (formMessage) {
            formMessage.className = "form-message success";
            formMessage.innerText = `Thank you ${name}! Your message was sent.`;
            setTimeout(() => formMessage.className = "form-message", 4000);
          } else {
            alert("Message sent successfully! We will contact you soon.");
          }
          form.reset();
        })
        .catch(err => {
          console.error("Form submit error:", err);
          if (submitButton) { submitButton.disabled = false; submitButton.innerText = "Send Message"; }
          if (formMessage) {
            formMessage.className = "form-message error";
            formMessage.innerText = "Error sending message. Please try again.";
            setTimeout(() => formMessage.className = "form-message", 4000);
          } else {
            alert("Error sending message. Please try again.");
          }
        });
    });
  }

  /* ===========================
     OPTIONAL: Open service details in new page or modal
     - Links with class .learn-more can point to services/service-xyz.html
     - If you want modal behavior, implement here.
     =========================== */

  // Example: open links with target attribute
  document.querySelectorAll(".learn-more").forEach(a => {
    a.addEventListener("click", (ev) => {
      // let default anchor work if href exists and is external
      // otherwise preventDefault and open modal (not implemented)
      // ev.preventDefault();
    });
  });

  /* ===========================
     SMALL HELPERS & ACCESSIBILITY
     =========================== */
  // close mobile nav on ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      if (navMenu && navMenu.classList.contains("active")) {
        navMenu.classList.remove("active");
      }
      if (chatWindow && chatWindow.classList.contains("active")) {
        chatWindow.classList.remove("active");
      }
    }
  });

}); // DOMContentLoaded end
