(function(){
   devGameJs.addModule('text', function (oBinding) {

      var oSpriteFont    = {};
      oSpriteFont.image  = new Image();
      oSpriteFont.row    = 4;
      oSpriteFont.column = 3;

      var nLoading = true;

      oSpriteFont.image.src = 'assets/imgs/spriteFont.png';

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
            pfLoad('123456789*0#');
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
                     32, 32, nPos + nAxisX, nAxisY,
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