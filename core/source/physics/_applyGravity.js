var key = 'gravity';

function gravity(){
   if (this.rebound){
      this.vy = -this.vy * this.elastic;
      this.rebound = false;
   }
   this.vy += this.gravity;
   this.y  += this.vy;
}

module.exports = function(){
   this.aPreUpdate[key] = gravity;
};