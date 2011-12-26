jQuery.event.special.touchclick = {
	setup: function (data, namespaces) {
	var elem = this, $elem = jQuery(elem);
	
	/* Android's horrificly bad browser does not support window.Touch so we'll resort to UA sniffing */
	var ua = navigator.userAgent.toLowerCase();
	var isAndroid = ua.indexOf("android") > -1;
	
	if (window.Touch || isAndroid) {
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
		
		$(this).addClass('touchactive');
	},
	
	onTouchMove: function (e) {
		this.moved = true;
		
		$(this).removeClass('touchactive');
	},
	
	onTouchEnd: function (event) {
		if (!this.moved) {
			event.type = "touchclick";
			jQuery.event.handle.apply(this, arguments)
		}
		
		$(this).removeClass('touchactive');
	}
};