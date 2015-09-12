(function(){

   var touches = devGameJs.objects.new();

   touches.layer   = 10;
   touches.active  = false;
   touches.objects = [];

   touches.mousedown = function(mouse){
      this.objects[0] = mouse;
      this.active = true;
   };

   touches.mousemove = function(mouse){
      if (!this.active)
         return;

      this.objects[0] = mouse;
   };

   touches.mouseup = function(mouse){
      this.objects = [];
      this.active  = false;
   };

   touches.touchstart = function(touches){
      this.objects = touches;
      this.active  = true;
   };

   touches.touchmove = function(touches){
      if (!this.active)
         return;

      this.objects = touches;
   };

   touches.touchend = function(touch){
      this.objects = this.objects.filter(function(item){
         return item.id !== touch.id;
      });
   };

   touches.draw = function(ctx){
      
      if (!this.active)
         return;

      for(var index in this.objects){
         var touch = this.objects[index];

         devGameJs.ext.drawText(touch.x+60, touch.y+10, 'id: '+touch.id,  10);    
         devGameJs.ext.drawText(touch.x+60, touch.y+20, 'x : '+touch.x ,  10);    
         devGameJs.ext.drawText(touch.x+60, touch.y+30, 'y : '+touch.y ,  10);    

         ctx.fillStyle = 'rgba(0,255,0,.3)';
         ctx.fillRect(touch.x, touch.y, touch.width, touch.height);

      }
      
   };

   devGameJs.addObject(touches);

})();
