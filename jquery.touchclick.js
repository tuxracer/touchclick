(function ($) {
    $.event.special.touchclick = {
        setup: function () {
            var $el = $(this);

            if (typeof window.ontouchstart !== "undefined") {
                $el.on("touchstart", $.event.special.touchclick.touchstart);
                $el.on("touchmove", $.event.special.touchclick.touchmove);
                $el.on("touchend", $.event.special.touchclick.touchend);
            } else {
                $el.on("mousedown", $.event.special.touchclick.touchstart);
                $el.on("mouseup", $.event.special.touchclick.touchend);

                if (!window.navigator.msPointerEnabled) {
                    $el.on("mousemove", $.event.special.touchclick.touchmove);
                }
            }
        },

        click: function (event) {
            event.type = "touchclick";
            $(this).trigger(event.type, arguments);
        },

        teardown: function () {
            var $el = $(this);

            if (typeof window.ontouchstart !== "undefined") {
                $el.off("touchstart", $.event.special.touchclick.touchstart);
                $el.off("touchmove", $.event.special.touchclick.touchmove);
                $el.off("touchend", $.event.special.touchclick.touchend);
            } else {
                $el.off("mousedown", $.event.special.touchclick.touchstart);
                $el.off("mouseup", $.event.special.touchclick.touchend);

                if (!window.navigator.msPointerEnabled) {
                    $el.off("mousemove", $.event.special.touchclick.touchmove);
                }
            }
        },

        touchstart: function () {
            var $el = $(this);

            $el.data("touchclick-moved", false);
            $el.addClass("touchactive");
        },

        touchmove: function () {
            var $el = $(this);

            $el.data("touchclick-moved", true);
            $el.removeClass("touchactive");
        },

        touchend: function () {
            var $el = $(this);

            if (!$el.data("touchclick-moved")) {
                $.event.special.touchclick.click.apply(this, arguments);
            }
            $el.removeClass("touchactive");
        }
    };
})(jQuery);