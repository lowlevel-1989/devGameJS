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

  @_buffer = {}

  @color = '#000'

  @visible = true

  return @


Generic.prototype = Object.create Point.prototype

Generic.prototype.setContext = (context) ->
  
  context.imageSmoothingEnabled = false

  @context = context

  @_buffer.canvas   = document.createElement 'canvas'
  @_buffer.context  = @_buffer.canvas.getContext '2d'
  
  @_buffer.context.imageSmoothingEnabled = false
  
  @_buffer.canvas.width  = context.canvas.clientWidth
  @_buffer.canvas.height = context.canvas.clientHeight

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

Generic.prototype.draw = () ->

Generic.prototype.exec = () ->
  @logic()
  @_save()
  
  if (@parent and @parent.visible) and @visible
    @draw()

  @_restore()

module.exports = Generic
