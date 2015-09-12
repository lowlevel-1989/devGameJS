var _fps          = require('./_fps');
var _state        = require('./_state');
var _module       = require('./plus/_module');
var _gameInterval = require('./_gameInterval');
var _getRequestAnimationFrame = require('./_getRequestAnimationFrame');

function startGame(){
   // devGameJs.addObject = function(){};
   // devGameJs.addModule = function(){};
   var animationFrame = _getRequestAnimationFrame(_fps.interval);
   var PAUSE = _state.getAll().PAUSE;
   var STATE = _state.get;
   var gameLoop = function(){
      if (STATE() !== PAUSE)
         _gameInterval();
      animationFrame(gameLoop);
   };
   animationFrame(gameLoop);
}

module.exports = function(){
   _module.build();
   startGame();
};