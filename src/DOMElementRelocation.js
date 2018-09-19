class DOMElementRelocation {

  constructor(conf) {

    // Some defaults.
    this.opts = {
      breakpoints: {
        desk: '(min-width: 1230px)',
        tab: '(min-width: 768px) and (max-width: 1229px)',
        mob: '(min-width: 0px) and (max-width: 767px)'
      },
      elements: [],
      ...conf
    };

    this.$win = $(window);

    this._registerElements();
    this._registerBreakpoints();
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
      self.$win.on('mq.' + v, function (e) {
        self._bulkRelocate(v);
      });
    });


    // $.each(relocatable, function (i, item) {
    //   relocate(item.$element, item['desk'], 'top')
    // });
    //

  }

  /**
   * Register breakpoints to mediaQueryEvents.
   *
   * @private
   */
  _registerBreakpoints() {
    // Register breakpoints.
    this.$win.mediaQueryEvents({
      breakpoints: this.opts.breakpoints
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
    console.log('reubicando');
    const self = this;

    Object.entries(self.opts.elements).map(element => {
      self._relocate(element.$element, element[breakpoint], pos)
    });

  }

  /**
   * Moves a DOM element to a new location.
   *
   * @param $el
   * @param $target
   * @param position
   *
   * @private
   */
  _relocate($el, $target, position) {
    const self = this;

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
}


// Expose the class to window.
window.DOMElementRelocation = DOMElementRelocation;