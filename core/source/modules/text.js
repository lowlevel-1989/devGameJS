(function(){

   'use strict';
   
   devGameJs.addModule('text', function (oBinding) {

      var oSpriteFont     = {};
      oSpriteFont.image   = new Image();
      oSpriteFont.row     = 8;
      oSpriteFont.column  = 8;
      oSpriteFont.auto    = true;
      oSpriteFont.color   = 'white';
      oSpriteFont.assets  = 'assets/imgs/';

      oSpriteFont.default = function () {
         return oSpriteFont.assets + 'SPRITE-'+oSpriteFont.color+'.png';
      };

      var nLoading = true;

      oSpriteFont.image.src = oSpriteFont.default();

      var oMapper = {}; //Contiene las direcciones del spriteFont.
      var sMapper;      //String con el mapper.

      var pfLoad = function(mapper){
         
         oSpriteFont.image.onload = function (event) {
            sMapper = mapper; 
            
            nLoading = false;

            oSpriteFont.width  = oSpriteFont.image.width  / oSpriteFont.column;
            oSpriteFont.height = oSpriteFont.image.height / oSpriteFont.row;

            pfSetMapper();
         };
      
      };

      var pfSetMapper = function () {
         
         var nCurrent;
         var nLetter  = 0;
         var nRow     = 0;
         var nColumn  = 0;

         for (nRow = 0; nRow < oSpriteFont.row; nRow++){
            for (nColumn = 0; nColumn < oSpriteFont.column; nColumn++){
               nCurrent = sMapper[nLetter];
               oMapper[nCurrent] = {
                  sx: nColumn*oSpriteFont.width,
                  sy: nRow*oSpriteFont.height
               };
               nLetter++;
            }
         }
      };

      return {

         init : function () {
            pfLoad('abcdefghijklmnopqrstuvwxyz0123456789.,;:?!-_#"\'&()[]\\/@+=$*<>');
         },

         draw : function (nAxisX, nAxisY, sText, nSize) {
            
            if (!nLoading){
               var nLetter;
               var nPos = 0;
               oSpriteFont.Size = nSize;

               for (var i = 0; i < sText.length; i++){
                  
                  nLetter = sText[i];
                  
                  oBinding.canvas.bufferContext.drawImage(
                     oSpriteFont.image, 
                     oMapper[nLetter].sx, 
                     oMapper[nLetter].sy,
                     oSpriteFont.width,
                     oSpriteFont.height,
                     nPos + nAxisX, nAxisY,
                     oSpriteFont.Size,
                     oSpriteFont.Size
                  );

                  nPos += oSpriteFont.Size;

               }
            }
         }


      };

   });

})();