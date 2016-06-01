(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  
  var debugRefresh = 400

  var deltaTime  = 0
  var timeElapse = 0

  var _seg = 0
  var _fps = 0


  var stage = new DEVGAME.Container()
  stage.setContext(context)


  //Particle
  var p1 = new DEVGAME.entity.Circle(15, canvas.clientHeight/2, 15)

  p1.direction = +1
  p1.hspeed    = 0.1115

  p1.logic = function(){
    
    if (this.x > (canvas.clientWidth - 15) || (this.x < 15)){
      this.direction *= -1
    }

    this.x += this.hspeed*deltaTime*this.direction
  }

  stage.addChild(p1)

  console.dir(stage)
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
    
    
    //draw fps
    context.fillStyle = '#000'
    context.font      = 'normal 16pt Arial'
    context.fillText( 'FPS: '+ _fps, 10, 20 )

    exec(loop)

  }

  var exec = DEVGAME.requestAnimationFrame(loop)

  exec(loop)

})(window, document, DEVGAME)
