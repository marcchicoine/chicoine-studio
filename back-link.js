// Link from a case study back to the Experience Design gallery.
// Turns the header title into "← Title"; pages without a header get a small fixed link instead.
(function () {
  var style = document.createElement('style');
  style.textContent =
    'a.back-link{color:inherit;text-decoration:none;cursor:pointer;padding:0}' +
    'a.back-link:hover{text-decoration:underline}' +
    'a.back-link--floating{position:fixed;top:16px;left:16px;z-index:9999;padding:8px 14px;border-radius:200px;' +
    'background:rgba(0,0,0,.55);color:#fff;font:600 14px/1 sans-serif}';
  document.head.appendChild(style);

  var link = document.createElement('a');
  link.href = 'design.html';
  link.className = 'back-link';
  link.setAttribute('aria-label', 'Back to Experience Design');

  var title = document.querySelector('header h1');
  if (title) {
    link.textContent = '← ' + title.textContent.trim();
    title.textContent = '';
    title.appendChild(link);
  } else {
    link.textContent = '← Experience Design';
    link.classList.add('back-link--floating');
    document.body.appendChild(link);
  }
})();
