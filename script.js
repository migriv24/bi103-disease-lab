/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   BACKGROUND BUBBLE FIELD
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
(function initCellField() {
  const field = document.createElement('div');
  field.id = 'cell-field';
  document.body.prepend(field);

  const cells = [
    { s: 480, x:  5, y: 10, d: 13, del:   0, c: '205,92,92'  },
    { s: 300, x: 72, y: 55, d:  9, del:  -4, c: '233,150,122' },
    { s: 370, x: 42, y: 78, d: 16, del:  -7, c: '250,200,200' },
    { s: 195, x: 88, y:  8, d:  8, del:  -2, c: '205,92,92'  },
    { s: 540, x: 26, y: 42, d: 18, del:  -5, c: '253,230,230' },
    { s: 240, x: 62, y: 22, d: 11, del:  -9, c: '233,150,122' },
    { s: 155, x: 14, y: 87, d:  7, del:  -1, c: '205,92,92'  },
  ];

  cells.forEach(c => {
    const el = document.createElement('div');
    el.className = 'bg-cell';
    el.style.cssText = `left:${c.x}%;top:${c.y}%;width:${c.s}px;height:${c.s}px;--c:${c.c};--d:${c.d}s;--del:${c.del}s;`;
    field.appendChild(el);
  });

  // Spacebar makes bubbles go wild for 3 seconds
  let exciteTimer = null;
  window.addEventListener('keydown', e => {
    if (e.code !== 'Space') return;
    if (['INPUT', 'TEXTAREA', 'BUTTON', 'SELECT'].includes(document.activeElement.tagName)) return;
    e.preventDefault();
    field.classList.add('excited');
    clearTimeout(exciteTimer);
    exciteTimer = setTimeout(() => field.classList.remove('excited'), 3000);
  });
})();


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   LIGHTBOX
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxCap   = document.getElementById('lightbox-caption');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('figure img').forEach(img => {
  img.addEventListener('click', () => {
    lightboxImg.src         = img.src;
    lightboxImg.alt         = img.alt;
    lightboxCap.textContent = img.closest('figure')?.querySelector('figcaption')?.textContent ?? '';
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });


/* ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ACTIVE NAV ON SCROLL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━ */
const sections = document.querySelectorAll('main section');
const navLinks = document.querySelectorAll('#main-nav a');

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(a => a.classList.remove('active'));
      const active = document.querySelector(`#main-nav a[href="#${entry.target.id}"]`);
      if (active) { active.classList.add('active'); active.scrollIntoView({ inline: 'nearest', block: 'nearest' }); }
    }
  });
}, { rootMargin: '-30% 0px -60% 0px' });

sections.forEach(s => observer.observe(s));
