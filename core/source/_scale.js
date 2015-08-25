var canvas = require('./_canvas');

var current = 'absolute';

var orientation;

window.addEventListener('resize', function (eEvent) {
   if (orientation !== window.orientation){
      orientation = window.orientation;
      _scale();
   }
}, true);

function _scale(){
   var arg = arguments[0];
   current = arg ? arg : current;

   current = current.toLowerCase();

   var dpr   = window.devicePixelRatio;
   var w     = canvas.entities.width;
   var h     = canvas.entities.height;
   var scale = Math.min(window.innerHeight / h, window.innerWidth / w);

   switch(current) {
      case 'to fill':
         canvas.background.style.width  = canvas.entities.style.width  = '100%';
         canvas.background.style.height = canvas.entities.style.height = '100%';
         break;
      case 'aspect fit':
         canvas.background.style.width  = canvas.entities.style.width  = (w * scale) + 'px';
         canvas.background.style.height = canvas.entities.style.height = (h * scale) + 'px';
         canvas.background.style.left   = canvas.entities.style.left   = (window.innerWidth  * 0.5  - w * scale * 0.5) + 'px';
         canvas.background.style.top    = canvas.entities.style.top    = (window.innerHeight * 0.5  - h * scale * 0.5) + 'px';
         break;
      case 'aspect fill':
         console.log('Trabajando...');
   }
}

module.exports = _scale;