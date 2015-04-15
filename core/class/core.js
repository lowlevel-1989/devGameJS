(function(){

   //CONSTRUCTOR
   window.Core = function(settings){

      console.info('Iniciando...');
      
      Static().canvas.width    = settings.canvas.width;
      Static().canvas.height   = settings.canvas.height;
      this.colorBackground     = settings.colorBackground;
      this.mediaBackground     = settings.mediaBackground;

      this.frameCount   = 0;
      this.currentFps   = 0;
      this.lastFps      = new Date().getTime();
      this.intervalFps  = 1000/Static().maxFps;   
   };


   //METODOS PRIVADOS

   function Static(){
      var canvas      = document.getElementById('game');
      var context     = canvas.getContext('2d');
      var maxFps      = 60;
      var cleanCanvas = function(){
         context.clearRect(0, 0, canvas.width, canvas.height);
      };
      return {
         canvas      : canvas,
         context     : context,
         cleanCanvas : cleanCanvas,
         maxFps      : maxFps
      };
   }

   function fpsUpdate(frameCount, currentFps, lastFps){
      var thisFrame = new Date().getTime();
      var diffTime  = Math.ceil((thisFrame - lastFps));

      if (diffTime >= 1000){
         currentFps = frameCount;
         frameCount = 0;
         lastFps    = thisFrame;
      }

      frameCount++;

      return {
         frameCount : frameCount,
         currentFps : currentFps,
         lastFps    : lastFps
      };
   }

   function drawText(ctx, x, y, color, tipo, px, fuente, texto){
      ctx.save();
         ctx.fillStyle = color;
         ctx.font      = tipo+' '+px+' '+fuente;
         ctx.fillText(texto, x, y);
      ctx.restore();
   }

   function drawBackground(ctx, color, media){
      if(color !== null){
         ctx.fillStyle = color;
         ctx.fillRect(0, 0, Static().canvas.width, Static().canvas.height);
      }
      if(media !== null){
         var background = new Image();
         background.src = media;
         ctx.drawImage(background, 0, 0);
      }
   }

   function drawFps(currentFps){
      drawText(Static().context, 10, 20, 'black', 'bold', '12px', 'sans-serif', 'FPS: ' + currentFps + '/' + Static().maxFps);
   }


   //METODOS PUBLICOS

   window.Core.prototype.gameLoop = function(){
      //borrar canvas
      Static().cleanCanvas();

      //logica
      var dataFps     = fpsUpdate(this.frameCount, this.currentFps, this.lastFps);
      this.frameCount = dataFps.frameCount;
      this.currentFps = dataFps.currentFps;
      this.lastFps    = dataFps.lastFps;

      //dibujar
      drawBackground(Static().context, this.colorBackground, this.mediaBackground);
      drawFps(this.currentFps);
   };

})();