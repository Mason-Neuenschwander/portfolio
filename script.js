(() => {
  const banner = document.querySelector('.banner-image');
  const hero = document.querySelector('.hero');
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (banner && hero && !reducedMotion) {
    let ticking = false;
    const updateHero = () => {
      const y = Math.max(0, window.scrollY || 0);
      const progress = Math.min(y / 210, 1);
      const opacity = 1 - (progress * 0.56);
      const lift = Math.min(y * 0.25, 54);
      const zoom = Math.min(progress * 0.012, 0.012);
      banner.style.setProperty('--banner-opacity', opacity.toFixed(3));
      banner.style.setProperty('--banner-zoom', zoom.toFixed(4));
      hero.style.setProperty('--hero-shift', `-${lift.toFixed(1)}px`);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(updateHero);
        ticking = true;
      }
    }, { passive: true });
    updateHero();
  }
})();
