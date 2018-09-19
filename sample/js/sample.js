$(function () {

  // Define here the elements and the positions will
  // take for each breakpoint. False means original position.
  new DOMElementRelocation(
    {
      elements: [
        {
          $element: '.search-form',
          mob: '.region-sidebar-left'
        }
      ]
    });

});