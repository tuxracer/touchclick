jQuery.event.special.touchclick = {
	setup: function (data, namespaces) {
		var elem = this,
		$elem = jQuery(elem);

		if (typeof window.ontouchstart !== "undefined") {
			$elem.on('touchstart', jQuery.event.special.touchclick.touchstart);
			$elem.on('touchmove', jQuery.event.special.touchclick.touchmove);
			$elem.on('touchend', jQuery.event.special.touchclick.touchend);
		} else {
			$elem.on("click", jQuery.event.special.touchclick.click);
		}
	},

	click: function (event) {
		event.type = "touchclick";
    $(this).trigger(event.type, arguments);
	},

	teardown: function (namespaces) {
		
		var elem = this,
		$elem = jQuery(elem);
		
		if (typeof window.ontouchstart !== "undefined") {
			$elem.off("touchstart", jQuery.event.special.touchclick.touchstart);
			$elem.off("touchmove", jQuery.event.special.touchclick.touchmove);
			$elem.off("touchend", jQuery.event.special.touchclick.touchend);
		} else {
			$elem.off("click", jQuery.event.special.touchclick.click);
		}
	},

	touchstart: function (event) {
		this.moved = false;
		$(this).addClass("touchactive");
	},

	touchmove: function (event) {
		this.moved = true;
		$(this).removeClass("touchactive");
	},

	touchend: function (event) {
		if (!this.moved) {
			event.type = "touchclick";
      $(this).trigger(event.type, arguments);
		}
		$(this).removeClass("touchactive");
	}
};
