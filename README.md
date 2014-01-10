touchclick
==================

This is a small jquery plugin that allows you to easily bind to the touch or click events depending on what's available for the given platform. Unlike similar scripts, this also provides *immediate* visual feedback on touch platforms -- just as native apps do.

## Getting Started

1. Bind to the **touchclick** event where you would have otherwise used click or touchend
```javascript
	$(".menu-btn").on("touchclick", function () {
		console.log("अनित्य");
	});
```

2. Define a **.touchactive** style for the given element
```css
	.menu.btn.touchactive {
		color: #eee;
		background-color: #333;
	}
```

3. (Optional) For delegated events add **data-touchclick="true"** to the elemnt you want the touchactive class to be added to.
```html
	<div class="menu btn" data-touchclick="true">Menu</div>
```

## Traditional Solutions
### Bind to touchend ###
Binding to touchend or using a script such as [fastclick](https://github.com/ftlabs/fastclick) will remove the delay for triggering the event. However, unlike touchclick, they do not provide immediate visual feedback as native apps do.

### Bind to touchend + provide a :hover style ###
Binding to touchend or using [fastclick](https://github.com/ftlabs/fastclick) will remove the delay and provide some visual feedback. However, unlike touchclick and most native apps, when the user removes their finger from the element the :hover style sticks. While subtle, this still leaves web apps with a somewhat laggy feel.


## License
Copyright (c) 2014, Derek Petersen

Licensed under the MIT license.

[Twitter](http://twitter.com/tuxracer) | [Google+](http://google.com/+DerekPetersen)
