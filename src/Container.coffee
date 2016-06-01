CONST   = require './const'
Generic = require './entity/Generic'

###
@class
@memberof DEVGAME
###
Container = (x=0, y=0) ->

  Generic.call(@, x, y)
  
  @children = []

  return @
  
Container.prototype = Object.create Generic.prototype

Container.prototype.exec = () ->
  @logic()
  @_save()
  for child in @children
    child.context = @context if @context and child.context == null
    child.exec()
  @_restore()

Container.prototype.addChild = () ->
  for child in arguments
    
    child.context = @context if @context and child.context == null
    child.parent = @
    @children.push child

module.exports = Container
