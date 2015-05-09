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
                  return x;
               else 
                  return sx; 
            }else{
               y = sy + direction;
               if ((y <= yMax && direction > 0) || (y >= yMin && direction < 0))
                  return y;
               else 
                  return sy;
            }

         }
         
      };

   });


})();