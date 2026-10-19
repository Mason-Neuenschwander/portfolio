(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Banner + hero scroll effect.
  const banner = document.querySelector('.banner');
  const bannerImage = document.querySelector('.banner-image');
  const bannerFade = document.querySelector('.banner-fade');
  const hero = document.querySelector('#home-hero');

  if (banner && bannerImage && hero && !reduceMotion) {
    let ticking = false;

    const updateHero = () => {
      const height = banner.offsetHeight || 1;
      const progress = Math.max(0, Math.min(1, window.scrollY / (height * 0.9)));
      const maxLift = window.innerWidth <= 600 ? 34 : window.innerWidth <= 900 ? 48 : 78;
      const lift = progress * maxLift;

      hero.style.setProperty('--hero-lift', `${lift.toFixed(1)}px`);
      bannerImage.style.transform = `translateY(${-progress * 6}px) scale(${1.001 + progress * 0.009})`;
      bannerImage.style.opacity = String(1 - progress * 0.08);
      if (bannerFade) bannerFade.style.opacity = String(0.12 + progress * 0.58);

      ticking = false;
    };

    const requestUpdate = () => {
      if (!ticking) {
        requestAnimationFrame(updateHero);
        ticking = true;
      }
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate, { passive: true });
    updateHero();
  }

  // KPI card reveal as the cards enter the viewport.
  const cards = [...document.querySelectorAll('.metric-card')];
  if (cards.length) {
    if (reduceMotion || !('IntersectionObserver' in window)) {
      cards.forEach(card => card.classList.add('reveal-ready', 'is-visible'));
    } else {
      cards.forEach((card, index) => {
        card.classList.add('reveal-ready');
        card.style.transitionDelay = `${(index % 3) * 85}ms`;
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      }, {
        threshold: 0.18,
        rootMargin: '0px 0px -7% 0px'
      });

      requestAnimationFrame(() => cards.forEach(card => observer.observe(card)));
    }
  }

  const caseDetails = document.querySelector('details.case');
  if (caseDetails) {
    const label = caseDetails.querySelector(':scope > summary .expand');
    const syncCase = () => { if (label) label.textContent = caseDetails.open ? 'Collapse -' : 'Expand +'; };
    caseDetails.addEventListener('toggle', syncCase);
    syncCase();
  }

  document.querySelectorAll('details.description').forEach((details) => {
    const label = details.querySelector(':scope > summary span');
    const sync = () => { if (label) label.textContent = details.open ? 'Show less' : 'Show more'; };
    details.addEventListener('toggle', sync);
    sync();
  });
})();
