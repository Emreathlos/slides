var Reveals = (function() {
  var darkSlides = ['slide-hero', 'slide-quote', 'slide-silence', 'slide-preview', 'slide-team'];

  function isDark(slide) {
    for (var i = 0; i < darkSlides.length; i++) {
      if (slide.classList.contains(darkSlides[i])) return true;
    }
    return false;
  }

  function trigger(slide) {
    setTimeout(function() {
      slide.querySelectorAll('.rv, .rv-scale').forEach(function(el) { el.classList.add('vis'); });
      slide.querySelectorAll('.flourish').forEach(function(el) { el.classList.add('vis'); });
      slide.querySelectorAll('.gold-rule').forEach(function(el) { el.classList.add('vis'); });
      slide.querySelectorAll('.timeline-gold-line').forEach(function(el) { el.classList.add('vis'); });
      slide.querySelectorAll('.stat-bar, .impact-bar').forEach(function(el) { el.classList.add('vis'); });
    }, 120);

    Counters.animate(slide);

    // Particles on dark slides
    if (isDark(slide)) {
      setTimeout(function() { Particles.show(slide); }, 300);
    }

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
    if (isDark(slide)) Particles.hide(slide);
  }

  return { trigger: trigger, reset: reset };
})();
