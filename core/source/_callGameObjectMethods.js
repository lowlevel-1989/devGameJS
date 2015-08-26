var _gameObjects = require('./_gameObjects');

module.exports = function(name, canvas){
   var gameObjs = _gameObjects.all();
   var oCurrentGameObject;
   var index;
   for (index in gameObjs) {
      oCurrentGameObject = gameObjs[index];
      if (typeof oCurrentGameObject[name] === 'function')
         oCurrentGameObject[name](canvas);
   }
};
