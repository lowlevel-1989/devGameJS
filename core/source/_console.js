var debug = document.createElement('div');
var max   = 7;
var count = 0;

debug.style.width      = '400px';
debug.style.height     = '200px';
debug.style.position   = 'absolute';
debug.style.right      = '0px';
debug.style.padding    = '10px';
debug.style.background = 'rgba(0,50,0,.9)';
debug.style.color      = '#FFF';
debug.style.overflow   = 'hidden';
debug.style.cursor     = 'default';

if (!navigator.isCocoonJS){
   window.console.info = window.console.log;
   window.console.log = function(log, clear){
      var isObject  = typeof log === 'object';
      count++;

      if (isObject){
         debug.innerHTML = 'width: ' + log.width  + ' height: ' + log.height +'<br/>' + debug.innerHTML;
         debug.innerHTML = 'y: ' + log.y  + ' vy: ' + log.vy +'<br/>' + debug.innerHTML;
         debug.innerHTML = 'x: ' + log.x  + ' vx: ' + log.vx +'<br/>' + debug.innerHTML;
         debug.innerHTML = 'Object id: '+ log.id + '<br/>' + debug.innerHTML;
      }else
         debug.innerHTML = log + '<br/>' + debug.innerHTML;

      if (count === max){
         debug.innerHTML = '';
         count=0;
      }

   };
}else
   window.console.log = function(){};

module.exports = function(){
   document.body.appendChild(debug);
};