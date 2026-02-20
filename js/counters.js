var Counters = (function() {
  function animate(slide) {
    slide.querySelectorAll('[data-count]').forEach(function(el) {
      var target = +el.dataset.count;
      var prefix = el.dataset.prefix || '';
      var suffix = el.dataset.suffix || '';
      var duration = 1500;
      var start = performance.now();

      function tick(now) {
        var progress = Math.min((now - start) / duration, 1);
        var value = Math.round((1 - Math.pow(1 - progress, 3)) * target);
        el.textContent = prefix + value + (progress >= 1 ? suffix : '');
        if (progress < 1) requestAnimationFrame(tick);
      }

      setTimeout(function() { requestAnimationFrame(tick); }, 600);
    });
  }

  function reset(slide) {
    slide.querySelectorAll('[data-count]').forEach(function(el) {
      el.textContent = (el.dataset.prefix || '') + '0';
    });
  }

  return { animate: animate, reset: reset };
})();
