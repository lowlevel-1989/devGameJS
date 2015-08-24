var key = 'animation';

module.exports = function _setAnimations(oSetting){
   this.sprite             = {};
   this.animations         = [];
   this.animationsCallback = [];
   this.animation          = oSetting.name[0];

   this.sprite.row    = oSetting.name.length;
   this.sprite.column = oSetting.frame;
   this.sprite.sheets = oSetting.sprite;
   this.sprite.width  = oSetting.width;
   this.sprite.height = oSetting.height;
   this.sw            = this.sprite.width/this.sprite.column;
   this.sh            = this.sprite.height/this.sprite.row;
          
   this.frameIndex    = 0;
   this.tickCount     = 0;
   this.ticksPerFrame = oSetting.frameDelay;

   var name;
   for (var row = 0; row < this.sprite.row; row++ ){
      name = oSetting.name[row];
      this.animations[name] = [];
      for (var column = 0; column < this.sprite.column; column++){
         this.animations[name].push({
            sx: column*this.sw,
            sy: row*this.sh
         }); 
      }
   }

   this.aPostUpdate[key] = function(){
      this.tickCount++;
      if (this.ticksPerFrame && this.tickCount > this.ticksPerFrame){
         this.tickCount = 0;
         this.frameIndex = ++this.frameIndex % this.sprite.column;
      }
      if (this.ticksPerFrame && this.frameIndex === (this.sprite.column-1)){
         var callback = this.animationsCallback[this.animation];
         if(callback)
            callback.apply(this, arguments);
      }
   };

   this.renderAnimation = function(canvas){
      var animation = this.animations[this.animation][this.frameIndex];
      canvas.entities.drawImage(
         this.sprite.sheets, 
         animation.sx, 
         animation.sy,
         this.sw,
         this.sh,
         this.x, 
         this.y,
         this.width,
         this.height
      );
   };

   this.setFrameDelay = function(frameDelay){
      this.tickCount = 0;
      this.ticksPerFrame = frameDelay;
   };

   this.setAnimation = function(name, callback){
      this.animation  = name;
      this.tickCount  = 0;
      this.frameIndex = 0;
      if (typeof callback === 'function')
         this.animationsCallback[name] = callback;
   };

   this.getAnimation = function(){
      return this.animation;
   };
};