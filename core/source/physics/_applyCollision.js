var key = 'collision';

function draw(obj, width, height, ctx){
   width  = obj.width;
   height = obj.height;

   ctx.clearRect(0, 0, width, height);

   if (obj.animation){
      var animation = obj.animations[obj.animation][obj.frameIndex];
      ctx.drawImage(
         obj.sprite.sheets, 
         animation.sx, 
         animation.sy,
         obj.sw,
         obj.sh,
         0, 
         0,
         width,
         height
      );
   }else if (obj.sprite)
      ctx.drawImage(obj.sprite, 0, 0, width, height);
   else{
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, width, height);
   }

   return ctx.getImageData(0, 0, width, height).data;
}

function isPixelCollision(obj1, obj2, canvas){
   var x1 = Math.round(obj1.x);
   var y1 = Math.round(obj1.y);
   var x2 = Math.round(obj2.x);
   var y2 = Math.round(obj2.y);

   var w1 = obj1.width;
   var h1 = obj1.height;
   var w2 = obj2.width;
   var h2 = obj2.height;

   var xMin = Math.max(x1, x2);
   var yMin = Math.max(y1, y2);
   var xMax = Math.min(x1+w1, x2+w2);
   var yMax = Math.min(y1+h1, y2+h2);


   if ( xMin >= xMax || yMin >= yMax )
      return false;

   var width  = canvas.buffer.width;
   var height = canvas.buffer.height;
   var ctx    = canvas.ctx;

   var xDiff = xMax - xMin;
   var yDiff = yMax - yMin;

   var pixels1 = draw(obj1, width, height, ctx);
   var pixels2 = draw(obj2, width, height, ctx);

   var pixelX;
   var pixelY;

   if ( xDiff < 4 && yDiff < 4 ) {
      for ( pixelX = xMin; pixelX < xMax; pixelX++ ) {
         for ( pixelY = yMin; pixelY < yMax; pixelY++ ) {
            if (
               ( pixels1[ ((pixelX-x1) + (pixelY-y1)*w1)*4 + 3 ] !== 0 ) &&
               ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
            ) {
               return true;
            }
         }
      }
   }else{
      // slither of an area for the last iteration (using fast ceil).
      var incX = xDiff / 3.0;
      var incY = yDiff / 3.0;

      incX = (~~incX === incX) ? incX : (incX+1 | 0);
      incY = (~~incY === incY) ? incY : (incY+1 | 0);

      for ( var offsetY = 0; offsetY < incY; offsetY++ ) {
         for ( var offsetX = 0; offsetX < incX; offsetX++ ) {
            for ( pixelY = yMin+offsetY; pixelY < yMax; pixelY += incY ) {
               for ( pixelX = xMin+offsetX; pixelX < xMax; pixelX += incX ) {
                  if (
                     ( pixels1[ ((pixelX-x1) + (pixelY-y1)*w1)*4 + 3 ] !== 0 ) &&
                     ( pixels2[ ((pixelX-x2) + (pixelY-y2)*w2)*4 + 3 ] !== 0 )
                  ) {
                     return true;
                  }
               }
            }
         }
      }
   }
   return false;
}

function collision(canvas, gameObjects){
   var self = this;
   for (var index in gameObjects){
      var gameObject = gameObjects[index]; 
      if (gameObject.id != self.id && typeof gameObject.applyReaction === 'function'){
         if (isPixelCollision(self, gameObject, canvas))
            gameObject.applyReaction(self);
      }
   }   
}

module.exports = function _applyCollision(){
   this.aPostUpdate[key] = collision;
};