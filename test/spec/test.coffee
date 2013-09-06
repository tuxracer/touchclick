describe 'touchclick', ->
  describe '#setup', ->
    describe 'when window.navigator.msPointerEnabled is false', ->
      beforeEach ->
        window.navigator.msPointerEnabled = false
        @spy = sinon.spy()
        @$el = $ '<div />'
        @$el.on 'touchclick', @spy

      afterEach ->
        window.navigator.msPointerEnabled = false
        @spy.reset()
        @$el.off 'touchclick', @spy

      describe 'on mousedown', ->
        it 'should have the "touchactive" class', ->
          @$el.trigger 'mousedown'
          expect(@$el.hasClass 'touchactive').to.be.true

        describe 'when data-touchclick="true" is on its parent element', ->
          beforeEach ->
            @$parent = $('<div />')
            .attr('data-touchclick', true)
            .append(@$el)

            @$el
            .on('touchclick', @spy)
            .trigger('mousedown')

          afterEach ->
            @$parent.remove()

          it 'should not have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should have a parent element with the "touchclick" active class', ->
            expect(@$el.closest('.touchactive').length).to.equal 1

        describe 'then mouseout', ->
          beforeEach ->
            @$el
            .trigger('mousedown')
            .trigger('mouseout')

          it 'should not have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should not execute the callback', ->
            expect(@spy.called).to.be.false

        describe 'then mouseup', ->
          beforeEach ->
            @$el
            .trigger('mousedown')
            .trigger('mouseup')

          it 'should have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should execute the callback once', ->
            expect(@spy.calledOnce).to.be.true

      describe 'on touchstart', ->
        it 'should have the "touchactive" class', ->
          @$el.trigger 'touchstart'
          expect(@$el.hasClass 'touchactive').to.be.true

        describe 'when data-touchclick="true" is on its parent element', ->
          beforeEach ->
            @$parent = $('<div />')
            .attr('data-touchclick', true)
            .append(@$el)

            @$el
            .on('touchclick', @spy)
            .trigger('touchstart')

          afterEach ->
            @$parent.remove()

          it 'should not have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should have a parent element with the "touchclick" active class', ->
            expect(@$el.closest('.touchactive').length).to.equal 1

        describe 'then mousedown, then mouseup, then touchend', ->
          beforeEach ->
            @$el
            .trigger('touchstart')
            .trigger('mousedown')
            .trigger('mouseup')
            .trigger('touchend')

          it 'should not have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should execute the callback once', ->
            expect(@spy.calledOnce).to.be.true

        describe 'then wait 4 seconds, then mousedown, then mouseup, then touchend', ->
          beforeEach (done) ->
            @timeout 5000

            @clock = sinon.useFakeTimers()

            @$el
            .trigger('touchstart')

            setTimeout =>
              @$el
              .trigger('mousedown')
              .trigger('mouseup')
              .trigger('touchend')

              done()
            , 4000

            @clock.tick 4000

          afterEach ->
            @clock.restore()

          it 'should not have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should execute the callback twice', ->
            expect(@spy.calledTwice).to.be.true

        describe 'then touchmove', ->
          beforeEach ->
            @$el
            .trigger('touchstart')
            .trigger('touchmove')

          it 'should not have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should not execute the callback', ->
            expect(@spy.called).to.be.false

        describe 'then touchend', ->
          beforeEach ->
            @$el
            .trigger('touchstart')
            .trigger('touchend')

          it 'should not have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should execute the callback once', ->
            expect(@spy.calledOnce).to.be.true

    describe 'when window.navigator.msPointerEnabled is true', ->
      beforeEach ->
        window.navigator.msPointerEnabled = true
        @spy = sinon.spy()
        @$el = $ '<div />'
        @$el.on 'touchclick', @spy

      afterEach ->
        window.navigator.msPointerEnabled = true
        @spy.reset()
        @$el.off 'touchclick', @spy

      describe 'on mousedown', ->
        it 'should not have the "touchactive" class', ->
          @$el.trigger 'mousedown'
          expect(@$el.hasClass 'touchactive').to.be.false

        describe 'then mouseup', ->
          it 'should not execute the callback', ->
            @$el
            .trigger('mousedown')
            .trigger('mouseup')

            expect(@spy.called).to.be.false

      describe 'on touchstart', ->
        it 'should not have the "touchactive" class', ->
          @$el.trigger 'touchstart'
          expect(@$el.hasClass 'touchactive').to.be.false

        describe 'then touchend', ->
          it 'should not execute the callback', ->
            @$el
            .trigger('touchstart')
            .trigger('touchend')

            expect(@spy.called).to.be.false

      describe 'on MSPointerDown', ->
        it 'should have the "touchactive" class', ->
          @$el.trigger 'MSPointerDown'
          expect(@$el.hasClass 'touchactive').to.be.true

        describe 'then MSPointerUp', ->
          beforeEach ->
            @$el
            .trigger('MSPointerDown')
            .trigger('MSPointerUp')

          it 'should not have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should execute the callback', ->
            expect(@spy.calledOnce).to.be.true

  describe '#teardown', ->
    describe 'when window.navigator.msPointerEnabled is false', ->
      beforeEach ->
        window.navigator.msPointerEnabled = false
        @spy = sinon.spy()
        @$el = $ '<div />'
        @$el.on 'touchclick', @spy
        @$el.off 'touchclick', @spy

      afterEach ->
        window.navigator.msPointerEnabled = false
        @spy.reset()

      describe 'on mousedown', ->
        it 'should not have the "touchactive" class', ->
          @$el.trigger 'mousedown'
          expect(@$el.hasClass 'touchactive').to.be.false

        describe 'then mouseup', ->
          it 'should not execute the callback', ->
            @$el
            .trigger('mousedown')
            .trigger('mouseup')

            expect(@spy.called).to.be.false

      describe 'on touchstart', ->
        it 'should not have the "touchactive" class', ->
          @$el.trigger 'touchstart'
          expect(@$el.hasClass 'touchactive').to.be.false

        describe 'then touchend', ->
          it 'should not execute the callback', ->
            @$el
            .trigger('touchstart')
            .trigger('touchend')

            expect(@spy.called).to.be.false

    describe 'when window.navigator.msPointerEnabled is true', ->
      beforeEach ->
        window.navigator.msPointerEnabled = true
        @spy = sinon.spy()
        @$el = $ '<div />'
        @$el.on 'touchclick', @spy
        @$el.off 'touchclick', @spy

      afterEach ->
        window.navigator.msPointerEnabled = true
        @spy.reset()

      describe 'on MSPointerDown', ->
        it 'should not have the "touchactive" class', ->
          @$el.trigger 'MSPointerDown'
          expect(@$el.hasClass 'touchactive').to.be.false

        describe 'then MSPointerUp', ->
          beforeEach ->
            @$el
            .trigger('MSPointerDown')
            .trigger('MSPointerUp')

          it 'should not have the "touchactive" class', ->
            expect(@$el.hasClass 'touchactive').to.be.false

          it 'should not execute the callback', ->
            expect(@spy.called).to.be.false
