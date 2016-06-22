(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  var debugRefresh = 400

  var deltaTime  = 0
  var timeElapse = 0

  var _seg = 0
  var _fps = 0

  var size  = 60
  var rows  = 4
  var cols  = 6
  var cells = rows*cells

  var center = {
    x: (canvas.clientWidth/2)-((cols*size)/2),
    y: (canvas.clientHeight/2)-((rows*size)/2)
  }

  var mousex    = null
  var mousey    = null
  var mouseDown = null
  var mouseUp   = null

  var stage = new DEVGAME.Container()
  stage.setContext(context)

  var mouse      = new DEVGAME.entity.Circle(mousex, mousey, 1)
  mouse.color    = '#080'
  mouse.dragging = false

  mouse.logic = function(){
    this.x     = mousex
    this.y     = mousey
    this.down  = mouseDown
    this.up    = mouseUp

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
  var grid = new DEVGAME.Container(center.x, center.y)

  function Cell(id, x, y, size, piece, fill, color1, color2){

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
    this.id     = id
    this.color1 = color1 || '#000'
    this.color2 = color2 || '#000'
    this.fill   = fill   || false
    this.piece  = piece  || false
    this.select = false
  }

  Cell.prototype = Object.create(DEVGAME.entity.Rect.prototype)

  Cell.prototype.draw = function(){
    context = this.context || this.parent.context
    context.fillStyle = this.color1
    if (this.fill){
      context.fillRect(this.x, this.y, this.width, this.height)
    }
    context.strokeRect(this.x, this.y, this.width, this.height)
    context.fillStyle = this.color2
    context.textAlign = 'center'
    context.fillText(this.id, this.x+(size/2), this.y+(((size)/2)+7))
  }

  Cell.prototype.move = function(mouse){
    var _x = mouse.x-(this.width/2)
    var _y = mouse.y-(this.height/2)

    this.set(_x, _y)
  }

  Cell.prototype.logic = function(){
    if (this.piece){ 
      
      if (mouse.down === 1 && mouse.dragging === false){

        if (DEVGAME.collision.rectToCircle(this, mouse)){
          this.select = mouse.dragging = true
        }
      
      }

      if (mouse.up === 1){
        this.select = mouse.dragging = false
        dragging.visible = false
      }

      if (this.select){

        dragging.setID(this.id)
        this.visible     = false
        dragging.visible = true
        this.move(mouse)
        dragging.copy(this)

      }else{

        this.visible     = true

        var _meCell = grid.children[this.id]
  
        if (DEVGAME.collision.rectToRect(this, _meCell)){
          this.set(_meCell.getX(), _meCell.getY())
        }

      }

    }

  }


  var Dragging = function(x, y, size, fill, color1, color2){
    DEVGAME.entity.Rect.call(this, x, y, size, size)
    this.id      = 0
    this.color1  = color1 || '#000'
    this.color2  = color2 || '#000'
    this.fill    = fill   || false
    this.visible = false
  }

  Dragging.prototype = Object.create(DEVGAME.entity.Rect.prototype)

  Dragging.prototype.setID = function(id){
    this.id = id
  }

  Dragging.prototype.draw = Cell.prototype.draw

  var dragging = new Dragging(0, 0, size, true, '#000', '#FFF')

  var pieces = new DEVGAME.Container() 

  for (var y = 0; y < rows; y++){
    for (var x = 0; x < cols; x++){

      var _id = grid.children.length

      grid.addChild(new Cell(_id, x, y, size))
      pieces.addChild(new Cell(_id, DEVGAME.random(canvas.clientWidth-size), DEVGAME.random(canvas.clientHeight-size), size, true, true, '#00A', '#FFF'))

    }
  }

  stage.addChild(grid, pieces, dragging, mouse)

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

    //clear mouse
    mouseDown = mouseUp = null

    //draw fps
    context.textAlign = 'left'
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
    mouseDown = event.which
  }, false)

  canvas.addEventListener('mouseup',function(event){
    mouseUp = event.which
  }, false)

})(window, document, DEVGAME)
