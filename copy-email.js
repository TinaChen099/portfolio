(() => {
  const fallbackCopy = text => {
    const input = document.createElement('textarea');
    input.value = text;
    input.setAttribute('readonly', '');
    input.style.cssText = 'position:fixed;opacity:0;pointer-events:none;';
    const previousFocus = document.activeElement;
    document.body.append(input);
    try {
      input.select();
      if (!document.execCommand('copy')) throw new Error('Copy failed');
    } finally {
      input.remove();
      previousFocus?.focus({ preventScroll: true });
    }
  };
  document.querySelectorAll('.copy-email-button').forEach(button => {
    let resetTimer;
    button.addEventListener('click', async () => {
      const email = button.parentElement.querySelector('span').textContent.trim();
      const label = button.querySelector('.copy-email-label');
      clearTimeout(resetTimer);
      try {
        if (navigator.clipboard?.writeText) {
          try { await navigator.clipboard.writeText(email); }
          catch { fallbackCopy(email); }
        } else {
          fallbackCopy(email);
        }
        label.textContent = 'Copied!';
      } catch {
        label.textContent = 'Try again';
      }
      resetTimer = setTimeout(() => { label.textContent = 'Copy'; }, 2500);
    });
  });
})();
