(function(){

   //CONSTRUCTOR
   window.Loading = function(imgs){

      this.imgs       = imgs;
      this.imageCount = this.imgs.length;
      this.loadCount  = 0;
      this.errorCount = 0;

      this.states = {
         PENDING  : 1,
         LOADING  : 2,
         RESOLVED : 3,
         REJECTED : 4
      };

      this.state = this.states.PENDING;

   };


   //METODOS PRIVADOS
   function handleImageLoad(self, imageLocation){
      self.loadCount++;
      if (self.isRejected()){
         console.log('Error al cargar una de las imagenes');
         return;
      }
      console.log(Math.ceil( self.loadCount / self.imageCount * 100 ));
      console.log(imageLocation);
      // if ( this.loadCount === this.imageCount ) {
      //     this.state = this.states.RESOLVED;
      //     this.deferred.resolve( this.imageLocations );
      // }
  }

   function loadImageLocation(self, imageLocation){
      var image    = new Image();
      image.onload = function(event){
         handleImageLoad(self, event.target.src);
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
      if (this.isInitiated()){
         console.log('Ya el load ha sido iniciado anteriormente.');
         return;
      }
      this.state  = this.states.LOADING;
      for (var i = 0 ; i < this.imageCount ; i++) {
         loadImageLocation(this, this.imgs[i]); //Le falta trabajo para llevarlo a privado
      }
      console.log('Cargando...');
   };

})();