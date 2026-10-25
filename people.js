(() => {
  const links = [...document.querySelectorAll('.people-index a[href^="#"]')];
  const sections = links.map((link) => document.getElementById(link.hash.slice(1)));
  if (!links.length || sections.some((section) => !section)) return;

  let scheduled = false;
  const update = () => {
    const marker = window.scrollY + 160;
    let active = 0;
    sections.forEach((section, index) => {
      if (section.getBoundingClientRect().top + window.scrollY <= marker) active = index;
    });
    links.forEach((link, index) => {
      if (index === active) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
    scheduled = false;
  };

  window.addEventListener('scroll', () => {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(update);
  }, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('load', update);
  update();
})();
