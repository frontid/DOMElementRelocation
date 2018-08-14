var $win = $(window);

/**
 * Moves a DOM element to a new location.
 *
 * @param $el
 * @param $target
 * @param position
 */
var relocate = function ($el, $target, position) {

  // First time we memorize the original position.
  if ($el.data('original-position') === undefined) {
    var $originalPosHolder = $('<div class="original-position-holder" />');
    $el.data('original-position', $originalPosHolder);
    $originalPosHolder.insertAfter($el);
  }

  if ($target === false) {
    var $orig = $el.data('original-position');
    $el.insertAfter($orig);
  }

  if (position === 'top') {
    $el.prependTo($target);
  } else {
    $el.appendTo($target);
  }

};

// Define here the elements and the positions will
// take for each breakpoint. False means original position.
var relocatable = [
  {
    $element: $('#views-exposed-form-general-search-page'),
    mob: $('.region.region-sidebar-left'),
    tab: false,
    desk: false
  }
];

// Listeners
// --------------------
$win.on('mq.mob', function (e) {
  $.each(relocatable, function (i, item) {
    relocate(item.$element, item['mob'], 'top')
  });
});

$win.on('mq.tab', function (e) {
  $.each(relocatable, function (i, item) {
    relocate(item.$element, item['tab'], 'top')
  });
});

$win.on('mq.desk', function (e) {
  $.each(relocatable, function (i, item) {
    relocate(item.$element, item['desk'], 'top')
  });
});

     // Init the plugin.
      $win.mediaQueryEvents({
        breakpoints: {
          desk: '(min-width: 1230px)',
          tab: '(min-width: 768px) and (max-width: 1229px)',
          mob: '(min-width: 0px) and (max-width: 767px)'
        }
      });
