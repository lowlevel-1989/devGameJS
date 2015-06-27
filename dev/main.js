window.onload = function(){

   'use strict';

   //Ningunos de los atributos son obligatorios ni la ejecucion del mismo
   devGameJs.setup({width: 900, height: 400});

   //Inica el juego
   devGameJs.startGame();

   //desactivar modulo loading
   devGameJs.module('loading').off();

   //Como agragar imaganes al loading, Nota: solo soporta *.png
   // devGameJs.module('loading').load([
   //    ['tile', 'tileInMap.png'], 
   //    ['sprite', 'http://spritedatabase.net/files/pc/2203/Sprite/Tim.png']
   // ]);

   //Ningunos de los atributos son obligatorios ni la ejecucion del mismo
   /*devGameJs.module('text').setup(
                                    {
                                       customize: true, image: 'spriteFont.png', 
                                       mapper: '123456789*0#', row: 4, column: 3
                                    }
                                 );*/

   //Extender framework con los modulos
   devGameJs.ext.resource = devGameJs.module('loading');
   devGameJs.ext.drawText = devGameJs.module('text').draw;

};