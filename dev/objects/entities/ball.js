(function (){

   'use strict';

   var ball = devGameJs.objects.new();
   ball.sprite   = devGameJs.ext.resource.get('ball');
   ball.width    = 32;
   ball.height   = 32;
   ball.layer    = 1;
   ball.elastic  = 1; 
   ball.applyGravity();

   ball.touchStart(function(event){
      this.vy = 0;
      this.gravity = 0;
   });

   ball.touchMove(function(event){
      this.x = event.x+(event.width/4);
      this.y = event.y+(event.height/4);
   });

   ball.touchEnd(function(event){
      this.gravity = 0.98;
   });

   ball.mouseDown(function(event){
      this.vy = 0;
      this.gravity = 0;
   });

   ball.mouseMove(function(event){
      this.x = event.x+(event.width/4);
      this.y = event.y+(event.height/4);
   });

   ball.mouseUp(function(event){
      this.gravity = 0.98;
   });

   ball.applyReaction = function(other){
      // eliminarte a ti mismo
      this.delete();
      //eliminar quien te colisiono
      // other.delete();
   };

   ball.update = function(canvas){
         if (this.y >= canvas.main.height - this.height){
            this.y  = canvas.main.height - this.height;
            if (this.vy > 1)
               this.rebound = true;
            else
               this.vy = 0;
         }

         console.log(this);
         console.log('Ball');
   };

   ball.draw = function(ctx){
      ctx.drawImage(this.sprite, this.x, this.y, this.width, this.height);
   };

   for (var add = 0; add < 5; add++){
      ball.x = devGameJs.random(0, 900-ball.width);
      ball.y = devGameJs.random(-500, -100);
      devGameJs.addObject(ball);
   }


})();