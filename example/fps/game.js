(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var debugRefresh = 400

  var deltaTime  = 0
  var timeElapse = 0

  var _seg = 0
  var _fps = 0

  function init(){
    run(loop)
  }

  function exec(timestamp){
    timeElapse = timeElapse === 0 ? timestamp : timeElapse
    
    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    _seg += deltaTime

    //debug refresh
    if (_seg >= debugRefresh){
      
      _fps = (1/deltaTime)*1000
      _seg = 0
    }
    
    if (deltaTime > 17){
      deltaTime = 0
    }
  }

  function draw(){
    //clear canvas
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    
    //draw fps
    context.fillStyle = '#000'
    context.font      = 'normal 16pt Arial'
    context.fillText( 'FPS: '+ _fps, 10, 20 )
  }

  function loop(timestamp){

    exec(timestamp)
    draw()

    run(loop)
  }

  var run = DEVGAME.requestAnimationFrame(loop)
  window.addEventListener('load', init, false)

})(window, document, DEVGAME)
