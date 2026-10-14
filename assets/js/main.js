const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Content stays visible without JavaScript or animation support.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
const activeAnimations = new Set();

function reveal(element, delay = 0) {
  if (reducedMotion.matches || typeof element.animate !== 'function') return;
  const animation = element.animate([
    { opacity: 0, transform: 'translateY(22px)' },
    { opacity: 1, transform: 'translateY(0)' },
  ], { duration: 750, delay, easing: 'cubic-bezier(.16, 1, .3, 1)', fill: 'backwards' });
  activeAnimations.add(animation);
  animation.finished.then(() => activeAnimations.delete(animation), () => activeAnimations.delete(animation));
}

// Stagger the introduction while keeping every action immediately available.
document.querySelectorAll('.hero-copy > *').forEach((element, index) => reveal(element, index * 85));
const visual = document.querySelector('.hero-visual');
if (visual) reveal(visual, 160);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      reveal(entry.target, Number(entry.target.dataset.revealDelay || 0));
      entry.target.classList.add('is-revealed');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.features .feature, .workflow-copy li').forEach((element, index) => {
    element.dataset.revealDelay = (index % 3) * 100;
  });
  document.querySelectorAll('.section-heading, .feature, .workflow-photo, .workflow-copy > .eyebrow, .workflow-copy > h2, .workflow-copy li, .faq > div, .download, .footer-top').forEach(element => observer.observe(element));
}

// Pointer motion is limited to the decorative preview on mouse-driven devices.
let pointerFrame = 0;
let pointerX = 0;
let pointerY = 0;
function resetPreview() {
  cancelAnimationFrame(pointerFrame);
  pointerFrame = 0;
  if (!visual) return;
  visual.style.setProperty('--pointer-x', '0deg');
  visual.style.setProperty('--pointer-y', '0deg');
}
if (visual) {
  visual.addEventListener('pointermove', event => {
    if (reducedMotion.matches || !finePointer.matches) return;
    const bounds = visual.getBoundingClientRect();
    pointerX = (event.clientX - bounds.left) / bounds.width - 0.5;
    pointerY = (event.clientY - bounds.top) / bounds.height - 0.5;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      visual.style.setProperty('--pointer-x', `${-pointerY * 5}deg`);
      visual.style.setProperty('--pointer-y', `${pointerX * 7}deg`);
      pointerFrame = 0;
    });
  }, { passive: true });
  visual.addEventListener('pointerleave', resetPreview);
}
reducedMotion.addEventListener('change', () => {
  if (!reducedMotion.matches) return;
  activeAnimations.forEach(animation => animation.cancel());
  resetPreview();
});
finePointer.addEventListener('change', resetPreview);
document.addEventListener('visibilitychange', () => {
  if (document.hidden) resetPreview();
});

// Keep the download hub entrance brief and preserve instant access.
document.querySelectorAll(".hub-intro, .hub-store, .hub-access").forEach((element, index) => reveal(element, index * 70));

// A self-contained illustrative tour. Stop the timer offscreen or when paused.
const demoScreens = [...document.querySelectorAll('[data-screen]')];
const demoTabs = [...document.querySelectorAll('[data-demo-tab]')];
const demoToggle = document.querySelector('.demo-toggle');
if (demoScreens.length && demoToggle) {
  let currentScreen = 0;
  let demoTimer;
  let demoVisible = !('IntersectionObserver' in window);
  let demoPaused = false;

  function syncDemo() {
    clearTimeout(demoTimer);
    demoToggle.hidden = reducedMotion.matches;
    demoToggle.textContent = demoPaused ? 'Play app preview' : 'Pause app preview';
    const playing = !demoPaused && demoVisible && !document.hidden && !reducedMotion.matches;
    visual.classList.toggle('is-demo-playing', playing);
    if (!playing) return;
    demoTimer = setTimeout(() => {
      demoScreens[currentScreen].hidden = true;
      demoScreens[currentScreen].classList.remove('is-entering');
      demoTabs[currentScreen].classList.remove('selected', 'is-tapping');
      currentScreen = (currentScreen + 1) % demoScreens.length;
      demoScreens[currentScreen].hidden = false;
      demoScreens[currentScreen].classList.add('is-entering');
      demoTabs[currentScreen].classList.add('selected', 'is-tapping');
      syncDemo();
    }, 3400);
  }

  demoToggle.addEventListener('click', () => {
    demoPaused = !demoPaused;
    syncDemo();
  });
  reducedMotion.addEventListener('change', syncDemo);
  document.addEventListener('visibilitychange', syncDemo);
  if ('IntersectionObserver' in window) {
    const demoObserver = new IntersectionObserver(([entry]) => {
      demoVisible = entry.isIntersecting;
      syncDemo();
    }, { threshold: 0.25 });
    demoObserver.observe(visual);
  }
  syncDemo();
}
