(() => {
  const accessKey = 'portfolio-access';
  let granted = false;
  try { granted = sessionStorage.getItem(accessKey) === 'granted'; } catch {}
  if (granted) return;
  document.documentElement.classList.add('site-locked');
  document.addEventListener('DOMContentLoaded', () => {
    const gate = document.createElement('div');
    gate.innerHTML = "  <div class=\"site-password-gate\" role=\"dialog\" aria-modal=\"true\" aria-labelledby=\"site-password-title\">\n    <form class=\"site-password-gate__card\" id=\"site-password-form\">\n      <p class=\"site-password-gate__eyebrow\">Protected portfolio</p>\n      <h2 class=\"site-password-gate__title\" id=\"site-password-title\">Enter password</h2>\n      <p class=\"site-password-gate__copy\">Please enter the password to explore my portfolio.</p>\n      <label class=\"site-password-gate__label\" for=\"site-password-input\">Password</label>\n      <input class=\"site-password-gate__input\" id=\"site-password-input\" name=\"password\" type=\"password\" autocomplete=\"current-password\" required>\n      <p class=\"site-password-gate__error\" id=\"site-password-error\" aria-live=\"polite\"></p>\n      <button class=\"site-password-gate__button\" type=\"submit\">View portfolio</button>\n    </form>\n  </div>";
    const dialog = gate.firstElementChild;
    const content = [...document.body.children];
    const previousInert = content.map(element => element.inert);
    content.forEach(element => { element.inert = true; });
    document.body.append(dialog);
    const form = dialog.querySelector('form');
    const input = dialog.querySelector('input');
    const error = dialog.querySelector('[aria-live]');
    input.setAttribute('aria-describedby', 'site-password-error');
    input.focus();
    form.addEventListener('submit', event => {
      event.preventDefault();
      if (input.value === '1979') {
        try { sessionStorage.setItem(accessKey, 'granted'); } catch {}
        content.forEach((element, index) => { element.inert = previousInert[index]; });
        document.documentElement.classList.remove('site-locked');
        dialog.remove();
        document.querySelector('a, button, input')?.focus({ preventScroll: true });
        return;
      }
      error.textContent = 'Incorrect password. Please try again.';
      input.value = '';
      input.setAttribute('aria-invalid', 'true');
      input.focus();
    });
    input.addEventListener('input', () => {
      input.removeAttribute('aria-invalid');
      error.textContent = '';
    });
    dialog.addEventListener('keydown', event => {
      if (event.key !== 'Tab') return;
      const button = form.querySelector('button');
      if (event.shiftKey && document.activeElement === input) {
        event.preventDefault(); button.focus();
      } else if (!event.shiftKey && document.activeElement === button) {
        event.preventDefault(); input.focus();
      }
    });
  });
})();
