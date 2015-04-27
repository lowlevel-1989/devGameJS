window.onload = function(){
   
   var settings   = new Settings();
   var game       = new Core(settings);
   window.storage = new Storage(settings.resources);
   window.storage.load();

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
      if (window.storage.isResolved())
         game.gameLoop();
      else if (window.storage.isRejected())
         game.isRejected();
      else
         game.isLoading();
      fpAnimationFrame(gameLoop);
   };

   fpAnimationFrame(gameLoop);
   // Termino GameLoop } 
};