(function (){

   'use strict';

   var preview = devGameJs.objects.new();

   preview.draw = function(canvas){
      devGameJs.ext.drawText(80, 150, 'preview devgamejs', 44);    
      devGameJs.ext.drawText(80, 200, 'vinicio valbuena',  32);    
   };

   devGameJs.addGameObject(preview);

})();