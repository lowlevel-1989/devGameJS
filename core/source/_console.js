var debug = document.createElement('div');

debug.style.width      = '400px';
debug.style.height     = '200px';
debug.style.position   = 'absolute';
debug.style.right      = '0px';
debug.style.padding    = '10px';
debug.style.background = 'rgba(0,50,0,.9)';
debug.style.color      = '#FFF';
debug.style.overflow   = 'hidden';
debug.style.cursor     = 'default';

var count = 0;

if (!navigator.isCocoonJS){
   window.console.log = function(log, clear){
      if (++count > 10){
         count = 0;
         clear = true;
      }
      if (clear)
         debug.innerHTML = log;
      else
         debug.innerHTML = log + '<br/>' + debug.innerHTML;
   };
}else
   window.console.log = function(){};

module.exports = function(){
   document.body.appendChild(debug);
};