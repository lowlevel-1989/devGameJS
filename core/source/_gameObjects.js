var _clone = require('./_clone');

var gameObjects = [];

function add(obj){
   var clone = _clone(obj);
   gameObjects.push(clone);
}

function remove(){
   gameObjects = gameObjects.filter(function(item){
      return item.dead !== true;
   });
}

function layer(){
   gameObjects.sort(function(oObjA, oObjB) {
      return oObjA.layer - oObjB.layer;
   });
}

function all(){
   return gameObjects;
}

module.exports = {
                     add:    add,
                     remove: remove,
                     all:    all,
                     layer:  layer
};