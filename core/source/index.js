var _canvas      = require('./_canvas');
var _gameObjects = require('./_gameObjects');
var _objects     = require('./objects');
var _setup       = require('./_config');
var _random      = require('./_random');
var _getRequestAnimationFrame = require('./_getRequestAnimationFrame');
var _callGameObjectMethods    = require('./_callGameObjectMethods');

var gameObjs = _gameObjects.all();

//Modulos externos
var oModules = {};

//Variables del control FPS
var oFps      = {};
oFps.max      = 60;
oFps.interval = 1000/oFps.max;

//Estado del core
var oState  = {
   init  : 0,
   pause : 1
};
var nState = oState.init;

   
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
      _callGameObjectMethods('update',     _canvas);
      //Reordenamos los objetos por capas.
      _gameObjects.layer();

   },

   postUpdate: function() {
      _callGameObjectMethods('postUpdate', _canvas);
   },
   
   //Dibuja objetos en el juego
   draw : function () {
      _canvas.entitiesContext.clearRect(0, 0, _canvas.entities.width, _canvas.entities.height);
      _callGameObjectMethods('draw', {
                                          background: _canvas.backgroundContext,
                                          entities:   _canvas.entitiesContext
      });

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
   buildModules : function () {
      var sModule;
      var oModule;


      function $state(state){
         if (typeof state === 'undefined')
            return state;
         else
            nState = state;
      }

      //Objeto publico dentro del modulo
      var oBinding = {
         canvas      : {
                           background: _canvas.backgroundContext,
                           entities:   _canvas.entitiesContext
                        },
         fps         : oFps,
         gameObjects : gameObjs,
         state       : $state
      };

      for (sModule in oModules) {
         if (oModules.hasOwnProperty(sModule)) {
            oModule = oModules[sModule];
            if (oModule) {
               oModule.oInstance = oModule.fpBuilder(oBinding);
               if (oModule.oInstance.init)
                  oModule.oInstance.init();
            }
         }
      }
   },
   //Inicia el gameLoop
   startGame : function () {
      var fpAnimationFrame = _getRequestAnimationFrame(oFps.interval);
      var gameLoop = function(){
         if (nState !== oState.pause)
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
   addModule : function (sModuleId, fpBuilder) {
      if (typeof sModuleId === 'string') {
         if (!oModules[sModuleId]) {
            oModules[sModuleId] = {
               fpBuilder : fpBuilder
            };
         }
      }
   },
   module: function (sModule) {
      var oModule;
      if (oModules.hasOwnProperty(sModule)) {
         oModule = oModules[sModule];
         return oModule.oInstance;
      }
   },
   addObject : function (objectBuilder) {
      var obj;
      obj = objectBuilder;
      if (obj.init)
         obj.init();
      _gameObjects.add(obj);
   },
   random: _random,
   setup: _setup
};  
