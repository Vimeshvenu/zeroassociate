const services = [
  {
    title: "Air Conditioning & Refrigeration",
    text: "Installation, maintenance, and repair of air conditioning systems, chillers, and refrigeration units across residential and commercial projects."
  },
  {
    title: "Cleaning & Maintenance",
    text: "Deep cleaning, facility maintenance, and disinfection services using modern tools and eco-friendly methods."
  },
  {
    title: "Electrical & Plumbing",
    text: "Safe and certified electrical wiring, lighting, plumbing installation, and repair services."
  },
  {
    title: "Painting & Technical Works",
    text: "Professional wall painting, decorative finishing, gypsum work, and waterproof coating."
  },
  {
    title: "Construction & Civil",
    text: "Turnkey civil construction, tiling, plastering, masonry, and renovation with engineering precision."
  },
  {
    title: "Food Trading & Supply",
    text: "Wholesale and retail food distribution for hotels, supermarkets, and restaurants across Qatar."
  }
];

function showModal(i) {
  document.getElementById("modalTitle").innerText = services[i].title;
  document.getElementById("modalText").innerText = services[i].text;
  document.getElementById("serviceModal").style.display = "block";
}

function closeModal() {
  document.getElementById("serviceModal").style.display = "none";
}
