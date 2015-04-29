(function(){
   devGameJs.addModule('loading', function (binding) {
      
      var imgs = ['assets/imgs/tileInMap.png'];
      var imageCount = imgs.length;
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
            console.info('cargado completamente.');
            state        = states.RESOLVED;
            isLoading    = false;
            isSuccessful = true;
         }
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