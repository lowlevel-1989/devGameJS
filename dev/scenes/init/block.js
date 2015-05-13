devGameJs.addGameObject({
   scene: 'init',
   name : 'block',
   obj  : function () {

      //Capas y color
      var layer  = 2;
      var color  = '#070';

      //tamaño y posicion
      var x  = 150;
      var y  = 150;
      var width  = 25;
      var height = 25;

      return {
      
         layer   : layer,

         DATA : {

            x : x,
            y : y,
            width : width,
            height : height
               
         },

         draw : function (canvas) {
            
            canvas.bufferContext.fillStyle = color;
            canvas.bufferContext.fillRect(x, y, width, height);
         }


      };
   }

});