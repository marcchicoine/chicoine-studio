$(function () {
  var $items = $('.grid-item');
  var $tabs = $('.filter a');

  function applyFilter(selector) {
    $items.each(function () {
      var show = selector === '*' || $(this).is(selector);
      $(this).toggleClass('hide', !show);
    });
  }

  function selectTab($tab) {
    $('.filter .current').removeClass('current');
    $tab.addClass('current');
    applyFilter($tab.data('filter') || '*');
  }

  // Open the tab named in the URL hash (e.g. design.html#web-development); default to UX/UI
  function selectTabFromHash() {
    var slug = window.location.hash.replace('#', '');
    var $match = $tabs.filter('[data-slug="' + slug + '"]');
    selectTab($match.length ? $match.first() : $tabs.filter('[data-filter=".propertySponge"]'));
  }
  selectTabFromHash();
  $(window).on('hashchange', selectTabFromHash);

  $tabs.on('click', function (e) {
    e.preventDefault();
    selectTab($(this));
    var newSlug = $(this).data('slug');
    if (newSlug && window.history.replaceState) {
      window.history.replaceState(null, '', '#' + newSlug);
    }
  });
});
