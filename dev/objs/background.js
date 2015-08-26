var background = devGameJs.objects.new();
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
   canvas.background.strokeStyle = '#FFF';
   canvas.background.strokeRect(0, 0, this.width, this.height);
};

devGameJs.addObject(background);

background = undefined;