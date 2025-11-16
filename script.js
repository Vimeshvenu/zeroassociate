// Version 4 script: handle simple form submit
document.addEventListener('DOMContentLoaded', function(){
  var form = document.getElementById('contactForm');
  var status = document.getElementById('status');
  if(form){
    form.addEventListener('submit', function(e){
      e.preventDefault();
      status.textContent = 'Simulated send for Version 4 — Thank you!';
      form.reset();
      setTimeout(function(){ status.textContent=''; }, 4000);
    });
  }
});
