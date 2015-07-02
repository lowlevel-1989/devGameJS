(function (){

   'use strict';


   //variables privadas para controlar el estado de animacion
   var direction = {
      current: 'right'
   };

   var jump = {
      left: 1,
      right: 0
   };

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
         frameDelay: 10

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

         if (this.bRight && !this.intro){
            //animacion
            if (this.getAnimation() != 'run-right'){
               if (!this.onAir){
                  this.setAnimation('run-right');
                  this.setFrameDelay(7);
               }else
                  this.frameIndex = jump.right;
            }
            direction.current = 'right';

            //accion
            this.x += this.vx;
         }
         if (this.bLeft && !this.intro){
            //animacion
            if (this.getAnimation() != 'run-left'){
               if (!this.onAir){
                  this.setAnimation('run-left');
                  this.setFrameDelay(7);
               }else
                  this.frameIndex = jump.left;
            }
            direction.current = 'left';

            //accion
            this.x -= this.vx;
         }
         if (this.bUp && !this.onAir && !this.intro){
            //animacion
            if (this.getAnimation() != 'jump'){
               this.setAnimation('jump');
               this.setFrameDelay(0);
            }
            //accion
            this.jump();
         }


         if (this.y >= canvas.buffer.height - this.height){
            this.y = canvas.buffer.height - this.height;
               
            if (!this.bUp)
               this.onAir = false;
            
            //animacion
            if(this.intro){
               this.intro = false;
               this.setAnimation('intro2', function(){
                  this.setAnimation('right');
               });
            }else if(!this.bRight && !this.bLeft){
               if(this.getAnimation(direction.current) != direction.current){
                  this.setFrameDelay(10);
                  this.setAnimation(direction.current);
               }
            }

         }

   };


   hero.draw = function(canvas){
      
      //testing de area
      // canvas.bufferContext.fillStyle = '#060';
      // canvas.bufferContext.fillRect(this.x, this.y, this.width, this.height);

      //pintar animacion
      this.renderAnimation(canvas);
   };

   devGameJs.addGameObject(hero);

})();