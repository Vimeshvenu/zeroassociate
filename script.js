// Scroll animation
window.addEventListener("scroll", () => {
  document.querySelectorAll("section, .service-card, .gallery img").forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// FAQ toggle
document.querySelectorAll(".faq-item h3").forEach(q => {
  q.addEventListener("click", () => {
    const p = q.nextElementSibling;
    p.style.display = p.style.display === "block" ? "none" : "block";
  });
});

// Chatbot
const chatBtn = document.getElementById("chatBtn");
const chatBox = document.getElementById("chatBox");
chatBtn.addEventListener("click", () => chatBox.classList.toggle("hidden"));
