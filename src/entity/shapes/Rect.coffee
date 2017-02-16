CONST   = require '../../const'
extend  = require '../../extend'
Generic = require '../Generic'

collision = require '../../collision'
###
@class
@memberof DEVGAME.entity
@param x {number} The X coordinate of the upper-left corner of the rectangle
@param y {number} The Y coordinate of the upper-left corner of the rectangle
@param width {number} The overall width of the rectangle
@param height {number} The overall height of this rectangle
###
Rect = (x=0, y=0, width=0, height=0, fill=false) ->

  Generic.call(@, x, y)

  ###
  @member {number}
  @default 0
  ###
  @width = width

  ###
  @member {number}
  @default 0
  ###
  @height = height

  @fill = fill

  @sprite = null

  ###
  The  type of the object

  @member {number}
  ###
  @type = CONST.SHAPES.RECT

  return @


extend Rect, Generic

Rect.prototype.setSprite = (sprite) ->
  @sprite = sprite

###
Creates a clone od this Rectangle

@return {DEVGAME.entity.Rect}
###
Rect.prototype.clone = () -> new Rect(@x, @y, @width, @height)


Rect.prototype.draw = () ->
    context = @context || @parent.context
    if @sprite
      context.drawImage @sprite.get(), @sprite.sx, @sprite.sy, @sprite.swidth, @sprite.sheight, @x, @y, @width, @height
    else if @fill == true
      context.fillStyle   = @color
      context.fillRect @x, @y, @width, @height
    else
      context.strokeStyle = @color
      context.beginPath()
      context.rect @x, @y, @width, @height
      context.closePath()
      context.stroke()
    

Rect.prototype.collision = (rect) -> collision.rectToRect this, rect
Rect.prototype.collisionCircle = (circle) -> collision.rectToCircle this, circle

Generic.prototype.exec = () ->
  @logic()
  if @sprite
    @sprite.exec()

module.exports = Rect
