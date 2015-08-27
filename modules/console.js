(function (){
   'use strict';

   devGameJs.addModule('console', function (oBinding) {
      
      var debug  = [];
      var limit  = 10;
      var active = false;

      return {
         init : function(){
            window.console.log = function(log, clear){
               if (clear)
                  debug = [];

               debug.push(log);
            };
         },
         active  : function(is){
            active = is;
         },
         update : function () {
            return debug;
         },
         isActive : function(){
            return active;
         }
      };

   });

   var modConsole = devGameJs.objects.new();

   modConsole.init = function(canvas){
      this.width  = 400;
      this.height = 400;
      this.x      = 500;
      this.layer  = 100;
   };

   modConsole.update = function(canvas){
      this.debug = devGameJs.module('console').update();
   };

   modConsole.draw = function(canvas){
      var isActive = devGameJs.module('console').isActive();
      if (!isActive)
         return;

      canvas.entities.fillStyle = 'rgba(0,50,0,.7)';
      canvas.entities.fillRect(this.x, this.y, this.width, this.height);
      var br = 1;
      for (var line = 15; line >= 0; line--){
         if (this.debug[line]){
            
            var currentLine = this.debug[line];
            var isObject  = typeof currentLine === 'object';
            if (isObject){
               var debug = 'width: ' + currentLine.width  + ' height: ' + currentLine.height;
               devGameJs.module('text').draw(this.x, br*10, debug, 10);
               debug = 'y: ' + currentLine.y  + ' vy: ' + currentLine.vy;
               devGameJs.module('text').draw(this.x, br*20, debug, 10);
               debug = 'y: ' + currentLine.x  + ' vy: ' + currentLine.vx;
               devGameJs.module('text').draw(this.x, br*30, debug, 10);
               debug = 'id: '+ currentLine.id;
               devGameJs.module('text').draw(this.x, br*40, debug, 10);
               br+=4;
            }else{
               devGameJs.module('text').draw(this.x, br*10, currentLine, 10);
               br++;
            }

         }
      }
   };

   devGameJs.addObject(modConsole);

})();