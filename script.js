window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll("section, .service-card, .gallery img");
  elements.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});// Fade-in animation when scrolling
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll("section, .service-card, .gallery-grid img");
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});
