# DOMElementRelocation

Relocate DOM elements when the browser reaches a breakpoint.
Works both ways.

See the working example here.

poner imagen de como funca por aca

#Usage

You need jQuery and mediaQueryEvents plugin.
 
```
<script src="js/jquery.js"></script>
<script src="/js/mediaQueryEvents.jquery.js"></script>
<script src="../dist/DOMElementRelocation.js"></script>
```

And define the breakpoints and the element's behavior:
```
$(function () {

  // Define here the elements and the positions will
  // take for each breakpoint. False means original position.
  new DOMElementRelocation(
    {
      breakpoints: {
        desk: '(min-width: 1230px)',
        tab: '(min-width: 768px) and (max-width: 1229px)',
        mob: '(min-width: 320px) and (max-width: 767px)',
        reallySmall: '(min-width: 0px) and (max-width: 319px)'
      },
      elements: [
        {
          element: '.search-form',
          reallySmall: '.sample-page > footer',
          mob: '.sample-page > .region-sidebar-right',
          tab: '.region-sidebar-left',
          desk: '.sample-page > header'
        },
        {
          element: '.logo',
          reallySmall: '.sample-page > footer',
          mob: false,
          tab: '.region-sidebar-left',
          desk: false,
        }
      ]
    });

});
```
On this example, there are 3 four breakpoints defined. They can have any name and the value must be a valid CSS media query.
And on the "elements" key we are setting up each element and the position it would take when a breakpoint is reached.