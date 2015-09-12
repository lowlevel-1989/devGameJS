var _gameExecution = require('../_gameExecution');

window.addEventListener('keydown', function(event){
   _gameExecution.keyPush(event);
}, false);

window.addEventListener('keyup',   function(event){
   _gameExecution.keyPush(event);
}, false);