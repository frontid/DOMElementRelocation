class DOMElementRelocation {

  constructor(conf) {
    const self = this;

    self.$win = $(window);

    // Some defaults.
    self.opts = {
      breakpoints: {
        desk: '(min-width: 1230px)',
        tab: '(min-width: 768px) and (max-width: 1229px)',
        mob: '(min-width: 0px) and (max-width: 767px)'
      },
      elements: [],
      ...conf
    };

    self._registerElements();
    self._registerBreakpoints();
  }


  /**
   * Register elements to mediaQueryEvents event.
   *
   * @private
   */
  _registerElements() {
    const self = this;

    // Loop al defined breakpoints. Each time browser reaches one of them,
    // mediaQueryEvents will act and execute the new position of the
    // elements assigned to this breakpoint.
    Object.entries(this.opts.breakpoints).map(([k, v]) => {
      self.$win.on('mq.' + k, function (e) {
        self._bulkRelocate(k);
      });
    });

  }

  /**
   * Register breakpoints to mediaQueryEvents.
   *
   * @private
   */
  _registerBreakpoints() {
    const self = this;

    self.$win.mediaQueryEvents({
      breakpoints: self.opts.breakpoints
    });
  }

  /**
   * Relocates a group of elements.
   * @param breakpoint
   * @param pos
   *
   * @private
   */
  _bulkRelocate(breakpoint, pos = "top") {
    const self = this;

    self.opts.elements.forEach(el => {
      self._relocate(el.element, el[breakpoint], pos);
    });

  }

  /**
   * Moves a DOM element to a new location.
   *
   * @param el
   * @param $target
   * @param position
   *
   * @private
   */
  _relocate(el, $target, position) {
    const $el = $(el);

    // First time we memorize the original position.
    if ($el.data('original-position') === undefined) {
      let $originalPosHolder = $('<div class="original-position-holder" />');
      $el.data('original-position', $originalPosHolder);
      $originalPosHolder.insertAfter($el);
    }

    if ($target === false) {
      let $orig = $el.data('original-position');
      $el.insertAfter($orig);
    }

    if (position === 'top') {
      $el.prependTo($target);
    } else {
      $el.appendTo($target);
    }

  };
}


// Expose the class to window.
window.DOMElementRelocation = DOMElementRelocation;