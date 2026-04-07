/* ===========================
   VOCCEL STUDIO — MAIN SCRIPTS
   =========================== */

document.addEventListener('DOMContentLoaded', () => {

  /* ===========================
     PARTICLES
     Antigravity-style: small dots floating with soft physics,
     using Voccel brand colors (purple accent + green comp).
     =========================== */
  (function initParticles() {
    const canvas = document.getElementById('particles-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    const COLORS = [
      'rgba(146, 21, 160, 0.5)',   // accent purple
      'rgba(146, 21, 160, 0.25)',
      'rgba(90, 200, 150, 0.45)',  // comp green
      'rgba(90, 200, 150, 0.2)',
      'rgba(200, 200, 200, 0.12)', // neutral dim
    ];

    const COUNT      = 72;
    const SPEED_MAX  = 0.38;
    const RADIUS_MIN = 1.2;
    const RADIUS_MAX = 3.4;
    const CONNECT_DIST = 130;

    let W, H, particles = [], mouse = { x: -9999, y: -9999 };

    function resize() {
      W = canvas.width  = window.innerWidth;
      H = canvas.height = window.innerHeight;
    }

    function rand(min, max) { return min + Math.random() * (max - min); }

    function makeParticle() {
      return {
        x: rand(0, W), y: rand(0, H),
        vx: rand(-SPEED_MAX, SPEED_MAX),
        vy: rand(-SPEED_MAX, SPEED_MAX),
        r: rand(RADIUS_MIN, RADIUS_MAX),
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
        pulse: rand(0, Math.PI * 2),
        pulseSpeed: rand(0.008, 0.022),
      };
    }

    function init() {
      resize();
      particles = Array.from({ length: COUNT }, makeParticle);
    }

    function tick() {
      ctx.clearRect(0, 0, W, H);

      // Update + draw particles
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.pulse += p.pulseSpeed;

        // Soft mouse repulsion
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 120) {
          const force = (120 - dist) / 120;
          p.vx += (dx / dist) * force * 0.06;
          p.vy += (dy / dist) * force * 0.06;
        }

        // Dampen velocity
        p.vx *= 0.995;
        p.vy *= 0.995;

        // Clamp speed
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > SPEED_MAX * 2) {
          p.vx = (p.vx / speed) * SPEED_MAX * 2;
          p.vy = (p.vy / speed) * SPEED_MAX * 2;
        }

        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -10) p.x = W + 10;
        if (p.x > W + 10) p.x = -10;
        if (p.y < -10) p.y = H + 10;
        if (p.y > H + 10) p.y = -10;

        // Draw particle with pulsing glow
        const pulseR = p.r + Math.sin(p.pulse) * 0.6;
        ctx.beginPath();
        ctx.arc(p.x, p.y, pulseR, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();

        // Draw connections
        for (let j = i + 1; j < particles.length; j++) {
          const q = particles[j];
          const ex = p.x - q.x, ey = p.y - q.y;
          const edist = Math.sqrt(ex * ex + ey * ey);
          if (edist < CONNECT_DIST) {
            const alpha = (1 - edist / CONNECT_DIST) * 0.12;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.strokeStyle = `rgba(146, 21, 160, ${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(tick);
    }

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('mousemove', e => {
      mouse.x = e.clientX; mouse.y = e.clientY;
    }, { passive: true });

    init();
    tick();
  })();

  /* ===========================
     TRANSLATIONS (ES / EN)
     =========================== */
  const TRANSLATIONS = {
    es: {
      eyebrow:      'Estudio Creativo · Luque, Paraguay',
      heroTitle:    'Hacemos productos<br>que la gente <span class="accent">ama usar.</span>',
      heroDesc:     'No solo webs bonitas. Diseñamos y programamos experiencias digitales que <strong>generan confianza, retienen usuarios y hacen crecer negocios.</strong> Rápido, limpio, con código real.',
      btnWork:      'Ver trabajos →',
      btnPlan:      'Planear proyecto',
      stat1:        'Proyectos entregados',
      stat2:        'Código a medida',
      stat3:        'Respuesta garantizada',
      stat4:        'Velocidad de entrega',
      navCta:       'Hablemos →',
      badgeAvail:   'Disponible para proyectos',
      badgeReply:   'Respuesta en menos de 24 hs',
      contactLabel: 'Contacto',
      contactTitle: '¿Tenés un proyecto<br>en mente?',
      contactDesc:  'Hablemos. Contanos tu idea y te respondemos con una propuesta clara en menos de 24 horas.',
      formName:     'Tu nombre',
      formMsg:      'Mensaje',
      formSend:     'Enviar mensaje →',
    },
    en: {
      eyebrow:      'Creative Studio · Luque, Paraguay',
      heroTitle:    'We build products<br>people <span class="accent">love to use.</span>',
      heroDesc:     'Not just pretty websites. We design and build digital experiences that <strong>build trust, retain users and grow businesses.</strong> Fast, clean, real code.',
      btnWork:      'See our work →',
      btnPlan:      'Plan a project',
      stat1:        'Projects delivered',
      stat2:        'Custom code',
      stat3:        'Response guaranteed',
      stat4:        'Delivery speed',
      navCta:       'Let\'s talk →',
      badgeAvail:   'Available for projects',
      badgeReply:   'Reply within 24 hrs',
      contactLabel: 'Contact',
      contactTitle: 'Got a project<br>in mind?',
      contactDesc:  'Let\'s talk. Tell us your idea and we\'ll get back to you with a clear proposal within 24 hours.',
      formName:     'Your name',
      formMsg:      'Message',
      formSend:     'Send message →',
    },
  };

  let currentLang = 'es';

  function applyLang(lang) {
    const t = TRANSLATIONS[lang];
    if (!t) return;
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.dataset.i18n;
      if (t[key] !== undefined) el.innerHTML = t[key];
    });
    // Nav CTA
    const navCta = document.querySelector('.nav-cta');
    if (navCta) navCta.innerHTML = t.navCta;
    // Update html lang attr
    document.documentElement.lang = lang;
  }

  const langToggle = document.querySelector('.nav-lang');
  langToggle?.addEventListener('click', () => {
    currentLang = currentLang === 'es' ? 'en' : 'es';
    langToggle.textContent = currentLang === 'es' ? 'ES / EN' : 'EN / ES';
    applyLang(currentLang);
  });

  /* ===========================
     THEME TOGGLE (dark / light)
     =========================== */
  const themeToggle = document.querySelector('.theme-toggle');
  let isDark = true;

  function applyTheme(dark) {
    if (dark) {
      document.documentElement.classList.remove('light-mode');
      themeToggle.textContent = '🌙';
    } else {
      document.documentElement.classList.add('light-mode');
      themeToggle.textContent = '☀️';
    }
    localStorage.setItem('voccel-theme', dark ? 'dark' : 'light');
  }

  // Restore saved preference
  const saved = localStorage.getItem('voccel-theme');
  if (saved === 'light') { isDark = false; applyTheme(false); }

  themeToggle?.addEventListener('click', () => {
    isDark = !isDark;
    applyTheme(isDark);
  });

  /* ===========================
     NAVBAR SCROLL
     =========================== */
  const navbar = document.getElementById('navbar');
  const onScroll = () => navbar.classList.toggle('scrolled', window.scrollY > 40);
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ===========================
     MOBILE MENU
     =========================== */
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  hamburger?.addEventListener('click', () => {
    const isOpen = mobileMenu.classList.toggle('open');
    hamburger.setAttribute('aria-expanded', String(isOpen));
    const spans = hamburger.querySelectorAll('span');
    if (isOpen) {
      spans[0].style.transform = 'translateY(7px) rotate(45deg)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
    } else {
      spans.forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    }
  });
  mobileMenu?.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      mobileMenu.classList.remove('open');
      hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = ''; });
    });
  });

  /* ===========================
     SCROLL ANIMATIONS
     =========================== */
  const allAos = Array.from(document.querySelectorAll('[data-aos]'));
  const heroSection = document.getElementById('inicio');
  const heroEls = allAos.filter(el => heroSection && heroSection.contains(el));
  const restEls = allAos.filter(el => !(heroSection && heroSection.contains(el)));
  heroEls.forEach(el => {
    const delay = parseInt(el.dataset.aosDelay || '0');
    setTimeout(() => el.classList.add('aos-animate'), delay);
  });
  const scrollObs = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = parseInt(entry.target.dataset.aosDelay || '0');
        setTimeout(() => entry.target.classList.add('aos-animate'), delay);
        scrollObs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.01, rootMargin: '0px 0px 60px 0px' });
  restEls.forEach(el => scrollObs.observe(el));

  /* ===========================
     TICKER
     =========================== */
  const tickerTrack = document.querySelector('.ticker-track');
  if (tickerTrack) tickerTrack.innerHTML += tickerTrack.innerHTML;

  /* ===========================
     PORTFOLIO — render desde projects.js
     =========================== */
  const SITE_WIDTH = 1280;

  function buildCard(project, delay) {
    const card = document.createElement('div');
    card.className = 'portfolio-card';
    card.dataset.url = project.url;
    card.dataset.aos = '';
    card.dataset.aosDelay = delay;
    card.innerHTML = `
      <div class="portfolio-preview">
        <div class="portfolio-skeleton"></div>
        <iframe class="portfolio-iframe" data-src="${project.url}"
          title="Preview ${project.name}" sandbox="allow-same-origin allow-scripts"></iframe>
        <div class="portfolio-actions">
          <button class="portfolio-action-btn btn-expand" data-expand>⛶ Ver preview</button>
          <a class="portfolio-action-btn btn-visit" href="${project.url}"
            target="_blank" rel="noopener noreferrer">↗ Abrir</a>
        </div>
      </div>
      <div class="portfolio-info">
        <div class="portfolio-name">${project.name}</div>
        <div class="portfolio-type">${project.type}</div>
      </div>`;
    card.querySelector('.btn-visit').addEventListener('click', e => e.stopPropagation());
    card.querySelector('[data-expand]').addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      openModal(project.url);
    });
    return card;
  }

  function buildClienteCard(cliente, delay) {
    const card = document.createElement('div');
    card.className = 'cliente-card';
    card.dataset.url = cliente.url;
    card.dataset.aos = '';
    card.dataset.aosDelay = delay;
    card.innerHTML = `
      <div class="portfolio-preview">
        <div class="portfolio-skeleton"></div>
        <iframe class="portfolio-iframe" data-src="${cliente.url}"
          title="Preview ${cliente.name}" sandbox="allow-same-origin allow-scripts"></iframe>
        <div class="portfolio-actions">
          <button class="portfolio-action-btn btn-expand" data-expand>⛶ Ver preview</button>
          <a class="portfolio-action-btn btn-visit" href="${cliente.url}"
            target="_blank" rel="noopener noreferrer">↗ Abrir</a>
        </div>
      </div>
      <div class="cliente-info">
        <div class="cliente-info-main">
          <div class="cliente-name">${cliente.name}</div>
          <div class="cliente-type">${cliente.type}</div>
        </div>
        ${cliente.badge ? `<span class="cliente-badge">${cliente.badge}</span>` : ''}
      </div>`;
    card.querySelector('.btn-visit').addEventListener('click', e => e.stopPropagation());
    card.querySelector('[data-expand]').addEventListener('click', e => {
      e.preventDefault(); e.stopPropagation();
      openModal(cliente.url);
    });
    return card;
  }

  function scaleIframe(card) {
    const preview = card.querySelector('.portfolio-preview');
    const iframe  = card.querySelector('.portfolio-iframe');
    if (!preview || !iframe) return;
    const scale = preview.offsetWidth / SITE_WIDTH;
    iframe.style.width  = SITE_WIDTH + 'px';
    iframe.style.height = Math.ceil(preview.offsetHeight / scale) + 'px';
    iframe.style.transform = `scale(${scale})`;
    iframe.style.transformOrigin = 'top left';
    card.style.setProperty('--iframe-scale', scale);
  }

  function initCardObservers() {
    document.querySelectorAll('.portfolio-card[data-aos], .cliente-card[data-aos]').forEach(c => scrollObs.observe(c));

    const iframeObs = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const card = entry.target;
        const iframe = card.querySelector('.portfolio-iframe');
        if (!iframe || !iframe.dataset.src) return;
        scaleIframe(card);
        iframe.src = iframe.dataset.src;
        delete iframe.dataset.src;
        iframe.addEventListener('load', () => {
          card.querySelector('.portfolio-skeleton')?.classList.add('loaded');
        }, { once: true });
        iframeObs.unobserve(card);
      });
    }, { threshold: 0.05, rootMargin: '80px' });

    document.querySelectorAll('.portfolio-card, .cliente-card').forEach(c => iframeObs.observe(c));

    window.addEventListener('resize', () => {
      document.querySelectorAll('.portfolio-card, .cliente-card').forEach(card => {
        const iframe = card.querySelector('.portfolio-iframe');
        if (iframe && iframe.src) scaleIframe(card);
      });
    }, { passive: true });
  }

  // Zoom hover
  document.addEventListener('mouseover', e => {
    const card = e.target.closest('.portfolio-card, .cliente-card');
    if (!card) return;
    const iframe = card.querySelector('.portfolio-iframe');
    if (!iframe) return;
    const scale = parseFloat(card.style.getPropertyValue('--iframe-scale') || 1);
    iframe.style.transform = `scale(${scale * 1.08})`;
  });
  document.addEventListener('mouseout', e => {
    const card = e.target.closest('.portfolio-card, .cliente-card');
    if (!card) return;
    const iframe = card.querySelector('.portfolio-iframe');
    if (!iframe) return;
    const scale = parseFloat(card.style.getPropertyValue('--iframe-scale') || 1);
    iframe.style.transform = `scale(${scale})`;
  });

  function renderPortfolio() {
    if (typeof PROJECTS === 'undefined') return;
    const eg = document.getElementById('grid-eventos');
    const ag = document.getElementById('grid-apps');
    if (eg) PROJECTS.eventos.forEach((p, i) => eg.appendChild(buildCard(p, i * 80)));
    if (ag) PROJECTS.apps.forEach((p, i) => ag.appendChild(buildCard(p, i * 80)));
  }

  function renderClientes() {
    if (typeof CLIENTES === 'undefined') return;
    const g = document.getElementById('grid-clientes');
    if (g) CLIENTES.forEach((c, i) => g.appendChild(buildClienteCard(c, i * 80)));
  }

  renderPortfolio();
  renderClientes();
  initCardObservers();

  /* ===========================
     MODAL
     =========================== */
  const modal       = document.getElementById('previewModal');
  const modalIframe = document.getElementById('modalIframe');
  const modalUrl    = document.getElementById('modalUrl');
  const modalLink   = document.getElementById('modalVisitLink');
  const modalClose  = document.getElementById('modalClose');
  const modalLoader = document.getElementById('modalLoader');

  function openModal(url) {
    modalUrl.textContent = url.replace('https://', '');
    modalLink.href = url;
    if (modalLoader) modalLoader.style.display = 'flex';
    modalIframe.src = '';
    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
    setTimeout(() => { modalIframe.src = url; }, 80);
  }

  function closeModal() {
    modal.classList.remove('open');
    document.body.style.overflow = '';
    setTimeout(() => { modalIframe.src = ''; if (modalLoader) modalLoader.style.display = 'flex'; }, 350);
  }

  modalIframe?.addEventListener('load', () => {
    if (modalIframe.src && modalIframe.src !== window.location.href && modalLoader) {
      modalLoader.style.display = 'none';
    }
  });
  modalClose?.addEventListener('click', closeModal);
  modal?.addEventListener('click', e => { if (e.target === modal) closeModal(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && modal?.classList.contains('open')) closeModal(); });

  /* ===========================
     TOAST
     =========================== */
  function showToast(msg) {
    const toast = document.getElementById('toast');
    if (!toast) return;
    toast.innerHTML = '<span>&#10003;</span> ' + msg;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  /* ===========================
     FORMS
     =========================== */
  [document.getElementById('plannerForm'), document.getElementById('contactForm')].forEach(form => {
    if (!form) return;
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.btn-submit');
      const orig = btn.textContent;
      btn.textContent = 'Enviando...'; btn.disabled = true;
      setTimeout(() => {
        btn.textContent = orig; btn.disabled = false;
        form.reset();
        showToast('Mensaje enviado. Te contactamos en breve.');
        if (form.id === 'plannerForm') window.scrollTo({ top: 0, behavior: 'smooth' });
      }, 1200);
    });
  });

});
