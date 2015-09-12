var background = devGameJs.objects.new();
background.width    = devGameJs.width;
background.height   = devGameJs.height;
background.layer    = 0;

background.draw = function(ctx){

   //Cuadricula de fondo
   ctx.strokeStyle = '#FFF';
   ctx.strokeRect(1, 1, this.width-1, this.height-1);
};

devGameJs.addObject(background);

background = undefined;