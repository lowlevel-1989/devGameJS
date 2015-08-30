var _canvas      = require('./_canvas');
var _gameObjects = require('./_gameObjects');
var _objects     = require('./objects');
var _setup       = require('./_config');
var _version     = require('./_version');
var _fps         = require('./_fps');
var _state       = require('./_state');
var _random      = require('./plus/_random');
var _module      = require('./plus/_module');
var _gameExecution            = require('./_gameExecution');
var _getRequestAnimationFrame = require('./_getRequestAnimationFrame');

var gameObjs = _gameObjects.all();
   
//Manejo de evento del teclado 
window.addEventListener('keydown', function (eEvent) {
   _gameExecution.keyPush(eEvent);
}, false);

window.addEventListener('keyup', function (eEvent) {
   _gameExecution.keyPush(eEvent);
}, false);


//Metodo privado que controla la ejecucion del juego
var fpGameInterval = function () {
   _gameExecution.remove();
   _gameExecution.preUpdate();
   _gameExecution.update();
   _gameExecution.postUpdate();
   _gameExecution.draw();
};

//Metodo que genera el gameLoop

//Metodo privado para cargar modulos e inicializar juego
var oPreStart = {
   //Construye los modulos externos
   buildModules : _module.build,
   //Inicia el gameLoop
   startGame : function () {
      var fpAnimationFrame = _getRequestAnimationFrame(_fps.interval);
      var PAUSE = _state.getAll().PAUSE;
      var STATE = _state.get;
      var gameLoop = function(){
         if (STATE() !== PAUSE)
            fpGameInterval();
         fpAnimationFrame(gameLoop);
      };
      fpAnimationFrame(gameLoop);
   }

};

window.devGameJs = {
   objects: _objects,
   ext : {},
   startGame : function () {
      oPreStart.buildModules();
      oPreStart.startGame();
   },
   addModule : _module.add,
   module: _module.get,
   addObject : function (objectBuilder) {
      var obj;
      obj = objectBuilder;
      if (obj.init)
         obj.init(_canvas);
      _gameObjects.add(obj);
   },
   random: _random,
   setup: _setup,
   version: _version
};  
