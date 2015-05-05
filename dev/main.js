window.onload = function(){

   devGameJs.setup({width: 900, height: 400, debug: true});
   devGameJs.startGame();
   devGameJs.module('loading').load(['tileInMap.png']);

   //se crea variable global para un manejo mas facil del modulo text
   window.drawText = devGameJs.module('text').draw;

};