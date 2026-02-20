export function animateCounters(slide) {
  slide.querySelectorAll('[data-count]').forEach(el => {
    const target = +el.dataset.count;
    const prefix = el.dataset.prefix || '';
    const suffix = el.dataset.suffix || '';
    const duration = 1500;
    const start = performance.now();

    function tick(now) {
      const progress = Math.min((now - start) / duration, 1);
      const value = Math.round((1 - Math.pow(1 - progress, 3)) * target);
      el.textContent = prefix + value + (progress >= 1 ? suffix : '');
      if (progress < 1) requestAnimationFrame(tick);
    }

    setTimeout(() => requestAnimationFrame(tick), 600);
  });
}

export function resetCounters(slide) {
  slide.querySelectorAll('[data-count]').forEach(el => {
    el.textContent = (el.dataset.prefix || '') + '0';
  });
}
