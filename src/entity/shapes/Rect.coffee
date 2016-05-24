CONST = require '../../const'
Point = require '../Point'

###
@class
@memberof DEVGAME.entity
@param x {number} The X coordinate of the upper-left corner of the rectangle
@param y {number} The Y coordinate of the upper-left corner of the rectangle
@param width {number} The overall width of the rectangle
@param height {number} The overall height of this rectangle
###
Rect = (x=0, y=0, width=0, height=0) ->

  Point.call(@, x, y)

  @parent  = null
  @context = null

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

  @color = '#000'

  @visible = true

  ###
  The  type of the object

  @member {number}
  ###
  @type = CONST.SHAPES.RECT

  return @


Rect.prototype = Object.create Point.prototype

###
Creates a clone od this Rectangle

@return {DEVGAME.entity.Rect}
###
Rect.prototype.clone = () -> new Rect(@x, @y, @width, @height)


###
Checks whether the x and y coordinates given are contained within this Rectangle

@param x {number} The X coordinate of the point to test
@param y {number} The Y coordinate of the point to test
@return {boolean} Wheter the x/y coordinates are within this Rectangle
###
Rect.prototype.contains = () ->
  if @width <= 0 or @height <= 0
    return false

  if x >= @x and x < @x + @width
    if y >= @y and y < @y + @height
      return true

  return false

Rect.prototype.logic = () ->

Rect.prototype.draw = () ->
  if (@param and @parent.visible) or @visible

    if @parent
      x = @parent.x
      y = @parent.y
    else
      x = 0
      y = 0

    context = @context || @parent.context
    context.fillStyle = @color
    context.fillRect x + @x, y + @y, @width, @height

Rect.prototype.exec = () ->
  @logic()
  @draw()

module.exports = Rect
