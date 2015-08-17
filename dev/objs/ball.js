(function (){

   'use strict';

   var ball = devGameJs.objects.new();
   ball.x        = 500;
   ball.y        = -100;
   ball.sprite   = devGameJs.ext.resource.get('ball');
   ball.width    = 32;
   ball.height   = 32;
   ball.layer    = 1;
   ball.elastic  = 1; 
   ball.applyGravity();

   ball.applyReaction = function(other){
      // eliminarte a ti mismo
      this.delete();
      //eliminar quien te colisiono
      // other.delete();
   };

   ball.update = function(canvas){
         
         if (this.y >= canvas.entities.height - this.height){
            this.y  = canvas.entities.height - this.height;
            if (this.vy > 1)
               this.rebound = true;
            else
               this.vy = 0;
         }
   };

   ball.draw = function(canvas){
      //testing de area
      // canvas.entities.fillStyle = '#060';
      // canvas.entities.fillRect(this.x, this.y, this.width, this.height);
      
      canvas.entities.drawImage(this.sprite, this.x, this.y, this.width, this.height);
   };

   devGameJs.addGameObject(ball);

})();