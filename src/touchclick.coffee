###!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/touchclick MIT License
###

$ = if typeof jQuery is 'function' then jQuery else require 'jquery'

activeClass = 'touchactive'

# Store a timestamp of when the last touch event occurred
lastTouched = 0

# Support devices with both touch and mouse (e.g. Windows 8, Chromebook Pixel)
ignoreEvent = (e) ->
  currentTimestamp = Math.round (new Date()).getTime() / 1000
  secondsSinceTouch = currentTimestamp - lastTouched

  if e.type.match 'touchstart|touchmove|touchend'
    lastTouched = currentTimestamp

  if secondsSinceTouch < 3 and e.type.match 'mouse'
    true
  else
    false

getTouchclickEl = (target) ->
  $targetEl = $ target
  # For delegated events you can optionally provide an element
  # that will have the active style added when touch is active
  # by adding data-touchclick="true"
  $touchclickEl = $targetEl.closest '*[data-touchclick="true"]'

  if $touchclickEl.length
    $touchclickEl
  else
    $targetEl

touchstart = (e) ->
  getTouchclickEl(e.target).addClass(activeClass) unless ignoreEvent e

touchmove = (e) ->
  getTouchclickEl(e.target).removeClass(activeClass)

touchend = (e) ->
  $touchclickEl = getTouchclickEl e.target

  if $touchclickEl.hasClass(activeClass) and not ignoreEvent e
    e.type = 'touchclick'

    $touchclickEl
    .trigger(e)
    .removeClass(activeClass)

events = (type) ->
  $el = $ this

  if window.navigator.msPointerEnabled
    $el[type] 'MSPointerDown', touchstart
    $el[type] 'MSPointerUp', touchend
  else
    $el[type] 'touchstart mousedown', touchstart
    $el[type] 'touchmove mouseout', touchmove
    $el[type] 'touchend mouseup', touchend

$.event.special.touchclick =
  setup: ->
    events.call this, 'on'

  teardown: ->
    events.call this, 'off'
