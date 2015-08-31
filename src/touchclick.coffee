###!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/touchclick MIT License
###

$ = if typeof jQuery is 'function' then jQuery else require 'jquery'

activeClass = 'touchactive'
preventDefaultClick = false

# The event will be canceled if the touch moves more than this many pixels in any direction
moveThreshold = 10

# Store a timestamp of when the last touch event occurred
lastTouched = 0

# Store the coordinates of the touchstart event
startCoords = x: null, y: null

getTouchCoords = (e) ->
  touch = e.originalEvent?.touches?[0]

  if touch
    x: touch.pageX, y: touch.pageY

# Support devices with both touch and mouse (e.g. Windows 8, Chromebook Pixel)
ignoreEvent = (e) ->
  currentTimestamp = Math.round (new Date()).getTime() / 1000
  secondsSinceTouch = currentTimestamp - lastTouched

  if e.type.match 'touchstart|touchmove|touchend'
    lastTouched = currentTimestamp

  secondsSinceTouch < 3 and e.type.match 'mouse'

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
  startCoords = getTouchCoords e
  getTouchclickEl(e.target).addClass(activeClass) unless ignoreEvent e

touchmove = (e) ->
  currentCoords = getTouchCoords e

  # If there aren't any coordinates, or the user has moved further than the move threshold we will cancel the event
  if not currentCoords or (Math.abs(currentCoords.x - startCoords.x) > moveThreshold or Math.abs(currentCoords.y - startCoords.y) > moveThreshold)
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

  if preventDefaultClick
    $el[type] 'click', (e) ->
      e.preventDefault()

  if window.navigator.pointerEnabled
    $el[type] 'pointerdown', touchstart
    $el[type] 'pointerup', touchend
  else
    $el[type] 'touchstart mousedown', touchstart
    $el[type] 'touchmove mouseout', touchmove
    $el[type] 'touchend mouseup', touchend

$.event.special.touchclick =
  setup: ->
    events.call this, 'on'

  teardown: ->
    events.call this, 'off'
