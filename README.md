# ZERO ASSOCIATES — Multi-page Website

## Files (final)
- index.html
- services.html
- services/hood-cleaning.html
- products.html
- gallery.html
- contact.html
- privacy.html
- styles.css
- app.js
- assets/
  - images/
  - ZERO_ASSOCIATES_BROCHURE.pdf
  - favicon.ico

## Setup
1. Create project folder `zeroassociates-website`.
2. Copy the files above into that folder (preserve `services/` subfolder).
3. Add images into `assets/images/` with the filenames used in code:
   - hero.jpg
   - service-hood.jpg, service-ac.jpg, service-flooring.jpg, service-paint.jpg, service-hospitality.jpg, service-trade.jpg
   - product1.jpg ... product4.jpg
   - project1.jpg ... project4.jpg
   - hood1.jpg ... hood3.jpg
   - doha.jpg, alwakra.jpg, lusail.jpg, educationcity.jpg
4. Add brochure PDF to `assets/ZERO_ASSOCIATES_BROCHURE.pdf`.
5. Optionally set Formspree endpoint on `contact.html` form: `<form id="contactForm" data-endpoint="https://formspree.io/f/xxxxxx">`.

## Deploy to GitHub Pages
```bash
git init
git add .
git commit -m "Initial website"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/zeroassociates-website.git
git push -u origin main