/*!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/jquery-touchclick
Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:
The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['jquery'], factory);
    } else {
        // Browser globals
        factory(jQuery);
    }
}(function ($) {
    var activeClass = "touchactive",
        touchstart,
        touchmove,
        touchend,
        timestamp;

    getTouchclickEl = function (target) {
        var $targetEl = $(target),
            $touchclickEl = $targetEl.closest("*[data-touchclick='true']");

        if ($touchclickEl.length) {
            return $touchclickEl;
        }

        return $targetEl;
    };

    timestamp = function () {
        return Math.round((new Date()).getTime() / 1000);
    };

    touchstart = function (e) {
        var $touchclickEl = getTouchclickEl(e.target),
            currentTimestamp = timestamp(),
            lastTimestamp = $touchclickEl.data("touchclick-last-touch"),
            difference = currentTimestamp - lastTimestamp;

        if (lastTimestamp && difference < 3 && e.type === "mousedown") {
            $touchclickEl.data("touchclick-disabled", true);
        } else {
            $touchclickEl.data("touchclick-disabled", false);
            $touchclickEl.addClass(activeClass);
        }

        if (e.type === "touchstart" || e.type === "MSPointerDown") {
            $touchclickEl.data("touchclick-last-touch", currentTimestamp);
        }
    };

    touchmove = function (e) {
        var $touchclickEl = getTouchclickEl(e.target);

        $touchclickEl.data("touchclick-disabled", true);
        $touchclickEl.removeClass(activeClass);
    };

    touchend = function (e) {
        var $touchclickEl = getTouchclickEl(e.target);

        if (!$touchclickEl.data("touchclick-disabled")) {
            e.type = "touchclick";
            $.event.dispatch.call(this, e);
        }

        $touchclickEl.data("touchclick-disabled", false);
        $touchclickEl.removeClass(activeClass);
    };

    $.event.special.touchclick = {
        setup: function () {
            var $el = $(this);

            if (window.navigator.msPointerEnabled) {
                $el.on("MSPointerDown", touchstart);
                $el.on("MSPointerUp", touchend);
            } else {
                $el.on("touchstart mousedown", touchstart);
                $el.on("touchmove mouseout", touchmove);
                $el.on("touchend mouseup", touchend);
            }
        },

        teardown: function () {
            var $el = $(this);

            if (window.navigator.msPointerEnabled) {
                $el.off("MSPointerDown", touchstart);
                $el.off("MSPointerUp", touchend);
            } else {
                $el.off("touchstart mousedown", touchstart);
                $el.off("touchmove mouseout", touchmove);
                $el.off("touchend mouseup", touchend);
            }
        }
    };
}));
