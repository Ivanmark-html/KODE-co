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