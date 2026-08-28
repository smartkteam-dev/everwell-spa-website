const menuToggle = document.querySelector('.menu-toggle');
const siteNav = document.querySelector('.site-nav');

if (siteNav && !siteNav.querySelector('a[href="prices.html"]')) {
  const pricesLink = document.createElement('a');
  pricesLink.href = 'prices.html';
  pricesLink.textContent = 'Prices';
  const bookingLink = siteNav.querySelector('.nav-book');
  if (bookingLink) siteNav.insertBefore(pricesLink, bookingLink);
  else siteNav.append(pricesLink);
}

if (siteNav && !siteNav.querySelector(':scope > a[href="index.html"]')) {
  const homeLink = document.createElement('a');
  homeLink.href = 'index.html';
  homeLink.textContent = 'Home';
  siteNav.prepend(homeLink);
}

const massageLink = siteNav?.querySelector(':scope > a[href="massage-bellevue.html"]');
if (massageLink) {
  const dropdown = document.createElement('div');
  dropdown.className = 'nav-dropdown';
  dropdown.innerHTML = `<a class="nav-parent" href="massage-bellevue.html" aria-haspopup="true" aria-expanded="false">Massage <span class="nav-chevron">⌄</span></a><div class="dropdown-menu"><a href="massage-bellevue.html">Massage home</a><a href="swedish-massage.html">Swedish Massage</a><a href="deep-tissue-massage.html">Deep Tissue Massage</a><a href="pain-relief-massage.html">Pain Relief Massage</a></div>`;
  massageLink.replaceWith(dropdown);
}

document.querySelectorAll('.nav-parent').forEach((parent) => {
  parent.addEventListener('click', (event) => {
    if (window.matchMedia('(max-width: 800px)').matches) {
      event.preventDefault();
      const dropdown = parent.closest('.nav-dropdown');
      const isOpen = dropdown.classList.toggle('open');
      parent.setAttribute('aria-expanded', String(isOpen));
    }
  });
});

document.querySelectorAll('.dropdown-menu a').forEach((link) => {
  if (/lomi|lymphatic|massage home/i.test(link.textContent)) link.remove();
});

menuToggle?.addEventListener('click', () => {
  const isOpen = siteNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});

document.querySelectorAll('.site-nav a').forEach((link) => {
  link.addEventListener('click', () => {
    siteNav.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    menuToggle?.setAttribute('aria-label', 'Open navigation');
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));
