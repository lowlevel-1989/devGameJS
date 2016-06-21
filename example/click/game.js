(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var debugRefresh = 400

  var deltaTime  = 0
  var timeElapse = 0

  var _seg = 0
  var _fps = 0

  var mousex = 0
  var mousey = 0

  var stage = new DEVGAME.Container()
  stage.setContext(context)

  var circle = new DEVGAME.entity.Circle(canvas.clientWidth/2, canvas.clientHeight/2, 15)
  circle.create = function(){

    var red   = DEVGAME.random(0, 255)
    var green = DEVGAME.random(0, 255)
    var blue  = DEVGAME.random(0, 255)
    
    this.color = DEVGAME.rgb(red, green, blue)

    this.x = DEVGAME.random(canvas.clientWidth-this.radius*2)+this.radius
    this.y = DEVGAME.random(canvas.clientHeight-this.radius*2)+this.radius

  }

  var mouse = new DEVGAME.entity.Circle(mousex, mousey, 5)

  mouse.logic = function(){
    this.x     = mousex
    this.y     = mousey

    if (this.getX() < 0){
      this.x = 0
    }
    if (this.getX() > canvas.clientWidth){
      this.x = canvas.clientWidth
    }
    if (this.getY() < 0){
      this.y = 0
    }
    if (this.getY() > canvas.clientHeight){
      this.y = canvas.clientHeight
    }

    if (this.click === 1){

      if (DEVGAME.collision.circleToCircle(this, circle)){
        circle.create()
      }
      this.click = 0
       
    }

  }

  stage.addChild(circle, mouse)

  circle.create()

  function loop(timestamp){

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


    //clear canvas
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    stage.exec()
    stage.render()
    
    //draw fps
    context.fillStyle = '#000'
    context.font      = 'normal 16pt Arial'
    context.fillText( 'FPS: '+ _fps, 10, 20 )

    exec(loop)

  }

  var exec = DEVGAME.requestAnimationFrame(loop)

  exec(loop)

  document.addEventListener('mousemove', function(event){
    mousex = event.pageX - canvas.offsetLeft
    mousey = event.pageY - canvas.offsetTop
  }, false)

  canvas.addEventListener('mousedown',function(event){
    mouse.click = event.which
  }, false)

})(window, document, DEVGAME)
