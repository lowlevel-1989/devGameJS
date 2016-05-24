CONST   = require '../../const'
Generic = require '../Generic'

###
@class
@memberof DEVGAME.entity
@param x {number} The X coordinate of the upper-left corner of the rectangle
@param y {number} The Y coordinate of the upper-left corner of the rectangle
@param width {number} The overall width of the rectangle
@param height {number} The overall height of this rectangle
###
Rect = (x=0, y=0, width=0, height=0) ->

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

  ###
  The  type of the object

  @member {number}
  ###
  @type = CONST.SHAPES.RECT

  return @


Rect.prototype = Object.create Generic.prototype

###
Creates a clone od this Rectangle

@return {DEVGAME.entity.Rect}
###
Rect.prototype.clone = () -> new Rect(@x, @y, @width, @height)


Rect.prototype.draw = () ->
    context = @context || @parent.context
    context.fillStyle = @color
    context.fillRect @x, @y, @width, @height

module.exports = Rect
