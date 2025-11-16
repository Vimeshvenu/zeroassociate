// Smooth scroll for anchor links
document.addEventListener("click", function(e){
  if(e.target.matches('a[href^="#"]')){
    e.preventDefault();
    const id = e.target.getAttribute("href");
    const el = document.querySelector(id);
    if(el){ el.scrollIntoView({behavior:"smooth"}); }
  }
});

// Contact Form (Demo)
const form = document.querySelector("#contactForm");
if(form){
  form.addEventListener("submit", e=>{
    e.preventDefault();
    document.querySelector("#formMsg").textContent =
      "Message received. Connect backend to send live.";
    form.reset();
  });
}
