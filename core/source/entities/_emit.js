var gameObjects = require('../_gameObjects');

module.exports = function(id, args){
   var gameObjs = gameObjects.all();
   for (var index in gameObjs){
      var gameObject = gameObjs[index];
      if (typeof gameObject.listen[id] === 'function')
         gameObject.listen[id].apply(gameObject, args);
   }
};