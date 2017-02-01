(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas   = document.getElementById('game')
  var context  = canvas.getContext('2d')
  context.font = 'normal 16px monospace'
  
  var SECOND   = 1000
  var LIMITFTP = true

  var deltaTime  = 0
  var timeElapse = 0

  var _fps = 0
  var _cpu = 0
  var _frames = 0
  var _cicles = 0
  var _render = true
  var _timeCount = 0

  var timeRender = null

  var stage = null
  var p1    = null

  function init(){
    timeRender = new DEVGAME.Timer(1000/30)

    timeRender.logic = function(delta){
      _render = true
    }

    stage = new DEVGAME.Container()
    stage.setContext(context)

    p1 = new Rect()
    stage.add(p1)

    run(loop)
  }

  function exec(timestamp){
    _cicles++

    timeElapse = timeElapse === 0 ? timestamp : timeElapse
    
    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    if (deltaTime > SECOND){
      deltaTime = 0
    }

    _timeCount += deltaTime

    if (_timeCount > SECOND){
      _cpu = _cicles
      _fps = _frames
      _cicles = 0
      _frames = 0
      _timeCount -= SECOND
    }

    stage.exec()
    timeRender.exec()
  }

  function draw(){
    if (_render || !LIMITFTP){

      _render = false
      _frames++
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    
      stage.render()
      
      context.fillText( 'CPU: '+ _cpu, 10, 20 )
      context.fillText( 'FPS: '+ _fps, 10, 36 )
    }
  }

  
  var Rect = function(){
    DEVGAME.entity.Rect.call(this, 0, canvas.clientHeight/2, 20, 20, true)
    this.direction = +1
    this.hspeed    = 100/1000
  }

  Rect.prototype = Object.create(DEVGAME.entity.Rect.prototype)

  Rect.prototype.logic = function(){
      
    if (this.getX() > (canvas.clientWidth - this.width) || (this.getX() < 0)){
      this.direction *= -1
    }

    this.x += this.hspeed*deltaTime*this.direction
  }

  function loop(timestamp){
    exec(timestamp)
    draw()
    run(loop)
  }

  var run = DEVGAME.requestAnimationFrame(loop)

  window.addEventListener('load', init, false)


})(window, document, DEVGAME)
