// Menu mobile
const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle) {
  navToggle.addEventListener('click', () => {
    navLinks.classList.toggle('open');
  });

  // Ferme le menu quand on clique un lien (mobile)
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => navLinks.classList.remove('open'));
  });
}

// Anime les barres de compétences quand elles entrent dans le viewport
const skillBars = document.querySelectorAll('.skill-bar-fill');

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const target = entry.target.dataset.level;
      entry.target.style.width = target + '%';
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });

skillBars.forEach((bar) => {
  bar.style.width = '0%';
  bar.style.transition = 'width 1s ease';
  observer.observe(bar);
});

// Formulaire de contact — pas encore de back-end connecté
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Le formulaire n\'est pas encore connecté à un serveur. Prochaine étape : back-end Node.js + MongoDB.');
  });
}
