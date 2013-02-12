jQuery TouchClick
==================

This is a small jQuery plugin to enable binding to either the touch events or the click event depending on what's available for the given platform. This is based on the jQuery plugin provided by [Alexandre](http://stackoverflow.com/users/346368/alexandre) on [stackoverflow](http://stackoverflow.com/questions/2135037/adding-a-jquery-style-event-handler-of-iphone-os-events)

On most platforms the browser waits up to 500ms before it actually triggers the 'click' event. This intentional delay was intended to provide time to decide if the dblclick event should be triggered. Unfortunately this creates a noticeable lag on touch screen devices.

This issue is typically resolved by binding to the touchstart or touchend events. However if you bind to the touchstart event it can create problems when users try to swipe to scroll. If you only bind to the touchend event it will still feel laggy due to the lack of *immediate* visual feedback native apps typically provide.

This plugin aims to alleviate these problems by providing immediate *visual* feedback on touchstart, and taking action only on touchend.

Instructions
-------------

1. Include jquery.touchclick.js after jQuery has loaded
2. Define a .touchactive style for the element so that touchscreen users receive immediate visual feedback the instant their finger touches the screen
3. Listen for the "touchclick" event

Derek Petersen

[Google+](https://plus.google.com/118244156822447731503) | [Twitter](http://twitter.com/tuxracer)