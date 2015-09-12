var _gameExecution = require('../_gameExecution');

document.oncontextmenu = function(){
   return false;
};

window.addEventListener('mousedown',  function(event){
   _gameExecution.mouse(event);
}, false);

window.addEventListener('mousemove', function(event){
   _gameExecution.mouse(event);
}, false);

window.addEventListener('mouseup',    function(event){
   _gameExecution.mouse(event);
}, false);


var key = 'mouse';

function down(callback){
   this.clickMe = false;
   this.mousedown = function(mouse){

      if (
            (this.x+this.width )>mouse.x && 
            (this.y+this.height)>mouse.y &&
            (mouse.x+mouse.width)>this.x &&
            (mouse.y+mouse.height)>this.y
      ){
         this.clickMe = mouse;
         callback.apply(this, [this.clickMe]);
      }
   };

   this.mouseUp(function(){});
}

function up(callback){
   this.mouseup = function(mouse){
      
      if (!this.clickMe)
         return;
      
      callback.apply(this, [this.clickMe]);
      this.clickMe = false;
   };
}

function move(callback){
   this.mousemove = function(mouse){
      if (!this.clickMe)
         return;

      this.clickMe = mouse;

      this.aPreUpdate[key] = function(){
         if (this.clickMe)
            callback.apply(this, [this.clickMe]);
      };
   };
}

module.exports = {
                     down: down,
                     up:   up,
                     move: move
};