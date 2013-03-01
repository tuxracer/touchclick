(function ($) {
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
})(jQuery);
