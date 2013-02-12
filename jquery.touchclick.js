(function ($) {
    $.event.special.touchclick = {
        setup: function () {
            if (typeof window.ontouchstart !== "undefined") {
                $(this).on('touchstart', $.event.special.touchclick.touchstart);
                $(this).on('touchmove', $.event.special.touchclick.touchmove);
                $(this).on('touchend', $.event.special.touchclick.touchend);
            } else {
                $(this).on("click", $.event.special.touchclick.click);
            }
        },

        click: function (event) {
            event.type = "touchclick";
            $(this).trigger(event.type, arguments);
        },

        teardown: function () {
            if (typeof window.ontouchstart !== "undefined") {
                $(this).off("touchstart", $.event.special.touchclick.touchstart);
                $(this).off("touchmove", $.event.special.touchclick.touchmove);
                $(this).off("touchend", $.event.special.touchclick.touchend);
            } else {
                $(this).off("click", $.event.special.touchclick.click);
            }
        },

        touchstart: function () {
            this.moved = false;
            $(this).addClass("touchactive");
        },

        touchmove: function () {
            this.moved = true;
            $(this).removeClass("touchactive");
        },

        touchend: function (event) {
            if (!this.moved) {
                $.event.special.touchclick.click.apply(this, arguments);
            }
            $(this).removeClass("touchactive");
        }
    };
})(jQuery);