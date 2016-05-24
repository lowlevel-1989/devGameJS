CONST = require '../const'
Point = require './Point'

Generic = (x=0, y=0) ->

  Point.call(@, x, y)

  @_x = x
  @_y = y

  @parent  = null
  @context = null

  @color = '#000'

  @visible = true

  return @


Generic.prototype = Object.create Point.prototype

Generic.prototype.getX = () ->
  if @parent
    return @parent.x + @x
  else
    return @x

Generic.prototype.getY = () ->
  if @parent
    return @parent.y + @y
  else
    return @y

Generic.prototype._save = () ->
  @_x = @x
  @_y = @y

  @x = @getX()
  @y = @getY()

Generic.prototype._restore = () ->
  @x = @_x
  @y = @_y

Generic.prototype.logic = () ->

Generic.prototype.draw = () ->

Generic.prototype.exec = () ->
  @logic()
  @_save()
  
  if (@parent and @parent.visible) and @visible
    @draw()

  @_restore()

module.exports = Generic
