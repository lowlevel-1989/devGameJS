(function (){

   'use strict';

   var background = devGameJs.objects.new();
   background.sprite   = devGameJs.ext.resource.get('grid');
   background.width    = 900;
   background.height   = 400;
   background.layer    = 0;

   background.draw = function(canvas){
      //Cuadricula de fondo
      canvas.bufferContext.drawImage(this.sprite, 0, 0, this.width, this.height);
      //Area para el fps
      canvas.bufferContext.fillStyle = '#000';
      canvas.bufferContext.fillRect(0, 0, 150, 40);
      
   };

   devGameJs.addGameObject(background);

})();