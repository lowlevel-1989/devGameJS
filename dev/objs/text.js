(function(){

   devGameJs.addGameObject('text', function () {

      var nLayer  = 1;

      return {
      
         layer : nLayer,

         draw : function (canvas) {
            
            devGameJs.module('text').draw(canvas, 0, 10, '04146081330', 16);
         
         }

      };

   });

})();