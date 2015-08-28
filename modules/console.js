(function (){
   'use strict';

   devGameJs.addModule('console', function (oBinding) {
      
      var debug  = [];
      var active = false;
      var count  = 0;
      var max    = 10;

      return {
         init : function(){
            window.console.log = function(log, clear){
               if (!active)
                  return;
               debug = debug.filter(function(item){
                  return item.id !== log.id || typeof item === 'string';
               });
               debug.push(log);
            };
         },
         active  : function(is){
            active = is;
         },
         update : function () {
            count++;

            if (count >= max) {
               var logs = debug;
               count    = 0;
               return logs;
            }
            
            debug = [];
            return false;
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
      this.debug  = [];
      this.center = (this.width/2)+this.width;
   };

   modConsole.update = function(canvas){
      
      if (!devGameJs.module('console').isActive())
         this.delete();

      var debug = devGameJs.module('console').update();
      this.debug = debug ? debug : this.debug;
   };

   modConsole.draw = function(ctx){
      ctx.fillStyle = 'rgba(0,50,0,.7)';
      ctx.fillRect(this.x, this.y, this.width, this.height);
      var br = 2;

      if (!this.debug[0]){
         devGameJs.module('text').draw(this.x, this.y,    'DevGameJS Console', 16);
         devGameJs.module('text').draw(this.x, this.y+16, 'Loading objects...', 8);
      }else{
         ctx.fillStyle = '#00F';
         ctx.fillRect(this.x, this.y, this.width, 20);
         devGameJs.module('text').draw(this.center, this.y+5, 'DevGameJS Console', 10);
      }

      for (var line = 14; line >= 0; line--){
         var currentLine = this.debug[line];

         if (currentLine){
            var isObject  = typeof currentLine === 'object';
            if (isObject){
               var debug = 'id: '+ currentLine.id;
               devGameJs.module('text').draw(this.x, br*10, debug, 10);
               br++;
               debug = 'x: ' + currentLine.x.toFixed(2)  + ' vx: ' + currentLine.vx.toFixed(2);
               devGameJs.module('text').draw(this.x, br*10, debug, 10);
               br++;
               debug = 'y: ' + currentLine.y.toFixed(2)  + ' vy: ' + currentLine.vy.toFixed(2);
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