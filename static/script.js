(function(){
  const slides = Array.from(document.querySelectorAll('.about .slide'));
  const dots = Array.from(document.querySelectorAll('.about .dot'));
  const prev = document.querySelector('.about .prev');
  const next = document.querySelector('.about .next');
  if(!slides.length) return;

  let i = 0;
  const show = (n)=>{
    i = (n + slides.length) % slides.length;
    slides.forEach((s,idx)=> s.classList.toggle('is-active', idx===i));
    dots.forEach((d,idx)=> d.classList.toggle('is-active', idx===i));
  };

  // init
  slides[0].classList.add('is-active');

  prev?.addEventListener('click', ()=> show(i-1));
  next?.addEventListener('click', ()=> show(i+1));
  dots.forEach(d=> d.addEventListener('click', (e)=> show(Number(e.currentTarget.dataset.index))));
})();

//Simulation d'envoie
document.querySelector('.nl-form')?.addEventListener('submit', (e)=>{
  const input = e.currentTarget.querySelector('.nl-input');
  if(input?.checkValidity()){
    alert(`Thanks! We’ll email: ${input.value}`);
    input.value = '';
  }
});


// ----- Menu langue (UI uniquement) -----
(function(){
  const lang = document.getElementById('lang');
  if(!lang) return;
  const toggle = lang.querySelector('.lang-toggle');
  const current = lang.querySelector('.lang-current');
  const menu = lang.querySelector('.lang-menu');

  const close = ()=>{ lang.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); };

  toggle.addEventListener('click', (e)=>{
    e.stopPropagation();
    const isOpen = lang.classList.toggle('open');
    toggle.setAttribute('aria-expanded', String(isOpen));
  });

  menu.querySelectorAll('li').forEach(item=>{
    item.addEventListener('click', (e)=>{
      current.textContent = item.dataset.lang; 
      close();
    });
  });

  document.addEventListener('click', close);
  document.addEventListener('keydown', (e)=>{ if(e.key==='Escape') close(); });
})();

// ----- Scroll vers "About" quand on clique THE STORY -----
document.getElementById('story-btn')?.addEventListener('click', ()=>{
  document.querySelector('#about')?.scrollIntoView({ behavior:'smooth', block:'start' });
});



// Slider ABOUT: toggle de classes 

document.addEventListener('DOMContentLoaded', function () {
  const slider = document.getElementById('sosSlider');
  if (!slider || slider.dataset.inited === '1') return;
  slider.dataset.inited = '1';

  // éléments
  const imgNext = slider.querySelector('.back-2'); 
  const imgPrev = slider.querySelector('.back-1'); 
  const imgCur  = slider.querySelector('.slide');  

  const btnNext = slider.querySelector('.ctrl-next');
  const dots    = Array.from(slider.querySelectorAll('.dot'));

  // ✅ URLs transmises depuis data-imgs
  const imgs = JSON.parse(slider.dataset.imgs || '[]');
  if (!imgs.length) return;

  // Préchargement
  imgs.forEach(src => { const i = new Image(); i.src = src; });

  let index = 0;
  const N = imgs.length;
  const norm = n => (n % N + N) % N;

  function render() {
    const cur  = imgs[norm(index)];
    const prev = imgs[norm(index - 1)];
    const next = imgs[norm(index + 1)];

    imgCur.src  = cur;
    imgPrev.src = prev;
    imgNext.src = next;

    dots.forEach((d, i) => {
      const on = i === norm(index);
      d.classList.toggle('is-active', on);
      d.setAttribute('aria-selected', on ? 'true' : 'false');
    });
  }

  // Gestion des clics
  btnNext?.addEventListener('click', () => { index = norm(index + 1); render(); });

  dots.forEach((d, i) => d.addEventListener('click', () => { index = i; render(); }));

  // Initialisation
  render();
});


// ----- Accordéon FEATURES -----
document.addEventListener('DOMContentLoaded', function () {
  const accordions = document.querySelectorAll('.accordion-item');
  accordions.forEach(item => {
    item.querySelector('.accordion-header').addEventListener('click', () => {
      item.classList.toggle('active');
      accordions.forEach(other => {
        if (other !== item) other.classList.remove('active');
      });
    });
  });
});

