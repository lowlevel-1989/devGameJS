(function(){

   //CONSTRUCTOR
   window.Core = function(settings){
      Static().canvas.width    = settings.canvas.width;
      Static().canvas.height   = settings.canvas.height;
      this.colorBackground     = settings.colorBackground;
      this.mediaBackground     = serializer(settings.mediaBackground);

      this.frameCount   = 0;
      this.currentFps   = 0;
      this.lastFps      = new Date().getTime();
      this.intervalFps  = 1000/Static().maxFps;   
   };


   //METODOS PRIVADOS
   function serializer(objs){
      var temp = [];
      for (var indice in objs) {
         var nivel   = objs[indice].nivel;
         var src     = objs[indice].src;
         temp[nivel] = src;
      }
      return temp;
   }

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

   function fpsUpdate(self){
      var thisFrame = new Date().getTime();
      var diffTime  = Math.ceil((thisFrame - self.lastFps));

      if (diffTime >= 1000){
         self.currentFps = self.frameCount;
         self.frameCount = 0;
         self.lastFps    = thisFrame;
      }

      self.frameCount++;
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
         ctx.save();
            ctx.fillStyle = color;
            ctx.fillRect(0, 0, Static().canvas.width, Static().canvas.height);
         ctx.restore();
      }
      if(media !== null){
         var background = new Image();
         background.src = media[1];
         ctx.save();
            ctx.drawImage(background, 0, 0);
         ctx.restore();
      }
   }

   function drawFps(currentFps){
      drawText(Static().context, 10, 20, 'black', 'bold', '12px', 'sans-serif', 'FPS: ' + currentFps + '/' + Static().maxFps);
   }


   //METODOS PUBLICOS

   window.Core.prototype.isRejected = function(){
      Static().cleanCanvas();
      fpsUpdate(this);
      drawText(Static().context, 10, 40, 'black', 'bold', '12px', 'sans-serif', 'Error...');
      drawFps(this.currentFps);
   };

   window.Core.prototype.isLoading = function(){
      Static().cleanCanvas();
      fpsUpdate(this);
      drawText(Static().context, 10, 40, 'black', 'bold', '12px', 'sans-serif', 'Cargando...');
      drawFps(this.currentFps);
   };

   window.Core.prototype.gameLoop = function(){
      //borrar canvas
      Static().cleanCanvas();

      //logica
      fpsUpdate(this);

      //dibujar
      drawBackground(Static().context, this.colorBackground, this.mediaBackground);
      drawFps(this.currentFps);
   };

})();