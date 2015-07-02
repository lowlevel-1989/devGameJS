(function (){

   'use strict';

   var hero = devGameJs.objects.new();
   
   hero.init = function (){

      this.layer  = 1;
      this.vx     = 4;
      this.width  = 64;
      this.height = 64;
      this.intro  = true;

      this.applyGravity();


      this.setAnimations({

         name: ['intro1', 'intro2', 'right', 'left', 'run-right', 'run-left', 'jump'],
         frame: 3,
         sprite: devGameJs.ext.resource.get('hero'),
         width: 96,
         height: 224,
         frameDelay: 7

      });

   };

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

         if (this.bRight){
            //animacion
            if (this.getAnimation() != 'run-right')
               this.setAnimation('run-right');
            //accion
            this.x += this.vx;
         }
         if (this.bLeft){
            //animacion
            if (this.getAnimation() != 'run-left')
               this.setAnimation('run-left');
            //accion
            this.x -= this.vx;
         }
         if (this.bUp && !this.onAir){
            //animacion
            if (this.getAnimation() != 'jump')
               this.setAnimation('jump');
            //accion
            this.jump();
         }


         if (this.y >= canvas.buffer.height - this.height){
            this.y = canvas.buffer.height - this.height;
               
            if (!this.bUp)
               this.onAir = false;
            
            //animacion
            if(this.intro){
               var self = this;
               this.intro = false;
               this.setAnimation('intro2', function(){
                  self.setAnimation('right');
               });
            }

         }
   };


   hero.draw = function(canvas){

      // canvas.bufferContext.fillStyle = '#060';
      // canvas.bufferContext.fillRect(this.x, this.y, this.width, this.height);

      this.renderAnimation(canvas);
   };

   devGameJs.addGameObject(hero);

})();