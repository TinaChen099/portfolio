(() => {
  const navbar = document.querySelector('.scroll-navbar');
  if (!navbar) return;
  const updateNavbar = () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 16);
  };
  window.addEventListener('scroll', updateNavbar, { passive: true });
  window.addEventListener('pageshow', updateNavbar);
  updateNavbar();
})();
