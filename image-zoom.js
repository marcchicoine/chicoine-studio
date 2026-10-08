// Click a case study image to view it full size; click anywhere or press Esc to close.
// Skips images inside links, headers, navs, and click-to-advance slideshows (.slides).
(function () {
  var style = document.createElement('style');
  style.textContent =
    'img.zoomable{cursor:zoom-in}' +
    '.image-zoom{position:fixed;inset:0;z-index:10000;display:flex;align-items:center;justify-content:center;' +
    'background:rgba(20,20,20,.88);cursor:zoom-out;opacity:0;transition:opacity .25s ease}' +
    '.image-zoom.is-open{opacity:1}' +
    '.image-zoom img{width:auto;height:auto;min-width:0;max-width:95vw;max-height:95vh;padding:0;margin:0;' +
    'object-fit:contain;transform:none;box-shadow:0 8px 40px rgba(0,0,0,.5);background:#fff}';
  document.head.appendChild(style);

  var images = document.querySelectorAll('img');
  images.forEach(function (img) {
    if (img.closest('a, header, nav, .slides')) return;
    img.classList.add('zoomable');
    img.addEventListener('click', function () { open(img); });
  });

  var overlay = null;

  function open(img) {
    overlay = document.createElement('div');
    overlay.className = 'image-zoom';
    overlay.setAttribute('role', 'dialog');
    overlay.setAttribute('aria-label', img.alt || 'Expanded image');
    var big = document.createElement('img');
    big.src = img.currentSrc || img.src;
    big.alt = img.alt;
    overlay.appendChild(big);
    overlay.addEventListener('click', close);
    document.body.appendChild(overlay);
    document.addEventListener('keydown', onKey);
    requestAnimationFrame(function () { overlay.classList.add('is-open'); });
  }

  function close() {
    if (!overlay) return;
    var el = overlay;
    overlay = null;
    document.removeEventListener('keydown', onKey);
    el.classList.remove('is-open');
    setTimeout(function () { el.remove(); }, 250);
  }

  function onKey(e) {
    if (e.key === 'Escape') close();
  }
})();
