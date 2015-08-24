var canvas = require('./_canvas')();

var debug = document.createElement('div');

debug.style.width      = '300px';
debug.style.height     = '500px';
debug.style.position   = 'absolute';
debug.style.right      = '0px';
debug.style.padding    = '10px';
debug.style.background = 'rgba(0,50,0,.9)';
debug.style.color      = '#FFF';
debug.style.overflow   = 'hidden';

document.body.appendChild(debug);

window.console.log = function(log, clear){
   if (clear)
      debug.innerHTML = log;
   else
      debug.innerHTML = log + '<br/>' + debug.innerHTML;
};
