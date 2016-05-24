CONST = require '../../const'
Point = require '../Point'

###
@class
@memberof DEVGAME.entity
###
Arc = (x=0, y=0, radius=0, startAngle=0, endAngle=0, anticlockwise=false) ->

  Point.call(@, x, y)

  @parent  = null
  @context = null

  @radius = radius

  @startAngle = startAngle

  @endAngle = endAngle

  @anticlockwise = anticlockwise

  @color = '#000'

  @visible = true

  ###
  The  type of the object

  @member {number}
  ###
  @type = CONST.SHAPES.ARC

  return @


Arc.prototype = Object.create Point.prototype

###
Creates a clone od this Arc

@return {DEVGAME.entity.Arc}
###
Arc.prototype.clone = () -> new Arc(@x, @y, @radius, @startAngle, @endAngle, @anticlockwise)

Arc.prototype.contains = () ->

Arc.prototype.logic = () ->

Arc.prototype.draw = () ->
  if (@parent and @parent.visible) or @visible

    if @parent
      x = @parent.x
      y = @parent.y
    else
      x = 0
      y = 0

    context = @context || @parent.context
    context.fillStyle = @color
    context.arc x + @x, y + @y, @radius, @startAngle, @endAngle, @anticlockwise
    context.fill()

Arc.prototype.exec = () ->
  @logic()
  @draw()

module.exports = Arc
