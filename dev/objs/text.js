(function(){

   devGameJs.addGameObject('text', function () {

      var nLayer = 1;

      return {

         layer : nLayer,

         draw : function () {

            drawText(0, 60, '0414#######', 16);

         }

      };

   });

})();