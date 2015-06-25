(function (){
   var hero = devGameJs.objects.new();
   hero.layer = 1;
   hero.vx    = 5;
   hero.color = '#007';

   hero.keydown = function(nKeyCode){
      if (nKeyCode === 39)
         this.bRight = true;
      if (nKeyCode === 37)
         this.bLeft  = true;
      if (nKeyCode === 32)
         this.bUp    = true;
   };

   hero.keyup = function(nKeyCode){
      if (nKeyCode === 39)
         this.bRight = false;
      if (nKeyCode === 37)
         this.bLeft  = false;
      if (nKeyCode === 32)
         this.bUp    = false;
   };

   hero.jump = function(){
      this.vy = -15;
      this.onAir = true;
   };

   hero.update = function(canvas){
         if (this.bRight)
            this.x += this.vx;
         if (this.bLeft)
            this.x -= this.vx;
         if (this.bUp && !this.onAir)
            this.jump();

         this.applyGravity();

         if (this.y >= canvas.buffer.height - this.height){
            this.y  = canvas.buffer.height - this.height;
            this.vy = 0;
            if (!this.bUp)
               this.onAir = false;
         }
   };

   hero.draw = function(canvas){
      canvas.bufferContext.fillStyle = this.color;
      canvas.bufferContext.fillRect(this.x, this.y, this.width, this.height);
   };

   devGameJs.addGameObject(hero);

})();