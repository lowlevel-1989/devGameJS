(function(){

   //CONSTRUCTOR
   window.Loading = function(imgs){

      this.imgs       = imgs;
      this.imageCount = this.imgs.length;
      this.loadCount  = 0;
      this.errorCount = 0;

      //VARIABLES DE CONTROL
      this.isLoading     = true;
      this.isSuccessful  = false;
      this.percentLoaded = 0;

      this.states = {
         PENDING  : 1,
         LOADING  : 2,
         RESOLVED : 3,
         REJECTED : 4
      };

      this.state = this.states.PENDING;

   };


   //METODOS PRIVADOS
   function isLoading(self){
      if (self.imageCount === (self.errorCount+self.loadCount)){
         return false;
      }
   }

   function handleImageError(self, imageLocation){
      self.errorCount++;
      if (!isLoading(self))
         self.isLoading = false;

      if (self.isRejected())
         return;

      self.state = self.states.REJECTED;
  }

   function handleImageLoad(self, imageLocation){
      self.loadCount++;
      if (self.isRejected())
         return;

      self.percentLoaded = (Math.ceil( self.loadCount / self.imageCount * 100 ));
      
      if (!isLoading(self)){
         self.state        = self.states.RESOLVED;
         self.isLoading    = false;
         self.isSuccessful = true;
      }
  }

   function loadImageLocation(self, imageLocation){
      var image    = new Image();
      image.onload = function(event){
         handleImageLoad(self, event.target.src);
         image = event = null;
      };
      image.onerror = function(event){
         handleImageError(self, event.target.src);
         image = event = null;
      };
      image.src   = imageLocation;
   }


   //METODOS PUBLICOS
   window.Loading.prototype.isInitiated = function (){
      return ( this.state !== this.states.PENDING );
   };

   window.Loading.prototype.isRejected = function(){
      return ( this.state === this.states.REJECTED );
   };

   window.Loading.prototype.isResolved = function(){
      return ( this.state === this.states.RESOLVED );
   };

   window.Loading.prototype.load = function(){
      if (this.isInitiated())
         return;
      this.state  = this.states.LOADING;
      for (var i = 0 ; i < this.imageCount ; i++) {
         loadImageLocation(this, this.imgs[i]); //Le falta trabajo para llevarlo a privado
      }
   };

})();