(() => {
  const button = document.querySelector('.back-to-top');
  const update = () => { button.hidden = window.scrollY <= window.innerHeight; };
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  window.addEventListener('pageshow', update);
  update();
})();
