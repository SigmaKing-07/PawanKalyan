// ============================================================
//  PAWAN KALYAN WEBSITE — JAVASCRIPT
// ============================================================

// ── Navbar scroll effect ──
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ── Mobile hamburger menu ──
const hamburger = document.getElementById('hamburger');
const navLinks  = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
  });
});

// ── Smooth scroll active nav ──
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

const observerOptions = {
  root: null,
  rootMargin: '-40% 0px -40% 0px',
  threshold: 0,
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const id = entry.target.getAttribute('id');
      navItems.forEach(a => {
        a.style.color = a.getAttribute('href') === `#${id}`
          ? 'var(--gold)'
          : '';
      });
    }
  });
}, observerOptions);

sections.forEach(s => observer.observe(s));

// ── Scroll-reveal animation ──
const revealEls = document.querySelectorAll(
  '.about-text, .about-card, .tl-card, .film-card, .politics-card, .gallery-item, .section-header, .quote-band blockquote'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

revealEls.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(28px)';
  el.style.transition = 'opacity 0.7s ease, transform 0.7s ease';
  revealObserver.observe(el);
});

// ── Stats counter animation ──
const stats = document.querySelectorAll('.stat span');

const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const target = parseInt(el.textContent) || 0;
      const suffix = el.textContent.replace(/[0-9]/g, '');
      let current = 0;
      const step = Math.ceil(target / 40);
      const timer = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 40);
      counterObserver.unobserve(el);
    }
  });
}, { threshold: 0.5 });

stats.forEach(s => counterObserver.observe(s));

// ── Gallery item ripple on click ──
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const label = item.getAttribute('data-label') || 'Pawan Kalyan';
    showToast(`${label} — Power Star`);
  });
});

function showToast(message) {
  const existing = document.querySelector('.pk-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'pk-toast';
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed;
    bottom: 32px;
    left: 50%;
    transform: translateX(-50%) translateY(20px);
    background: rgba(212,160,23,0.95);
    color: #0a0a0f;
    padding: 12px 28px;
    border-radius: 40px;
    font-size: 13px;
    font-weight: 700;
    letter-spacing: 1.5px;
    text-transform: uppercase;
    z-index: 9999;
    opacity: 0;
    transition: all 0.35s ease;
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 32px rgba(212,160,23,0.3);
  `;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      toast.style.opacity = '1';
      toast.style.transform = 'translateX(-50%) translateY(0)';
    });
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(10px)';
    setTimeout(() => toast.remove(), 400);
  }, 2500);
}

// ── Staggered card animations ──
function staggerCards(selector) {
  const cards = document.querySelectorAll(selector);
  cards.forEach((card, i) => {
    card.style.transitionDelay = `${i * 0.07}s`;
  });
}

staggerCards('.film-card');
staggerCards('.politics-card');
staggerCards('.gallery-item');
