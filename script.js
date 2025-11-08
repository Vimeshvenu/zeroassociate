window.addEventListener("scroll", () => {
  const elements = document.querySelectorAll(".service-card, .gallery img");
  elements.forEach(el => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});
