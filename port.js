/* ══════════════════════════════
   MATRIX RAIN
══════════════════════════════ */
(function () {
  const c = document.getElementById('matrixCanvas');
  const ctx = c.getContext('2d');

  function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
  }
  resize();
  window.addEventListener('resize', resize);

  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789@#$%&<>/\\|{}[]GOTTAMSAINI';
  const fs = 14;
  let cols, drops;

  function init() {
    cols = Math.floor(c.width / fs);
    drops = Array(cols).fill(1);
  }
  init();

  setInterval(() => {
    ctx.fillStyle = 'rgba(0,0,0,0.05)';
    ctx.fillRect(0, 0, c.width, c.height);
    ctx.fillStyle = '#00f5a0';
    ctx.font = fs + 'px Space Mono,monospace';
    drops.forEach((y, i) => {
      const ch = chars[Math.floor(Math.random() * chars.length)];
      ctx.fillText(ch, i * fs, y * fs);
      if (y * fs > c.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    });
  }, 45);
})();

/* ══════════════════════════════
   HACKER LOADER
══════════════════════════════ */
(function () {
  const lines = [
    { text: '<span class="prompt">$ </span><span class="cmd">init portfolio.js</span>', delay: 0 },
    { text: '<span class="ok">✓</span> Loading modules...', delay: 350 },
    { text: '<span class="prompt">$ </span><span class="cmd">import { skills } from "./gottam"</span>', delay: 650 },
    { text: '<span class="ok">✓</span> Skills loaded: <span class="info">HTML CSS JS PHP Python WP GHL MySQL</span>', delay: 1000 },
    { text: '<span class="prompt">$ </span><span class="cmd">compile projects --all</span>', delay: 1350 },
    { text: '<span class="ok">✓</span> Projects compiled: <span class="info">Xero App, WP Plugin, GHL CRM</span>', delay: 1700 },
    { text: '<span class="warn">⚡</span> Booting interface...', delay: 2050 },
    { text: '<span class="ok">✓ ACCESS GRANTED — Welcome!</span><span id="ldCursor" class="hacker-cursor"></span>', delay: 2400 },
  ];

  const container = document.getElementById('hackerLines');
  const prog = document.getElementById('hackerProgress');
  const pct = document.getElementById('hackerPct');
  const loader = document.getElementById('loader');

  lines.forEach((l, i) => {
    setTimeout(() => {
      const d = document.createElement('div');
      d.className = 'hacker-line';
      d.innerHTML = l.text;
      container.appendChild(d);
      requestAnimationFrame(() => requestAnimationFrame(() => d.classList.add('show')));
      const p = Math.round(((i + 1) / lines.length) * 100);
      prog.style.width = p + '%';
      pct.textContent = p + '%';
    }, l.delay);
  });

  setTimeout(() => {
    loader.classList.add('hide');
  }, 3200);
})();

/* ══════════════════════════════
   CUSTOM CURSOR
══════════════════════════════ */
const cursor = document.getElementById('cursor');
const trail = document.getElementById('cursorTrail');
let mx = 0, my = 0, tx = 0, ty = 0;

document.addEventListener('mousemove', e => {
  mx = e.clientX;
  my = e.clientY;
  cursor.style.left = mx - 6 + 'px';
  cursor.style.top = my - 6 + 'px';
});

(function anim() {
  tx += (mx - tx) * 0.12;
  ty += (my - ty) * 0.12;
  trail.style.left = tx - 18 + 'px';
  trail.style.top = ty - 18 + 'px';
  requestAnimationFrame(anim);
})();

document.querySelectorAll('a,button,.skill-card,.project-card,.service-card,.stat-card').forEach(el => {
  el.addEventListener('mouseenter', () => {
    cursor.style.transform = 'scale(2.5)';
    trail.style.transform = 'scale(1.5)';
  });
  el.addEventListener('mouseleave', () => {
    cursor.style.transform = 'scale(1)';
    trail.style.transform = 'scale(1)';
  });
});

/* ══════════════════════════════
   MOBILE MENU
══════════════════════════════ */
function toggleMobile() {
  document.getElementById('hamburger').classList.toggle('open');
  document.getElementById('mobileMenu').classList.toggle('open');
  document.body.style.overflow = document.getElementById('mobileMenu').classList.contains('open') ? 'hidden' : '';
}

function closeMobile() {
  document.getElementById('hamburger').classList.remove('open');
  document.getElementById('mobileMenu').classList.remove('open');
  document.body.style.overflow = '';
}

/* ══════════════════════════════
   SCROLL PROGRESS + BACK TO TOP
══════════════════════════════ */
const bar = document.getElementById('progress-bar');
const fabTop = document.getElementById('fabTop');

window.addEventListener('scroll', () => {
  bar.style.width = (window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100) + '%';
  fabTop.classList.toggle('visible', window.scrollY > 400);
});

/* ══════════════════════════════
   SCROLL REVEAL
══════════════════════════════ */
const revObs = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(r => revObs.observe(r));

/* ══════════════════════════════
   SKILL CARDS STAGGER ANIMATION
══════════════════════════════ */
const sCards = document.querySelectorAll('.skill-card');
sCards.forEach(c => {
  c.style.opacity = '0';
  c.style.transform = 'translateY(20px)';
  c.style.transition = 'opacity 0.4s ease,transform 0.4s ease';
});

new IntersectionObserver(
  entries => entries.forEach(e => {
    if (e.isIntersecting) {
      sCards.forEach((c, i) =>
        setTimeout(() => {
          c.style.opacity = '1';
          c.style.transform = 'none';
        }, i * 55)
      );
    }
  }),
  { threshold: 0.1 }
).observe(document.getElementById('skills'));

/* ══════════════════════════════
   COUNTER ANIMATION
══════════════════════════════ */
document.querySelectorAll('.stat-number[data-target]').forEach(el => {
  new IntersectionObserver(
    entries => entries.forEach(e => {
      if (!e.isIntersecting || e.target.dataset.done) return;
      e.target.dataset.done = '1';
      const target = parseInt(e.target.getAttribute('data-target'), 10);
      let cur = 0;
      const t = setInterval(() => {
        cur = Math.min(cur + Math.ceil(target / 50), target);
        e.target.textContent = cur + '+';
        if (cur >= target) clearInterval(t);
      }, 30);
    }),
    { threshold: 0.5 }
  ).observe(el);
});

/* ══════════════════════════════
   TYPING ANIMATION
══════════════════════════════ */
const roles = [
  'Full Stack Developer',
  'WordPress Expert',
  'PHP Developer',
  'API Integration Pro',
  'Python Developer',
  'GHL Specialist'
];
let ri = 0, ci = 0, del = false;
const tel = document.getElementById('typingText');

function type() {
  const cur = roles[ri];
  if (!del) {
    tel.textContent = cur.slice(0, ++ci);
    if (ci === cur.length) {
      del = true;
      setTimeout(type, 1800);
      return;
    }
  } else {
    tel.textContent = cur.slice(0, --ci);
    if (ci === 0) {
      del = false;
      ri = (ri + 1) % roles.length;
      setTimeout(type, 400);
      return;
    }
  }
  setTimeout(type, del ? 50 : 90);
}

setTimeout(type, 3400);