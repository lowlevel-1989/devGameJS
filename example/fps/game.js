(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  context.font = 'normal 16px monospace'
  
  var deltaTime  = 0
  var timeElapse = 0

  var _fps = 0
  var _cpu = 0
  var _frames = 0
  var _cicles = 0
  var _render = true

  var SECOND = 1000
  var _timeCount = 0

  var timeRender = null

  function init(){

    timeRender = new DEVGAME.Timer({fps: 30})

    timeRender.logic = function(delta){
      _render = true
    }

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

    timeRender.exec()
  }

  function draw(){
    if (_render){

      _render = false
      _frames++
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      

      context.fillText( 'CPU: '+ _cpu, 10, 20 )
      context.fillText( 'FPS: '+ _fps, 10, 36 )
    }
  }

  function loop(timestamp){

    exec(timestamp)
    draw()

    run(loop)
  }

  var run = DEVGAME.requestAnimationFrame(loop)
  window.addEventListener('load', init, false)

})(window, document, DEVGAME)
