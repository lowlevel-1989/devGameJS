(function(){

   devGameJs.addGameObject('ftp', function () {

      var sCurrent = '0';

      return {

         update : function() {
            sCurrent = devGameJs.module('ftp').update().toString();
         },

         draw : function (oCanvas) {
            devGameJs.module('text').draw(oCanvas, 0, 50, sCurrent, 16);
         }

      };

   });

})();