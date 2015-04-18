(function(){

   //CONSTRUCTOR
   window.loading = function(imgs){

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
   function handleImageLoad(imageLocation){

   }

   function loadImageLocation(imageLocation){
      var image    = new Image();
      image.onload = function(event){
         handleImageLoad(event.target.src);
         image = event = null;
      };
   }


   //METODOS PUBLICOS
   window.loading.prototype.isInitiated = function (){
      return ( this.state !== this.states.PENDING );
   };

   window.loading.prototype.isRejected = function(){
      return ( this.state === this.states.REJECTED );
   };

   window.loading.prototype.isResolved = function(){
      return ( this.state === this.states.RESOLVED );
   };

   window.loading.prototype.load = function(){
      if (this.isInitiated())
         return this.imgs; //PENSAR ESTO MEJOR
      this.state  = this.states.LOADING;
      var notify;
      for (var i = 0 ; i < this.imageCount ; i++) {
         notify = loadImageLocation(this.imgs[i]); //Le falta trabajo para llevarlo a privado
      }
      return this.imgs; //PENSAR ESTO MEJOR
   };

})();