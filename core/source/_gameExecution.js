var _canvas      = require('./_canvas');
var _gameObjects = require('./_gameObjects');
var _callGameObjectMethods = require('./_callGameObjectMethods');


module.exports = {
   remove : function(){
      _gameObjects.remove();
   },
   preUpdate : function(){
      _callGameObjectMethods('preUpdate',  _canvas);
   },
   update : function(){
      _callGameObjectMethods('preUpdate',  _canvas);
      //Reordenamos los objetos por capas.
      _gameObjects.layer();
   },
   postUpdate : function(){
      _callGameObjectMethods('postUpdate', _canvas);
   },
   draw : function(){
      _canvas.entitiesContext.clearRect(0, 0, _canvas.entities.width, _canvas.entities.height);
      _callGameObjectMethods('draw', {
                                          background: _canvas.backgroundContext,
                                          entities:   _canvas.entitiesContext
      });
   },
   keyPush : function(event){
      var sEventType = event.type;
      var nKeyCode   = event.keyCode;
      // Control and F5 keys.
      if (nKeyCode !== 17 && nKeyCode !== 116)
         event.preventDefault();

      _callGameObjectMethods(sEventType, nKeyCode);
   }
};