var background = devGameJs.objects.new();
background.sprite   = devGameJs.ext.resource.get('grid');
background.width    = 900;
background.height   = 400;
background.layer    = 0;
background.change   = true;

background.draw = function(canvas){
   
   if (!this.change)
      return;
   
   this.change = false;
   //Cuadricula de fondo
   canvas.background.clearRect(0, 0, canvas.background.width, canvas.background.height);
   canvas.background.drawImage(this.sprite, 0, 0, this.width, this.height);
   //Area para el fps
   canvas.background.fillStyle = '#000';
   canvas.background.fillRect(0, 0, 150, 40);
   
};

devGameJs.addGameObject(background);

background = undefined;