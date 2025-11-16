ZeroAssociate v1.00 — AHT-style website (HTML/CSS/JS)

Files:
- index.html
- css/style.css
- js/script.js
- assets/* (images, icons, brochure)
- services/*.html (service pages)

Important setup:
1) Replace assets/logo.png, whatsapp-icon etc with your assets.
2) Replace Google Apps Script URL in contact form:
   - Open index.html -> contact form hidden input id="script-url"
   - Replace value with your script URL: https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
   - Create an Apps Script that accepts POST and writes to Google Sheets (many tutorials available).

3) Google Maps:
   - Replace iframe src with your place or use Google Maps Embed.
   - For interactive API use, obtain API key and implement per Google docs.

4) Social links:
   - Update href on social icons.

5) Test locally:
   - Open index.html in browser or deploy to GitHub Pages.

Commit:
- Use commit message: refactor: unify color tokens and implement ZeroAssociate purple theme; add AHT-style header, mobile nav, and floating CTAs (WhatsApp, Call, Chatbot)
- Commit description:
  Replaced global :root color variables with ZeroAssociate brand tokens; rebuilt header to AHT-style (glass sticky header, centered logo, services dropdown, brochure + call buttons); added responsive mobile nav toggle; appended floating CTA buttons (WhatsApp, Call, Chatbot) and a lightweight chat window; updated CSS/JS to use brand purple #6C4ECF/#5B3FBF.
