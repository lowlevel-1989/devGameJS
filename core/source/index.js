/* global devGameJs */

//====================Variables Privadas========================

//Manejo del canvas
var canvas = require('./_canvas.js')();

//objetos del juego
var gameObjects = [];

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

var typeScale  = 'absolute';

   
//============================Metodos Privados===========================

//Manejo de evento del teclado 
window.addEventListener('keydown', function (eEvent) {
   oGameExecution.keyPush(eEvent);
}, false);

window.addEventListener('keyup', function (eEvent) {
   oGameExecution.keyPush(eEvent);
}, false);

//Manejo de las rotaciones
var orientation;

window.addEventListener('resize', function (eEvent) {
   
   if (orientation !== window.orientation){

      orientation = window.orientation;
      
      pfSetScale();
   }
}, true);

//Ejecuta los metodos de los objeto del juego
var fpCallGameObjectMethods = function(sMethodName, canvas, gameObjs){
   var oCurrentGameObject;
   var nObjectCount;
   for (nObjectCount in gameObjects) {
      oCurrentGameObject = gameObjects[nObjectCount];
      if (typeof oCurrentGameObject[sMethodName] === 'function')
         oCurrentGameObject[sMethodName](canvas, gameObjs);
   }
};

var oGameExecution = {
   //Elimina objetos del juego
   remove : function () {
      gameObjects = gameObjects.filter(function(item){
         return item.dead !== true;
      });
   },

   preUpdate: function() {
      fpCallGameObjectMethods('preUpdate', canvas, gameObjects);
   },

   //Actualiza objetos del juego
   update : function () {
      fpCallGameObjectMethods('update', canvas);
      //Reordenamos los objetos por capas.
      gameObjects.sort(function(oObjA, oObjB) {
         return oObjA.layer - oObjB.layer;
      });

   },

   postUpdate: function() {
      fpCallGameObjectMethods('postUpdate', canvas, gameObjects);
   },
   
   //Dibuja objetos en el juego
   draw : function () {
      canvas.entitiesContext.clearRect  (0, 0, canvas.entities.width, canvas.entities.height);
      fpCallGameObjectMethods('draw', {

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
      fpCallGameObjectMethods(sEventType, nKeyCode);
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
var getRequestAnimationFrame = require('./_getRequestAnimationFrame');

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
         gameObjects : gameObjects,
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

var objects = require('./entities/objects')(gameObjects);

var pfSetScale = function(type){

   typeScale = type ? type : typeScale;

   var dpr   = window.devicePixelRatio;
   var w     = canvas.entities.width;
   var h     = canvas.entities.height;
   var scale = Math.min(window.innerHeight / h, window.innerWidth / w);

   typeScale = typeScale.toLowerCase();
   
   switch(typeScale) {
      case 'to fill':
         canvas.background.style.width  = canvas.entities.style.width  = '100%';
         canvas.background.style.height = canvas.entities.style.height = '100%';
         break;
      case 'aspect fit':
         canvas.background.style.width  = canvas.entities.style.width  = (w * scale) + 'px';
         canvas.background.style.height = canvas.entities.style.height = (h * scale) + 'px';
         canvas.background.style.left   = canvas.entities.style.left   = (window.innerWidth  * 0.5  - w * scale * 0.5) + 'px';
         canvas.background.style.top    = canvas.entities.style.top    = (window.innerHeight * 0.5  - h * scale * 0.5) + 'px';
         break;
      case 'aspect fill':
         console.log('Trabajando...');
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
      pfSetScale(oSetting.scale);

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
      gameObjects.push(oFinalObject);
   },
   setup: pfSetup
};  
