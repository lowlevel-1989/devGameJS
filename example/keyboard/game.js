(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var deltaTime  = 0
  var timeElapse = 0
  
  var _debugUpdate = 300

  // debug snake position
  var _seg  = 0
  var _fps  = 0

  var keyboard = {}

  var KEY_LEFT  = 37
  var KEY_UP    = 38
  var KEY_RIGHT = 39
  var KEY_DOWN  = 40

  var stage = new DEVGAME.Container()
  stage.setContext(context)

  var ball = new DEVGAME.entity.Circle(canvas.clientWidth/2, canvas.clientHeight/2, 8)

  ball.speed = 0.12

  ball.move = function(){
    
    this.x += deltaTime*this.hSpeed
    this.y += deltaTime*this.vSpeed
    this.hSpeed = this.vSpeed = 0
  }

  ball.logic = function(){

    if (keyboard[KEY_LEFT]){
      this.hSpeed = -this.speed
    }

    if (keyboard[KEY_UP]){
      this.vSpeed = -this.speed
    }

    if (keyboard[KEY_RIGHT]){
      this.hSpeed = this.speed
    }

    if (keyboard[KEY_DOWN]){
      this.vSpeed = this.speed
    }

    this.move()

  }
  stage.addChild(ball)

  function loop(timestamp){

    timeElapse = timeElapse === 0 ? timestamp : timeElapse
    
    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    _seg += deltaTime

    //update fps
    if (_seg >= _debugUpdate){
      
      _fps = (1/deltaTime)*1000
      _seg = 0
    }
    
    if (deltaTime > 17){
      deltaTime = 0
    }

    //clear canvas
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    
    
    stage.exec()
    
    //draw debug
    context.fillText( 'FPS: '+ _fps,   10, 20 )
    context.fillText( 'KEY_LEFT: ' + (keyboard[KEY_LEFT]  ? keyboard[KEY_LEFT]  : false),  10, 30 )
    context.fillText( 'KEY_UP: '   + (keyboard[KEY_UP]    ? keyboard[KEY_UP]    : false),  10, 40 )
    context.fillText( 'KEY_RIGHT: '+ (keyboard[KEY_RIGHT] ? keyboard[KEY_RIGHT] : false),  10, 50 )
    context.fillText( 'KEY_DOWN: ' + (keyboard[KEY_DOWN]  ? keyboard[KEY_DOWN]  : false),  10, 60 )
    
    exec(loop)

  }

  var exec = DEVGAME.requestAnimationFrame(loop)

  exec(loop)

  window.addEventListener('keydown', function(event){
    event.preventDefault()
    keyboard[event.keyCode] = true
  }, false)

  window.addEventListener('keyup', function(event){
    event.preventDefault()
    keyboard[event.keyCode] = false
  }, false)

})(window, document, DEVGAME)
