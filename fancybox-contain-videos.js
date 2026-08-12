/* fancybox-video-fit-hook.js
   Make HTML5 videos fit inside the Fancybox window (no crop, no scroll).
   - Does not change your click handlers
   - Only runs when the opened slide actually contains a <video>
*/
(function ($) {
  if (!$ || !$.fancybox) return;

  // Inject minimal CSS scoped to a class we add on video slides
  var cssId = 'fbVideoFitCSS';
  if (!document.getElementById(cssId)) {
    var style = document.createElement('style');
    style.id = cssId;
    style.textContent = `
      /* Apply only to slides we tag as video-fit */
      .fb-video-fit { overflow: hidden !important; }
      .fb-video-fit .fancybox-content{
        /* cap to viewport; keep center; prevent scroll */
        max-width: 95vw !important;
        max-height: 95vh !important;
        display: flex !important;
        align-items: center !important;
        justify-content: center !important;
        overflow: hidden !important;
        background: #000; /* letterbox */
      }
      .fb-video-fit .fancybox-content video{
        /* height matches modal box; width scales to preserve aspect */
        height: 100% !important;
        max-height: 95vh !important;
        width: auto !important;
        max-width: 95vw !important;
        object-fit: contain !important;
        display: block !important;
      }
    `;
    document.head.appendChild(style);
  }

  // After a slide is shown, if it has a <video>, tag and size it
  $(document).on('afterShow.fb', function (e, instance, slide) {
    if (!slide || !slide.$content || !slide.$content.length) return;

    var $video = slide.$content.find('video').first();
    if (!$video.length) return; // images/GIFs skip all this

    // Tag the slide so our scoped CSS applies
    if (slide.$slide) slide.$slide.addClass('fb-video-fit');

    // Set inline fallbacks in case external CSS fights us
    slide.$content.css({
      maxWidth:  '95vw',
      maxHeight: '95vh',
      display:   'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow:  'hidden',
      background: '#000'
    });

    $video.css({
      height:    '100%',
      maxHeight: '95vh',
      width:     'auto',
      maxWidth:  '95vw',
      objectFit: 'contain',
      display:   'block'
    });

    // Ensure the slide itself never scrolls
    if (slide.$slide) slide.$slide.css({ overflow: 'hidden' });

    // Ask Fancybox to recalc sizes after our tweaks
    if (typeof instance.update === 'function') instance.update();
  });
})(window.jQuery);
