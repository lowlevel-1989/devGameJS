DevGame = require './core'


DevGame.prototype.animate  = require './animate'
DevGame.prototype.entities = require './entities'
DevGame.prototype.delta = require './delta'
DevGame.prototype.emit = require './entity/emit'
DevGame.prototype.sortLayer = require './sortLayer'
DevGame.Entity = require './entity'

module.exports = DevGame
