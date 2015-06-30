(function (){

   'use strict';

   var ball = devGameJs.objects.new();
   ball.x        = 500;
   ball.y        = -100;
   ball.sprite   = devGameJs.ext.resource.get('ball');
   ball.width    = 32;
   ball.height   = 32;
   ball.layer    = 1;
   ball.vx       = 5;
   ball.elastic  = 1; 
   ball.applyGravity();

   ball.update = function(canvas){
         
         if (this.y >= canvas.buffer.height - this.height){
            this.y  = canvas.buffer.height - this.height;
            if (this.vy > 1)
               this.rebound = true;
            else
               this.vy = 0;
         }
   };

   ball.draw = function(canvas){
      canvas.bufferContext.drawImage(this.sprite, this.x, this.y, this.width, this.height);
   };

   devGameJs.addGameObject(ball);

})();