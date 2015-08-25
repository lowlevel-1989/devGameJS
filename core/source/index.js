var canvas      = require('./_canvas');
var gameObjects = require('./_gameObjects');
var objects     = require('./entities/objects');
var scale       = require('./_scale');
var debug       = require('./_console');
var getRequestAnimationFrame = require('./_getRequestAnimationFrame');

var gameObjs = gameObjects.all();

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


//Ejecuta los metodos de los objeto del juego
var callGameObjectMethods = require('./_callGameObjectMethods');

var oGameExecution = {
   //Elimina objetos del juego
   remove : function () {
      gameObjects.remove();
   },

   preUpdate: function() {
      callGameObjectMethods('preUpdate', canvas);
   },

   //Actualiza objetos del juego
   update : function () {
      callGameObjectMethods('update', canvas);
      //Reordenamos los objetos por capas.
      gameObjects.layer();

   },

   postUpdate: function() {
      callGameObjectMethods('postUpdate', canvas);
   },
   
   //Dibuja objetos en el juego
   draw : function () {
      canvas.entitiesContext.clearRect  (0, 0, canvas.entities.width, canvas.entities.height);
      callGameObjectMethods('draw', {

         background: canvas.backgroundContext,
         entities: canvas.entitiesContext

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
      callGameObjectMethods(sEventType, nKeyCode);
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
                           background: canvas.backgroundContext,
                           entities: canvas.entitiesContext
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
      var fpAnimationFrame = getRequestAnimationFrame(oFps.interval);
      var gameLoop = function(){
         if (nState !== oState.pause)
            fpGameInterval();
         fpAnimationFrame(gameLoop);
      };
      fpAnimationFrame(gameLoop);
   }

};


var pfSetup = function (oSetting) {
   if (oSetting.title)
      document.title = oSetting.title;
   if (oSetting.width)
      canvas.background.width  = canvas.entities.width  = oSetting.width;
   if (oSetting.height)
      canvas.background.height = canvas.entities.height = oSetting.height;
   if (oSetting.scale)
      scale(oSetting.scale);
   if (oSetting.debug)
      debug();
};


window.devGameJs = {
   objects: objects,
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
   addGameObject : function (fpObjectBuilder) {
      var oFinalObject;
      oFinalObject = fpObjectBuilder;
      if (oFinalObject.init)
         oFinalObject.init();
      gameObjects.add(oFinalObject);
   },
   setup: pfSetup
};  
