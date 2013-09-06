/*!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/touchclick
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function(factory) {
  var e;
  try {
    return factory(require("jquery"));
  } catch (_error) {
    e = _error;
    return factory(jQuery);
  }
})(function($) {
  var activeClass, events, getTouchclickEl, touchend, touchmove, touchstart;
  activeClass = "touchactive";
  getTouchclickEl = function(target) {
    var $targetEl, $touchclickEl;
    $targetEl = $(target);
    $touchclickEl = $targetEl.closest("*[data-touchclick='true']");
    if ($touchclickEl.length) {
      return $touchclickEl;
    } else {
      return $targetEl;
    }
  };
  touchstart = function(e) {
    var $touchclickEl, currentTimestamp, difference, lastTimestamp;
    $touchclickEl = getTouchclickEl(e.target);
    currentTimestamp = Math.round((new Date()).getTime() / 1000);
    lastTimestamp = $touchclickEl.data("touchclick-last-touch");
    difference = currentTimestamp - lastTimestamp;
    if (lastTimestamp && difference < 3 && e.type === "mousedown") {
      $touchclickEl.data("touchclick-disabled", true);
    } else {
      $touchclickEl.data("touchclick-disabled", false);
      $touchclickEl.addClass(activeClass);
    }
    if (e.type === "touchstart" || e.type === "MSPointerDown") {
      return $touchclickEl.data("touchclick-last-touch", currentTimestamp);
    }
  };
  touchmove = function(e) {
    var $touchclickEl;
    $touchclickEl = getTouchclickEl(e.target);
    $touchclickEl.data("touchclick-disabled", true);
    return $touchclickEl.removeClass(activeClass);
  };
  touchend = function(e) {
    var $touchclickEl;
    $touchclickEl = getTouchclickEl(e.target);
    if (!$touchclickEl.data("touchclick-disabled")) {
      e.type = "touchclick";
      $.event.dispatch.call(this, e);
    }
    $touchclickEl.data("touchclick-disabled", false);
    return $touchclickEl.removeClass(activeClass);
  };
  events = function(type) {
    var $el;
    $el = $(this);
    if (window.navigator.msPointerEnabled) {
      $el[type]("MSPointerDown", touchstart);
      return $el[type]("MSPointerUp", touchend);
    } else {
      $el[type]("touchstart mousedown", touchstart);
      $el[type]("touchmove mouseout", touchmove);
      return $el[type]("touchend mouseup", touchend);
    }
  };
  return $.event.special.touchclick = {
    setup: function() {
      return events.call(this, "on");
    },
    teardown: function() {
      return events.call(this, "off");
    }
  };
});
