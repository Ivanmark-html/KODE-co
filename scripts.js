// ── LOADING SCREEN ──
const loader = document.getElementById('loader');
const loaderFill = document.getElementById('loaderFill');
const loaderText = document.querySelector('.loader-text');

let progress = 0;
const messages = ['Initializing...', 'Loading assets...', 'Almost ready...', 'Welcome to Kode&Co'];

const hideLoader = () => {
  loaderFill.style.width = '100%';
  loaderText.textContent = 'Welcome to Kode&Co';
  setTimeout(() => loader.classList.add('hidden'), 400);
};

const loading = setInterval(() => {
  progress += Math.random() * 15;
  if (progress >= 100) {
    progress = 100;
    clearInterval(loading);
    hideLoader();
  } else {
    loaderFill.style.width = progress + '%';
    if (progress < 30) loaderText.textContent = messages[0];
    else if (progress < 60) loaderText.textContent = messages[1];
    else if (progress < 90) loaderText.textContent = messages[2];
    else loaderText.textContent = messages[3];
  }
}, 100);

// Safety net — force hide after 3 seconds
setTimeout(hideLoader, 3000);


// ── SCROLL PROGRESS BAR ──
const progressBar = document.getElementById('progressBar');

window.addEventListener('scroll', () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const progress = (scrollTop / docHeight) * 100;
  progressBar.style.width = progress + '%';
});


// ── NAV SCROLL ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});


// ── HAMBURGER MENU ──
const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => mobileMenu.classList.toggle('open'));
function closeMobile() { mobileMenu.classList.remove('open'); }


// ── SCROLL REVEAL ──
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((e, i) => {
    if (e.isIntersecting) {
      setTimeout(() => e.target.classList.add('visible'), i * 80);
      observer.unobserve(e.target);
    }
  });
}, { threshold: 0.1 });
reveals.forEach(el => observer.observe(el));


// ── COUNTER ANIMATION ──
const statNums = document.querySelectorAll('.stat-num');

const animateCounter = (el) => {
  const text = el.textContent.trim();

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

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      animateCounter(entry.target);
      counterObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

statNums.forEach(el => counterObserver.observe(el));


// ── TYPING ANIMATION ──
const words = ['Engineered.', 'Built.', 'Delivered.', 'Shipped.', 'Crafted.'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingEl = document.getElementById('typing-text');

const type = () => {
  if (!typingEl) return;
  const currentWord = words[wordIndex];

  if (isDeleting) {
    typingEl.textContent = currentWord.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typingEl.textContent = currentWord.substring(0, charIndex + 1);
    charIndex++;
  }

  if (!isDeleting && charIndex === currentWord.length) {
    setTimeout(() => isDeleting = true, 1800);
  }

  if (isDeleting && charIndex === 0) {
    isDeleting = false;
    wordIndex = (wordIndex + 1) % words.length;
  }

  const speed = isDeleting ? 60 : 100;
  setTimeout(type, speed);
};

type();