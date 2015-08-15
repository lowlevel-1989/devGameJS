(function(){


   var square = devGameJs.objects.new();

   square.x      = 800;
   square.y      = 50;
   square.width  = 50;
   square.height = 50;
   square.layer  = 1;
   square.active = false;

   square.colors = {
      off: '#F00',
      on:  '#0F0'
   };

   square.on('activeSquare', function(args){
      this.active = args.active;
   });

   square.draw = function(canvas){
      //Area para el fps
      canvas.bufferContext.fillStyle = this.active ? this.colors.on : this.colors.off;
      canvas.bufferContext.fillRect(this.x, this.y, this.width, this.height);
      
   };

   devGameJs.addGameObject(square);

})();
