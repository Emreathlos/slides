import { triggerReveals, resetReveals } from './reveals.js';

let slides, cnt, prog, hint;
let cur = 0;
let busy = false;

export function initEngine() {
  slides = document.querySelectorAll('.slide');
  cnt = document.getElementById('cnt');
  prog = document.getElementById('prog');
  hint = document.getElementById('hint');

  bindEvents();
  updateUI();
  triggerReveals(slides[0]);
}

function updateUI() {
  const total = slides.length;
  cnt.textContent = `${cur + 1} / ${total}`;
  prog.style.width = `${((cur + 1) / total) * 100}%`;
}

function goTo(i) {
  const total = slides.length;
  if (i < 0 || i >= total || i === cur || busy) return;
  busy = true;
  hint.classList.add('gone');

  const prev = slides[cur];
  const next = slides[i];

  prev.classList.remove('active');
  prev.classList.add('leaving');
  next.classList.add('active');

  resetReveals(next);
  cur = i;
  updateUI();
  triggerReveals(next);

  setTimeout(() => {
    prev.classList.remove('leaving');
    busy = false;
  }, 1100);
}

function bindEvents() {
  document.addEventListener('keydown', e => {
    if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(cur + 1); }
    if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(cur - 1); }
    if (e.key === 'ArrowDown') { e.preventDefault(); goTo(cur + 1); }
    if (e.key === 'ArrowUp') { e.preventDefault(); goTo(cur - 1); }
  });

  document.addEventListener('click', e => {
    if (e.target.closest('.carousel-dot')) return;
    const x = e.clientX / window.innerWidth;
    if (x < 0.33) goTo(cur - 1); else goTo(cur + 1);
  });

  let tx = 0;
  document.addEventListener('touchstart', e => { tx = e.touches[0].clientX; });
  document.addEventListener('touchend', e => {
    const d = tx - e.changedTouches[0].clientX;
    if (Math.abs(d) > 50) { d > 0 ? goTo(cur + 1) : goTo(cur - 1); }
  });
}
