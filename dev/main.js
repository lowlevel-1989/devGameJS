window.onload = function(){

   devGameJs.startGame();
   devGameJs.module('loading').load(['tileInMap.png']);

   //se crea variable global para un manejo mas facil del modulo text
   window.drawText = devGameJs.module('text').draw;
   
};