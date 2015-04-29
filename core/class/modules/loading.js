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

      function fpIsLoading(){
         if (imageCount === (errorCount+loadCount))
            return false;
      }

      var handleImageLoad = function (imageLocation) {
         loadCount++;
         if (isRejected())
            return;
         percentLoaded = (Math.ceil( loadCount / imageCount * 100 ));

         if (!fpIsLoading()){
            state        = states.RESOLVED;
            isLoading    = false;
            isSuccessful = true;
            binding.state.set(0); //cambia estado a init en el framework
         }
      };

      var handleImageError = function (imageLocation){
         errorCount++;
         if (!fpIsLoading())
            isLoading = false;

         if (isRejected())
            return;

         self.state = self.states.REJECTED;
      };

      var isInitiated = function () {
         return ( state !== states.PENDING );
      };

      var isRejected = function () {
         return ( state === states.REJECTED );
      };

      var isResolved = function () {
         return ( state === states.RESOLVED );
      };

      var loadImageLocation = function (imageLocation) {
         var image    = new Image();
         image.onload = function (event) {
            handleImageLoad(event.target.src);
            image = event = null;
         };
         image.onerror = function(event){
            // handleImageError(event.target.src);
            image = event = null;
         };
         image.src = imageLocation;
      };

      //Metodos Publicos
      return {
         init : function () {
            binding.state.set(1); //cambia estado a loading en el framework
         },
         load : function(aImgs){
            
            imgs       = aImgs;
            imageCount = imgs.length;

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