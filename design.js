$(function () {
  var $items = $('.grid-item');

  function applyFilter(selector) {
    $items.each(function () {
      var show = selector === '*' || $(this).is(selector);
      $(this).toggleClass('hide', !show);
    });
  }

  // Default to UX/UI on load
  applyFilter('.propertySponge');
  $('.filter .current').removeClass('current');
  $('.filter a[data-filter=".propertySponge"]').addClass('current');

  $('.filter a').on('click', function (e) {
    e.preventDefault();
    $('.filter .current').removeClass('current');
    $(this).addClass('current');
    applyFilter($(this).data('filter') || '*');
  });
});
