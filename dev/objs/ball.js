(function (){

   'use strict';

   var ball = devGameJs.objects.new();
   ball.x        = 500;
   ball.y        = -100;
   ball.sprite   = devGameJs.ext.resource.get('ball');
   ball.width    = 64;
   ball.height   = 64;
   ball.layer    = 1;
   ball.vx       = 5;
   ball.elastic  = 0.8; 

   ball.update = function(canvas){
         
         this.applyGravity();

         if (this.y >= canvas.buffer.height - this.height){
            this.y  = canvas.buffer.height - this.height;
            if (this.vy > 1)
               this.rebound = true;
         }
   };

   ball.draw = function(canvas){
      canvas.bufferContext.drawImage(this.sprite, this.x, this.y);
   };

   devGameJs.addGameObject(ball);

})();