(function (){
   'use strict';

   devGameJs.addModule('console', function (oBinding) {
      
      var debug  = [];
      var active = false;

      return {
         init : function(){
            window.console.log = function(log, clear){
               debug.push(log);
            };
         },
         active  : function(is){
            active = is;
         },
         update : function () {
            var logs = debug;
            debug = [];
            return logs;
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
      for (var line = 14; line >= 0; line--){
         var currentLine = this.debug[line];

         if (currentLine){
            var isObject  = typeof currentLine === 'object';
            if (isObject){
               var debug = 'id: '+ currentLine.id;
               devGameJs.module('text').draw(this.x, br*10, debug, 10);
               br++;
               debug = 'x: ' + currentLine.x  + ' vx: ' + currentLine.vx;
               devGameJs.module('text').draw(this.x, br*10, debug, 10);
               br++;
               debug = 'y: ' + currentLine.y  + ' vy: ' + currentLine.vy;
               devGameJs.module('text').draw(this.x, br*10, debug, 10);
               br++;
               debug = 'width: ' + currentLine.width  + ' height: ' + currentLine.height;
               devGameJs.module('text').draw(this.x, br*10, debug, 10);
            }else
               devGameJs.module('text').draw(this.x, br*10, currentLine, 10);
            br++;
         }
      }
   };

   devGameJs.addObject(modConsole);

})();