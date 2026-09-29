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
  }, { threshold: 0.12, rootMargin: '0px 0px -35px 0px' });
  revealElements.forEach(element => observer.observe(element));
}

function initYellowPetals() {
  const container = document.getElementById('petalsContainer');
  if (!container) return;
  const petalCount = 24;
  for (let i = 0; i < petalCount; i++) {
    const petal = document.createElement('div');
    petal.className = 'yellow-petal';
    const left = Math.random() * 100;
    const duration = 5 + Math.random() * 5.5;
    const delay = Math.random() * 6;
    const size = 12 + Math.random() * 10;
    const sway = (Math.random() - 0.5) * 220;
    const rotation = 180 + Math.random() * 540;

    petal.style.left = `${left}%`;
    petal.style.width = `${size}px`;
    petal.style.height = `${size * 1.45}px`;
    petal.style.animationDuration = `${duration}s`;
    petal.style.animationDelay = `${delay}s`;
    petal.style.setProperty('--sway', `${sway}px`);
    petal.style.setProperty('--rot', `${rotation}deg`);

    container.appendChild(petal);
  }
}
initYellowPetals();
