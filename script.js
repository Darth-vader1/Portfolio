// Nav scroll effect
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
  backTop.classList.toggle('show', window.scrollY > 400);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinks.classList.toggle('open');
});
function closeMenu() {
  hamburger.classList.remove('open');
  navLinks.classList.remove('open');
}

// Back to top smooth scroll
document.getElementById('backTop').addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Reveal on scroll
const reveals = document.querySelectorAll('.reveal');
const ro = new IntersectionObserver(entries => {
  entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); ro.unobserve(e.target); } });
}, { threshold: 0.12 });
reveals.forEach(el => ro.observe(el));

// Skill bars animate on scroll
const skillBars = document.querySelectorAll('.skill-bar-fill');
const skillsSection = document.getElementById('skills');
const skillObs = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      skillBars.forEach(bar => { bar.style.width = bar.dataset.width + '%'; });
      skillObs.unobserve(e.target);
    }
  });
}, { threshold: 0.3 });
if (skillsSection) skillObs.observe(skillsSection);

// Project filter
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    filterBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    const f = btn.dataset.filter;
    projectCards.forEach(card => {
      const show = f === 'all' || card.dataset.category === f;
      card.style.opacity = show ? '1' : '0';
      card.style.transform = show ? 'none' : 'scale(0.96)';
      card.style.transition = 'opacity 0.3s, transform 0.3s';
      card.style.pointerEvents = show ? 'auto' : 'none';
      card.style.display = show ? '' : 'none';
    });
  });
});

// Contact form submit
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = contactForm.querySelector('.form-submit');
    btn.textContent = 'Sending…';
    btn.disabled = true;
    try {
      const res = await fetch(contactForm.action, {
        method: 'POST',
        body: new FormData(contactForm),
        headers: { 'Accept': 'application/json' }
      });
      if (res.ok) {
        btn.textContent = '✓ Message sent!';
        btn.style.background = '#22c55e';
        contactForm.reset();
        setTimeout(() => { btn.textContent = 'Send Message'; btn.style.background = ''; btn.disabled = false; }, 4000);
      } else throw new Error();
    } catch {
      btn.textContent = 'Failed — try email directly';
      btn.style.background = '#ef4444';
      btn.disabled = false;
    }
  });
}