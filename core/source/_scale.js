var _canvas = require('./_canvas');

var current = 'absolute';
var orientation;

window.addEventListener('resize', function (eEvent) {
   if (orientation !== window.orientation){
      orientation = window.orientation;
      setScale();
   }
}, true);

function setScale(){
   var arg = arguments[0];
   current = arg ? arg : current;

   current = current.toLowerCase();

   var dpr   = window.devicePixelRatio;
   var w     = _canvas.entities.width;
   var h     = _canvas.entities.height;
   var scale = Math.min(window.innerHeight / h, window.innerWidth / w);

   switch(current) {
      case 'to fill':
         _canvas.background.style.width  = _canvas.entities.style.width  = '100%';
         _canvas.background.style.height = _canvas.entities.style.height = '100%';
         break;
      case 'aspect fit':
         _canvas.background.style.width  = _canvas.entities.style.width  = (w * scale) + 'px';
         _canvas.background.style.height = _canvas.entities.style.height = (h * scale) + 'px';
         _canvas.background.style.left   = _canvas.entities.style.left   = (window.innerWidth  * 0.5  - w * scale * 0.5) + 'px';
         _canvas.background.style.top    = _canvas.entities.style.top    = (window.innerHeight * 0.5  - h * scale * 0.5) + 'px';
         break;
      case 'aspect fill':
         console.log('Trabajando...');
   }
}

module.exports = setScale;