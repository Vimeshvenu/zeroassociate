// Fade-in animation when scrolling
window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll("section, .service-card, .gallery-grid img");
  elements.forEach((el) => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 100) {
      el.classList.add("visible");
    }
  });
});
