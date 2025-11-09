/* ------------------------------
   ZERO ASSOCIATES | SCRIPT.JS
   Designed by VIMESH VENU
--------------------------------*/

// FADE-IN ON SCROLL
const fadeElements = document.querySelectorAll(".fade-in");

window.addEventListener("scroll", () => {
  fadeElements.forEach((el) => {
    const pos = el.getBoundingClientRect().top;
    if (pos < window.innerHeight - 100) {
      el.style.opacity = 1;
      el.style.transform = "translateY(0)";
    }
  });
});

// CHATBOT
const chatBtn = document.getElementById("chat-btn");
const chatBox = document.getElementById("chat-box");
const chatBody = document.getElementById("chat-body");

chatBtn.addEventListener("click", () => {
  chatBox.classList.toggle("hidden");
});

document.querySelectorAll(".chat-option").forEach((btn) => {
  btn.addEventListener("click", () => {
    const reply = btn.dataset.reply;
    addMessage(`🧑‍💼 You: ${reply}`);
    setTimeout(() => {
      chatbotReply(reply);
    }, 700);
  });
});

function addMessage(msg) {
  const p = document.createElement("p");
  p.textContent = msg;
  chatBody.appendChild(p);
  chatBody.scrollTop = chatBody.scrollHeight;
}

function chatbotReply(input) {
  let response = "";
  switch (input) {
    case "Our Services":
      response = "We offer AC, Cleaning, Electrical, Painting, and Food Trading services across Qatar.";
      break;
    case "Contact Info":
      response = "📞 +974 5509 2962 | ✉️ info@zeroassociates.com";
      break;
    case "Location":
      response = "📍 We are located in Doha, Qatar. Check map below 👇";
      break;
    default:
      response = "I'm here to assist you! Ask anything about our services.";
  }
  addMessage(`🤖 Zero Assistant: ${response}`);
}

// GOOGLE SHEET FORM SUBMISSION
const scriptURL = "https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec";
const form = document.forms["submit-to-google-sheet"];

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    fetch(scriptURL, { method: "POST", body: new FormData(form) })
      .then(() => {
        alert("✅ Message sent successfully! We'll contact you soon.");
        form.reset();
      })
      .catch((error) => alert("❌ Error: " + error.message));
  });
}

// SMOOTH SCROLL
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute("href")).scrollIntoView({
      behavior: "smooth",
    });
  });
});
