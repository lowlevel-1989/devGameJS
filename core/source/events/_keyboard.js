var _gameExecution = require('../_gameExecution');

window.addEventListener('keydown', function (eEvent) {
   _gameExecution.keyPush(eEvent);
}, false);

window.addEventListener('keyup', function (eEvent) {
   _gameExecution.keyPush(eEvent);
}, false);