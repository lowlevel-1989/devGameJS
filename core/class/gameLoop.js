window.onload = function(){

   // Creando GameLoop {
   var getRequestAnimationFrame = function () {
      return   window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               function (callback){
                  window.setTimeout(callback, devGameJs.getIntervalFps());
               };
   };
   var fpAnimationFrame = getRequestAnimationFrame();
   var gameLoop = function () {
      devGameJs.startGame();
      fpAnimationFrame(gameLoop);
   };

   fpAnimationFrame(gameLoop);
   // Termino GameLoop } 
};