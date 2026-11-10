
(() => {
  const picker = document.getElementById('bf-theme-choice');
  const key = 'bf-markdown-theme:' + new URL('../../', document.currentScript.src).pathname;
  const apply = (mode) => {
    if (mode === 'light' || mode === 'dark') document.documentElement.dataset.bfTheme = mode;
    else delete document.documentElement.dataset.bfTheme;
  };
  try { picker.value = localStorage.getItem(key) || 'system'; } catch {}
  if (!picker.value) picker.value = 'system';
  apply(picker.value);
  picker.addEventListener('change', () => {
    apply(picker.value);
    try { localStorage.setItem(key, picker.value); } catch {}
  });
  picker.closest('label').hidden = false;
})();
