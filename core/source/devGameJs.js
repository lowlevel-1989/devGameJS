(function(){

   'use strict';

   //====================Variables Privadas========================

   
   //Manejo del canvas
   var oCanvas = {};

   //objetos del juego
   var id = 0;
   var aGameObjects = [];

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

   //Auto-Ajustar control de canvas
   oCanvas.main          = document.getElementById('game');
   oCanvas.mainContext   = oCanvas.main.getContext('2d');
   oCanvas.buffer        = document.createElement('canvas');
   oCanvas.buffer.width  = oCanvas.main.width;
   oCanvas.buffer.height = oCanvas.main.height;
   oCanvas.bufferContext = oCanvas.buffer.getContext('2d');
      
   //============================Metodos Privados===========================
   
   //Manejo de evento del teclado 
   window.addEventListener('keydown', function (eEvent) {
      oGameExecution.keyPush(eEvent);
   }, false);

   window.addEventListener('keyup', function (eEvent) {
      oGameExecution.keyPush(eEvent);
   }, false);
   
   //Ejecuta los metodos de los objeto del juego
   var fpCallGameObjectMethods = function (sMethodName, oArgs) {
      var oCurrentGameObject;
      var nObjectCount;
      for (nObjectCount in aGameObjects) {
         oCurrentGameObject = aGameObjects[nObjectCount];
         
         if (oCurrentGameObject[sMethodName])
            oCurrentGameObject[sMethodName](oArgs);
      }
   };

   var oGameExecution = {
      //Elimina objetos del juego
      remove : function () {
         aGameObjects = aGameObjects.filter(function(item){
            return item.dead !== true;
         });
      },
      //Actualiza objetos del juego
      update : function () {
         fpCallGameObjectMethods('update', oCanvas);
         //Reordenamos los objetos por capas.
         aGameObjects.sort(function(oObjA, oObjB) {
            return oObjA.layer - oObjB.layer;
         });

      },
      //Dibuja objetos en el juego
      draw : function () {
         oCanvas.bufferContext.clearRect(0, 0, oCanvas.buffer.width, oCanvas.buffer.height);
         fpCallGameObjectMethods('draw', oCanvas);
         oCanvas.mainContext.clearRect(0, 0, oCanvas.main.width, oCanvas.main.height);
         oCanvas.mainContext.drawImage(oCanvas.buffer, 0, 0);

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
      oGameExecution.update();
      oGameExecution.draw();
   };

   //Metodo que genera el gameLoop
   var fpGetRequestAnimationFrame = function () {
      return   window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               function (callback){
                  window.setTimeout(callback, oFps.interval);
               };
   };

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
            canvas      : oCanvas,
            fps         : oFps,
            gameObjects : aGameObjects,
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
         var fpAnimationFrame = fpGetRequestAnimationFrame();
         var gameLoop = function(){
            if (nState !== oState.pause)
               fpGameInterval();
            fpAnimationFrame(gameLoop);
         };
         fpAnimationFrame(gameLoop);
      }

   };

   //Metodo privado para instanciar clases 
   function $new() {
      var obj = Object.create(this);
      $init.apply(obj, arguments);
      return obj;
   }

   function $init() {
      this.x = 0;
      this.y = 0;
      this.width = 25;
      this.height = 25;
      this.vx = 0;
      this.vy = 0;
      this.gravity = 0.98;
      this.onAir = true;
      this.rebound = false;
      this.elastic = 0;
   }

   function $applyGravity() {
      if (this.rebound){
         this.vy = -this.vy * this.elastic;
         this.rebound = false;
      }
      this.vy += this.gravity;
      this.y  += this.vy;
   }

   function $delete() {
      this.dead = true;
   }

   var objects = {
      new: $new,
      applyGravity: $applyGravity,
      delete: $delete,
      layer: 9
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
         oFinalObject.id = id++;
         if (oFinalObject.init)
            oFinalObject.init();
         aGameObjects.push(oFinalObject);
      },
      setup: function (oSetting) {
         if (oSetting.width)
            oCanvas.buffer.width  = oCanvas.main.width  = oSetting.width;
         if (oSetting.height)
            oCanvas.buffer.height = oCanvas.main.height = oSetting.height;
      }
   };  

})();