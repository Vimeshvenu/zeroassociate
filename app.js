// app.js — shared interactions: mobile nav, smooth scroll, gallery lightbox, contact form
document.addEventListener('DOMContentLoaded', () => {
  // Mobile nav toggle
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.querySelector('.main-nav');
  if(menuToggle && nav){
    menuToggle.addEventListener('click', () => {
      const open = nav.style.display === 'flex';
      nav.style.display = open ? '' : 'flex';
      if (!open) nav.style.flexDirection = 'column';
    });
  }

  // Smooth scroll for local anchors
  document.querySelectorAll('a[href^="#"]').forEach(a=>{
    a.addEventListener('click', (e)=>{
      const href = a.getAttribute('href');
      if (!href || href === '#') return;
      const target = document.querySelector(href);
      if(target){
        e.preventDefault();
        target.scrollIntoView({behavior:'smooth', block:'start'});
      }
    });
  });

  // Gallery thumbnails open lightbox
  document.querySelectorAll('.thumb').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      const src = btn.dataset.src || (btn.querySelector('img') && btn.querySelector('img').src);
      openLightbox(src);
    });
  });

  // generic images in .gallery open lightbox
  document.querySelectorAll('.gallery img').forEach(img=>{
    img.addEventListener('click', ()=> openLightbox(img.dataset.large || img.src));
  });

  // Create lightbox element if not present
  let lb = document.getElementById('siteLightbox');
  if(!lb){
    lb = document.createElement('div'); lb.id='siteLightbox';
    lb.style.cssText='position:fixed;inset:0;display:none;align-items:center;justify-content:center;background:rgba(0,0,0,.8);z-index:9999';
    const im = document.createElement('img'); im.style.maxWidth='92%'; im.style.maxHeight='86%'; im.style.borderRadius='10px';
    lb.appendChild(im);
    const close = document.createElement('button'); close.textContent='✕';
    close.style.cssText='position:absolute;right:18px;top:18px;background:#fff;border-radius:999px;border:none;padding:8px;cursor:pointer';
    close.addEventListener('click', ()=> lb.style.display='none');
    lb.appendChild(close);
    document.body.appendChild(lb);
  }

  function openLightbox(src){
    if(!lb) return;
    lb.querySelector('img').src = src;
    lb.style.display = 'flex';
  }

  // Contact forms: demo behaviour or endpoint if data-endpoint specified
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', async (e)=>{
      e.preventDefault();
      const status = document.getElementById('formStatus');
      status.textContent = 'Sending...';
      const data = {
        name: document.getElementById('name').value.trim(),
        email: document.getElementById('email').value.trim(),
        message: document.getElementById('message').value.trim()
      };
      // If form data-endpoint attribute is set, post JSON there (Formspree)
      const endpoint = contactForm.dataset.endpoint || '';
      if(endpoint){
        try{
          const res = await fetch(endpoint, {
            method:'POST',
            headers:{'Content-Type':'application/json','Accept':'application/json'},
            body: JSON.stringify(data)
          });
          if(res.ok){ status.style.color='green'; status.textContent='Message sent. Thank you!'; contactForm.reset(); }
          else { status.style.color='red'; status.textContent='Submission failed.'; }
        }catch(err){ status.style.color='red'; status.textContent='Network error.'; console.error(err); }
        return;
      }
      // fallback demo behavior
      setTimeout(()=>{ status.style.color='green'; status.textContent='(Demo) Message sent.'; contactForm.reset(); },700);
    });
  }
});