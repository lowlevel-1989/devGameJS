(function(){

   //CONSTRUCTOR
   window.core = function(){

      console.info('Iniciando...');
      
      this.frameCount = 0;
      this.currentFps = 0;
      this.lastFps    = new Date().getTime();
   
   };


   //METODOS PRIVADOS

   function Static(){
      var canvas      = document.getElementById('game');
      var context     = canvas.getContext('2d');
      var cleanCanvas = function(){
         context.clearRect(0, 0, canvas.width, canvas.height);
      };
      return {
         canvas      : canvas,
         context     : context,
         cleanCanvas : cleanCanvas
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

   function drawFps(currentFps){
      drawText(Static().context, 10, 20, 'black', 'bold', '12px', 'sans-serif', 'FPS: ' + currentFps + '/60');
   }


   //METODOS PUBLICOS

   window.core.prototype.gameLoop = function(){
      //borrar canvas
      Static().cleanCanvas();

      //logica
      var dataFps     = fpsUpdate(this.frameCount, this.currentFps, this.lastFps);
      this.frameCount = dataFps.frameCount;
      this.currentFps = dataFps.currentFps;
      this.lastFps    = dataFps.lastFps;

      //dibujar
      drawFps(this.currentFps);
   };

})();