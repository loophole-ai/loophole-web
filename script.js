/* ── Platform track: drag to pause ── */
(function () {
  const track = document.getElementById('platformTrack');
  if (!track) return;
  let isDown = false, startX, startScroll;

  track.addEventListener('mousedown', e => {
    isDown = true;
    track.classList.add('grabbing');
    startX = e.pageX;
    startScroll = track.getBoundingClientRect().left;
  });
  document.addEventListener('mouseup', () => { isDown = false; track.classList.remove('grabbing'); });
  track.addEventListener('mousemove', e => { if (!isDown) return; e.preventDefault(); });

  // Touch support — pause on touch
  track.addEventListener('touchstart', () => track.style.animationPlayState = 'paused', { passive: true });
  track.addEventListener('touchend', () => track.style.animationPlayState = 'running');
})();

/* ── Hamburger ── */
const btn = document.getElementById('hamburger');
const drawer = document.getElementById('mobileDrawer');
const overlay = document.getElementById('drawerOverlay');
let open = false;

function openMenu() {
  open = true;
  btn.classList.add('open');
  btn.setAttribute('aria-expanded', 'true');
  btn.setAttribute('aria-label', 'Close menu');
  drawer.classList.add('visible');
  overlay.classList.add('visible');
  document.body.style.overflow = 'hidden';
}

function closeMenu() {
  open = false;
  btn.classList.remove('open');
  btn.setAttribute('aria-expanded', 'false');
  btn.setAttribute('aria-label', 'Open menu');
  drawer.classList.remove('visible');
  overlay.classList.remove('visible');
  document.body.style.overflow = '';
}

btn.addEventListener('click', e => { e.stopPropagation(); open ? closeMenu() : openMenu(); });
overlay.addEventListener('click', closeMenu);
drawer.querySelectorAll('a, button').forEach(el => el.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape' && open) closeMenu(); });

/* ── Testimonials Carousel ── */
(function () {
  const slides = Array.from(document.querySelectorAll('.tcarousel-slide'));
  const dotsContainer = document.getElementById('tcDots');
  let current = 0;

  // Build dots
  slides.forEach((_, i) => {
    const dot = document.createElement('button');
    dot.className = 'tcarousel-dot' + (i === 0 ? ' active' : '');
    dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
    dot.addEventListener('click', () => goTo(i));
    dotsContainer.appendChild(dot);
  });

  function goTo(idx) {
    slides[current].classList.remove('active');
    dotsContainer.children[current].classList.remove('active');
    current = (idx + slides.length) % slides.length;
    // Re-trigger fade-in animation
    slides[current].style.animation = 'none';
    slides[current].offsetHeight; // force reflow
    slides[current].style.animation = '';
    slides[current].classList.add('active');
    dotsContainer.children[current].classList.add('active');
  }

  var prevBtn = document.getElementById('tcPrev');
  var nextBtn = document.getElementById('tcNext');
  if (prevBtn) prevBtn.addEventListener('click', function () { goTo(current - 1); });
  if (nextBtn) nextBtn.addEventListener('click', function () { goTo(current + 1); });

  // Auto-advance every 6s
  setInterval(() => goTo(current + 1), 6000);
})();
