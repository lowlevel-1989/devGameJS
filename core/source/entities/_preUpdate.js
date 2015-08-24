module.exports = function _preUpdate(){
   for (var index in this.aPreUpdate){
      this.aPreUpdate[index].apply(this, arguments);
   }
};
