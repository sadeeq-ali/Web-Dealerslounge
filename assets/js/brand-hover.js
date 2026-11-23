(() => {
  const brand = document.querySelector('.brand-reveal');
  if (!brand) return;
  const symbol = brand.querySelector('.brand-symbol');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  let animation = null;

  brand.addEventListener('pointerenter', event => {
    if (event.pointerType === 'touch' || reducedMotion.matches || animation) return;
    animation = symbol.animate(
      [{ transform: 'rotate(0deg)' }, { transform: 'rotate(360deg)' }],
      { duration: 650, easing: 'ease-in-out', iterations: 1 }
    );
    animation.onfinish = () => { animation = null; };
    animation.oncancel = () => { animation = null; };
  });

  reducedMotion.addEventListener('change', () => {
    if (reducedMotion.matches) animation?.cancel();
  });
})();
