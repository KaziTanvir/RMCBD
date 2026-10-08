const menuButton = document.querySelector(".menu-toggle");
const navigation = document.querySelector(".site-nav");
document.documentElement.classList.add("js");

if (menuButton && navigation) {
  menuButton.addEventListener("click", () => {
    const isOpen = menuButton.getAttribute("aria-expanded") === "true";
    menuButton.setAttribute("aria-expanded", String(!isOpen));
    menuButton.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
    navigation.classList.toggle("is-open", !isOpen);
  });

  navigation.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
    });
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menuButton.getAttribute("aria-expanded") === "true") {
      menuButton.setAttribute("aria-expanded", "false");
      menuButton.setAttribute("aria-label", "Open navigation");
      navigation.classList.remove("is-open");
      menuButton.focus();
    }
  });
}

const motionPreference = window.matchMedia("(prefers-reduced-motion: reduce)");
let prefersReducedMotion = motionPreference.matches;
const revealItems = document.querySelectorAll(".reveal");

if (prefersReducedMotion || !("IntersectionObserver" in window)) {
  revealItems.forEach((item) => item.classList.add("is-visible"));
} else {
  const observer = new IntersectionObserver((entries, currentObserver) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        currentObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: "0px 0px -35px 0px" });

  revealItems.forEach((item) => observer.observe(item));
}

const year = document.querySelector("#year");
if (year) year.textContent = new Date().getFullYear();

const form = document.querySelector("#contact-form");
const formNote = document.querySelector("#form-note");
if (form) {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const firmEmail = "hello@yourfirm.com"; // Replace with the firm's approved public enquiry address.
    const subject = encodeURIComponent(`Website enquiry: ${data.get("service")}`);
    const body = encodeURIComponent(
      `Name: ${data.get("name")}\nWork email: ${data.get("email")}\nService: ${data.get("service")}\n\nMessage: ${data.get("message") || ""}`
    );

    if (firmEmail === "hello@yourfirm.com") {
      formNote.textContent = "Replace hello@yourfirm.com in script.js with the firm's approved enquiry address before launch.";
      return;
    }

    window.location.href = `mailto:${firmEmail}?subject=${subject}&body=${body}`;
  });
}

// Edit each data-count in index.html to use verified firm totals.
const counters = document.querySelectorAll('[data-count]');
function animateCounter(counter) {
  const target = Number(counter.dataset.count);
  if (!Number.isFinite(target) || target < 0) return;
  const suffix = counter.dataset.suffix || '';
  const show = value => { counter.textContent = value.toLocaleString('en-US') + suffix; };
  if (prefersReducedMotion) { show(target); return; }
  const duration = 1600;
  let started;
  function tick(now) {
    if (prefersReducedMotion || document.documentElement.classList.contains("motion-paused")) { show(target); return; }
    if (started === undefined) started = now;
    const progress = Math.min((now - started) / duration, 1);
    show(Math.round(target * (1 - Math.pow(1 - progress, 3))));
    if (progress < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}
if ('IntersectionObserver' in window && !prefersReducedMotion) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) { animateCounter(entry.target); observer.unobserve(entry.target); }
    });
  }, { threshold: 0.4 });
  counters.forEach(counter => counterObserver.observe(counter));
} // Final totals remain visible without JavaScript, motion, or observer support.

const carousel = document.querySelector('.client-carousel');
if (carousel) {
  const track = carousel.querySelector('.client-track');
  const cards = Array.from(track.children);
  const dots = carousel.querySelector('.carousel-dots');
  const pauseButton = carousel.querySelector('.carousel-pause');
  const status = carousel.querySelector('.carousel-status');
  let index = 0;
  let paused = prefersReducedMotion;
  let hovered = false;
  let focused = false;
  let timer;
  const maxScroll = () => Math.max(0, track.scrollWidth - track.clientWidth);
  const position = card => Math.min(maxScroll(), card.offsetLeft - cards[0].offsetLeft);
  function updateDots() {
    dots.querySelectorAll('button').forEach((dot, i) => dot.setAttribute('aria-current', String(i === index)));
  }
  function goTo(next, announce = true) {
    index = (next + cards.length) % cards.length;
    track.scrollTo({ left: position(cards[index]), behavior: prefersReducedMotion ? 'instant' : 'smooth' });
    updateDots();
    if (announce) status.textContent = `Client ${index + 1} of ${cards.length}`;
  }
  function refreshRotation() {
    clearInterval(timer);
    if (!paused && !hovered && !focused && !document.hidden && !document.documentElement.classList.contains('motion-paused')) {
      timer = setInterval(() => {
        let next = index + 1;
        while (next < cards.length && position(cards[next]) <= track.scrollLeft + 2) next++;
        goTo(next < cards.length ? next : 0, false);
      }, 4500);
    }
  }
  carousel.querySelector('.carousel-controls').hidden = false;
  dots.hidden = false;
  cards.forEach((card, i) => {
    const dot = document.createElement('button');
    dot.type = 'button'; dot.className = 'carousel-dot';
    dot.setAttribute('aria-label', `Show client ${i + 1}`);
    dot.setAttribute('aria-controls', 'client-track');
    dot.addEventListener('click', () => { goTo(i); refreshRotation(); });
    dots.append(dot);
  });
  carousel.querySelectorAll('[data-direction]').forEach(button => {
    button.addEventListener('click', () => { goTo(index + Number(button.dataset.direction)); refreshRotation(); });
  });
  function setPauseLabel() {
    pauseButton.textContent = paused ? 'Start rotation' : 'Pause rotation';
    pauseButton.setAttribute('aria-pressed', String(paused));
  }
  pauseButton.addEventListener('click', () => { paused = !paused; setPauseLabel(); refreshRotation(); });
  carousel.addEventListener('mouseenter', () => { hovered = true; refreshRotation(); });
  carousel.addEventListener('mouseleave', () => { hovered = false; refreshRotation(); });
  carousel.addEventListener('focusin', () => { focused = true; refreshRotation(); });
  carousel.addEventListener('focusout', event => { focused = carousel.contains(event.relatedTarget); refreshRotation(); });
  track.addEventListener('keydown', event => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault(); goTo(index + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });
  track.addEventListener('pointerdown', () => { paused = true; setPauseLabel(); refreshRotation(); });
  track.addEventListener('scroll', () => {
    let nearest = index;
    cards.forEach((card, i) => {
      if (Math.abs(position(card) - track.scrollLeft) < Math.abs(position(cards[nearest]) - track.scrollLeft) - 1) nearest = i;
    });
    index = nearest; updateDots();
  }, { passive: true });
  window.addEventListener('resize', () => goTo(index, false));
  document.addEventListener('visibilitychange', refreshRotation);
  window.addEventListener('firm:motionchange', refreshRotation);
  motionPreference.addEventListener('change', event => {
    if (event.matches) paused = true;
    setPauseLabel(); refreshRotation();
  });
  setPauseLabel(); updateDots(); refreshRotation();
}

// Motion can be stopped without hiding content or disabling navigation.
const motionButton = document.querySelector('.motion-toggle');
function syncMotionPreference() {
  prefersReducedMotion = motionPreference.matches;
  if (prefersReducedMotion) {
    document.documentElement.classList.add('motion-paused');
    document.querySelectorAll('.reveal').forEach(item => item.classList.add('is-visible'));
  }
  if (motionButton) {
    const paused = document.documentElement.classList.contains('motion-paused');
    motionButton.textContent = paused ? 'Animations paused' : 'Pause animations';
    motionButton.setAttribute('aria-pressed', String(paused));
    motionButton.disabled = prefersReducedMotion;
  }
  window.dispatchEvent(new Event('firm:motionchange'));
}
if (motionButton) {
  motionButton.hidden = false;
  motionButton.addEventListener('click', () => {
    const paused = document.documentElement.classList.toggle('motion-paused');
    motionButton.textContent = paused ? 'Resume animations' : 'Pause animations';
    motionButton.setAttribute('aria-pressed', String(paused));
    window.dispatchEvent(new Event('firm:motionchange'));
  });
}
motionPreference.addEventListener('change', syncMotionPreference);
syncMotionPreference();

const header = document.querySelector('.site-header');
const progress = document.querySelector('.reading-progress');
const heroArt = document.querySelector('.hero-art');
let scrollPending = false;
function updateScrollEffects() {
  scrollPending = false;
  const position = window.scrollY;
  const available = document.documentElement.scrollHeight - window.innerHeight;
  if (progress) progress.style.setProperty('--read-progress', String(available > 0 ? Math.min(position / available, 1) : 0));
  if (header) header.classList.toggle('is-scrolled', position > 30);
  if (heroArt) {
    const shift = prefersReducedMotion || document.documentElement.classList.contains('motion-paused') ? 0 : Math.min(position * 0.06, 26);
    heroArt.style.setProperty('--art-shift', `${shift}px`);
  }
}
window.addEventListener('scroll', () => {
  if (!scrollPending) { scrollPending = true; requestAnimationFrame(updateScrollEffects); }
}, { passive: true });
window.addEventListener('resize', updateScrollEffects);
window.addEventListener('firm:motionchange', updateScrollEffects);
updateScrollEffects();

// A small card tilt and pointer glow apply only to mouse/trackpad users.
const canTilt = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
if (canTilt) {
  document.querySelectorAll('[data-tilt]').forEach(card => {
    let pointerFrame;
    card.addEventListener('pointermove', event => {
      if (prefersReducedMotion || document.documentElement.classList.contains('motion-paused')) return;
      cancelAnimationFrame(pointerFrame);
      pointerFrame = requestAnimationFrame(() => {
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        card.style.setProperty('--tilt-x', `${(0.5 - y) * 4}deg`);
        card.style.setProperty('--tilt-y', `${(x - 0.5) * 4}deg`);
        card.style.setProperty('--spot-x', `${x * 100}%`);
        card.style.setProperty('--spot-y', `${y * 100}%`);
      });
    });
    card.addEventListener('pointerleave', () => {
      cancelAnimationFrame(pointerFrame);
      ['--tilt-x', '--tilt-y', '--spot-x', '--spot-y'].forEach(property => card.style.removeProperty(property));
    });
  });
}

// Mark the visible section in the sticky navigation.
if (navigation && 'IntersectionObserver' in window) {
  const sectionLinks = Array.from(navigation.querySelectorAll('a[href^="#"]'));
  const sectionObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) return;
    const id = visible[0].target.id;
    sectionLinks.forEach(link => {
      if (link.getAttribute('href') === `#${id}`) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }, { rootMargin: '-100px 0px -40% 0px', threshold: [0, 0.2, 0.5] });
  sectionLinks.forEach(link => {
    const section = document.querySelector(link.getAttribute('href'));
    if (section) sectionObserver.observe(section);
  });
}
