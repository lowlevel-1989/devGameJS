require('./events');

var _gameObjects  = require('./_gameObjects');
var _objects      = require('./objects');
var _setup        = require('./_config');
var _version      = require('./_version');
var _random       = require('./plus/_random');
var _module       = require('./plus/_module');
var _startGame    = require('./_startGame');

window.devGameJs = {
   ext       : {},
   objects   : _objects,
   startGame : _startGame,
   addModule : _module.add,
   module    : _module.get,
   addObject : _gameObjects.add,
   random    : _random,
   setup     : _setup,
   version   : _version
};  
