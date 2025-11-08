function showService(id){
  alert("Service details will open here (Full popup in version 2.0)");
}

const faqs = document.querySelectorAll(".faq-item button");
faqs.forEach(btn => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("active");
    const content = btn.nextElementSibling;
    content.style.display = content.style.display === "block" ? "none" : "block";
  });
});

function toggleChat(){
  const chat = document.getElementById("chatbox");
  chat.style.display = chat.style.display === "block" ? "none" : "block";
}

function scrollToSection(id){
  document.getElementById(id).scrollIntoView({ behavior: "smooth" });
  toggleChat();
}
