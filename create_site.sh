#!/usr/bin/env bash
set -e

ROOT="zeroassociate-site"
echo "Creating project folder: $ROOT"
rm -rf "$ROOT"
mkdir -p "$ROOT"/services
mkdir -p "$ROOT"/assets/images

cat > "$ROOT/index.html" <<'HTML'
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1" />
  <title>ZERO ASSOCIATES — Facility Services, Doha Qatar</title>
  <meta name="description" content="ZERO ASSOCIATES - HACCP-compliant hood cleaning, AC maintenance, flooring & hospitality cleaning across Qatar. Call +974 5509 2962" />
  <link rel="icon" href="assets/images/logo.png">
  <link rel="stylesheet" href="styles.css">
</head>
<body class="canva-style">
  <header class="header">
    <div class="wrap">
      <a class="brand" href="index.html"><img src="assets/images/logo.png" alt="ZERO ASSOCIATES logo" class="logo"> <span class="brand-text">ZERO ASSOCIATES</span></a>
      <nav class="nav">
        <a href="index.html">Home</a>
        <a href="services.html">Services</a>
        <a href="products.html">Products</a>
        <a href="gallery.html">Gallery</a>
        <a href="contact.html" class="btn small">Contact</a>
      </nav>
    </div>
  </header>

  <section class="hero-visual" style="background-image:url('assets/images/hero.jpg')">
    <div class="hero-overlay">
      <div class="hero-wrap">
        <div class="hero-left">
          <h1>Professional AC, Hood Cleaning & Facility Services — Qatar</h1>
          <p class="sub">HACCP-compliant specialised cleaning, HVAC maintenance, flooring & painting, and food trading. Reliable teams — documented handovers.</p>
          <div class="hero-ctas">
            <a class="btn primary" href="contact.html">Request Quote</a>
            <a class="btn ghost" href="services.html">Explore Services</a>
            <a class="btn ghost" href="assets/ZERO_ASSOCIATES_BROCHURE.pdf" download>Download Brochure</a>
          </div>
          <div class="hero-contact">
            <a href="tel:+97455092962">📞 +974 5509 2962</a> • <a href="mailto:info@zeroassociates.com">info@zeroassociates.com</a>
          </div>
        </div>
        <div class="hero-right">
          <div class="card-visual">
            <img src="assets/images/project1.jpg" alt="project example">
            <img src="assets/images/project2.jpg" alt="project example">
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="section padded">
    <div class="wrap">
      <h2 class="section-title center">Core Services</h2>
      <p class="center muted">Click any card to see full details. We provide certified teams & HACCP-ready processes.</p>

      <div class="grid cards-4">
        <a class="card-large" href="services/hood-cleaning.html">
          <figure><img src="assets/images/service-hood.jpg" alt="Hood & Duct Cleaning"></figure>
          <div class="card-content"><h3>Hood & Duct Cleaning</h3><p>Kitchen hood degreasing, duct cleaning and grease trap services.</p></div>
        </a>

        <a class="card-large" href="services/ac-refrigeration.html">
          <figure><img src="assets/images/service-ac.jpg" alt="AC & Refrigeration"></figure>
          <div class="card-content"><h3>AC & Refrigeration</h3><p>Installation, servicing, preventive maintenance & spares.</p></div>
        </a>

        <a class="card-large" href="services/flooring-wall.html">
          <figure><img src="assets/images/service-flooring.jpg" alt="Flooring & Wall Fittings"></figure>
          <div class="card-content"><h3>Flooring & Wall Fittings</h3><p>Vinyl, tile, laminate, carpets and wall finishes.</p></div>
        </a>

        <a class="card-large" href="services/hospitality-cleaning.html">
          <figure><img src="assets/images/service-hospitality.jpg" alt="Hospitality Cleaning"></figure>
          <div class="card-content"><h3>Hospitality Cleaning</h3><p>Hotels, restaurants, resorts — daily & deep cleaning.</p></div>
        </a>
      </div>
    </div>
  </section>

  <section class="showcase">
    <div class="wrap">
      <h2 class="section-title">Projects across Qatar</h2>
      <div class="showcase-row">
        <div class="showcase-item"><img src="assets/images/doha.jpg" alt="Doha"><span>Doha</span></div>
        <div class="showcase-item"><img src="assets/images/alwakra.jpg" alt="Al Wakra"><span>Al Wakra</span></div>
        <div class="showcase-item"><img src="assets/images/lusail.jpg" alt="Lusail"><span>Lusail</span></div>
        <div class="showcase-item"><img src="assets/images/educationcity.jpg" alt="Education City"><span>Education City</span></div>
      </div>
    </div>
  </section>

  <section class="section padded">
    <div class="wrap">
      <h2 class="section-title center">Why Clients Choose Us</h2>
      <div class="grid why-grid">
        <div class="why"><strong>Certified Teams</strong><p>Qualified technicians with PPE & certifications.</p></div>
        <div class="why"><strong>Transparent BOQ</strong><p>Clear pricing and detailed quotations.</p></div>
        <div class="why"><strong>Documented Handover</strong><p>Before/after photos and completion certificates.</p></div>
        <div class="why"><strong>Qatar-wide Support</strong><p>Local offices & fast response times.</p></div>
      </div>
    </div>
  </section>

  <section class="cta big-cta">
    <div class="wrap">
      <div class="cta-inner">
        <h3>Ready to start? Request a site survey today</h3>
        <div><a class="btn primary large" href="contact.html">Request Site Survey</a> <a class="btn ghost" href="tel:+97455092962">Call +974 5509 2962</a></div>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="wrap">
      <div class="footer-grid">
        <div>
          <img src="assets/images/logo.png" alt="logo" class="logo-sm">
          <p>Zone 90, Street 720, Building 186, Floor 1, Al Wakra, Doha, Qatar</p>
        </div>
        <div>
          <p><strong>Phone:</strong> <a href="tel:+97455092962">+974 5509 2962</a></p>
          <p><strong>Email:</strong> <a href="mailto:info@zeroassociates.com">info@zeroassociates.com</a></p>
          <p><strong>HR:</strong> <a href="mailto:hr@zeroassociate.com">hr@zeroassociate.com</a></p>
        </div>
        <div>
          <p>© 2025 ZERO ASSOCIATES • CR: 168031</p>
        </div>
      </div>
    </div>
  </footer>

  <div class="floating">
    <a class="fab call" href="tel:+97455092962">📞</a>
    <a class="fab wp" href="https://wa.me/97455092962" target="_blank">💬</a>
    <a class="fab mail" href="mailto:info@zeroassociates.com">✉️</a>
  </div>

  <script src="app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/services.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Services — ZERO ASSOCIATES</title><link rel="stylesheet" href="styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="index.html"><img src="assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="index.html">Home</a><a href="services.html" class="active">Services</a><a href="contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <h1 class="section-title">Services</h1>
    <p class="lead">We offer wide-ranging facility services across Qatar. Click a service to open full details.</p>

    <div class="grid services-list">
      <a class="service-card" href="services/hood-cleaning.html"><img src="assets/images/service-hood.jpg" alt=""><h3>Hood & Duct Cleaning</h3><p>HACCP-aware degreasing, duct cleaning & grease trap service.</p></a>

      <a class="service-card" href="services/ac-refrigeration.html"><img src="assets/images/service-ac.jpg" alt=""><h3>AC & Refrigeration</h3><p>Installation, AMC, spares and emergency repairs.</p></a>

      <a class="service-card" href="services/water-tank-cleaning.html"><img src="assets/images/service-water.jpg" alt=""><h3>Water Tank Cleaning</h3><p>Chlorination and sanitation for potable tanks.</p></a>

      <a class="service-card" href="services/flooring-wall.html"><img src="assets/images/service-flooring.jpg" alt=""><h3>Flooring & Wall Fittings</h3><p>Vinyl, tile, laminate, carpet and wall panels.</p></a>

      <a class="service-card" href="services/painting.html"><img src="assets/images/service-paint.jpg" alt=""><h3>Painting Works</h3><p>Interior & exterior painting and finishing.</p></a>

      <a class="service-card" href="services/hospitality-cleaning.html"><img src="assets/images/service-hospitality.jpg" alt=""><h3>Hospitality Cleaning</h3><p>Hotels, restaurants and event cleaning.</p></a>

      <a class="service-card" href="services/food-trading.html"><img src="assets/images/service-trade.jpg" alt=""><h3>Food Trading</h3><p>Grains, spices, canned & packaged foods — wholesale.</p></a>

      <a class="service-card" href="services/general-maintenance.html"><img src="assets/images/service-maint.jpg" alt=""><h3>General Maintenance</h3><p>Electrical, plumbing, carpentry and preventive maintenance.</p></a>
    </div>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div><div><a href="mailto:info@zeroassociates.com">info@zeroassociates.com</a></div></div></div></footer>
  <script src="app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/services/hood-cleaning.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Hood & Duct Cleaning — ZERO ASSOCIATES</title><link rel="stylesheet" href="../styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="../index.html"><img src="../assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="../index.html">Home</a><a href="../services.html">Services</a><a href="../contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <div class="service-hero" style="background-image:url('../assets/images/service-hood.jpg')">
      <div class="service-hero-inner">
        <h1>Hood & Duct Cleaning</h1>
        <p class="sub">HACCP-ready kitchen exhaust cleaning to remove grease, reduce fire risk and ensure compliance.</p>
      </div>
    </div>

    <article class="card big">
      <h2>Overview</h2>
      <p>Zero Associate provides comprehensive specialised cleaning solutions for commercial kitchens and food facilities. Our services include hood canopy degreasing, duct cleaning (camera inspection), extraction fan servicing and grease trap cleaning. We follow HACCP and safety standards and provide detailed handover documentation.</p>

      <h3>Services included</h3>
      <ul>
        <li>Hood Exhaust & Degreasing</li>
        <li>Kitchen Duct Cleaning & Camera Inspection</li>
        <li>HVAC Duct Cleaning & AHU Inspection</li>
        <li>Grease Trap Cleaning & Disposal</li>
        <li>Ventilation & AHU Cleaning</li>
      </ul>

      <h3>How to request a quote</h3>
      <ol>
        <li>Contact via phone or email with job details</li>
        <li>We schedule a site survey</li>
        <li>Receive a detailed BOQ and quotation</li>
        <li>Approve & schedule the work</li>
      </ol>

      <div class="service-actions">
        <a class="btn primary" href="../contact.html">Request Site Survey</a>
        <a class="btn ghost" href="../assets/ZERO_ASSOCIATES_BROCHURE.pdf" download>Download Brochure</a>
      </div>
    </article>

    <section>
      <h3>Gallery</h3>
      <div class="gallery-grid">
        <img src="../assets/images/hood1.jpg" alt="before cleaning">
        <img src="../assets/images/hood2.jpg" alt="work in progress">
        <img src="../assets/images/hood3.jpg" alt="after cleaning">
      </div>
    </section>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div><div><a href="mailto:info@zeroassociates.com">info@zeroassociates.com</a></div></div></div></footer>
  <script src="../app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/services/ac-refrigeration.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>AC & Refrigeration — ZERO ASSOCIATES</title><link rel="stylesheet" href="../styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="../index.html"><img src="../assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="../index.html">Home</a><a href="../services.html">Services</a><a href="../contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <article class="card">
      <h1>AC & Refrigeration</h1>
      <p class="lead">Installation, maintenance and repair for domestic and commercial refrigeration and air conditioning.</p>

      <h3>We cover</h3>
      <ul>
        <li>Split, ducted and VRF system installation</li>
        <li>Preventive maintenance contracts (AMC)</li>
        <li>Compressor & circuit repairs, leak checks</li>
        <li>Supply of genuine spare parts and filters</li>
        <li>Emergency breakdown & after-hours service</li>
      </ul>

      <h3>Brands supported</h3>
      <p>All major brands: Carrier, Midea, Panasonic, LG, Mitsubishi, Hisense, Blue Star, Gree, etc.</p>

      <div style="margin-top:12px">
        <a class="btn-primary btn" href="../contact.html">Request Service</a>
        <a class="btn-ghost btn" href="../assets/ZERO_ASSOCIATES_BROCHURE.pdf" download>Download Brochure</a>
      </div>
    </article>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="../app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/services/water-tank-cleaning.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Water Tank Cleaning — ZERO ASSOCIATES</title><link rel="stylesheet" href="../styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="../index.html"><img src="../assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="../index.html">Home</a><a href="../services.html">Services</a><a href="../contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <article class="card">
      <h1>Water Tank Cleaning & Chlorination</h1>
      <p class="lead">Safe, certified cleaning and chlorination for potable and non-potable water tanks.</p>

      <h3>Service details</h3>
      <ul>
        <li>Complete emptying, scrubbing and disinfection</li>
        <li>Sampling & testing for bacteria / coliforms</li>
        <li>Removal of sediment, biofilm and debris</li>
        <li>Handover report and bacteriological test report</li>
      </ul>

      <div style="margin-top:12px">
        <a class="btn-primary btn" href="../contact.html">Request Tank Cleaning</a>
      </div>
    </article>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="../app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/services/flooring-wall.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Flooring & Wall Fittings — ZERO ASSOCIATES</title><link rel="stylesheet" href="../styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="../index.html"><img src="../assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="../index.html">Home</a><a href="../services.html">Services</a><a href="../contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <article class="card">
      <h1>Flooring & Wall Fittings</h1>
      <p class="lead">High-quality, durable, stylish flooring and wall solutions for residential, commercial and industrial spaces.</p>

      <h3>Our services include</h3>
      <ul>
        <li>Installation of vinyl, laminate, wood, tile and carpet flooring</li>
        <li>Decorative wall panels and coverings</li>
        <li>Acoustic & insulation wall solutions</li>
        <li>Custom fittings to client specifications</li>
      </ul>

      <div style="margin-top:12px">
        <a class="btn-primary btn" href="../contact.html">Request Quote</a>
      </div>
    </article>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="../app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/services/painting.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Painting Works — ZERO ASSOCIATES</title><link rel="stylesheet" href="../styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="../index.html"><img src="../assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="../index.html">Home</a><a href="../services.html">Services</a><a href="../contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <article class="card">
      <h1>Painting Works</h1>
      <p class="lead">Professional interior and exterior painting with high-quality primers, sealers and finishes.</p>

      <h3>Painter responsibilities include</h3>
      <ul>
        <li>Surface preparation: sanding, cleaning, priming</li>
        <li>Apply various finishes and protective coatings</li>
        <li>Remove old paint where necessary and repair surfaces</li>
        <li>Site cleanup and waste handling</li>
      </ul>

      <div style="margin-top:12px">
        <a class="btn-primary btn" href="../contact.html">Get a Painting Quote</a>
      </div>
    </article>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="../app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/services/hospitality-cleaning.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Hospitality Cleaning — ZERO ASSOCIATES</title><link rel="stylesheet" href="../styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="../index.html"><img src="../assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="../index.html">Home</a><a href="../services.html">Services</a><a href="../contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <article class="card">
      <h1>Hospitality Cleaning & Services</h1>
      <p class="lead">Top-tier cleaning and maintenance solutions tailored to the hospitality industry — hotels, resorts, restaurants and events.</p>

      <h3>Services</h3>
      <ul>
        <li>Daily housekeeping and turn-down services</li>
        <li>Deep cleaning & sanitation for kitchens and back-of-house</li>
        <li>Event cleaning and post-event restoration</li>
        <li>Periodic deep-shampooing of carpets and upholstery</li>
      </ul>

      <div style="margin-top:12px">
        <a class="btn-primary btn" href="../contact.html">Request Hospitality Service</a>
      </div>
    </article>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="../app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/services/food-trading.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Food Trading — ZERO ASSOCIATES</title><link rel="stylesheet" href="../styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="../index.html"><img src="../assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="../index.html">Home</a><a href="../services.html">Services</a><a href="../contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <article class="card">
      <h1>Food Trading</h1>
      <p class="lead">Trading and distribution of high-quality food products to local and international markets — grains, spices, pulses and canned goods.</p>

      <h3>Capabilities</h3>
      <ul>
        <li>Trusted suppliers & quality checks</li>
        <li>Competitive pricing and timely delivery</li>
        <li>Wholesale packaging and B2B supply</li>
        <li>Food safety compliance and documentation</li>
      </ul>

      <div style="margin-top:12px">
        <a class="btn-primary btn" href="../contact.html">Enquire About Food Supply</a>
      </div>
    </article>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="../app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/services/general-maintenance.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>General Maintenance — ZERO ASSOCIATES</title><link rel="stylesheet" href="../styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="../index.html"><img src="../assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="../index.html">Home</a><a href="../services.html">Services</a><a href="../contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <article class="card">
      <h1>General Maintenance</h1>
      <p class="lead">Reliable electrical, plumbing, carpentry and handyman services for commercial and residential properties.</p>

      <h3>Typical tasks</h3>
      <ul>
        <li>Electrical repairs & wiring</li>
        <li>Plumbing repairs, drain cleaning & grease trap services</li>
        <li>Carpentry & joinery</li>
        <li>Preventive maintenance and checklists</li>
      </ul>

      <div style="margin-top:12px">
        <a class="btn-primary btn" href="../contact.html">Request Maintenance</a>
      </div>
    </article>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="../app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/products.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Products — ZERO ASSOCIATES</title><link rel="stylesheet" href="styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="index.html"><img src="assets/images/logo.png" alt="logo" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="index.html">Home</a><a href="services.html">Services</a><a href="products.html" class="active">Products</a></nav></div></header>

  <main class="wrap section">
    <h1 class="section-title">Products & Consumables</h1>
    <p class="lead">We supply a selection of products and consumables to support our services.</p>

    <div class="grid products-grid">
      <div class="product-card"><img src="assets/images/product1.jpg" alt=""><h3>Filters & Spares</h3><p>AC filters, coils & motors.</p><a class="btn small" href="contact.html">Enquire</a></div>

      <div class="product-card"><img src="assets/images/product2.jpg" alt=""><h3>Cleaning Chemicals</h3><p>Food-safe degreasers & disinfectants.</p><a class="btn small" href="contact.html">Enquire</a></div>

      <div class="product-card"><img src="assets/images/product3.jpg" alt=""><h3>Grease Traps</h3><p>Grease trap systems and installation.</p><a class="btn small" href="contact.html">Enquire</a></div>

      <div class="product-card"><img src="assets/images/product4.jpg" alt=""><h3>Flooring Materials</h3><p>Tiles, vinyl and adhesives.</p><a class="btn small" href="contact.html">Enquire</a></div>
    </div>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/gallery.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Gallery — ZERO ASSOCIATES</title><link rel="stylesheet" href="styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="index.html"><img src="assets/images/logo.png" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="index.html">Home</a><a href="gallery.html" class="active">Gallery</a><a href="contact.html" class="btn small">Contact</a></nav></div></header>

  <main class="wrap section">
    <h1 class="section-title">Gallery</h1>
    <p class="lead">Click an image to open fullscreen.</p>
    <div class="gallery-grid">
      <button class="thumb" data-src="assets/images/project1.jpg"><img src="assets/images/project1.jpg" alt=""></button>
      <button class="thumb" data-src="assets/images/project2.jpg"><img src="assets/images/project2.jpg" alt=""></button>
      <button class="thumb" data-src="assets/images/project3.jpg"><img src="assets/images/project3.jpg" alt=""></button>
      <button class="thumb" data-src="assets/images/hood1.jpg"><img src="assets/images/hood1.jpg" alt=""></button>
    </div>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/contact.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Contact — ZERO ASSOCIATES</title><link rel="stylesheet" href="styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="index.html"><img src="assets/images/logo.png" class="logo"> ZERO ASSOCIATES</a><nav class="nav"><a href="index.html">Home</a><a href="services.html">Services</a><a href="contact.html" class="active">Contact</a></nav></div></header>

  <main class="wrap section">
    <h1>Contact Us</h1>
    <div class="contact-grid">
      <div class="card">
        <h3>Office</h3>
        <p>Zone 90, Street 720, Building 186, Floor 1, Al Wakra, Doha, Qatar</p>
        <p>Phone: <a href="tel:+97455092962">+974 5509 2962</a></p>
        <p>Email: <a href="mailto:info@zeroassociates.com">info@zeroassociates.com</a></p>
        <p>HR: <a href="mailto:hr@zeroassociate.com">hr@zeroassociate.com</a></p>
        <iframe class="map" src="https://www.google.com/maps?q=Al+Wakra,+Doha,+Qatar&output=embed"></iframe>
      </div>

      <div class="card">
        <h3>Request a Quote</h3>
        <form id="contactForm" data-endpoint="">
          <label for="name">Name</label><input id="name" name="name" required>
          <label for="phone">Phone</label><input id="phone" name="phone" required>
          <label for="email">Email</label><input id="email" name="email" type="email">
          <label for="service">Service</label>
          <select id="service" name="service">
            <option>Hood & Duct Cleaning</option>
            <option>AC & Refrigeration</option>
            <option>Water Tank Cleaning</option>
            <option>Flooring & Wall Fittings</option>
            <option>Painting Works</option>
            <option>Hospitality Cleaning</option>
            <option>Food Trading</option>
            <option>General Maintenance</option>
          </select>
          <label for="message">Message / Project details</label>
          <textarea id="message" name="message" rows="4"></textarea>
          <div class="form-actions">
            <button class="btn primary" type="submit">Send</button>
            <button class="btn ghost" type="button" onclick="document.getElementById('contactForm').reset()">Clear</button>
          </div>
          <p id="formStatus" style="margin-top:10px;color:var(--muted)"></p>
        </form>
      </div>
    </div>
  </main>

  <footer class="footer small"><div class="wrap"><div class="footer-grid"><div>© 2025 ZERO ASSOCIATES</div></div></div></footer>
  <script src="app.js"></script>
</body>
</html>
HTML

cat > "$ROOT/faq.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>FAQ — ZERO ASSOCIATES</title><link rel="stylesheet" href="styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="index.html"><img src="assets/images/logo.png" class="logo"> ZERO ASSOCIATES</a></div></header>
  <main class="wrap section">
    <h1 class="section-title">Frequently Asked Questions</h1>

    <div class="faq">
      <div class="q"><strong>How often should kitchen hoods be cleaned?</strong><p>Depends on usage — for commercial kitchens monthly or quarterly recommended; light use may be quarterly.</p></div>
      <div class="q"><strong>Do you provide certificates?</strong><p>Yes, cleaning reports and completion certificates provided after work.</p></div>
      <div class="q"><strong>Do you handle grease disposal?</strong><p>Yes — disposal follows local regulations.</p></div>
      <div class="q"><strong>Which AC brands do you service?</strong><p>All major brands including Carrier, Midea, Panasonic, LG, Mitsubishi etc.</p></div>
      <div class="q"><strong>How long to get a quote?</strong><p>Site visit arranged within 48–72 hours; BOQ within 48–72 hours after survey.</p></div>
      <div class="q"><strong>Do you offer AMC?</strong><p>Yes — annual maintenance contracts available.</p></div>
      <div class="q"><strong>Payment terms?</strong><p>Standard is 30–50% advance depending on project; detailed BOQ clarifies milestone payments.</p></div>
      <div class="q"><strong>Emergency response?</strong><p>We offer emergency call-out for critical failures; contact via WhatsApp or phone.</p></div>
    </div>
  </main>
  <footer class="footer small"><div class="wrap"><div class="footer-grid">© 2025 ZERO ASSOCIATES</div></div></footer>
</body>
</html>
HTML

cat > "$ROOT/privacy.html" <<'HTML'
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>Privacy & Terms — ZERO ASSOCIATES</title><link rel="stylesheet" href="styles.css"></head>
<body class="canva-style">
  <header class="header small"><div class="wrap"><a class="brand" href="index.html"><img src="assets/images/logo.png" class="logo"> ZERO ASSOCIATES</a></div></header>
  <main class="wrap section">
    <h1 class="section-title">Privacy Policy</h1>
    <p>We collect contact details submitted via forms for the purpose of responding to inquiries. Data may be stored in Google Sheets or Formspree. We do not sell personal data. Contact info: <a href="mailto:info@zeroassociates.com">info@zeroassociates.com</a></p>
  </main>
  <footer class="footer small"><div class="wrap"><div class="footer-grid">© 2025 ZERO ASSOCIATES</div></div></footer>
</body>
</html>
HTML

cat > "$ROOT/styles.css" <<'CSS'
:root{
  --purple:#6f2dbd; --purple2:#9b5cff; --accent:#25d366;
  --bg:#fcfbff; --muted:#666; --card:#fff; --shadow:0 10px 30px rgba(15,10,40,0.06);
  --maxw:1200px; --radius:12px;
}
*{box-sizing:border-box;margin:0;padding:0}
body{font-family:Inter,system-ui,Arial,sans-serif; background:var(--bg); color:#111; line-height:1.5}
.wrap{max-width:var(--maxw);margin:0 auto;padding:20px}
.header{background:linear-gradient(90deg,var(--purple),var(--purple2));color:#fff;position:sticky;top:0;z-index:50}
.header.small{padding:10px 0}
.header .wrap{display:flex;align-items:center;justify-content:space-between}
.brand{display:flex;align-items:center;gap:12px;text-decoration:none;color:#fff}
.logo{height:44px;width:44px;border-radius:10px}
.brand-text{font-weight:700}
.nav a{color:#fff;text-decoration:none;margin-left:18px;font-weight:600}
.nav .btn{background:rgba(255,255,255,0.12);padding:8px 10px;border-radius:8px}

/* Hero */
.hero-visual{min-height:540px;background-size:cover;background-position:center;display:flex;align-items:center}
.hero-overlay{background:linear-gradient(180deg,rgba(7,4,20,0.35),rgba(7,4,20,0.12));width:100%}
.hero-wrap{display:flex;align-items:center;gap:30px;justify-content:space-between}
.hero-left{max-width:640px;color:#fff;padding:60px}
.hero-left h1{font-size:40px;margin-bottom:8px}
.hero-left .sub{color:rgba(255,255,255,0.85);margin-bottom:18px}
.btn{display:inline-block;padding:10px 16px;border-radius:10px;text-decoration:none;font-weight:700}
.btn.primary{background:var(--purple);color:#fff}
.btn.ghost{background:rgba(255,255,255,0.95);color:var(--purple)}
.btn.small{padding:6px 10px;border-radius:8px}

/* Cards */
.section{padding:40px 0}
.grid{display:grid;gap:18px}
.cards-4{grid-template-columns:repeat(auto-fit,minmax(220px,1fr));display:grid}
.card-large{background:#fff;border-radius:12px;overflow:hidden;box-shadow:var(--shadow);text-decoration:none;color:inherit;display:block}
.card-large figure{height:220px;overflow:hidden}
.card-large img{width:100%;height:100%;object-fit:cover}
.card-content{padding:14px}

/* Showcase */
.showcase{padding:20px 0}
.showcase-row{display:flex;gap:12px;overflow:auto}
.showcase-item{min-width:260px;border-radius:12px;position:relative}
.showcase-item img{width:100%;height:160px;object-fit:cover;border-radius:12px}
.showcase-item span{position:absolute;left:12px;bottom:12px;color:#fff;background:rgba(0,0,0,0.5);padding:6px 10px;border-radius:8px}

/* Why grid */
.why-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:12px}
.why{background:#fff;padding:18px;border-radius:12px;box-shadow:var(--shadow);text-align:center}

/* CTA */
.cta{padding:30px 0}
.big-cta{background:linear-gradient(90deg,var(--purple),var(--purple2));color:#fff;border-radius:12px;margin:20px}
.cta-inner{display:flex;align-items:center;justify-content:space-between;padding:20px}
.cta .btn.primary{background:#fff;color:var(--purple)}

/* Footer */
.footer{padding:28px 0;background:#150a28;color:#e8e1ff;margin-top:20px}
.footer .footer-grid{display:flex;justify-content:space-between;gap:12px;align-items:center}

/* Floating FAB */
.floating{position:fixed;right:16px;bottom:16px;display:flex;flex-direction:column;gap:10px}
.fab{width:52px;height:52px;border-radius:999px;background:var(--purple);color:#fff;display:flex;justify-content:center;align-items:center;text-decoration:none;box-shadow:0 12px 30px rgba(0,0,0,0.18)}
.fab.wp{background:var(--accent)}

/* grids for services/products/gallery */
.services-list{grid-template-columns:repeat(auto-fit,minmax(260px,1fr))}
.service-card{background:#fff;border-radius:12px;overflow:hidden;box-shadow:var(--shadow);text-decoration:none;color:inherit;display:block}
.service-card img{width:100%;height:160px;object-fit:cover}
.products-grid{grid-template-columns:repeat(auto-fit,minmax(240px,1fr))}
.product-card{background:#fff;padding:12px;border-radius:12px;box-shadow:var(--shadow);text-align:center}

/* contact grid */
.contact-grid{display:grid;grid-template-columns:1fr 420px;gap:18px}
.card{background:#fff;padding:14px;border-radius:12px;box-shadow:var(--shadow)}
input,textarea,select{width:100%;padding:10px;border-radius:8px;border:1px solid #eee;margin-top:8px}
.form-actions{display:flex;gap:8px;margin-top:10px}

/* gallery grid */
.gallery-grid{display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:12px}
.gallery-grid img{width:100%;height:120px;object-fit:cover;border-radius:8px}

/* responsive */
@media(max-width:980px){
  .hero-wrap{flex-direction:column}
  .hero-left{padding:30px}
  .contact-grid{grid-template-columns:1fr}
  .header .wrap{flex-direction:row;align-items:center}
  .nav{display:none}
}
CSS

cat > "$ROOT/app.js" <<'JS'
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.nav');
  if(toggle && nav){
    toggle.addEventListener('click', () => {
      if(nav.style.display === 'flex') nav.style.display = '';
      else { nav.style.display = 'flex'; nav.style.flexDirection = 'column'; }
    });
  }

  document.querySelectorAll('.thumb, .gallery-grid img, .card-large img, .service-card img').forEach(el => {
    el.addEventListener('click', (e) => {
      const src = el.dataset && el.dataset.src ? el.dataset.src : (el.src || el.querySelector('img') && el.querySelector('img').src);
      openLightbox(src || (el.getAttribute('data-src')));
    });
  });

  let lb;
  function openLightbox(src){
    if(!src) return;
    if(!lb){
      lb = document.createElement('div');
      lb.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;z-index:9999';
      const im = document.createElement('img'); im.style.maxWidth='92%'; im.style.maxHeight='86%'; im.style.borderRadius='8px';
      lb.appendChild(im);
      const close = document.createElement('button'); close.textContent='✕';
      close.style.cssText='position:absolute;right:18px;top:18px;background:#fff;border-radius:999px;border:none;padding:8px;cursor:pointer';
      close.addEventListener('click', ()=> lb.style.display='none');
      lb.appendChild(close);
      document.body.appendChild(lb);
    }
    lb.querySelector('img').src = src;
    lb.style.display = 'flex';
  }

  const form = document.getElementById('contactForm');
  if(form){
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const status = document.getElementById('formStatus');
      status.textContent = 'Sending...';
      const data = Array.from(new FormData(form)).reduce((o,[k,v]) => (o[k]=v, o), {});
      const endpoint = form.dataset.endpoint || '';
      if(!endpoint){
        setTimeout(()=>{ status.style.color='green'; status.textContent='(Demo) Request received.'; form.reset(); },700);
        return;
      }
      try{
        const res = await fetch(endpoint, { method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify(data) });
        if(res.ok){ status.style.color='green'; status.textContent='Request sent — we will contact you.'; form.reset(); }
        else { status.style.color='red'; status.textContent='Submission failed.'; }
      }catch(err){ status.style.color='red'; status.textContent='Network error.'; console.error(err); }
    });
  }
});
JS

cat > "$ROOT/README.md" <<'MD'
# ZERO ASSOCIATES — Multi-page site (Canva-style)

## Quick start
1. Add your images into `assets/images/` (hero.jpg, logo.png, service-*.jpg, project*.jpg, hood1.jpg etc).
2. Add brochure into `assets/ZERO_ASSOCIATES_BROCHURE.pdf`.
3. Edit `contact.html` form `data-endpoint` to your Formspree or Apps Script endpoint for real submissions.
4. Test locally: open `index.html` in a browser.

## Deploy to Gitea
```bash
cd zeroassociate-site
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://gitea.example.com/YourUser/zeroassociate.git
git push -u origin main