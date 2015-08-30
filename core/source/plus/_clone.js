module.exports = function(obj){
   var clone = {};
   for (var index in obj)
      clone[index] = obj[index];
   return clone;
};
