var Carousel = (function() {
  var carIdx = 0;
  var carTimer = null;
  var track = null;
  var dots = null;

  function init() {
    track = document.getElementById('reviewTrack');
    dots = document.querySelectorAll('.carousel-dot');
    dots.forEach(function(d) {
      d.addEventListener('click', function(e) {
        e.stopPropagation();
        goTo(+d.dataset.idx);
        start();
      });
    });
  }

  function goTo(i) {
    if (!track || !dots.length) return;
    carIdx = i;
    track.style.transform = 'translateX(-' + (i * 33.333) + '%)';
    dots.forEach(function(d, j) { d.classList.toggle('active', j === i); });
  }

  function start() {
    stop();
    carTimer = setInterval(function() { goTo((carIdx + 1) % 3); }, 3500);
  }

  function stop() {
    if (carTimer) clearInterval(carTimer);
  }

  return { init: init, goTo: goTo, start: start, stop: stop };
})();
