Entity = (x=0, y=0, width=0, height=0) ->
  @x = x
  @y = y
  @layer = 0
  @width = width
  @height = height
  @dx = 0
  @dy = 0
  @speed = 0
  @color = '#000'
  @frame = 0
  @frameCurrent = 0
  @listen  = {}
  @super = Object.create(Entity.prototype)
  @

Entity.prototype.draw  = require './draw'
Entity.prototype.move  = require './move'
Entity.prototype.on    = require './on'
Entity.prototype.emit  = require './emit'
Entity.prototype.logic = () ->

Entity.prototype.collision     = require './collision'
Entity.prototype.collisionRect = require './collision/rect'

module.exports = Entity
