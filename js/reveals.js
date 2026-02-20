var Reveals = (function() {
  function trigger(slide) {
    setTimeout(function() {
      slide.querySelectorAll('.rv, .rv-scale').forEach(function(el) { el.classList.add('vis'); });
      slide.querySelectorAll('.flourish').forEach(function(el) { el.classList.add('vis'); });
      slide.querySelectorAll('.gold-rule').forEach(function(el) { el.classList.add('vis'); });
      slide.querySelectorAll('.timeline-gold-line').forEach(function(el) { el.classList.add('vis'); });
      slide.querySelectorAll('.stat-bar, .impact-bar').forEach(function(el) { el.classList.add('vis'); });
    }, 120);

    Counters.animate(slide);

    if (slide.classList.contains('slide-reviews')) {
      Carousel.goTo(0);
      Carousel.start();
    } else {
      Carousel.stop();
    }
  }

  function reset(slide) {
    slide.querySelectorAll('.rv, .rv-scale, .flourish, .gold-rule, .timeline-gold-line, .stat-bar, .impact-bar')
      .forEach(function(el) { el.classList.remove('vis'); });
    Counters.reset(slide);
  }

  return { trigger: trigger, reset: reset };
})();
