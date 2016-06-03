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
  var _x = 0
  var _y = 0

  var keyboard = {}

  var KEY_LEFT  = 37
  var KEY_UP    = 38
  var KEY_RIGHT = 39
  var KEY_DOWN  = 40

  var stage = new DEVGAME.Container()
  stage.setContext(context)

  var head = new DEVGAME.entity.Arc(canvas.clientWidth/2, canvas.clientHeight/2, 5, 0, DEVGAME.PI_2)
  head.color = '#D7DF01'

  var body = [
    head
  ]

  var particle = new DEVGAME.entity.Arc(-100, -100, 4, 0, DEVGAME.PI_2)

  for (var i = 0; i < 400; i++){
    
    var x = particle.clone()
    x.color = '#424242'
    
    body.push(x)
  }
  
  var snake = new DEVGAME.Container()

  for ( var i = body.length-1; i >= 0; i-- ){
    snake.addChild(body[i])
  }

  snake.direction = 0
  snake.speed     = 0.15

  snake.move = function(){

    for ( var i = body.length-1; i > 0; i-- ){
      body[i].x = body[i - 1].x
      body[i].y = body[i - 1].y
    }


    var direction = this.direction

    if ( direction === 0 ){
      head.x += this.speed * -1 * deltaTime
    }

    if ( direction === 1 ){
      head.y += this.speed * -1 * deltaTime
    }

    if ( direction === 2 ){
      head.x += this.speed * +1 * deltaTime
    }
    
    if ( direction === 3 ){
      head.y += this.speed * +1 * deltaTime
    }


    if (head.x > canvas.clientWidth - head.radius){
      head.x = 0
    }

    if (head.y > canvas.clientHeight - head.radius){
      head.y = 0
    }

    if (head.x < 0){
      head.x = canvas.clientWidth - head.radius
    }

    if (head.y < 0){
      head.y = canvas.clientHeight - head.radius
    }

  }

  snake.logic = function(){

    if (keyboard[KEY_LEFT]  && this.direction !== 0){
      this.direction = 0
    }

    if (keyboard[KEY_UP]    && this.direction !== 1){
      this.direction = 1
    }

    if (keyboard[KEY_RIGHT] && this.direction !== 2){
      this.direction = 2
    }

    if (keyboard[KEY_DOWN]  && this.direction !== 3){
      this.direction = 3
    }

    this.move()

  }
  stage.addChild(snake)

  console.dir(stage)
  function loop(timestamp){

    timeElapse = timeElapse === 0 ? timestamp : timeElapse
    
    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    _seg += deltaTime

    //update fps
    if (_seg >= _debugUpdate){
      
      _fps = (1/deltaTime)*1000
      _x   = head.x
      _y   = head.y
      _seg = 0
    }
    
    if (deltaTime > 17){
      deltaTime = 0
    }

    //clear canvas
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    
    
    stage.exec()
    stage.render()

    
    //draw debug
    context.fillStyle = '#8000FF'
    context.font      = 'normal 16pt Arial'
    context.fillText( 'SNAKE DEVGAME', 10, 20 )
    context.fillText( 'FPS: '+ _fps,   10, 40 )
    context.fillText( 'x: '+ _x,   10, 60 )
    context.fillText( 'y: '+ _y,   10, 80 )
    
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
