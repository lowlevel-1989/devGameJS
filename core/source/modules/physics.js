(function(){

   'use strict';

   devGameJs.addModule('physics', function (oBinding) {
      
      var sx;
      var sy;
      var sWidth;
      var sHeight;
      var xMax;
      var xMin;
      var yMax;
      var yMin;

      var pfCollision = function (objB) {
         
         //ObjA
         var x1 = sx; 
         var y1 = sy; 
         var w1 = sWidth; 
         var h1 = sHeight;

         //ObjB
         var x2 = objB.x; 
         var y2 = objB.y;
         var w2 = objB.width;
         var h2 = objB.height;

         if (((x1+w1)>x2)&&((y1+h1)>y2)&&((x2+w2)>x1)&&((y2+h2)>y1))
            return true;
         else
            return false;

      };

      return {

         active : function (x, y, width, height) {

            sx = x;
            sy = y;
            sWidth  = width;
            sHeight = height;

            xMax = oBinding.canvas.main.width  - sWidth;
            xMin = 0;

            yMax = oBinding.canvas.main.height - sHeight;
            yMin = 0;

         },

         move : function (axis, direction) {

            var x;
            var y;

            if (axis === 'x') {
               x = sx + direction;
               if ((x <= xMax && direction > 0) || (x >= xMin && direction < 0))
                  sx = x;
               return sx; 
            }else{
               y = sy + direction;
               if ((y <= yMax && direction > 0) || (y >= yMin && direction < 0))
                  sy = y;
               return sy;
            }

         },

         is_collision : function (){
            var key;
            var objB;
            var is_collision;
            var gameObjects = oBinding.gameObjects; 
            for (key in gameObjects){
               objB = gameObjects[key].DATA;
               if (objB){
                  is_collision = pfCollision(objB);
                  if (is_collision)
                     return gameObjects[key].__id; 
               }

            }
         }
      };

   });


})();