var Engine = (function() {
  var slides, cnt, prog, hint, wipe;
  var cur = 0, busy = false;
  var darkSlides = ['slide-hero', 'slide-quote', 'slide-silence', 'slide-preview', 'slide-team'];

  function init() {
    slides = document.querySelectorAll('.slide');
    cnt = document.getElementById('cnt');
    prog = document.getElementById('prog');
    hint = document.getElementById('hint');
    wipe = document.getElementById('wipe');

    Carousel.init();
    initPreviewVideo();

    // Create particles on dark slides
    slides.forEach(function(slide) {
      if (isDark(slide)) Particles.create(slide);
    });

    bindEvents();
    updateUI();
    Reveals.trigger(slides[0]);
  }

  function initPreviewVideo() {
    var btn = document.getElementById('previewPlayBtn');
    var vid = document.getElementById('previewVideo');
    if (!btn || !vid) return;
    btn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (vid.paused) {
        vid.play();
        btn.classList.add('is-playing');
      } else {
        vid.pause();
        btn.classList.remove('is-playing');
      }
    });
    vid.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!vid.paused) {
        vid.pause();
        btn.classList.remove('is-playing');
      }
    });
  }

  function handleSlideVideo(slide, active) {
    var vid = slide.querySelector('.preview-video');
    var btn = slide.querySelector('.preview-play-btn');
    if (!vid) return;
    if (!active) {
      vid.pause();
      if (btn) btn.classList.remove('is-playing');
    }
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

  /* ── Golden Veil Transition (canvas) ── */
  var veilCanvas, veilCtx;
  var VEIL_DUR  = 1300;   // total animation ms
  var FADE_IN   = 0.35;   // 0–35% particles fade in
  var HOLD      = 0.40;   // 35–40% fully opaque (swap here)
  var FADE_OUT  = 1.0;    // 55–100% particles fade out
  var COUNT     = 260;

  function initVeilCanvas() {
    veilCanvas = document.createElement('canvas');
    wipe.appendChild(veilCanvas);
    veilCtx = veilCanvas.getContext('2d');
  }

  function sizeVeil() {
    var dpr = window.devicePixelRatio || 1;
    var W = window.innerWidth, H = window.innerHeight;
    veilCanvas.width = W * dpr;
    veilCanvas.height = H * dpr;
    veilCanvas.style.width = W + 'px';
    veilCanvas.style.height = H + 'px';
    veilCtx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }

  function makeVeilParticles() {
    var W = window.innerWidth, H = window.innerHeight;
    var pts = [];
    for (var i = 0; i < COUNT; i++) {
      var kind = Math.random();
      // 0 = diamond, 1 = circle, 2 = cross/star
      var shape = kind < 0.4 ? 0 : kind < 0.75 ? 1 : 2;
      var size = shape === 2 ? 3 + Math.random() * 6 : 2 + Math.random() * 5;
      pts.push({
        x: Math.random() * W,
        y: Math.random() * H,
        size: size,
        shape: shape,
        rot: Math.random() * Math.PI * 2,
        rotSpeed: (Math.random() - 0.5) * 1.5,
        delay: Math.random() * 0.25,       // staggered appearance
        driftX: (Math.random() - 0.5) * 20,
        driftY: (Math.random() - 0.5) * 14,
        alpha: 0.35 + Math.random() * 0.55,
        bright: Math.random() > 0.5
      });
    }
    return pts;
  }

  function drawDiamond(ctx, x, y, s, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.beginPath();
    ctx.moveTo(0, -s);
    ctx.lineTo(s * 0.6, 0);
    ctx.lineTo(0, s);
    ctx.lineTo(-s * 0.6, 0);
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }

  function drawCross(ctx, x, y, s, rot) {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rot);
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.moveTo(0, -s); ctx.lineTo(0, s);
    ctx.moveTo(-s, 0); ctx.lineTo(s, 0);
    ctx.stroke();
    ctx.restore();
  }

  function fireVeil(onSwap, onDone, targetDark) {
    if (!veilCanvas) initVeilCanvas();
    sizeVeil();
    var W = window.innerWidth, H = window.innerHeight;
    var particles = makeVeilParticles();
    var start = null;
    var swapped = false;

    function frame(ts) {
      if (!start) start = ts;
      var t = Math.min((ts - start) / VEIL_DUR, 1);

      // global envelope: fade in → hold → fade out
      var env;
      if (t < FADE_IN) {
        env = t / FADE_IN;                        // 0→1
        env = env * env * (3 - 2 * env);          // smoothstep
      } else if (t < HOLD) {
        env = 1;
      } else {
        env = 1 - (t - HOLD) / (FADE_OUT - HOLD); // 1→0
        env = env * env * (3 - 2 * env);
      }

      // swap slides at peak
      if (!swapped && t >= (FADE_IN + HOLD) * 0.5) {
        swapped = true;
        if (onSwap) onSwap();
      }

      veilCtx.clearRect(0, 0, W, H);

      for (var i = 0; i < particles.length; i++) {
        var p = particles[i];
        var pt = Math.max(0, (t - p.delay) / (1 - p.delay));
        if (pt <= 0) continue;

        var a = p.alpha * env;
        if (a < 0.01) continue;

        var x = p.x + p.driftX * pt;
        var y = p.y + p.driftY * pt;
        var rot = p.rot + p.rotSpeed * pt;

        var r, g, b;
        if (targetDark) {
          r = p.bright ? 218 : 180;
          g = p.bright ? 185 : 155;
          b = p.bright ? 90 : 75;
        } else {
          r = p.bright ? 74 : 44;
          g = p.bright ? 52 : 24;
          b = p.bright ? 40 : 16;
        }
        var col = 'rgba(' + r + ',' + g + ',' + b + ',' + a + ')';

        veilCtx.fillStyle = col;
        veilCtx.strokeStyle = col;

        if (p.shape === 0) {
          drawDiamond(veilCtx, x, y, p.size, rot);
        } else if (p.shape === 1) {
          veilCtx.beginPath();
          veilCtx.arc(x, y, p.size * 0.5, 0, Math.PI * 2);
          veilCtx.fill();
        } else {
          drawCross(veilCtx, x, y, p.size, rot);
        }
      }

      if (t < 1) {
        requestAnimationFrame(frame);
      } else {
        veilCtx.clearRect(0, 0, W, H);
        if (onDone) onDone();
      }
    }

    requestAnimationFrame(frame);
  }

  function goTo(i) {
    var total = slides.length;
    if (i < 0 || i >= total || i === cur || busy) return;
    busy = true;
    hint.classList.add('gone');

    var prev = slides[cur];
    var next = slides[i];

    fireVeil(
      function onSwap() {

        handleSlideVideo(prev, false);
        prev.classList.remove('active');
        prev.classList.add('leaving');
        next.classList.add('active');
        Reveals.reset(next);
        cur = i;
        updateUI();
      },
      function onDone() {
        Reveals.trigger(next);
        prev.classList.remove('leaving');
        busy = false;
      },
      isDark(prev)
    );
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
      if (e.target.closest('.preview-theatre')) return;
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
