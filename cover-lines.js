// Animated outline rectangles from the cover page, fixed behind the content of the menu pages.
(function () {
  var green = [[800, 800, 800, 800, 24], [800, 800, 800, 800, 16], [800, 800, 800, 800, 16], [800, 400, 1200, 400, 16]];
  var white = [[600, 1200, 900, 800, 24], [400, 700, 800, 900, 16], [800, 800, 1200, 500, 16]];

  function rules(set, stroke, extraClass) {
    var html = '<div class="cover-lines__rules ' + extraClass + '">';
    set.forEach(function (r) {
      html += '<div><svg width="' + r[0] + '" height="' + r[1] + '" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">' +
        '<rect width="' + r[2] + '" height="' + r[3] + '" stroke="' + stroke + '" fill="transparent" stroke-width="' + r[4] + '" /></svg></div>';
    });
    return html + '</div>';
  }

  var wrap = document.createElement('div');
  wrap.className = 'cover-lines';
  wrap.setAttribute('aria-hidden', 'true');
  wrap.innerHTML = rules(green, '#83D79B', '') + rules(white, '#fff', 'cover-lines__rules--white');
  document.body.prepend(wrap);
})();
