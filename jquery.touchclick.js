jQuery.event.special.tabOrClick = {
	setup: function (data, namespaces) {
	var elem = this, $elem = jQuery(elem);
	
	if (window.Touch) {
			$elem.bind('touchstart', jQuery.event.special.tabOrClick.onTouchStart);
			$elem.bind('touchmove', jQuery.event.special.tabOrClick.onTouchMove);
			$elem.bind('touchend', jQuery.event.special.tabOrClick.onTouchEnd);
		} else {
			$elem.bind('click', jQuery.event.special.tabOrClick.click);
		}
	},
	
	click: function (event) {
		event.type = "tabOrClick";
		jQuery.event.handle.apply(this, arguments);
	},
	
	teardown: function (namespaces) {
		if (window.Touch) {
			$elem.unbind('touchstart', jQuery.event.special.tabOrClick.onTouchStart);
			$elem.unbind('touchmove', jQuery.event.special.tabOrClick.onTouchMove);
			$elem.unbind('touchend', jQuery.event.special.tabOrClick.onTouchEnd);
		} else {
			$elem.unbind('click', jQuery.event.special.tabOrClick.click);
		}
	},
	
	onTouchStart: function (e) {
		this.moved = false;
	},
	
	onTouchMove: function (e) {
		this.moved = true;
	},
	
	onTouchEnd: function (event) {
		if (!this.moved) {
			event.type = "tabOrClick";
			jQuery.event.handle.apply(this, arguments)
		}
	}
};

// I'm including this unmodified version from Alexandre on http://stackoverflow.com/questions/2135037/adding-a-jquery-style-event-handler-of-iphone-os-events for reference in the commit history