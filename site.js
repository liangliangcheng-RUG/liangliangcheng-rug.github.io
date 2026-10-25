(() => {
  const revealAnchor = () => {
    let id;
    try {
      id = decodeURIComponent(window.location.hash.slice(1));
    } catch {
      return;
    }
    const target = document.getElementById(id);
    if (!target) return;
    const section = target.closest('details');
    if (section) section.open = true;
  };
  window.addEventListener('hashchange', revealAnchor);
  document.querySelectorAll('.publication-index a').forEach((link) => {
    link.addEventListener('click', () => {
      const section = document.getElementById(link.hash.slice(1));
      if (section instanceof HTMLDetailsElement) section.open = true;
    });
  });
  revealAnchor();

  const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const videos = [...document.querySelectorAll('video[data-autoplay]')];
  const syncMotion = () => {
    videos.forEach((video) => {
      if (motion.matches) {
        video.pause();
      } else {
        const playback = video.play();
        if (playback) playback.catch(() => {});
      }
    });
  };
  motion.addEventListener('change', syncMotion);
  syncMotion();
})();
