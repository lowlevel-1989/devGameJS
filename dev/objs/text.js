(function(){

   devGameJs.addGameObject('text', function () {

      return {

         draw : function (canvas) {
            
            devGameJs.module('text').draw(canvas, 0, 10, '04146081330', 16);
         
         }

      };

   });

})();