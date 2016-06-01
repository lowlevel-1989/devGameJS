CONST   = require '../../const'
Arc = require './Arc'

###
@class
@memberof DEVGAME.entity
###
Circle = (x=0, y=0, radius=0) ->

  Arc.call(@, x, y, radius, 0, CONST.PI_2)

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

module.exports = Circle
