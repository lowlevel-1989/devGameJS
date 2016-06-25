(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  var buffer = document.createElement('canvas')
  var bufferContext = buffer.getContext('2d')
  
  var debugRefresh = 400

  var deltaTime  = 0
  var timeElapse = 0

  var _seg = 0
  var _fps = 0

  var _debug     = false
  var _info      = true
  var _preview   = false

  var GAME    = 0
  var LOADING = 1

  var state    = LOADING
  var stage    = []
  var game     = null
  var loading  = null
  var grid     = null
  var pieces   = null
  var dragging = null
  var mouse    = null
  var pointer  = null
  var mask     = null

  var mousex    = null
  var mousey    = null
  var mouseDown = null
  var mouseUp   = null

  var size  = 60
  var rows  = 8
  var cols  = 4
  var cells = rows*cols


  var img = null
  var spritesheet = new Image()


  buffer._pos   = Math.sqrt((size*2)+(size*2))
  buffer.width  = size+buffer._pos*2
  buffer.height = buffer.width
  buffer.style.display = 'none'

  context.font      = 'normal 16px monospace'
  bufferContext.fillStyle = '#000'
  bufferContext.font      = 'normal 16pt monospace'
  
  var center = {
    x: (canvas.clientWidth/2)-(((cols*size)/2)+buffer._pos),
    y: (canvas.clientHeight/2)-(((rows*size)/2)+buffer._pos)
  }

  document.body.appendChild(buffer)

  function init(){

    game = new DEVGAME.Container()
    game.setContext(context)

    loading = new DEVGAME.Container()
    loading.setContext(context)

    stage[GAME] = game
    stage[LOADING] = loading

    loading.add(new DEVGAME.entity.Rect())
    
    loading.children[0].draw = function(){
      context.fillText('LOADING', canvas.clientWidth/2, canvas.clientHeight/2)
    }
  
    mouse = new DEVGAME.Container()
    mouse.color    = '#080'
    mouse.dragging = false
    mouse.visible  = _debug

    pointer  = new DEVGAME.entity.Circle(mousex, mousey, 1)
    mask     = new DEVGAME.entity.Rect(0, 0, 10, 10)
    pointer.logic = function(){
      this.x     = mousex
      this.y     = mousey
      mouse.down  = mouseDown
      mouse.up    = mouseUp

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

    }
    pointer.color = mask.color = mouse.color

    grid   = new DEVGAME.Container(center.x, center.y)
    pieces = new DEVGAME.Container() 

    dragging = new Dragging(0, 0, size, true, '#000', '#FFF')
    
    mouse.add(pointer, mask)
    game.add(grid, pieces, dragging, mouse)

    pieces.animation = true
    pieces.hspeed    = 0.5
    pieces.change    = 0

    for (var y = 0; y < rows; y++){
      for (var x = 0; x < cols; x++){

        var _id = grid.children.length
        grid.add(new Cell(_id, x, y, x, y, size))
        pieces.add(new Cell(_id, DEVGAME.random(canvas.clientWidth-size), DEVGAME.random(canvas.clientHeight-size), x, y, size, true, true, '#00A', '#FFF'))

      }
    }

    restart()
    events()
    run(loop)
  }


  function restart(){
    state = LOADING
    img = 'img/puzzle'+DEVGAME.random(1, 5)+'.jpg'
    spritesheet.src = img
    
    pieces.forEach(function(piece){
      piece.set(DEVGAME.random(canvas.clientWidth-size), DEVGAME.random(canvas.clientHeight-size))
    })

    spritesheet.onload = function(){
      state = GAME
    }
  }


  function exec(timestamp){
    timeElapse = timeElapse === 0 ? timestamp : timeElapse

    deltaTime  = timestamp - timeElapse
    timeElapse = timestamp

    _seg += deltaTime

    if (_seg >= debugRefresh){

      _fps = (1/deltaTime)*1000
      _seg = 0
    }

    if (deltaTime > 17*2){
      deltaTime = 0
    }


    if (pieces.animation){
      pieces.change -= 1.2
    }

    stage[state].exec()

    mouseDown = mouseUp = null

    if (_debug){
      buffer.style.display = 'block'
      mouse.visible = true
    }else{
      buffer.style.display = 'none'
      mouse.visible = false
    }
  }


  function draw(){
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)

    if (_info){

      context.fillStyle = '#080'
      context.textAlign = 'left'
      context.fillText( 'FPS: '+ _fps, 10, 16 )
      context.fillText( 'F1 : DEBUG TRUE/FALSE',  10, 32 )
      context.fillText( 'F2 : SHOW/HIDE INFO',  10, 48 )
      context.fillText( 'F3 : ON/OFF ANIMATION',  10, 64 )
      context.fillText( 'F4 : SHOW/HIDE IMAGE PREVIEW',  10, 80 )
      context.fillText( 'F5 : RESTART',  10, 96 )

      
      context.textAlign = 'center'
      context.fillText('CREDITS', canvas.clientWidth-140, canvas.clientHeight - 64)
      context.fillText('Developer: FormatCom', canvas.clientWidth-140, canvas.clientHeight - 48)
      context.fillText('Graphic Design: Vickyg10', canvas.clientWidth-140, canvas.clientHeight - 32)
      context.fillText('Thanks: Juegos Canvas Ninja', canvas.clientWidth-140, canvas.clientHeight - 16)
    }

    if (_preview){
      context.strokeRect((canvas.clientWidth-spritesheet.width/1.8) - 45, 10, spritesheet.width/1.8, spritesheet.height/1.8)
      context.drawImage(spritesheet, (canvas.clientWidth-spritesheet.width/1.8) - 45, 10, spritesheet.width/1.8, spritesheet.height/1.8)
    }

    stage[state].render()

  }


  function events(){

    document.addEventListener('mousemove', function(event){
      mousex = event.pageX - canvas.offsetLeft
      mousey = event.pageY - canvas.offsetTop
    }, false)

    canvas.addEventListener('mousedown',function(event){
      mouseDown = event.which
    }, false)

    canvas.addEventListener('mouseup',function(event){
      mouseUp = event.which
    }, false)

    canvas.addEventListener('touchstart',function(event){
      event.preventDefault()
      mouseDown = 1

      mousex = event.targetTouches[0].pageX - canvas.offsetLeft
      mousey = event.targetTouches[0].pageY - canvas.offsetTop
    }, false)

    canvas.addEventListener('touchmove',function(event){
      event.preventDefault()

      mousex = event.targetTouches[0].pageX - canvas.offsetLeft
      mousey = event.targetTouches[0].pageY - canvas.offsetTop
    }, false)

    canvas.addEventListener('touchend',function(event){
      mouseUp = 1
    }, false)

    canvas.addEventListener('touchcancel',function(event){
      mouseUp = 1
    }, false)

    document.addEventListener('keydown', function(event){
      event.preventDefault()
    }, false)

    document.addEventListener('keyup', function(event){
      event.preventDefault()
      if (event.keyCode === DEVGAME.KEY_F1){
        _debug = !_debug
      }
      if (event.keyCode === DEVGAME.KEY_F2){
        _info = !_info
      }
      if (event.keyCode === DEVGAME.KEY_F3){
        pieces.animation = !pieces.animation
      }
      if (event.keyCode === DEVGAME.KEY_F4){
        _preview = !_preview
      }
      if (event.keyCode === DEVGAME.KEY_F5){
        restart()
      }

    }, false)

  }


  function Cell(id, x, y, sx, sy, size, piece, fill, color1, color2){

    var _x = null
    var _y = null

    if (piece){
      _x = x
      _y = y
    }else{
      _x = x*size
      _y = y*size
    }

    DEVGAME.entity.Rect.call(this, _x, _y, size, size)
    this.id       = id
    this.rotation = piece ? DEVGAME.random(3)*90 : 0
    this.rotationTransition = 0
    this.sx       = sx*size
    this.sy       = sy*size
    this.color1   = color1 || '#000'
    this.color2   = color2 || '#000'
    this.fill     = fill   || false
    this.piece    = piece  || false
    this.select   = false
  }

  Cell.prototype = Object.create(DEVGAME.entity.Rect.prototype)

  Cell.prototype.drawBuffer = function(){

    bufferContext.clearRect(0, 0, buffer.width, buffer.height)
    var _x        = buffer.width/2
    var _y        = buffer.height/2
    var _rotation = (this.rotation + this.rotationTransition) * DEVGAME.DEG_TO_RAD

    bufferContext.translate(_x, _y)
    bufferContext.rotate(_rotation)
    bufferContext.fillStyle = this.color1
    if (this.fill){
      bufferContext.fillRect(-this.width/2, -this.height/2, this.width, this.height)
      bufferContext.drawImage(spritesheet, this.sx, this.sy, this.width, this.height, -this.width/2, -this.height/2, this.width, this.height)
    }
    bufferContext.strokeRect(-this.width/2, -this.height/2, this.width, this.height)
    if (_debug){
      bufferContext.fillStyle = this.color2
      bufferContext.textAlign = 'center'
      bufferContext.fillText(this.id, 0, 7)
    }
    bufferContext.rotate(-_rotation)
    bufferContext.translate(-_x, -_y)

  }

  Cell.prototype.draw = function(){
    this.drawBuffer()
    context = this.context || this.parent.context
    context.drawImage(buffer, this.x, this.y, buffer.width, buffer.height)
  }

  Cell.prototype.move = function(mouse){
    var _x = pointer.getX()-(buffer.width/2)
    var _y = pointer.getY()-(buffer.height/2)

    this.set(_x, _y)
  }

  Cell.prototype.animation = function(){
    if (this.rotationTransition < 0) {
      this.rotationTransition += deltaTime * 360/1000
      if (this.rotationTransition > 0){
        this.rotationTransition = 0
      }
    }
  }

  Cell.prototype.logic = function(){
    if (this.piece){ 

      if (pieces.animation){
        this.sx -= Math.sin(pieces.change*DEVGAME.DEG_TO_RAD)
      }
      this.animation()

      if (mouse.down === 1 && mouse.dragging === false){

        var _x = this.x
        var _y = this.y

        this.x += buffer._pos
        this.y += buffer._pos

        if (this.collisionCircle(pointer)){
          this.select = mouse.dragging = true
          mask.set(pointer.getX()-(mask.width/2), pointer.getY()-(mask.height/2))
        }

        this.x = _x
        this.y = _y

      }

      if (mouse.up === 1){
        
        if (this.select && DEVGAME.collision.rectToCircle(mask, pointer)){
          this.rotationTransition -= 90
          this.rotation += 90
          this.rotation = this.rotation > 270 ? 0 : this.rotation 
        }

        this.select = mouse.dragging = false
        dragging.visible = false
      }

      if (this.select){

        this.visible     = false
        this.move(mouse)
        dragging.copy(this)

      }else{

        this.visible     = true

        var _meCell = grid.children[this.id]

        if (this.collision(_meCell) && this.rotation === 0){
          this.set(_meCell.getX(), _meCell.getY())
        }

      }

    }

  }


  var Dragging = function(x, y, size, fill, color1, color2){
    DEVGAME.entity.Rect.call(this, x, y, size, size)
    this.id       = 0
    this.color1   = color1 || '#000'
    this.color2   = color2 || '#000'
    this.fill     = fill   || false
    this.visible  = false
  }

  Dragging.prototype = Object.create(DEVGAME.entity.Rect.prototype)

  Dragging.prototype.copy = function(cell){
    this.id = cell.id
    this.x  = cell.getX()
    this.y  = cell.getY()
    this.rotation = cell.rotation
    this.rotationTransition = cell.rotationTransition
    this.sx = cell.sx
    this.sy = cell.sy
    this.visible = true
  }

  Dragging.prototype.drawBuffer = Cell.prototype.drawBuffer
  Dragging.prototype.draw = Cell.prototype.draw

  function loop(timestamp){
    exec(timestamp)
    draw()
    run(loop)
  }
  var run = DEVGAME.requestAnimationFrame(loop)
  window.addEventListener('load', init, false)

})(window, document, DEVGAME)
