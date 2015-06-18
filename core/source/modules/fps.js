(function(){

   'use strict';

   devGameJs.addModule('fps', function (oBinding) {
      
      var nMax        = oBinding.fps.max;
      var nInterval   = oBinding.fps.interval;
      var nFrameCount = 0;
      var nCurrent    = 0;
      var last        = new Date().getTime();

      return {

         update : function () {

            var thisFrame = new Date().getTime();
            var diffTime  = Math.ceil(thisFrame - last);

            if (diffTime >= 1000) {

               nCurrent    = nFrameCount;
               nFrameCount = 0;
               last        = thisFrame;

            }

            nFrameCount++;
            return nCurrent;

         }
         
      };

   });

   //Renderizar modulo
   devGameJs.addGameObject({
      //objectos en escenario global no soporta capas.
      scene: 'global',
      name : 'fps',
      obj  : function () {

         var sCurrent = '0';

         return {

            update : function() {
               sCurrent = devGameJs.module('fps').update().toString();
            },

            draw : function () {
               devGameJs.module('text').draw(0, 10, 'ftp>' + sCurrent + '/60'  , 16);
            }

         };
      }

   });



})();