var _gameExecution = require('./_gameExecution');

var gameInterval = function () {
   _gameExecution.remove();
   _gameExecution.preUpdate();
   _gameExecution.update();
   _gameExecution.postUpdate();
   _gameExecution.draw();
};

module.exports = gameInterval;