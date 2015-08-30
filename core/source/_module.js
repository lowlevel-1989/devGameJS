var _canvas      = require('./_canvas');
var _fps         = require('./_fps');
var _gameObjects = require('../_gameObjects').all();


var modules = {};

function build(){
   var sModule, oModule;

   var oBinding = {
      canvas      : {ctx: _canvas.ctx},
      fps         : _fps,
      gameObjects : _gameObjects,
      state       : $state
   };
}

/*
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
         canvas      : {ctx: _canvas.ctx},
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
   }*/