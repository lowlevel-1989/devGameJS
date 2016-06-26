CONST = require '../const'
Point = require './Point'

Generic = (x=0, y=0) ->

  Point.call(@, x, y)

  @direction = 1
  @hSpeed = 0
  @vSpeed = 0
  @speed  = 0
  @xPrevious = x
  @yPrevious = y
  @xStart = x
  @yStart = y

  @parent  = null
  @context = null

  @color = '#000'

  @visible = true

  return @


Generic.prototype = Object.create Point.prototype

Generic.prototype.setContext = (context) ->
  
  context.imageSmoothingEnabled = false

  @context = context


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
  @xPrevious = @x
  @yPrevious = @y

  @x = @getX()
  @y = @getY()

Generic.prototype._restore = () ->
  @x = @xPrevious
  @y = @yPrevious

Generic.prototype.logic = () ->

Generic.prototype.draw   = () ->
Generic.prototype.render = () ->
  @_save()
  
  if (@parent and @parent.visible) and @visible
    @draw()

  @_restore()

Generic.prototype.exec = () ->
  @logic()

module.exports = Generic
