window.onload = function(){
   
   var settings = new Settings();
   var game     = new Core(settings);
   var loading  = new Loading(['assets/img/tileInMap.png', 'asets/img/tileInMap.png']);
   loading.load();

   // Creando GameLoop {
   var getRequestAnimationFrame = function () {
      return   window.requestAnimationFrame ||
               window.webkitRequestAnimationFrame ||
               window.mozRequestAnimationFrame ||
               window.oRequestAnimationFrame ||
               window.msRequestAnimationFrame ||
               function (callback){
                  window.setTimeout(callback, game.intervalFps);
               };
   };
   var fpAnimationFrame = getRequestAnimationFrame();
   var gameLoop = function () {
      if (loading.isResolved())
         game.gameLoop();
      else if (loading.isRejected())
         game.isRejected();
      else
         game.isLoading();
      fpAnimationFrame(gameLoop);
   };

   fpAnimationFrame(gameLoop);
   // Termino GameLoop } 
};