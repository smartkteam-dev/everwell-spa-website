const currentPage = window.location.pathname.split('/').pop() || 'index.html';
const massagePages = new Set([
  'massage-bellevue.html',
  'swedish-massage.html',
  'deep-tissue-massage.html',
  'pain-relief-massage.html',
]);

const isCurrent = (page) => currentPage === page ? ' aria-current="page"' : '';
const siteNav = document.querySelector('.site-nav');
const menuToggle = document.querySelector('.menu-toggle');

if (siteNav) {
  const bookingLink = siteNav.querySelector('.nav-book');
  const bookingHref = bookingLink?.href || 'https://book.squareup.com/';
  const visitHref = currentPage === 'index.html' ? '#visit' : 'index.html#visit';

  siteNav.innerHTML = `
    <a href="index.html"${isCurrent('index.html')}>Home</a>
    <div class="nav-dropdown">
      <a class="nav-parent" href="massage-bellevue.html" aria-haspopup="true" aria-expanded="false"${massagePages.has(currentPage) ? ' data-section-current="true"' : ''}>Massage <span class="nav-chevron" aria-hidden="true">⌄</span></a>
      <div class="dropdown-menu">
        <a href="massage-bellevue.html"${isCurrent('massage-bellevue.html')}>Massage overview</a>
        <a href="swedish-massage.html"${isCurrent('swedish-massage.html')}>Swedish Massage</a>
        <a href="deep-tissue-massage.html"${isCurrent('deep-tissue-massage.html')}>Deep Tissue Massage</a>
        <a href="pain-relief-massage.html"${isCurrent('pain-relief-massage.html')}>Pain Relief Massage</a>
      </div>
    </div>
    <a href="facial.html"${isCurrent('facial.html')}>Facial</a>
    <a href="about-us.html"${isCurrent('about-us.html')}>About us</a>
    <a href="prices.html"${isCurrent('prices.html')}>Prices</a>
    <a href="${visitHref}">Visit us</a>
    <a class="nav-book" href="${bookingHref}" target="_blank" rel="noreferrer">Book online <span aria-hidden="true">↗</span></a>
  `;
}

const closeNavigation = () => {
  siteNav?.classList.remove('open');
  menuToggle?.setAttribute('aria-expanded', 'false');
  menuToggle?.setAttribute('aria-label', 'Open navigation');
  document.querySelectorAll('.nav-dropdown.open').forEach((dropdown) => dropdown.classList.remove('open'));
  document.querySelectorAll('.nav-parent[aria-expanded="true"]').forEach((parent) => parent.setAttribute('aria-expanded', 'false'));
};

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.nav-parent').forEach((parent) => {
  parent.addEventListener('click', (event) => {
    if (!window.matchMedia('(max-width: 800px)').matches) return;
    event.preventDefault();
    const dropdown = parent.closest('.nav-dropdown');
    const isOpen = dropdown.classList.toggle('open');
    parent.setAttribute('aria-expanded', String(isOpen));
  });
});

document.querySelectorAll('.site-nav a:not(.nav-parent)').forEach((link) => link.addEventListener('click', closeNavigation));

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape') {
    closeNavigation();
    menuToggle?.focus();
  }
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.site-header')) closeNavigation();
});

const main = document.querySelector('main');
if (main) {
  main.id ||= 'main-content';
  const skipLink = document.createElement('a');
  skipLink.className = 'skip-link';
  skipLink.href = '#main-content';
  skipLink.textContent = 'Skip to main content';
  document.body.prepend(skipLink);
}

document.querySelectorAll('.brand-mark, .button span, .service-links b').forEach((element) => element.setAttribute('aria-hidden', 'true'));

document.querySelectorAll('.footer-right').forEach((footerNav) => {
  const visitHref = currentPage === 'index.html' ? '#visit' : 'index.html#visit';
  footerNav.innerHTML = `<a href="index.html">Home</a><a href="massage-bellevue.html">Massage</a><a href="facial.html">Facial</a><a href="about-us.html">About us</a><a href="prices.html">Prices</a><a href="${visitHref}">Visit us</a><a href="#top">Back to top</a>`;
});

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
} else {
  document.querySelectorAll('.reveal').forEach((element) => element.classList.add('visible'));
}
