touchclick
==================

This is a small jQuery plugin to enable binding to either the touch events or the click event depending on what's available for the given platform.

On most platforms the browser waits up to 500ms before it actually triggers the 'click' event. This intentional delay was intended to provide time to decide if the dblclick event should be triggered. Unfortunately this creates a noticeable lag on touch screen devices.

This issue is typically resolved by binding to the touchstart or touchend events. However if you bind to the touchstart event it can create problems when users try to swipe to scroll. If you only bind to the touchend event it will still feel laggy due to the lack of *immediate* visual feedback native apps typically provide.

This plugin aims to alleviate these problems by providing immediate *visual* feedback on touchstart, and taking action only on touchend.

Instructions
-------------

1. Define a .touchactive style for the element that will be applied immediately when the user touches the screen
2. (Optional) For delegated events add data-touchclick="true" to the element you want the touchactive class to be added to
3. Listen for the "touchclick" event where you would normally listen for "click" or "touchend"

Derek Petersen

[Google+](https://plus.google.com/118244156822447731503) | [Twitter](http://twitter.com/tuxracer)
