(function(){

   //CONSTRUCTOR
   window.core = function(){
      this.count = 0;
      console.info('Iniciando...');
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


   //METODOS PUBLICOS

   window.core.prototype.debug = function(){
      Static().cleanCanvas();
      Static().context.fillStyle = 'red';
      Static().context.font = 'bold 12px sans-serif';
      Static().context.fillText(this.count++, 9, 20);
   };

})();