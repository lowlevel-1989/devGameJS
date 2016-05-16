Generic = require '../generic'

Rect = (x, y, width, height) ->
  Generic.call @, x, y
  @width   = width
  @height  = height
  @super   = Object.create Rect.prototype
  @_figure = 'rect'
  @

Rect.prototype = Object.create Generic.prototype

Rect.prototype.draw = require './draw'

module.exports = Rect
