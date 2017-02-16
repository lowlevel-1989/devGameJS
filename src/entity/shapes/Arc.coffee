CONST   = require '../../const'
extend  = require '../../extend'
Generic = require '../Generic'

###
@class
@memberof DEVGAME.entity
###
Arc = (x=0, y=0, radius=0, startAngle=0, endAngle=0, anticlockwise=false) ->

  Generic.call(@, x, y)

  @fill   = false

  @radius = radius

  @startAngle = startAngle

  @endAngle = endAngle

  @anticlockwise = anticlockwise

  ###
  The  type of the object

  @member {number}
  ###
  @type = CONST.SHAPES.ARC

  return @


extend Arc, Generic

###
Creates a clone od this Arc

@return {DEVGAME.entity.Arc}
###
Arc.prototype.clone = () -> new Arc(@x, @y, @radius, @startAngle, @endAngle, @anticlockwise)

Arc.prototype.draw = () ->
  if @fill
    context = @context || @parent.context
    context.fillStyle = @color
    context.beginPath()
    context.arc @x, @y, @radius, @startAngle, @endAngle, @anticlockwise
    context.closePath()
    context.fill()
  else
    context = @context || @parent.context
    context.strokeStyle = @color
    context.beginPath()
    context.arc @x, @y, @radius, @startAngle, @endAngle, @anticlockwise
    context.closePath()
    context.stroke()

module.exports = Arc
