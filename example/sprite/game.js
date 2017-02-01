(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas   = document.getElementById('game')
  var context  = canvas.getContext('2d')


  context.font = 'normal 16px monospace'
  
  var deltaTime  = 0
  var timeElapse = 0
  
  var _debugUpdate = 300

  var _seg  = 0
  var _fps  = 0

  var keyboard = {}

  var stage = null
  var vinicio  = null
  var spritesheet = null

  function init(){

    spritesheet = new DEVGAME.Sprite({
      source:  'vinicio.png', 
      swidth:  32,
      sheight: 48,
      fps: 6,
      animation: 'down',
      animations: {
        down: [
          {
            sx: 32*0,
            sy: 48*0
          },
          {
            sx: 32*1,
            sy: 48*0
          },
          {
            sx: 32*2,
            sy: 48*0
          },
          {
            sx: 32*3,
            sy: 48*0
          }
        ],
        left: [
          {
            sx: 32*0,
            sy: 48*1
          },
          {
            sx: 32*1,
            sy: 48*1
          },
          {
            sx: 32*2,
            sy: 48*1
          },
          {
            sx: 32*3,
            sy: 48*1
          }
        ],
        right: [
          {
            sx: 32*0,
            sy: 48*2
          },
          {
            sx: 32*1,
            sy: 48*2
          },
          {
            sx: 32*2,
            sy: 48*2
          },
          {
            sx: 32*3,
            sy: 48*2
          }
        ],
        up: [
          {
            sx: 32*0,
            sy: 48*3
          },
          {
            sx: 32*1,
            sy: 48*3
          },
          {
            sx: 32*2,
            sy: 48*3
          },
          {
            sx: 32*3,
            sy: 48*3
          }
        ]
      }
    })
    spritesheet.load(function(error){
      events()
      run(loop)
    })

    stage = new DEVGAME.Container()
    stage.setContext(context)

    vinicio = new DEVGAME.entity.Rect(canvas.clientWidth/2, canvas.clientHeight/2, 32*3, 48*3)

    vinicio.setSprite(spritesheet)

    vinicio.speed = vinicio.width/400
    vinicio.move = function(){
      
      this.x += deltaTime*this.hSpeed
      this.y += deltaTime*this.vSpeed
      this.hSpeed = this.vSpeed = 0
    }

    vinicio.logic = function(){
      this.sprite.pause()
      if (keyboard[DEVGAME.KEY_LEFT]){
        this.sprite.play()
        this.sprite.use('left')
        this.hSpeed = -this.speed
      }else if (keyboard[DEVGAME.KEY_UP]){
        this.sprite.play()
        this.sprite.use('up')
        this.vSpeed = -this.speed
      }else if (keyboard[DEVGAME.KEY_RIGHT]){
        this.sprite.play()
        this.sprite.use('right')
        this.hSpeed = this.speed
      }else if (keyboard[DEVGAME.KEY_DOWN]){
        this.sprite.play()
        this.sprite.use('down')
        this.vSpeed = this.speed
      }
      this.move()
    }
    stage.add(vinicio)
  }

  function exec(timestamp){
    timeElapse = timeElapse === 0 ? timestamp : timeElapse
    
    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    _seg += deltaTime

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
    context.fillText( 'FPS: '+ _fps,   10, 20 )
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
