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

   _canvas.main.style.width  = w + 'px';
   _canvas.main.style.height = h + 'px';
   _canvas.main.style.left   = 0 + 'px';
   _canvas.main.style.top    = 0 + 'px';

   switch(current) {
      case 'to fill':
         _canvas.main.style.width  = window.innerWidth  + 'px';
         _canvas.main.style.height = window.innerHeight + 'px';
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

   window.devGameJs.width       = w;
   window.devGameJs.height      = h;
   window.devGameJs.scaleWidth  = parseFloat(_canvas.main.style.width.replace('px', ''));
   window.devGameJs.scaleHeight = parseFloat(_canvas.main.style.height.replace('px', ''));
   window.devGameJs.scaleLeft   = parseFloat(_canvas.main.style.left.replace('px', ''));
   window.devGameJs.scaleTop    = parseFloat(_canvas.main.style.top.replace('px', ''));
}

module.exports = setScale;