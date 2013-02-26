(function ($) {
    var activeClass = "touchactive",
        touchstart,
        touchmove,
        touchend;

    touchstart = function (e) {
        var $targetEl = $(e.target);

        $targetEl.data("touchclick-moved", false);
        $targetEl.addClass(activeClass);
    };

    touchmove = function (e) {
        var $targetEl = $(e.target);

        $targetEl.data("touchclick-moved", true);
        $targetEl.removeClass(activeClass);
    };

    touchend = function (e) {
        var $targetEl = $(e.target);

        if (!$targetEl.data("touchclick-moved")) {
            e.type = "touchclick";
            $.event.dispatch.call(this, e);
        }

        $targetEl.removeClass(activeClass);
    };

    $.event.special.touchclick = {
        setup: function () {
            var $el = $(this);

            if (typeof window.ontouchstart !== "undefined") {
                $el.on("touchstart", touchstart);
                $el.on("touchmove", touchmove);
                $el.on("touchend", touchend);
            } else {
                $el.on("mousedown", touchstart);
                $el.on("mouseup", touchend);

                if (!window.navigator.msPointerEnabled) {
                    $el.on("mousemove", touchmove);
                }
            }
        },

        teardown: function () {
            var $el = $(this);

            if (typeof window.ontouchstart !== "undefined") {
                $el.off("touchstart", touchstart);
                $el.off("touchmove", touchmove);
                $el.off("touchend", touchend);
            } else {
                $el.off("mousedown", touchstart);
                $el.off("mouseup", touchend);

                if (!window.navigator.msPointerEnabled) {
                    $el.off("mousemove", touchmove);
                }
            }
        }
    };
})(jQuery);
