var id = 0;

function init(){
   this.id          = id++;
   this.x           = 0;
   this.y           = 0;
   this.width       = 25;
   this.height      = 25;
   this.vx          = 0;
   this.vy          = 0;
   this.aPreUpdate  = {};
   this.aPostUpdate = {};
   this.gravity     = 0.98;
   this.rebound     = false;
   this.elastic     = 0;
   this.listen      = {};
   this.layer       = 9;
}

module.exports = function _new(){
   var obj = Object.create(this);
   init.apply(obj, arguments);
   console.log('Obj id: '+obj.id);
   return obj;
};