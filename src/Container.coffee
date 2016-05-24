CONST  = require './const'
Point  = require './entity/Point'

###
@class
@memberof DEVGAME
###
Container = (x=0, y=0) ->

  Point.call(@, x, y)
  
  @context  = null

  @visible  = true

  @parent   = null

  @children = []

  return @
  
Container.prototype = Object.create Point.prototype

Container.prototype.exec = () ->
  for child in @children
    child.exec()

Container.prototype.addChild = () ->
  for child in arguments
    child.parent = @
    @children.push child

module.exports = Container
