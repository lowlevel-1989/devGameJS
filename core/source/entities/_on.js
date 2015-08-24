module.exports = function _on(id, callback){
   this.listen[id] = callback;
};