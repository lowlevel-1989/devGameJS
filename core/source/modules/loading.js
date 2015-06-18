(function(){

   'use strict';

   devGameJs.addModule('loading', function (oBinding) {
      
      var aImgs;       //Contenedor de imagenes.
      var nImgCount;   //Numero total de imagenes.
      var nLoadCount;  //Numero de imagenes cargadas.
      var nErrorCount; //Numero de imagenes que lanzaron error.
      
      var sDir = 'assets/imgs/'; //Direccion de imagenes.

      //VARIABLES DE CONTROL
      var isLoading      = true;  //Para saber si esta cargando.
      var isSuccessful   = false; //Notifica si se cargo todo correctamente.
      var nPercentLoaded = 0;     //Porcentaje de carga.


      //Manejador de estados
      var oState = {
         PENDING  : 1,
         LOADING  : 2,
         RESOLVED : 3,
         REJECTED : 4
      };

      //Variable de estado.
      var nState = oState.PENDING;


      //Metodos Privados
      var fpIsLoading = function () {
        
         if (nImgCount === (nErrorCount+nLoadCount))
            return false;

      };


      var fpHandleImageLoad = function (imageLocation) {

         nLoadCount++;

         if (fpIsRejected()) //Si ocurrio un error, se sale de la funcion.
            return;

         nPercentLoaded = (Math.ceil( nLoadCount / nImgCount * 100 )); //Se calcula el porcentaje de carga.

         if (!fpIsLoading()){ //Verifica si ya cargaron todas las imagenes.

            nState       = oState.RESOLVED; //Se cambia el estado a RESOLVED.
            isLoading    = false;            //Se finaliza el loading.
            isSuccessful = true;             //Se indica que se cargaron los datos exitosamente.
            oBinding.state.set(0);           //cambia estado a init en el framework.
         }

      };


      var fpHandleImageError = function (imageLocation) {

         nErrorCount++;

         if (!fpIsLoading())    //Verifica si ya cargaron todas las imagenes.
            isLoading = false;  //Se finaliza el loading.

         if (fpIsRejected()) //Si ocurrio un error, se sale de la funcion.
            return;

         nState = oState.REJECTED; //Se cambia el estado a REJECTED.
      
      };


      var fpIsInitiated = function () {
         return ( nState !== oState.PENDING );
      };

      var fpIsRejected = function () {
         return ( nState === oState.REJECTED );
      };

      var fpIsResolved = function () {
         return ( nState === oState.RESOLVED );
      };

      var fpLoadImageLocation = function (imageLocation) {
         
         var image    = new Image();
         image.onload = function (event) {
            fpHandleImageLoad(event.target.src);
            image = event = null;
         };
         image.onerror = function(event){
            fpHandleImageError(event.target.src);
            image = event = null;
         };
         image.src = sDir + imageLocation;
      };

      var pfAutoStart = function (){
         if (nState  === oState.PENDING){
            console.log('test');
            oBinding.state.set(0);
         }
      };

      //Metodos Publicos
      return {

         init : function () {
            oBinding.state.set(1); //cambia estado a loading en el framework
         },

         off : function () {
            oBinding.state.set(0);
         },

         load : function (aImgs) {
            
            aImgs       = aImgs;
            nImgCount   = aImgs.length;

            if (fpIsInitiated())
               return;

            nState  = oState.LOADING;

            for (var i = 0 ; i < nImgCount ; i++) {
               fpLoadImageLocation(aImgs[i]);
            }
         }

      };

   });

})();