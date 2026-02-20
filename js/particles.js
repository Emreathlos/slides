var Particles = (function() {
  function create(slide) {
    if (slide.querySelector('.particles-container')) return;
    var container = document.createElement('div');
    container.className = 'particles-container';

    for (var i = 0; i < 18; i++) {
      var p = document.createElement('div');
      p.className = 'gold-particle';
      p.style.left = (Math.random() * 100) + '%';
      p.style.top = (Math.random() * 100) + '%';
      var size = 2 + Math.random() * 3;
      p.style.width = size + 'px';
      p.style.height = size + 'px';
      p.style.animationDuration = (10 + Math.random() * 15) + 's';
      p.style.animationDelay = (-Math.random() * 10) + 's';
      p.style.opacity = '0';
      container.appendChild(p);
    }

    slide.querySelector('.slide-inner').appendChild(container);
  }

  function show(slide) {
    var particles = slide.querySelectorAll('.gold-particle');
    particles.forEach(function(p, i) {
      setTimeout(function() {
        p.style.opacity = (0.15 + Math.random() * 0.35).toFixed(2);
      }, i * 80);
    });
  }

  function hide(slide) {
    slide.querySelectorAll('.gold-particle').forEach(function(p) {
      p.style.opacity = '0';
    });
  }

  return { create: create, show: show, hide: hide };
})();
