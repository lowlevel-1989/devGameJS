(function(){

   'use strict';

   //Variables Privadas

   //manejo del canvas
   var oCanvas = {};

   //Control de depuracion

   var oDebug = {};
   oDebug.active = false;

   oDebug.show = function (){
      if (oDebug.active)
         document.getElementById('debug').style.display = 'block';
   };

   oDebug.set = function (debug) {
      oDebug.active = debug;
      oDebug.show();
   };

   var oScene = {
      current: 'init'
   };

   
   //objectos del juego
   var aGameObjects = [];
   var aToRemove    = [];

   //asigno escena principal
   aGameObjects[oScene.current] = [];

   //estados del GameLoop
   var oState  = {
      init    : 0,
      loading : 1,
      remove  : 2,
      update  : 3,
      draw    : 4,
      change  : 5
   };
   var nState = oState.init;

   //Modulos externos
   var oModules = {};

   //variables del control FPS
   var oFps      = {};
   oFps.max      = 60;
   oFps.interval = 1000/oFps.max;

   //Metodos Privados

   //Auto-Ajustar control de canvas
   (function () {
      oCanvas.main = document.getElementById('game');
      if(oCanvas.main) {
         oCanvas.mainContext   = oCanvas.main.getContext('2d');
         oCanvas.buffer        = document.createElement('canvas');
         oCanvas.buffer.width  = oCanvas.main.width;
         oCanvas.buffer.height = oCanvas.main.height;
         oCanvas.bufferContext = oCanvas.buffer.getContext('2d');
      }
   })();


   //Manejo de evento del teclado 
   window.addEventListener('keydown', function (eEvent) {
      oGameExecution.keyPush(eEvent);
   }, false);

   window.addEventListener('keyup', function (eEvent) {
      oGameExecution.keyPush(eEvent);
   }, false);

   //ejecuta metodos de cada objeto por individual
   var fpCallGameObjectMethods = function (sMethodName, oArgs) {
      var oCurrentGameObject;
      var nObjectCount;

      for (nObjectCount in aGameObjects[oScene.current]) {
         oCurrentGameObject = aGameObjects[oScene.current][nObjectCount];
         if (oCurrentGameObject[sMethodName])
            oCurrentGameObject[sMethodName](oArgs);
      }
      var scene = 'global';
      for (nObjectCount in aGameObjects[scene]) {
         oCurrentGameObject = aGameObjects[scene][nObjectCount];
         if (oCurrentGameObject[sMethodName])
            oCurrentGameObject[sMethodName](oArgs);
      }
   };


   var fpGameInterval = function () {

      oGameExecution.remove();
      oGameExecution.update();
      oGameExecution.debug();
      oGameExecution.draw();

   };

   var fpChangeState = function (state) {
      if (nState === oState.change && state === oState.remove){
         nState    = state;
         aGameObjects[oScene.last] = [];
      }else if (nState !== oState.change){
         nState = state;
         return true;
      }
      return;
   };

   var oGameExecution = {
      remove : function () {
         
         if (fpChangeState(oState.remove)){

            var nPos;
            var nCurrentObject;

            for (nPos in aToRemove) {
               nCurrentObject = aToRemove[nPos];
               aGameObjects[oScene.current].splice(nCurrentObject, 1);
            }

         }

         aToRemove = [];
      
      },
      update : function () {

         if (fpChangeState(oState.update)){

            fpCallGameObjectMethods('update', oCanvas);
            // Reordenamos los objetos por capas.
            aGameObjects[oScene.current].sort(function(oObjA, oObjB) {
               return oObjA.layer - oObjB.layer;
            });

         }

      },
      debug : function () {
         var scene = 'global';
         var objA  = aGameObjects[oScene.current].length;
         var objB  = aGameObjects[scene].length;
         if (oDebug.active)
            document.getElementById('objs').innerHTML = 'Cant.Obj.: ' + (objA + objB);
      },
      draw : function () {

         if (fpChangeState(oState.draw)){

            oCanvas.bufferContext.clearRect(0, 0, oCanvas.buffer.width, oCanvas.buffer.height);
            fpCallGameObjectMethods('draw', oCanvas);
            oCanvas.mainContext.clearRect(0, 0, oCanvas.main.width, oCanvas.main.height);
            oCanvas.mainContext.drawImage(oCanvas.buffer, 0, 0);
         }

      },
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


   var setState = function(state){
      nState = state;
   };

   var getState = function(){
      return nState;
   };

   var oPreStart = {
      
      buildModules : function () {
         var sModule;
         var oModule;

         var state = {
            get : getState,
            set : setState
         };

         var oBinding = {
            canvas   : oCanvas,
            state    : state,
            fps      : oFps,
            debug    : oDebug.active
         };

         // Build Modules.
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

      startGame : function () {
         var fpAnimationFrame = fpGetRequestAnimationFrame();
         var gameLoop = function(){
            if (nState !== oState.loading)
               fpGameInterval();
            fpAnimationFrame(gameLoop);
         };
         fpAnimationFrame(gameLoop);
      }

   };

   //Metodos Publicos
   window.devGameJs = {

      addGameObject : function (oEntities) {
         var oFinalObject;
         if (typeof oEntities.name === 'string') {
            oFinalObject = oEntities.obj();

            if (typeof oFinalObject === 'object') {
               oFinalObject.__id = oEntities.name;
               if (!aGameObjects[oEntities.scene])
                  aGameObjects[oEntities.scene] = [];
               aGameObjects[oEntities.scene].push(oFinalObject);
            }
         }
      },

      removeGameObject : function (sObjectId) {
         if (typeof sObjectId === 'string') {
            var oCurrentGameObject;
            var nObjectCount       = 0;

            for (nObjectCount in aGameObjects[oScene.current]) {
               oCurrentGameObject = aGameObjects[oScene.current][nObjectCount];
               if (oCurrentGameObject.__id === sObjectId) {
                  aToRemove.push(nObjectCount);
               }
            }
         }
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

      setup: function (oSetting) {
         if (oSetting.debug)
            oDebug.set(oSetting.debug);
         if (oSetting.width)
            oCanvas.buffer.width  = oCanvas.main.width  = oSetting.width;
         if (oSetting.height)
            oCanvas.buffer.height = oCanvas.main.height = oSetting.height;
      },

      startGame : function () {
         oPreStart.buildModules();
         oPreStart.startGame();
      }
   };

})();