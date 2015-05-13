devGameJs.addGameObject({
   scene: 'init',
   name : 'squere',
   obj  : function () {

      //Capas y color
      var layer  = 2;
      var color  = '#007';

      //tamaño y posicion
      var x  = 50;
      var y  = 50;
      var width  = 25;
      var height = 25;

      //velocidad
      var speed  = 5;
      
      //botones de control
      var bMoveRight = false;
      var bMoveLeft  = false;
      var bMoveUp    = false;
      var bMoveDown  = false;
      //Matar objB
      var bDelete    = false;  // tecla Barra Espaciadora

      var fpKill = function (sObjectId){
         devGameJs.removeGameObject(sObjectId);
      };

      return {
      
         layer   : layer,

         update : function (canvas) {

            Physics.active(x, y, width, height); //Activar modulo fisico.

            if (bMoveRight)
               x = Physics.move('x', +speed);

            if (bMoveLeft)
               x = Physics.move('x', -speed);

            if (bMoveDown)
               y = Physics.move('y', +speed);
            
            if (bMoveUp)
               y = Physics.move('y', -speed);
            
            if (bDelete){
               var obj__id = Physics.is_collision();
               if (obj__id)
                  fpKill(obj__id);
            }

         },

         draw : function (canvas) {
            
            canvas.bufferContext.fillStyle = color;
            canvas.bufferContext.fillRect(x, y, width, height);
         },

         keydown : function (nKeyCode) {
            
            if (nKeyCode === 39)
               bMoveRight = true;
            
            if (nKeyCode === 37)
               bMoveLeft  = true;

            if (nKeyCode === 38)
               bMoveUp    = true;

            if (nKeyCode === 40)
               bMoveDown  = true;

            if (nKeyCode === 32)
               bDelete    = true;
         },

         keyup : function (nKeyCode) {

            if (nKeyCode === 39)
               bMoveRight = false;

            if (nKeyCode === 37)
               bMoveLeft  = false;

            if (nKeyCode === 38)
               bMoveUp    = false;

            if (nKeyCode === 40)
               bMoveDown  = false;

            if (nKeyCode === 32)
               bDelete    = false;
         }

      };
   }

});