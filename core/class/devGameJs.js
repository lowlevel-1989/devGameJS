(function(){

   //Variables Privadas

   //manejo del canvas
   var oCanvas = {
      main          : null,
      mainContext   : null,
      buffer        : null,
      bufferContext : null
   };

   //objectos del juego
   var aGameObjects = [];
   var aToRemove    = [];

   //estados del GameLoop
   var oStates  = {
      init    : 0,
      loading : 1,
      remove  : 2,
      update  : 3,
      draw    : 4
   };
   var nState = oStates.init;


   var oModules = {};

   //variables del control FPS
   var oFps = {
      maxFps      : 60,
      frameCount  : 0,
      currentFps  : 0,
      lastFps     : new Date().getTime(),
      intervalFps : 1000/60
   };

   //Metodos Privados
   (function () {
      oCanvas.main = document.getElementById('game');
      if(oCanvas.main !== null) {
         oCanvas.mainContext   = oCanvas.main.getContext('2d');
         oCanvas.buffer        = document.createElement('canvas');
         oCanvas.buffer.width  = oCanvas.main.width;
         oCanvas.buffer.height = oCanvas.main.height;
         oCanvas.bufferContext = oCanvas.buffer.getContext('2d');
      }
   })();

   window.addEventListener('keydown', function (eEvent) {
      oGameExecution.keyPush(eEvent);
   }, false);

   window.addEventListener('keyup', function (eEvent) {
      oGameExecution.keyPush(eEvent);
   }, false);

   var fpGameInterval = function () {
      oGameExecution.remove();
      oGameExecution.update();
      oGameExecution.draw();
   };

   var fpCallGameObjectMethods = function (sMethodName, oArgs) {
      var oCurrentGameObject = null;
      var nObjectCount       = 0;
      var nGameObjectsLength = aGameObjects.length;

      for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount++) {
         oCurrentGameObject = aGameObjects[nObjectCount];
         if (oCurrentGameObject[sMethodName])
            oCurrentGameObject[sMethodName](oArgs);
      }
   };

   var oGameExecution = {
      remove : function () {
         
         if (nState !== oStates.remove)
            nState = oStates.remove;

         var nRemoveLength  = aToRemove.length;
         var nCount         = 0;
         var nCurrentObject = 0;

         for (nCount = 0; nCount < nRemoveLength; nCount++) {
            nCurrentObject = aToRemove[nCount];
            aGameObjects.splice(nCurrentObject, 1);
         }

         aToRemove = [];
      },
      update : function () {

         if (nState !== oStates.update)
            nState = oStates.update;


         fpCallGameObjectMethods('update', oCanvas);
         // Reordenamos los objetos en el eje Z.
         aGameObjects.sort(function(oObjA, oObjB) {
            return oObjA.z - oObjB.z;
         });
      },
      draw : function () {

         if (nState !== oStates.draw)
            nState = oStates.draw;

         oCanvas.bufferContext.clearRect(0, 0, oCanvas.buffer.width, oCanvas.buffer.height);
         fpCallGameObjectMethods('draw', oCanvas);
         oCanvas.mainContext.clearRect(0, 0, oCanvas.main.width, oCanvas.main.height);
         oCanvas.mainContext.drawImage(oCanvas.buffer, 0, 0);
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
                  window.setTimeout(callback, devGameJs.getIntervalFps());
               };
   };


   var setState = function(state){
      nState = state;
   };

   var oPreStart = {
      
      buildModules : function () {
         var sModule;
         var oModule;

         var state = {
            get : nState,
            set : setState
         };

         var oBinding = {
            canvas   : oCanvas,
            state    : state
         };

         // Build Modules.
         for (sModule in oModules) {
            if (oModules.hasOwnProperty(sModule)) {
               oModule = oModules[sModule];
               if (typeof oModule !== 'undefined') {
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
            if (nState !== oStates.loading)
               fpGameInterval();
            fpAnimationFrame(gameLoop);
         };
         fpAnimationFrame(gameLoop);
      }

   };

   //Metodos Publicos
   window.devGameJs = {
      addGameObject : function (sObjectId, fpObjectBuilder) {
         var oFinalObject = null;
         if (typeof sObjectId === 'string') {
            oFinalObject = fpObjectBuilder();

            if (typeof oFinalObject === 'object') {
               oFinalObject.__id = sObjectId;
               aGameObjects.push(oFinalObject);
            }
         }
      },
      removeGameObject : function (sObjectId) {
         if (typeof sObjectId === 'string') {
            var oCurrentGameObject = null;
            var nObjectCount       = 0;
            var nGameObjectsLength = aGameObjects.length;

            for (nObjectCount = 0; nObjectCount < nGameObjectsLength; nObjectCount++) {
               oCurrentGameObject = aGameObjects[nObjectCount];
               if (oCurrentGameObject.__id === sObjectId) {
                  aToRemove.push(nObjectCount);
               }
            }
         }
      },
      addModule : function (sModuleId, fpBuilder) {
         if (typeof sModuleId === 'string') {
            if (typeof oModules[sModuleId] === 'undefined') {
               oModules[sModuleId] = {
                  fpBuilder : fpBuilder,
                  oInstance : null
               };
            }
         }
      },
      getModule: function(sModule){
         var oModule;
         if (oModules.hasOwnProperty(sModule)) {
            oModule = oModules[sModule];
            return oModule.oInstance;
         }
      },
      getIntervalFps : function () {
         return oFps.intervalFps;
      },
      startGame : function () {
         oPreStart.buildModules();
         oPreStart.startGame();
      }
   };

})();