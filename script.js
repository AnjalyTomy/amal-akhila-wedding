const weddingDate = new Date('2026-10-17T12:00:00+05:30');

function updateCountdown() {
  const difference = Math.max(0, weddingDate.getTime() - Date.now());
  const values = {
    days: Math.floor(difference / 86400000),
    hours: Math.floor((difference / 3600000) % 24),
    minutes: Math.floor((difference / 60000) % 60),
    seconds: Math.floor((difference / 1000) % 60),
  };
  for (const [unit, value] of Object.entries(values)) {
    const element = document.querySelector(`[data-count="${unit}"]`);
    if (element) element.textContent = String(value).padStart(2, '0');
  }
}
updateCountdown();
setInterval(updateCountdown, 1000);

const revealElements = document.querySelectorAll('[data-reveal]');
if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || !('IntersectionObserver' in window)) {
  revealElements.forEach(element => element.classList.add('is-visible'));
} else {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealElements.forEach(element => observer.observe(element));
}

function initFogOverlay() {
  const fog = document.getElementById('fogOverlay');
  if (!fog) return;
  // Keep fog visible for 1.2s to show misty veil, then smoothly fade out
  setTimeout(() => {
    fog.classList.add('fade-out');
    setTimeout(() => {
      fog.style.display = 'none';
    }, 2200);
  }, 1200);
}




if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initFogOverlay();
  });
} else {
  initFogOverlay();
}
