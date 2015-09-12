var _gameExecution = require('../_gameExecution');

window.addEventListener('touchstart', function(event){
   _gameExecution.touch(event);
}, false);

window.addEventListener('touchmove',  function(event){
   _gameExecution.touch(event);
}, false);

window.addEventListener('touchend',   function(event){
   _gameExecution.touch(event);
}, false);

var key = 'touch';

function start(callback){
   this.touchMe = false;
   this.touchstart = function(touches){
      for (var index in touches){
         var touch = touches[index];

         if (
               (this.x+this.width )>touch.x && 
               (this.y+this.height)>touch.y &&
               (touch.x+touch.width)>this.x &&
               (touch.y+touch.height)>this.y
         ){
            this.touchMe = touch;
            callback.apply(this, [this.touchMe]);
            break;
         }
      }
   };

   this.touchEnd(function(){});
}

function end(callback){
   this.touchend = function(touch){
      
      if (!this.touchMe)
         return;
      
      if (this.touchMe.id === touch.id){
         callback.apply(this, [this.touchMe]);
         this.touchMe = false;
      }
   };
}

function move(callback){
   this.touchmove = function(touches){
      if (!this.touchMe)
         return;

      for (var index in touches){
         var touch = touches[index];
         if (touch.id === this.touchMe.id)
            this.touchMe = touch;
      }

      this.aPreUpdate[key] = function(){
         if (this.touchMe)
            callback.apply(this, [this.touchMe]);
      };
   };
}

module.exports = {
                     start: start,
                     end:   end,
                     move: move
};