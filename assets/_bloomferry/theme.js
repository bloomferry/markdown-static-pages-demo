
(() => {
  const picker = document.getElementById('bf-theme-choice');
  const options = Array.from(picker.querySelectorAll('input'));
  let mode = 'system';
  const key = 'bf-markdown-theme:' + new URL('../../', document.currentScript.src).pathname;
  const apply = (mode) => {
    if (mode === 'light' || mode === 'dark') document.documentElement.dataset.bfTheme = mode;
    else delete document.documentElement.dataset.bfTheme;
  };
  try { mode = localStorage.getItem(key) || mode; } catch {}
  const selected = options.find((option) => option.value === mode) || options[0];
  selected.checked = true;
  apply(selected.value);
  picker.addEventListener('change', (event) => {
    apply(event.target.value);
    try { localStorage.setItem(key, event.target.value); } catch {}
  });
  picker.hidden = false;
})();
