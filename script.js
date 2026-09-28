// ══════════════════════════════════════════════════════════════════════════
// CMS DATA LOADER & DYNAMIC RENDERER
// ══════════════════════════════════════════════════════════════════════════

async function loadCMSData() {
  try {
    // 1. Fetch Bio Data
    const bioRes = await fetch('data/bio.json');
    if (bioRes.ok) {
      const bio = await bioRes.json();
      renderBio(bio);
    }
  } catch (err) {
    console.log('Using default bio HTML content');
  }

  try {
    // 2. Fetch Services Data
    const servicesRes = await fetch('data/services.json');
    if (servicesRes.ok) {
      const services = await servicesRes.json();
      renderServices(services);
    }
  } catch (err) {
    console.log('Using default services HTML content');
  }

  try {
    // 3. Fetch Projects Data
    const projectsRes = await fetch('data/projects.json');
    if (projectsRes.ok) {
      const projects = await projectsRes.json();
      renderProjects(projects);
    }
  } catch (err) {
    console.log('Using default projects HTML content');
  }

  try {
    // 4. Fetch Skills & Tools Data
    const skillsRes = await fetch('data/skills.json');
    if (skillsRes.ok) {
      const skillsData = await skillsRes.json();
      renderSkills(skillsData);
    }
  } catch (err) {
    console.log('Using default skills HTML content');
  }

  // Re-initialize scroll reveal observers for newly injected dynamic elements
  initRevealObserver();
  initSkillObserver();
}

function renderBio(bio) {
  // Hero Tag
  const heroTag = document.querySelector('.hero-tag');
  if (heroTag && bio.tagline) {
    heroTag.innerHTML = `<span class="dot"></span> ${bio.tagline}`;
  }

  // Hero H1 Headline
  const heroH1 = document.querySelector('#home h1');
  if (heroH1 && bio.headline) {
    heroH1.innerHTML = bio.headline.replace(/\n/g, '<br>');
  }

  // Hero Subtext
  const heroSub = document.querySelector('.hero-sub');
  if (heroSub && (bio.name || bio.subtext)) {
    heroSub.innerHTML = `I'm <strong>${bio.name}</strong> — ${bio.role}. ${bio.subtext}`;
  }

  // Hero Photo
  const heroImg = document.querySelector('.hero-photo-frame img');
  if (heroImg && bio.hero_photo) {
    heroImg.src = bio.hero_photo;
    heroImg.alt = bio.name || 'Profile photo';
  }

  // Hero CV Download Button
  if (bio.cv_file) {
    document.querySelectorAll('a[href$=".docx"], a[href$=".pdf"]').forEach(btn => {
      btn.href = bio.cv_file;
    });
  }

  // Hero Badges
  const expBadge = document.querySelector('.hero-badge-text strong');
  if (expBadge && bio.experience_years) expBadge.textContent = bio.experience_years;

  const clientsBadge = document.querySelector('.hero-badge2 span');
  if (clientsBadge && bio.clients_count) clientsBadge.textContent = bio.clients_count;

  // Social Links
  if (bio.socials) {
    updateSocialLinks(bio.socials);
  }

  // Marquee
  const stripInner = document.getElementById('stripInner');
  if (stripInner && bio.marquee && bio.marquee.length) {
    const marqueeHTML = bio.marquee.map(item => `<span class="strip-item"><i class="fas fa-star"></i> ${item}</span>`).join('');
    // Duplicate for seamless loop
    stripInner.innerHTML = marqueeHTML + marqueeHTML;
  }

  // About Photo & Apps Shipped
  const aboutImg = document.querySelector('.about-photo img');
  if (aboutImg && bio.about_photo) {
    aboutImg.src = bio.about_photo;
    aboutImg.alt = bio.name || 'About photo';
  }

  const appsShipped = document.querySelector('.about-accent-box strong');
  if (appsShipped && bio.apps_shipped) appsShipped.textContent = bio.apps_shipped;

  // About Content
  const aboutTitle = document.querySelector('#about .section-title');
  if (aboutTitle && bio.about_title) aboutTitle.textContent = bio.about_title;

  const aboutParas = document.querySelectorAll('#about .about-content > p');
  if (aboutParas[0] && bio.about_paragraph_1) aboutParas[0].textContent = bio.about_paragraph_1;
  if (aboutParas[1] && bio.about_paragraph_2) aboutParas[1].textContent = bio.about_paragraph_2;

  const nicheBox = document.querySelector('.about-niche');
  if (nicheBox && bio.niche_statement) nicheBox.textContent = `"${bio.niche_statement}"`;

  // Contact Info Items
  if (bio.contact) {
    const infoItems = document.querySelectorAll('.about-info .info-item span');
    if (infoItems[0] && bio.contact.email) infoItems[0].textContent = bio.contact.email;
    if (infoItems[1] && bio.contact.phone) infoItems[1].textContent = bio.contact.phone;
    if (infoItems[2] && bio.contact.location) infoItems[2].textContent = bio.contact.location;
    if (infoItems[3] && bio.contact.website) infoItems[3].textContent = bio.contact.website;

    // Contact Section Link text/hrefs
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
      link.href = `mailto:${bio.contact.email}`;
      link.textContent = bio.contact.email;
    });

    const phoneLinks = document.querySelectorAll('a[href^="https://wa.me/"], a[href^="tel:"]');
    if (bio.contact.phone) {
      phoneLinks.forEach(link => {
        link.textContent = bio.contact.phone;
      });
    }
  }
}

function updateSocialLinks(socials) {
  if (socials.github) {
    document.querySelectorAll('a[title="GitHub"]').forEach(el => el.href = socials.github);
  }
  if (socials.linkedin) {
    document.querySelectorAll('a[title="LinkedIn"]').forEach(el => el.href = socials.linkedin);
  }
  if (socials.twitter) {
    document.querySelectorAll('a[title="Twitter/X"], a[title="Twitter"]').forEach(el => el.href = socials.twitter);
  }
  if (socials.whatsapp) {
    document.querySelectorAll('a[title="WhatsApp"]').forEach(el => el.href = socials.whatsapp);
  }
}

function renderServices(servicesList) {
  const container = document.querySelector('.services-grid');
  if (!container || !Array.isArray(servicesList)) return;

  container.innerHTML = servicesList.map((srv, index) => `
    <div class="service-card reveal" style="transition-delay:${index * 0.1}s">
      <div class="service-icon" style="background:${srv.icon_bg || '#fef3c7'}">${srv.icon || '🖥️'}</div>
      <h3>${srv.title}</h3>
      <p>${srv.description}</p>
      <ul>
        ${(srv.features || []).map(f => `<li>${f}</li>`).join('')}
      </ul>
    </div>
  `).join('');
}

function renderProjects(projectsList) {
  const grid = document.getElementById('projectsGrid');
  if (!grid || !Array.isArray(projectsList)) return;

  grid.innerHTML = projectsList.map((p, index) => {
    const isFeatured = p.featured ? 'featured' : '';
    const delay = index * 0.05;
    const tagsHTML = (p.tags || []).map(t => `<span class="tag">${t}</span>`).join('');

    return `
      <div class="project-card ${isFeatured} reveal" data-category="${p.category || 'web'}" style="transition-delay:${delay}s">
        <div class="project-img">
          <img src="${p.image}" alt="${p.title}" onerror="this.style.display='none'; this.nextElementSibling.style.display='flex'">
          <div class="project-img-placeholder" style="display:none">
            <i class="fas fa-image"></i>
            <p>Project Image</p>
          </div>
        </div>
        <div class="project-body">
          <div class="project-tags">
            ${tagsHTML}
          </div>
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="project-outcome">
            <i class="fas fa-chart-line"></i>
            <span>${p.outcome}</span>
          </div>
          <div class="project-links">
            <a href="${p.demo_url || '#'}" class="link-btn solid" target="_blank"><i class="fas fa-external-link-alt"></i> Live Demo</a>
            <a href="${p.source_url || '#'}" class="link-btn ghost" target="_blank"><i class="fab fa-github"></i> Source</a>
          </div>
        </div>
      </div>
    `;
  }).join('');

  initFilterButtons();
}

function renderSkills(skillsData) {
  // Render Skill Groups
  const skillsContainer = document.querySelector('#skills .skills-layout > div:first-child');
  if (skillsContainer && skillsData.groups) {
    const headerHTML = `
      <span class="section-label">My toolkit</span>
      <h2 class="section-title reveal">Skills &amp; proficiency</h2>
      <p class="section-sub reveal">Technologies I use day-to-day to build production-grade web applications.</p>
    `;

    const groupsHTML = skillsData.groups.map((group, gIdx) => `
      <div class="skill-group reveal" style="transition-delay:${(gIdx + 1) * 0.1}s">
        <div class="skill-group-label">${group.label}</div>
        ${(group.items || []).map(item => `
          <div class="skill-row">
            <span class="skill-name"><i class="${item.icon}"></i> ${item.name}</span>
            <div class="skill-bar-wrap"><div class="skill-bar-fill" data-width="${item.width}"></div></div>
            <span class="skill-pct">${item.width}%</span>
          </div>
        `).join('')}
      </div>
    `).join('');

    skillsContainer.innerHTML = headerHTML + groupsHTML;
  }

  // Render Tool Chips
  const toolsGrid = document.querySelector('.tools-grid');
  if (toolsGrid && skillsData.tools) {
    toolsGrid.innerHTML = skillsData.tools.map(t => `
      <div class="tool-chip">
        <img src="${t.image}" alt="${t.name}">
        <span>${t.name}</span>
      </div>
    `).join('');
  }
}

// ══════════════════════════════════════════════════════════════════════════
// EXISTING EVENT LISTENERS & INTERACTION HANDLERS
// ══════════════════════════════════════════════════════════════════════════

// Nav scroll effect
const navbar = document.getElementById('navbar');
const backTop = document.getElementById('backTop');
window.addEventListener('scroll', () => {
  if (navbar) navbar.classList.toggle('scrolled', window.scrollY > 50);
  if (backTop) backTop.classList.toggle('show', window.scrollY > 400);
});

// Mobile menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
if (hamburger && navLinks) {
  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });
}

function closeMenu() {
  if (hamburger && navLinks) {
    hamburger.classList.remove('open');
    navLinks.classList.remove('open');
  }
}

// Back to top smooth scroll
if (backTop) {
  backTop.addEventListener('click', e => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Reveal on scroll
let revealObserverInstance = null;
function initRevealObserver() {
  if (revealObserverInstance) revealObserverInstance.disconnect();
  const reveals = document.querySelectorAll('.reveal');
  revealObserverInstance = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObserverInstance.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });
  reveals.forEach(el => revealObserverInstance.observe(el));
}

// Skill bars animate on scroll
let skillObserverInstance = null;
function initSkillObserver() {
  if (skillObserverInstance) skillObserverInstance.disconnect();
  const skillBars = document.querySelectorAll('.skill-bar-fill');
  const skillsSection = document.getElementById('skills');
  if (!skillsSection) return;

  skillObserverInstance = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        skillBars.forEach(bar => { bar.style.width = bar.dataset.width + '%'; });
        skillObserverInstance.unobserve(e.target);
      }
    });
  }, { threshold: 0.2 });
  skillObserverInstance.observe(skillsSection);
}

// Project filter
function initFilterButtons() {
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.onclick = () => {
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
    };
  });
}

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

// Initialize CMS Data load on page load
document.addEventListener('DOMContentLoaded', () => {
  initRevealObserver();
  initSkillObserver();
  initFilterButtons();
  loadCMSData();
});