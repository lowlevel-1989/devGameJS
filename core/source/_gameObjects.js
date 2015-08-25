var gameObjects = [];

function add(obj){
   gameObjects.push(obj);
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