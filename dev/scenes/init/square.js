(function(){

   devGameJs.addGameObject({
      scene: 'init',
      name : 'squere',
      obj  : function () {

         var nLayer  = 2;
         var sColor  = '#007';

         var nAxisX  = 50;
         var nAxisY  = 50;
         var nWidth  = 25;
         var nHeight = 25;
         var nSpeed  = 5;


         var bMoveRight = false;
         var bMoveLeft  = false;
         var bMoveUp    = false;
         var bMoveDown  = false;

         return {
         
            layer : nLayer,

            update : function (canvas) {

               if (bMoveRight)
                  nAxisX += nSpeed;

               if (bMoveLeft)
                  nAxisX -= nSpeed;

               if (bMoveUp)
                  nAxisY -= nSpeed;
               
               if (bMoveDown)
                  nAxisY += nSpeed;
            },

            draw : function (canvas) {
               
               canvas.bufferContext.fillStyle = sColor;
               canvas.bufferContext.fillRect(nAxisX, nAxisY, nWidth, nHeight);
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
            }

         };
      }

   });

})();