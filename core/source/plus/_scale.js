var _canvas = require('../_canvas');

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
   var w     = _canvas.main.width;
   var h     = _canvas.main.height;
   var scale = Math.min(window.innerHeight / h, window.innerWidth / w);

   switch(current) {
      case 'to fill':
         _canvas.main.style.width  = '100%';
         _canvas.main.style.height = '100%';
         break;
      case 'aspect fit':
         _canvas.main.style.width  = (w * scale) + 'px';
         _canvas.main.style.height = (h * scale) + 'px';
         _canvas.main.style.left   = (window.innerWidth  * 0.5  - w * scale * 0.5) + 'px';
         _canvas.main.style.top    = (window.innerHeight * 0.5  - h * scale * 0.5) + 'px';
         break;
      case 'aspect fill':
         console.log('Trabajando...');
   }
}

module.exports = setScale;