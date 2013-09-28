###!
Copyright (c) 2013 Derek Petersen https://github.com/tuxracer/touchclick MIT License
###
((factory) ->
  try
    # CommonJS
    factory require 'jquery'
  catch e
    # Global
    factory jQuery
) ($) ->
  activeClass = 'touchactive'

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
    $touchclickEl = getTouchclickEl e.target
    currentTimestamp = Math.round (new Date()).getTime() / 1000
    lastTimestamp = $touchclickEl.data 'touchclick-last-touch'
    difference = currentTimestamp - lastTimestamp

    # Support devices with both touch and mouse (e.g. Windows 8, Chromebook Pixel)
    if lastTimestamp and difference < 3 and e.type is 'mousedown'
      $touchclickEl.data 'touchclick-disabled', true
    else
      $touchclickEl.data 'touchclick-disabled', false
      $touchclickEl.addClass activeClass

    if e.type is 'touchstart' or e.type is 'MSPointerDown'
      $touchclickEl.data 'touchclick-last-touch', currentTimestamp

  touchmove = (e) ->
    $touchclickEl = getTouchclickEl e.target

    $touchclickEl.data 'touchclick-disabled', true
    $touchclickEl.removeClass activeClass

  touchend = (e) ->
    $touchclickEl = getTouchclickEl e.target

    unless $touchclickEl.data 'touchclick-disabled'
      e.type = 'touchclick'
      $.event.dispatch.call this, e

    $touchclickEl.data 'touchclick-disabled', false
    $touchclickEl.removeClass activeClass

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
      events.call this,'on'

    teardown: ->
      events.call this,'off'
