var gameObjects = require('./_gameObjects');

module.exports = function(name, canvas){
   var oCurrentGameObject;
   var index;
   for (index in gameObjects) {
      oCurrentGameObject = gameObjects[index];
      if (typeof oCurrentGameObject[name] === 'function')
         oCurrentGameObject[name](canvas);
   }
};
