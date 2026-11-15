(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Gentle reveal for operational-impact cards. Content stays visible without JS.
  const cards = [...document.querySelectorAll('.metric-card')];
  if (cards.length && !reduceMotion && 'IntersectionObserver' in window) {
    cards.forEach((card, index) => {
      card.classList.add('reveal-ready');
      card.style.transitionDelay = `${(index % 3) * 75}ms`;
    });
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -3% 0px' });
    requestAnimationFrame(() => cards.forEach(card => observer.observe(card)));
  }

  // Existing case-study and explanation accordion labels.
  const caseDetails = document.querySelector('details.case');
  if (caseDetails) {
    const label = caseDetails.querySelector(':scope > summary .expand');
    const syncCase = () => { if (label) label.textContent = caseDetails.open ? 'Collapse −' : 'Expand +'; };
    caseDetails.addEventListener('toggle', syncCase);
    syncCase();
  }
  document.querySelectorAll('details.description').forEach(details => {
    const label = details.querySelector(':scope > summary span');
    const sync = () => { if (label) label.textContent = details.open ? 'Show less' : 'Show more'; };
    details.addEventListener('toggle', sync);
    sync();
  });
})();
