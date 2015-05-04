(function(){
   devGameJs.addModule('drawText', function (oBinding) {

      var oSpriteFont    = {};
      oSpriteFont.image  = new Image();
      oSpriteFont.nSize  = 16;
      oSpriteFont.row    = 4;
      oSpriteFont.column = 3;

      oSpriteFont.image.src = 'imagen aqui';

      oSpriteFont.width  = oSpriteFont.image.width  / oSpriteFont.column;
      oSpriteFont.height = oSpriteFont.image.height / oSpriteFont.row;

      var aMapper = {}; //Contiene las direcciones del spriteFont.
      var sMapper;      //String con el mapper.

      var pfSetMapper = function () {
         
         var nCurrent;
         var nLetter  = 0;
         var nRow     = 0;
         var nColumn  = 0;

         for (nRow; nRow < oSpriteFont.row; nRow++){
            for (nColumn; nColumn < oSpriteFont.column; nColumn++){

               nCurrent = sMapper[nLetter];
               aMapper[nCurrent] = {
                  sx: nColumn*oSpriteFont.width,
                  sy: nRow*oSpriteFont.height
               };
               nLetter++;
            }
         }
      };

      return {
         init : function(){
            console.log('Testeando spriteFont...');
            pfSetMapper();
         }
      };

   });

})();