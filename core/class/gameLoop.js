window.onload = function(){
   
   var settings = new Settings();
   var game     = new Core(settings);
   var test     = new Loading(['assets/img/tileInMap.png', 'assets/img/tileInMap.png']);
   test.load();

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
      game.gameLoop();
      fpAnimationFrame(gameLoop);
   };

   fpAnimationFrame(gameLoop);
   // Termino GameLoop } 
};