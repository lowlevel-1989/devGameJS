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

Container.prototype.render = () ->
  @_save()
  for child in @children
    child.context = @context if @context and child.context == null
    child.render()
  @_restore()


Container.prototype.exec = () ->
  @logic()
  @_save()
  for child in @children
    child.exec()
  @_restore()

Container.prototype.add = () ->
  for child in arguments
    
    child.context = @context if @context and child.context == null
    child.parent = @
    @children.push child

Container.prototype.get = (id) -> @children[id]

Container.prototype.forEach = (callback) -> @children.forEach callback

module.exports = Container
