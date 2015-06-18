window.onload = function(){

   //Ningunos de los atributos son obligatorios ni la ejecucion del mismo
   devGameJs.setup({width: 900, height: 400, debug: true});

   //Inica el juego
   devGameJs.startGame();

   //desactivar modulo loading
   devGameJs.module('loading').off();

   //Como agragar imaganes al loading, Nota: solo soporta *.png
   // devGameJs.module('loading').load(['tileInMap.png']);

   //Ningunos de los atributos son obligatorios ni la ejecucion del mismo
  /* devGameJs.module('text').setup(
                                    {
                                       customize: true, image: 'spriteFont.png', 
                                       mapper: '123456789*0#', row: 4, column: 3
                                    }
                                 );*/

   //se crea variable global para un manejo mas facil del modulo text
   window.DrawText = devGameJs.module('text').draw;

   window.Physics  = devGameJs.module('physics');

};