jQuery TouchClick
==================

This is a small jQuery plugin to enable binding to either the touch events or the click event depending on what's available for the given platform. This is based on the jQuery plugin provided by [Alexandre](http://stackoverflow.com/users/346368/alexandre) on [stackoverflow](http://stackoverflow.com/questions/2135037/adding-a-jquery-style-event-handler-of-iphone-os-events)

On most touchscreen platforms the browser waits to 500ms before it triggers the 'click' event when the user touches the screen. This intentional delay provides time to decide whether or not it should trigger the taphold event. Unfortunately this creates a noticeable lag in the interface for web apps that depend on the 'click' event.

One common method of overcoming this problem is to bind to the touchstart event however that means touchscreen users will trigger the event even when they swipe/scroll if they happen to press any element you've bound in this way.

This plugin aims to alleviate both of these problems by binding to the touch events, but not triggering until the *touchend* event so long as a touchmove event didn't take place between the time the touchstart event and the touchend event.

As it was originally created the wait for a touchend event causes its own problems with regards to a delay. Native touchscreen apps tend to show the button being pressed or darkened *immediately* after the user touches the screen however they don't actually trigger if the user swipes or doesn't lift their finger off the screen from that element.

In order to emulate that this plugin has been modified to attach a "touchstart" class to elements *immediately* after the user presses on the screen and removes the "touchstart" class on the touchend event.

Instructions
-------------

Include jquery.touchclick.js after jQuery has loaded
Bind to the "touchclick" event
Define a .touchstart style for the element so that touchscreen users receive immediate feedback the instant their finger touches the screen

Derek Petersen
https://plus.google.com/118244156822447731503
