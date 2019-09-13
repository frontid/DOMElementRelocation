(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var DOMElementRelocation = function () {
  function DOMElementRelocation(conf) {
    _classCallCheck(this, DOMElementRelocation);

    var self = this;

    self.$win = $(window);

    // Some defaults.
    self.opts = Object.assign({
      breakpoints: {
        desk: '(min-width: 1230px)',
        tab: '(min-width: 768px) and (max-width: 1229px)',
        mob: '(min-width: 0px) and (max-width: 767px)'
      },
      elements: []
    }, conf);

    self._registerElements();
    self._registerBreakpoints();
  }

  /**
   * Register elements to mediaQueryEvents event.
   *
   * @private
   */


  _createClass(DOMElementRelocation, [{
    key: '_registerElements',
    value: function () {
      function _registerElements() {
        var self = this;

        // Loop al defined breakpoints. Each time browser reaches one of them,
        // mediaQueryEvents will act and execute the new position of the
        // elements assigned to this breakpoint.
        Object.entries(this.opts.breakpoints).map(function (_ref) {
          var _ref2 = _slicedToArray(_ref, 2),
              k = _ref2[0],
              v = _ref2[1];

          self.$win.on('mq.' + k, function (e) {
            self._bulkRelocate(k);
          });
        });
      }

      return _registerElements;
    }()

    /**
     * Register breakpoints to mediaQueryEvents.
     *
     * @private
     */

  }, {
    key: '_registerBreakpoints',
    value: function () {
      function _registerBreakpoints() {
        var self = this;

        self.$win.mediaQueryEvents({
          breakpoints: self.opts.breakpoints
        });
      }

      return _registerBreakpoints;
    }()

    /**
     * Relocates a group of elements.
     * @param breakpoint
     * @param pos
     *
     * @private
     */

  }, {
    key: '_bulkRelocate',
    value: function () {
      function _bulkRelocate(breakpoint) {
        var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "top";

        var self = this;

        self.opts.elements.forEach(function (el) {
          self._relocate(el.element, el[breakpoint], pos);
        });
      }

      return _bulkRelocate;
    }()

    /**
     * Moves a DOM element to a new location.
     *
     * @param el
     * @param $target
     * @param position
     *
     * @private
     */

  }, {
    key: '_relocate',
    value: function () {
      function _relocate(el, $target, position) {
        var $el = $(el);

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
      }

      return _relocate;
    }()
  }]);

  return DOMElementRelocation;
}();

// Expose the class to window.


window.DOMElementRelocation = DOMElementRelocation;

},{}]},{},[1])//# sourceMappingURL=DOMElementRelocation.js.map
