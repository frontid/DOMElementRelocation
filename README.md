# DOMElementRelocation

Relocate DOM elements when the browser reaches a breakpoint.
Works both ways.

### When you need DOMElementRelocation?
When you need to relocate an element totally out of scope new location. For example moving a search form from the header at desktop to the footer at mobile.

[See the working example here.](https://frontid.github.io/DOMElementRelocation/)

![DOMElementRelocation working sample](https://github.com/frontid/DOMElementRelocation/blob/gh-pages/img/sample.gif "Sample")

# Usage

You need jQuery and mediaQueryEvents plugin.
 
```html
<script src="js/jquery.js"></script>
<script src="/js/mediaQueryEvents.jquery.js"></script>
<script src="../dist/DOMElementRelocation.js"></script>
```

And define the breakpoints and the element's behavior:

```javascript
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
          tab: ['.region-sidebar-left', 'bottom'],
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