import { animateCounters, resetCounters } from './counters.js';
import { carGo, carStart, carStop } from './carousel.js';

export function triggerReveals(slide) {
  setTimeout(() => {
    slide.querySelectorAll('.rv, .rv-scale').forEach(el => el.classList.add('vis'));
    slide.querySelectorAll('.flourish').forEach(el => el.classList.add('vis'));
    slide.querySelectorAll('.gold-rule').forEach(el => el.classList.add('vis'));
    slide.querySelectorAll('.timeline-gold-line').forEach(el => el.classList.add('vis'));
    slide.querySelectorAll('.stat-bar, .impact-bar').forEach(el => el.classList.add('vis'));
  }, 120);

  animateCounters(slide);

  if (slide.classList.contains('slide-reviews')) {
    carGo(0);
    carStart();
  } else {
    carStop();
  }
}

export function resetReveals(slide) {
  slide.querySelectorAll('.rv, .rv-scale, .flourish, .gold-rule, .timeline-gold-line, .stat-bar, .impact-bar')
    .forEach(el => el.classList.remove('vis'));
  resetCounters(slide);
}
