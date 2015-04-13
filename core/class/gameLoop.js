(function(){
   // Creando GameLoop {
   var getRequestAnimationFrame = function () {
   return window.requestAnimationFrame ||
          window.webkitRequestAnimationFrame ||
          window.mozRequestAnimationFrame ||
          window.oRequestAnimationFrame ||
          window.msRequestAnimationFrame ||
          function (callback){
            window.setTimeout(callback, 1000/60);
          };
   };

   var count = 0;
   var fpAnimationFrame = getRequestAnimationFrame();
   var gameLoop = function () {
      count++;
      console.info(count);
      fpAnimationFrame(gameLoop);
   };

   fpAnimationFrame(gameLoop);
   // Termino GameLoop } 
})();