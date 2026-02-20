var Engine = (function() {
  var slides, cnt, prog, hint;
  var cur = 0, busy = false;

  function init() {
    slides = document.querySelectorAll('.slide');
    cnt = document.getElementById('cnt');
    prog = document.getElementById('prog');
    hint = document.getElementById('hint');

    Carousel.init();
    bindEvents();
    updateUI();
    Reveals.trigger(slides[0]);
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

    prev.classList.remove('active');
    prev.classList.add('leaving');
    next.classList.add('active');

    Reveals.reset(next);
    cur = i;
    updateUI();
    Reveals.trigger(next);

    setTimeout(function() {
      prev.classList.remove('leaving');
      busy = false;
    }, 1100);
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
