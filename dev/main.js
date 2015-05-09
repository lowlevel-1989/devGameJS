window.onload = function(){

   //Ningunos de los atributos son obligatorios ni la ejecucion del mismo
   devGameJs.setup({width: 900, height: 400, debug: true});

   devGameJs.startGame();
   devGameJs.module('loading').load(['tileInMap.png']);

   //se crea variable global para un manejo mas facil del modulo text
   window.DrawText = devGameJs.module('text').draw;

   window.Physics  = devGameJs.module('physics');

};