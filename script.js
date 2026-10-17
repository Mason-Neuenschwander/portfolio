(() => {
  const banner = document.querySelector('.banner-image');
  const hero = document.querySelector('.hero');
  if (!banner || !hero || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  let ticking = false;
  const update = () => {
    const y = Math.max(0, window.scrollY || 0);
    const progress = Math.min(y / 260, 1);
    const opacity = 1 - (progress * 0.62);
    const lift = Math.min(y * 0.34, 82);
    const zoom = Math.min(progress * 0.015, 0.015);
    banner.style.setProperty('--banner-opacity', opacity.toFixed(3));
    banner.style.setProperty('--banner-zoom', zoom.toFixed(4));
    hero.style.setProperty('--hero-lift', `-${lift.toFixed(1)}px`);
    ticking = false;
  };
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(update);
      ticking = true;
    }
  }, { passive: true });
  update();
})();
