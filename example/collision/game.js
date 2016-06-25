(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var debugRefresh = 400

  var deltaTime  = 0
  var timeElapse = 0

  var _seg = 0
  var _fps = 0

  var _pointCollision = {}

  var stage = null
  var rectA = null
  var rectB = null

  function init(){
    stage = new DEVGAME.Container()
    stage.setContext(context)

    rectA = new DEVGAME.entity.Rect(0, canvas.clientHeight/2, 24, 24)

    rectA.direction = +1
    rectA.hspeed    = 0.2

    rectA.logic = function(){

      
      if (this.getX() > (canvas.clientWidth - this.width) || (this.getX() < 0)){
        this.direction *= -1
      }

      this.x += this.hspeed*deltaTime*this.direction

      if (this.collision(rectB)){
        
        
        _pointCollision.aX = this.getX()
        _pointCollision.bX = rectB.getX()
        _pointCollision.aY = this.getY()
        _pointCollision.bY = rectB.getY()

        this.color = rectB.color = '#F00'
      }else{
        this.color = rectB.color = '#000'
      }
    }

    rectA.draw = function(){
      context.fillStyle = '#000'
      context.fillText('A', this.x+5.5, this.y-12)
      context.fillStyle = this.color
      context.fillRect(this.x, this.y, this.width, this.height)
    }
    
    rectB = new DEVGAME.entity.Rect(canvas.clientWidth-24, canvas.clientHeight/2, 24, 24)

    rectB.direction = -1
    rectB.hspeed    = 0.1115

    rectB.logic = function(){
      
      if (this.getX() > (canvas.clientWidth - this.width) || (this.getX() < 0)){
        this.direction *= -1
      }

      this.x += this.hspeed*deltaTime*this.direction
    }

    rectB.draw = function(){
      context.fillStyle = '#000'
      context.fillText('B', this.x+5.5, this.y+48)
      context.fillStyle = this.color
      context.fillRect(this.x, this.y, this.width, this.height)
    }

    stage.add(rectA, rectB)

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

    stage.exec()
  }


  function draw(){
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    stage.render()
    
    
    //draw fps
    context.fillStyle = '#000'
    context.font      = 'normal 16pt Arial'
    context.fillText( 'FPS: '+ _fps, 10, 20 )
    context.fillText( 'POINT COLLISION', 10, 40 )
    context.fillText( '  Rectangle A' , 10, 60)
    context.fillText( '    x: ' + _pointCollision.aX, 10, 80)
    context.fillText( '    y: ' + _pointCollision.aY, 10, 100)
    context.fillText( '  Rectangle B' , 10, 120)
    context.fillText( '    x: ' + _pointCollision.bX, 10, 140)
    context.fillText( '    y: ' + _pointCollision.bY, 10, 160)
  }


  function loop(timestamp){

    exec(timestamp)
    draw()

    run(loop)

  }

  var run = DEVGAME.requestAnimationFrame(loop)
  window.addEventListener('load', init, false)


})(window, document, DEVGAME)
