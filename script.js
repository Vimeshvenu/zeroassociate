window.onload = () => {
  const chatBody = document.getElementById("chatBody");
  chatBody.innerHTML = "<p>Hello! 👋 How can we help you today?</p>";
};

document.getElementById("chatInput").addEventListener("keypress", e => {
  if (e.key === "Enter") {
    const chatBody = document.getElementById("chatBody");
    const msg = e.target.value.trim();
    if (msg) {
      chatBody.innerHTML += `<p><strong>You:</strong> ${msg}</p>`;
      e.target.value = "";
    }
  }
});
