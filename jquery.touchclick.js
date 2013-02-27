(function ($) {
    var activeClass = "touchactive",
        touchstart,
        touchmove,
        touchend,
        timestamp;

    timestamp = function () {
        return Math.round((new Date()).getTime() / 1000);
    };

    touchstart = function (e) {
        var $targetEl = $(e.target),
            currentTimestamp = timestamp(),
            lastTimestamp = $targetEl.data("touchclick-last-touch"),
            difference = currentTimestamp - lastTimestamp;

        if (lastTimestamp && difference < 3 && e.type === "mousedown") {
            $targetEl.data("touchclick-disabled", true);
        } else {
            $targetEl.data("touchclick-disabled", false);
            $targetEl.addClass(activeClass);
        }

        if (e.type === "touchstart" || e.type === "MSPointerDown") {
            $targetEl.data("touchclick-last-touch", currentTimestamp);
        }
    };

    touchmove = function (e) {
        var $targetEl = $(e.target);

        $targetEl.data("touchclick-disabled", true);
        $targetEl.removeClass(activeClass);
    };

    touchend = function (e) {
        var $targetEl = $(e.target);

        if (!$targetEl.data("touchclick-disabled")) {
            e.type = "touchclick";
            $.event.dispatch.call(this, e);
        }

        $targetEl.data("touchclick-disabled", false);
        $targetEl.removeClass(activeClass);
    };

    $.event.special.touchclick = {
        setup: function () {
            var $el = $(this);

            if (window.navigator.msPointerEnabled) {
                $el.on("MSPointerDown", touchstart);
                $el.on("MSPointerUp", touchend);
            } else {
                $el.on("touchstart mousedown", touchstart);
                $el.on("touchmove mousemove", touchmove);
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
                $el.off("touchmove mousemove", touchmove);
                $el.off("touchend mouseup", touchend);
            }
        }
    };
})(jQuery);
