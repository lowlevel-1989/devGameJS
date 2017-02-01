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

  var _mousex = 0
  var _mousey = 0
  var _mouseClick = 0

  var mouse  = null
  var stage  = null
  var circle = null

  function init(){
    timeRender = new DEVGAME.Timer({fps: 15})

    timeRender.logic = function(delta){
      _render = true
    }

    stage = new DEVGAME.Container()
    stage.setContext(context)

    circle = new DEVGAME.entity.Circle(canvas.clientWidth/2, canvas.clientHeight/2, 15)
    circle.create = function(){

      var red   = DEVGAME.random(0, 255)
      var green = DEVGAME.random(0, 255)
      var blue  = DEVGAME.random(0, 255)
      
      this.color = DEVGAME.rgb(red, green, blue)

      this.x = DEVGAME.random(canvas.clientWidth-this.radius*2)+this.radius
      this.y = DEVGAME.random(canvas.clientHeight-this.radius*2)+this.radius

    }

    mouse = new Mouse(_mousex, _mousey)

    stage.add(circle, mouse)
    circle.create()

    events()
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

  function events(){
    document.addEventListener('mousemove', function(event){
      _mousex = event.pageX - canvas.offsetLeft
      _mousey = event.pageY - canvas.offsetTop
    }, false)

    canvas.addEventListener('mousedown',function(event){
      _mouseClick = event.which
    }, false)
  }

  function Mouse(mousex, mousey){
    DEVGAME.entity.Circle.call(this, mousex, mousey, 5)
  }

  Mouse.prototype.logic = function(){
    this.x     = _mousex
    this.y     = _mousey
    this.click = _mouseClick

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
      if (this.collision(circle)){
        circle.create()
      }
      _mouseClick = 0
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
