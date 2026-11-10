
(() => {
  const data = JSON.parse(document.getElementById('bf-version-data').textContent);
  const form = document.getElementById('bf-version-form');
  const select = document.getElementById('bf-docs-version');
  const notice = document.getElementById('bf-version-notice');
  const assetURL = new URL(document.currentScript.src);
  const base = new URL(data.siteRoot, assetURL);
  const message = new URL(location.href).searchParams.get('docs-notice');
  if (message === 'heading' || message === 'page') {
    notice.textContent = message === 'heading'
      ? 'The heading is not available in this version. You are at the corresponding page.'
      : 'The page is not available in this version. You are at this version’s home.';
    notice.hidden = false;
    notice.focus();
  } else if (new URL(location.href).searchParams.get('docs-switched') === '1') {
    let target;
    try { target = document.getElementById(decodeURIComponent(location.hash.slice(1))); } catch {}
    target = target || document.querySelector('h1');
    if (target) { target.tabIndex = -1; target.focus(); }
  }
  form.hidden = false;
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    if (select.value === data.current) return;
    const target = data.versions.find(v => v.version === select.value);
    if (!target) return;
    const page = target.pages[data.source];
    const hash = location.hash;
    let fragment;
    try { fragment = decodeURIComponent(hash.slice(1)); } catch { fragment = null; }
    const destination = new URL('v/' + target.version + '/' + (page ? page.url : 'index.html'), base);
    destination.searchParams.set('docs-switched', '1');
    if (!page) destination.searchParams.set('docs-notice', 'page');
    else if (fragment && !page.anchors.includes(fragment)) destination.searchParams.set('docs-notice', 'heading');
    else destination.hash = hash;
    location.assign(destination.href);
  });
})();
