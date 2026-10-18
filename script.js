(() => {
  const banner = document.querySelector('.banner');
  const bannerImage = document.querySelector('.banner-image');
  if (banner && bannerImage && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    let ticking = false;
    const updateBanner = () => {
      const rect = banner.getBoundingClientRect();
      const h = banner.offsetHeight || 1;
      const progress = Math.max(0, Math.min(1, -rect.top / h));
      bannerImage.style.transform = `scale(${1.002 + progress * 0.012})`;
      bannerImage.style.opacity = String(1 - progress * 0.16);
      ticking = false;
    };
    window.addEventListener('scroll', () => {
      if (!ticking) {
        requestAnimationFrame(updateBanner);
        ticking = true;
      }
    }, { passive: true });
    updateBanner();
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
