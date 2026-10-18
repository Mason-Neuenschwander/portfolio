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
      const bannerRect = banner.getBoundingClientRect();
      const header = document.querySelector('.top');
      const headerHeight = header ? header.getBoundingClientRect().height : 0;
      const height = banner.offsetHeight || 1;

      // Begin once the banner starts slipping beneath the sticky header.
      const progress = Math.max(0, Math.min(1, (headerHeight - bannerRect.top) / (height * 0.82)));
      const maxLift = window.innerWidth <= 600 ? 42 : window.innerWidth <= 900 ? 54 : 84;
      const lift = progress * maxLift;

      hero.style.setProperty('--hero-lift', `${lift.toFixed(1)}px`);
      bannerImage.style.transform = `scale(${1.002 + progress * 0.008})`;
      bannerImage.style.opacity = String(1 - progress * 0.10);
      if (bannerFade) bannerFade.style.opacity = String(progress * 0.28);

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
