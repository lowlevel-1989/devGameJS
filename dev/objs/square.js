var squere = function () {

   //Capas y color
   var layer  = 2;
   var color  = '#007';

   //tamaño y posicion
   var x  = 50;
   var y  = 400-25;
   var width  = 25;
   var height = 25;

   //velocidad
   var vx  = 5;
   var vy  = 0;

   var gravedad = 0.9;
   var salto = false;

   var getGravedad = function (){
      vy += gravedad;
      y  += vy;
      if (y < 400 - 25){}
      else{
         y = 400 - 25;
         vy = 0;
         if (!bMoveUp)
            salto = false;
      }

   };

   var saltar = function (){
      vy = -15;
      salto = true;
   };

   
   //botones de control
   var bMoveRight = false;
   var bMoveLeft  = false;
   var bMoveUp    = false;

   return {
   
      layer   : layer,

      update : function (canvas) {

         if (bMoveRight)
            x += vx;
         if (bMoveLeft)
            x -= vx;
         if (bMoveUp && !salto)
            saltar();

         getGravedad();

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

         if (nKeyCode === 32)
            bMoveUp    = true;

      },

      keyup : function (nKeyCode) {

         if (nKeyCode === 39)
            bMoveRight = false;

         if (nKeyCode === 37)
            bMoveLeft  = false;

         if (nKeyCode === 32)
            bMoveUp    = false;

      }

   };
};

devGameJs.addGameObject(squere());