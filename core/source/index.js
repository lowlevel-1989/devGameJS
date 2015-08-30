var _canvas      = require('./_canvas');
var _gameObjects = require('./_gameObjects');
var _objects     = require('./objects');
var _setup       = require('./_config');
var _random      = require('./_random');
var _version     = require('./_version');
var _fps         = require('./_fps');
var _state       = require('./_state');
var _module      = require('./_module');
var _getRequestAnimationFrame = require('./_getRequestAnimationFrame');
var _callGameObjectMethods    = require('./_callGameObjectMethods');

var gameObjs = _gameObjects.all();
   
//============================Metodos Privados===========================

//Manejo de evento del teclado 
window.addEventListener('keydown', function (eEvent) {
   oGameExecution.keyPush(eEvent);
}, false);

window.addEventListener('keyup', function (eEvent) {
   oGameExecution.keyPush(eEvent);
}, false);



var oGameExecution = {
   //Elimina objetos del juego
   remove : function () {
      _gameObjects.remove();
   },

   preUpdate: function() {
      _callGameObjectMethods('preUpdate',  _canvas);
   },

   //Actualiza objetos del juego
   update : function () {
      _callGameObjectMethods('update', _canvas);
      //Reordenamos los objetos por capas.
      _gameObjects.layer();

   },

   postUpdate: function() {
      _callGameObjectMethods('postUpdate', _canvas);
   },
   
   //Dibuja objetos en el juego
   draw : function () {
      _canvas.ctx.clearRect(0, 0, _canvas.main.width, _canvas.main.height);
      _callGameObjectMethods('draw', _canvas.ctx);

   },
   //Controla los eventos del teclado
   keyPush : function (eEvent) {
      var sEventType = eEvent.type;
      var nKeyCode   = eEvent.keyCode;
      // Control and F5 keys.
      if (nKeyCode !== 17 && nKeyCode !== 116) {
         eEvent.preventDefault();
      }
      _callGameObjectMethods(sEventType, nKeyCode);
   }
};

//Metodo privado que controla la ejecucion del juego
var fpGameInterval = function () {
   oGameExecution.remove();
   oGameExecution.preUpdate();
   oGameExecution.update();
   oGameExecution.postUpdate();
   oGameExecution.draw();
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
