// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});
// ── LOADING SCREEN ──
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.querySelector('.loader-text');

let progress = 0;

const messages = [
  'Initializing...',
  'Loading assets...',
  'Almost ready...',
  'Welcome to Kode&Co'
];

const loading = setInterval(() => {
  progress += Math.random() * 15;

  if (progress >= 100) {
    progress = 100;
    loaderFill.style.width = '100%';
    loaderText.textContent = 'Welcome to Kode&Co ✦';
    clearInterval(loading);

    setTimeout(() => {
      loader.classList.add('hidden');
    }, 600);

  } else {
    loaderFill.style.width = progress + '%';

    if (progress < 30) loaderText.textContent = messages[0];
    else if (progress < 60) loaderText.textContent = messages[1];
    else if (progress < 90) loaderText.textContent = messages[2];
    else loaderText.textContent = messages[3];
  }
}, 100);
// ── COUNTER ANIMATION ──
const statNums = document.querySelectorAll('.stat-num');

const animateCounter = (el) => {
  const text = el.textContent.trim();

  // If NBO or non-numeric just fade in
  if (isNaN(parseInt(text))) {
    el.style.opacity = '0';
    setTimeout(() => {
      el.style.transition = 'opacity 1s ease';
      el.style.opacity = '1';
    }, 200);
    return;
  }

  const target = parseInt(text);
  const suffix = text.replace(/[0-9]/g, '');
  const duration = 1500;
  const steps = 60;
  const increment = target / steps;
  let current = 0;
  el.textContent = '0' + suffix;

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      el.textContent = target + suffix;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current) + suffix;
    }
  }, duration / steps);
};

// Trigger when stats scroll into view
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));