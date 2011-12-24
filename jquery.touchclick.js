jQuery.event.special.touchclick = {
	setup: function (data, namespaces) {
	var elem = this, $elem = jQuery(elem);
	
	if (window.Touch) {
			$elem.bind('touchstart', jQuery.event.special.touchclick.onTouchStart);
			$elem.bind('touchmove', jQuery.event.special.touchclick.onTouchMove);
			$elem.bind('touchend', jQuery.event.special.touchclick.onTouchEnd);
		} else {
			$elem.bind('click', jQuery.event.special.touchclick.click);
		}
	},
	
	click: function (event) {
		event.type = "touchclick";
		jQuery.event.handle.apply(this, arguments);
	},
	
	teardown: function (namespaces) {
		if (window.Touch) {
			$elem.unbind('touchstart', jQuery.event.special.touchclick.onTouchStart);
			$elem.unbind('touchmove', jQuery.event.special.touchclick.onTouchMove);
			$elem.unbind('touchend', jQuery.event.special.touchclick.onTouchEnd);
		} else {
			$elem.unbind('click', jQuery.event.special.touchclick.click);
		}
	},
	
	onTouchStart: function (e) {
		this.moved = false;
		$(this).addClass('touchstart');
	},
	
	onTouchMove: function (e) {
		this.moved = true;
	},
	
	onTouchEnd: function (event) {
		if (!this.moved) {
			event.type = "touchclick";
			jQuery.event.handle.apply(this, arguments)
		}
		
		$(this).removeClass('touchstart');
	}
};