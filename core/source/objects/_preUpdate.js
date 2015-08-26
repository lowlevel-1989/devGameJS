module.exports = function(){
   for (var index in this.aPreUpdate){
      this.aPreUpdate[index].apply(this, arguments);
   }
};
