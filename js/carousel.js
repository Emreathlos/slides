let carIdx = 0;
let carTimer = null;
let track = null;
let dots = null;

export function initCarousel() {
  track = document.getElementById('reviewTrack');
  dots = document.querySelectorAll('.carousel-dot');
  dots.forEach(d => d.addEventListener('click', (e) => {
    e.stopPropagation();
    carGo(+d.dataset.idx);
    carStart();
  }));
}

export function carGo(i) {
  if (!track || !dots.length) return;
  carIdx = i;
  track.style.transform = `translateX(-${i * 33.333}%)`;
  dots.forEach((d, j) => d.classList.toggle('active', j === i));
}

function carNext() {
  carGo((carIdx + 1) % 3);
}

export function carStart() {
  carStop();
  carTimer = setInterval(carNext, 3500);
}

export function carStop() {
  if (carTimer) clearInterval(carTimer);
}
