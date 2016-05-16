Generic = (x=0, y=0) ->
  @x = x
  @y = y
  @layer = 0
  @dx = 0
  @dy = 0
  @speed  = 0
  @vSpeed = 0
  @hSpeed = 0
  @color  = '#000'
  @listen  = {}
  @super = Object.create(Generic.prototype)
  @

Generic.prototype.logic = () ->
Generic.prototype.draw  = () ->
Generic.prototype.move  = require './move'
Generic.prototype.on    = require './on'

module.exports = Generic
