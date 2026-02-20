var Engine = (function() {
  var slides, cnt, prog, hint, wipe;
  var cur = 0, busy = false;
  var darkSlides = ['slide-hero', 'slide-quote', 'slide-silence', 'slide-team'];

  function init() {
    slides = document.querySelectorAll('.slide');
    cnt = document.getElementById('cnt');
    prog = document.getElementById('prog');
    hint = document.getElementById('hint');
    wipe = document.getElementById('wipe');

    Carousel.init();

    // Create particles on dark slides
    slides.forEach(function(slide) {
      if (isDark(slide)) Particles.create(slide);
    });

    bindEvents();
    updateUI();
    Reveals.trigger(slides[0]);
  }

  function isDark(slide) {
    for (var i = 0; i < darkSlides.length; i++) {
      if (slide.classList.contains(darkSlides[i])) return true;
    }
    return false;
  }

  function updateUI() {
    var total = slides.length;
    cnt.textContent = (cur + 1) + ' / ' + total;
    prog.style.width = (((cur + 1) / total) * 100) + '%';
  }

  function goTo(i) {
    var total = slides.length;
    if (i < 0 || i >= total || i === cur || busy) return;
    busy = true;
    hint.classList.add('gone');

    var prev = slides[cur];
    var next = slides[i];

    // Phase 1: Golden wipe sweeps in
    wipe.style.transition = 'transform 480ms cubic-bezier(0.4, 0, 0, 1)';
    wipe.style.transform = 'translateX(0)';

    setTimeout(function() {
      // Phase 2: Swap slides behind the wipe
      prev.classList.remove('active');
      prev.classList.add('leaving');
      next.classList.add('active');

      Reveals.reset(next);
      cur = i;
      updateUI();

      // Phase 3: Wipe sweeps out, reveal new slide
      setTimeout(function() {
        wipe.style.transform = 'translateX(105%)';
        Reveals.trigger(next);

        setTimeout(function() {
          prev.classList.remove('leaving');
          // Reset wipe position instantly
          wipe.style.transition = 'none';
          wipe.style.transform = 'translateX(-105%)';
          busy = false;
        }, 520);
      }, 60);
    }, 460);
  }

  function bindEvents() {
    document.addEventListener('keydown', function(e) {
      if (e.key === 'ArrowRight' || e.key === ' ') { e.preventDefault(); goTo(cur + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); goTo(cur - 1); }
      if (e.key === 'ArrowDown') { e.preventDefault(); goTo(cur + 1); }
      if (e.key === 'ArrowUp') { e.preventDefault(); goTo(cur - 1); }
    });

    document.addEventListener('click', function(e) {
      if (e.target.closest('.carousel-dot')) return;
      var x = e.clientX / window.innerWidth;
      if (x < 0.33) goTo(cur - 1); else goTo(cur + 1);
    });

    var tx = 0;
    document.addEventListener('touchstart', function(e) { tx = e.touches[0].clientX; });
    document.addEventListener('touchend', function(e) {
      var d = tx - e.changedTouches[0].clientX;
      if (Math.abs(d) > 50) { d > 0 ? goTo(cur + 1) : goTo(cur - 1); }
    });
  }

  return { init: init };
})();
