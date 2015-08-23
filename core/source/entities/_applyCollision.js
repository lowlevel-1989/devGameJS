var key = 'collision';

function isPixelCollision(obj1, obj2){
   
   var x1 = Math.round( obj1.x );
   var y1 = Math.round( obj1.y );
   var x2 = Math.round( obj2.x );
   var y2 = Math.round( obj2.y );

   var w1 = obj1.width;
   var h1 = obj1.height;
   var w2 = obj2.width;
   var h2 = obj2.height;

   var xMin = Math.max( x1, x2 );
   var yMin = Math.max( y1, y2 );
   var xMax = Math.min( x1+w1, x2+w2 );
   var yMax = Math.min( y1+h1, y2+h2 );

   if ( xMin >= xMax || yMin >= yMax ) {
      return false;
   }

   var xDiff = xMax - xMin;
   var yDiff = yMax - yMin;

   oCanvas.buffer.width  = obj1.width;
   oCanvas.buffer.height = obj1.height;

   var ctx = oCanvas.ctx;

   ctx.clearRect(0, 0, oCanvas.buffer.width, oCanvas.buffer.height);

   if (obj1.animation){
      ctx.drawImage(
         obj1.sprite.sheets, 
         obj1.animations[obj1.animation][obj1.frameIndex].sx, 
         obj1.animations[obj1.animation][obj1.frameIndex].sy,
         obj1.sw,
         obj1.sh,
         0, 
         0,
         obj1.width,
         obj1.height
      );
   }else if (obj1.sprite){
      ctx.drawImage(obj1.sprite, 0, 0, obj1.width, obj1.height);
   }else{
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, obj1.width, obj1.height);
   }


   var pixels1 = ctx.getImageData(0, 0, oCanvas.buffer.width, oCanvas.buffer.height).data;

   oCanvas.buffer.width  = obj2.width;
   oCanvas.buffer.height = obj2.height;

   ctx.clearRect(0, 0, oCanvas.buffer.width, oCanvas.buffer.height);


   if (obj2.animation){
      ctx.drawImage(
         obj2.sprite.sheets, 
         obj2.animations[obj2.animation][obj2.frameIndex].sx, 
         obj2.animations[obj2.animation][obj2.frameIndex].sy,
         obj2.sw,
         obj2.sh,
         0, 
         0,
         obj2.width,
         obj2.height
      );
   }else if (obj2.sprite){
      ctx.drawImage(obj2.sprite, 0, 0, obj2.width, obj2.height);
   }else{
      ctx.fillStyle = '#000';
      ctx.fillRect(0, 0, obj2.width, obj2.height);
   }
   var pixels2 = ctx.getImageData(0, 0, oCanvas.buffer.width, oCanvas.buffer.height).data;

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

function collision(){
   var self = this;
   for (var index in gameObjects){
      var gameObject = gameObjects[index]; 
      if (gameObject.id != self.id && typeof gameObject.applyReaction === 'function'){
         if (isPixelCollision(self, gameObject))
            gameObject.applyReaction(self);
      }
   }   
}

module.exports = function _applyCollision() {
   this.aPostUpdate[key] = collision;
};