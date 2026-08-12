$(function () {
  // Isotope (default to UX/UI)
  var $grid = $('.grid').isotope({
    itemSelector: '.grid-item',
    filter: '.propertySponge', // <-- default filter on load
    masonry: {
      columnWidth: 180,
      fitWidth: true,
      gutter: 10
    }
  });

  // Ensure the correct tab is marked as current on load
  $('.filter .current').removeClass('current');
  $('.filter a[data-filter=".propertySponge"]').addClass('current');

  // Filter clicks
  $('.filter a').on('click', function (e) {
    e.preventDefault();
    $('.filter .current').removeClass('current');
    $(this).addClass('current');

    var selector = $(this).data('filter') || '*';
    $grid.isotope({ filter: selector }); // use arrange/update, not re-init
  });

  // Fancybox
  $('.fancybox').fancybox({
    helpers: { overlay: { locked: false } }
  });
});
