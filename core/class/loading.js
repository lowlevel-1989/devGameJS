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
      
      console.log('entre porque cargue');
      console.log(self.imgs.length);

      // this.loadCount++; //este va para notify
      // if ( this.isRejected() ) { //esta va para notify
      //     return;
      // }
      // this.deferred.notify({
      //     percent: Math.ceil( this.loadCount / this.imageCount * 100 ), // esta ve para notify
      //     imageLocation: imageLocation //este va para notify
      // });
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
      if (this.isInitiated())
         return this.imgs; //PENSAR ESTO MEJOR
      this.state  = this.states.LOADING;
      var notify;
      for (var i = 0 ; i < this.imageCount ; i++) {
         notify = loadImageLocation(this, this.imgs[i]); //Le falta trabajo para llevarlo a privado
      }
      return this.imgs; //PENSAR ESTO MEJOR
   };

})();