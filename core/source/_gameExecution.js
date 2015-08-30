var _canvas      = require('./_canvas');
var _gameObjects = require('./_gameObjects');
var _callGameObjectMethods = require('./_callGameObjectMethods');


module.exports = {
   
   remove : _gameObjects.remove,

   preUpdate: function() {
      _callGameObjectMethods('preUpdate',  _canvas);
   },

   //Actualiza objetos del juego
   update : function () {
      _callGameObjectMethods('update', _canvas);
      //Reordenamos los objetos por capas.
      _gameObjects.layer();

   },

   postUpdate: function() {
      _callGameObjectMethods('postUpdate', _canvas);
   },
   
   //Dibuja objetos en el juego
   draw : function () {
      _canvas.ctx.clearRect(0, 0, _canvas.main.width, _canvas.main.height);
      _callGameObjectMethods('draw', _canvas.ctx);

   },
   //Controla los eventos del teclado
   keyPush : function (eEvent) {
      var sEventType = eEvent.type;
      var nKeyCode   = eEvent.keyCode;
      // Control and F5 keys.
      if (nKeyCode !== 17 && nKeyCode !== 116) {
         eEvent.preventDefault();
      }
      _callGameObjectMethods(sEventType, nKeyCode);
   }
};