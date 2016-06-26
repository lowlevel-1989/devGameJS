CONST   = require '../../const'
Arc = require './Arc'

collision = require '../../collision'

###
@class
@memberof DEVGAME.entity
###
Circle = (x=0, y=0, radius=0, fill=false) ->

  Arc.call(@, x, y, radius, 0, CONST.PI_2)

  @fill = fill

  ###
  The  type of the object

  @member {number}
  ###
  @type = CONST.SHAPES.CIRCLE

  return @


Circle.prototype = Object.create Arc.prototype


###
Creates a clone od this Arc

@return {DEVGAME.entity.Arc}
###
Circle.prototype.clone = () -> new Circle(@x, @y, @radius)

Circle.prototype.collision     = (circle) -> collision.circleToCircle this, circle
Circle.prototype.collisionRect = (rect) -> collision.circleToRect this, rect

module.exports = Circle
