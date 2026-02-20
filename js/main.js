import { loadSlides } from './loader.js';
import { initCarousel } from './carousel.js';
import { initEngine } from './engine.js';

async function init() {
  await loadSlides();
  initCarousel();
  initEngine();
}

init();
