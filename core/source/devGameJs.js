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

      preUpdate: function() {
         fpCallGameObjectMethods('preUpdate', oCanvas);
      },

      //Actualiza objetos del juego
      update : function () {
         fpCallGameObjectMethods('update', oCanvas);
         //Reordenamos los objetos por capas.
         aGameObjects.sort(function(oObjA, oObjB) {
            return oObjA.layer - oObjB.layer;
         });

      },

      postUpdate: function() {
         fpCallGameObjectMethods('postUpdate', oCanvas);
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
      oGameExecution.preUpdate();
      oGameExecution.update();
      oGameExecution.postUpdate();
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

   function $preUpdate() {
      for (var i in this.aPreUpdate){
         this.aPreUpdate[i].apply(this);
      }
   }

   function $postUpdate() {
      for (var i in this.aPostUpdate){
         this.aPostUpdate[i].apply(this);
      }
   }

   function $init() {
      this.x = 0;
      this.y = 0;
      this.width = 25;
      this.height = 25;
      this.vx = 0;
      this.vy = 0;
      this.aPreUpdate  = [];
      this.aPostUpdate = [];
      this.gravity = 0.98;
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

   function $setAnimations(oSetting) {
   
      this.sprite = {};
      this.animations = [];
      this.animationsCallback = [];
      this.animation  = oSetting.name[0];

      this.sprite.row    = oSetting.name.length;
      this.sprite.column = oSetting.frame;
      this.sprite.sheets = oSetting.sprite;
      this.sprite.width  = oSetting.width;
      this.sprite.height = oSetting.height;
      this.sw            = this.sprite.width/this.sprite.column;
      this.sh            = this.sprite.height/this.sprite.row;

      this.frameIndex = 0;
      this.tickCount  = 0;
      this.ticksPerFrame = oSetting.frameDelay;

      var name;
      for (var row = 0; row < this.sprite.row; row++ ){
         name = oSetting.name[row];
         this.animations[name] = [];
         for (var column = 0; column < this.sprite.column; column++){
            this.animations[name].push({
               sx: column*this.sw,
               sy: row*this.sh
            }); 
         }
      }

      var key = 'animation';
      this.aPostUpdate[key] = function(){
         this.tickCount++;
         if (this.ticksPerFrame && this.tickCount > this.ticksPerFrame){
            this.tickCount = 0;
            this.frameIndex = ++this.frameIndex % this.sprite.column;
         }
         if (this.ticksPerFrame && this.frameIndex === (this.sprite.column-1)){
            var callback = this.animationsCallback[this.animation];
            if(callback)
               callback.apply(this, arguments);
         }
      };


      this.renderAnimation = function(canvas){
         canvas.bufferContext.drawImage(
            this.sprite.sheets, 
            this.animations[this.animation][this.frameIndex].sx, 
            this.animations[this.animation][this.frameIndex].sy,
            this.sw,
            this.sh,
            this.x, 
            this.y,
            this.width,
            this.height
         );
      };

      this.setFrameDelay = function(frameDelay){
         this.tickCount = 0;
         this.ticksPerFrame = frameDelay;
      };

      this.setAnimation = function (name, callback){
         this.animation  = name;
         this.tickCount  = 0;
         this.frameIndex = 0;
         if (typeof callback === 'function')
            this.animationsCallback[name] = callback;
      };

      this.getAnimation = function (){
         return this.animation;
      };
   }

   function $delete() {
      this.dead = true;
   }

   var objects = {
      new: $new,
      delete: $delete,
      applyGravity: function(){
         var key = 'gravity';
         this.aPreUpdate[key] = $applyGravity;
      },
      setAnimations: $setAnimations,
      preUpdate: $preUpdate,
      postUpdate: $postUpdate,
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