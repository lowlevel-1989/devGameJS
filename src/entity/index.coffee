Entity = (context) ->
  @x = 0
  @y = 0
  @dx = 0
  @dy = 0
  @width = 0
  @height = 0
  @color = '#000'
  @frame = 0
  @frameCurrent = 0
  @context = context
  @listen  = {}
  @

Entity.prototype.draw = require './draw'
Entity.prototype.move = require './move'
Entity.prototype.on = require './on'
Entity.prototype.emit = require './emit'

module.exports = Entity
