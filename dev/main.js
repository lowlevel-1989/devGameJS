//Ningunos de los atributos son obligatorios ni la ejecucion del mismo
devGameJs.setup({title: 'DevGameJS', width: 900, height: 400, scale: 'aspect fit'});

//Inica el juego
devGameJs.startGame();

//desactivar modulo loading
// devGameJs.module('loading').off();

//Como agragar imaganes al loading, Nota: solo soporta *.png
devGameJs.module('loading').load([
   ['ball', 'ball.png'],
   ['hero', 'hero.png']
]);

devGameJs.module('text').setup({color: 'white'});

//Ningunos de los atributos son obligatorios ni la ejecucion del mismo
/*devGameJs.module('text').setup(
                                 {
                                    customize: true, image: 'spriteFont.png', 
                                    mapper: '123456789*0#', row: 4, column: 3
                                 }
                              );*/

devGameJs.module('console').active(true);

//Extender framework con los modulos
devGameJs.ext.resource = devGameJs.module('loading');
devGameJs.ext.drawText = devGameJs.module('text').draw;

