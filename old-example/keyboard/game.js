(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var deltaTime  = 0
  var timeElapse = 0
  
  var _debugUpdate = 300

  var _seg  = 0
  var _fps  = 0

  var keyboard = {}

  var stage = null
  var ball  = null

  function init(){
    stage = new DEVGAME.Container()
    stage.setContext(context)

    ball = new DEVGAME.entity.Circle(canvas.clientWidth/2, canvas.clientHeight/2, 8)

    ball.speed = 0.12
    ball.move = function(){
      
      this.x += deltaTime*this.hSpeed
      this.y += deltaTime*this.vSpeed
      this.hSpeed = this.vSpeed = 0
    }

    ball.logic = function(){

      if (keyboard[DEVGAME.KEY_LEFT]){
        this.hSpeed = -this.speed
      }

      if (keyboard[DEVGAME.KEY_UP]){
        this.vSpeed = -this.speed
      }

      if (keyboard[DEVGAME.KEY_RIGHT]){
        this.hSpeed = this.speed
      }

      if (keyboard[DEVGAME.KEY_DOWN]){
        this.vSpeed = this.speed
      }

      this.move()

    }
    stage.add(ball)
    events()
    run(loop)
  }

  function exec(timestamp){
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

    stage.exec()
  }

  function draw(){
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    stage.render()
    
    //draw debug
    context.fillText( 'FPS: '+ _fps,   10, 20 )
    context.fillText( 'KEY_LEFT: ' + (keyboard[DEVGAME.KEY_LEFT]  || false),  10, 30 )
    context.fillText( 'KEY_UP: '   + (keyboard[DEVGAME.KEY_UP]    || false),  10, 40 )
    context.fillText( 'KEY_RIGHT: '+ (keyboard[DEVGAME.KEY_RIGHT] || false),  10, 50 )
    context.fillText( 'KEY_DOWN: ' + (keyboard[DEVGAME.KEY_DOWN]  || false),  10, 60 )
  }

  function events(){
    document.addEventListener('keydown', function(event){
      event.preventDefault()
      keyboard[event.keyCode] = true
    }, false)

    document.addEventListener('keyup', function(event){
      event.preventDefault()
      keyboard[event.keyCode] = false
    }, false)
  }


  function loop(timestamp){
    exec(timestamp)
    draw()
    
    run(loop)
  }

  var run = DEVGAME.requestAnimationFrame(loop)
  window.addEventListener('load', init, false)



})(window, document, DEVGAME)
