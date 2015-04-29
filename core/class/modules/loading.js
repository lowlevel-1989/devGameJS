(function(){
   devGameJs.addModule('loading', function (binding) {
      
      var imgs;
      var imageCount;
      var loadCount;
      var errorCount;

      //VARIABLES DE CONTROL
      var isLoading     = true;
      var isSuccessful  = false;
      var percentLoaded = 0;

      var states = {
         PENDING  : 1,
         LOADING  : 2,
         RESOLVED : 3,
         REJECTED : 4
      };

      var state = states.PENDING;

      //Metodos Privados
      var isInitiated = function () {
         return ( state !== states.PENDING );
      };

      var loadImageLocation = function (imageLocation) {
         var image    = new Image();
         image.onload = function (event) {
            handleImageLoad(event.target.src);
            image = event = null;
         };
         image.onerror = function(event){
            handleImageError(event.target.src);
            image = event = null;
         };
         image.src = imageLocation;
      };

      //Metodos Publicos
      return {
         init : function () {
            binding.state.set(1);
         },
         load : function(){
            if (isInitiated())
               return;
            state  = states.LOADING;
            for (var i = 0 ; i < imageCount ; i++) {
               loadImageLocation(imgs[i]);
            }
         }
      };
   });

})();