(function(){

   //CONSTRUCTOR
   window.Storage = function(objs){
      window.Loading.call(this, serializer(objs));    
   };

   //METODOS PRIVADOS
   function serializer(objs){
      var temp = [];
      for (var indice in objs) {
         var id  = objs[indice].id;
         var src = objs[indice].src;
         temp[id] = src;
      }
      return temp;
   }

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
   window.Storage.prototype = Object.create(Loading.prototype);

   window.Storage.prototype.load = function(){
      if (this.isInitiated())
         return;
      this.state  = this.states.LOADING;
      for (var id in this.imgs) {
         loadImageLocation(this, this.imgs[id]); //Le falta trabajo para llevarlo a privado
      }
   };

   window.Storage.prototype.get=function(id){
      return this.imgs[id];
   };


})();