var _canvas      = require('./_canvas');
var _gameObjects = require('./_gameObjects');
var _callGameObjectMethods = require('./_callGameObjectMethods');


module.exports = {
   
   remove : _gameObjects.remove,

   preUpdate: function(){
      _callGameObjectMethods('preUpdate',  _canvas);
   },

   //Actualiza objetos del juego
   update : function(){
      _callGameObjectMethods('update', _canvas);
      //Reordenamos los objetos por capas.
      _gameObjects.layer();

   },

   postUpdate: function(){
      _callGameObjectMethods('postUpdate', _canvas);
   },
   
   //Dibuja objetos en el juego
   draw : function(){
      _canvas.ctx.clearRect(0, 0, _canvas.main.width, _canvas.main.height);
      _callGameObjectMethods('draw', _canvas.ctx);

   },
   //Controla los eventos del teclado
   keyPush : function(event){
      var eventType = event.type;
      var keyCode   = event.keyCode;
      // Control and F5 keys.
      if (keyCode !== 17 && keyCode !== 116) {
         event.preventDefault();
      }
      _callGameObjectMethods(eventType, keyCode);
   },

   touch : function(event){
      var scaleTouches = [];
      var touch     = null;
      var scale     =  Math.min(window.innerHeight / devGameJs.height, window.innerWidth / devGameJs.width);
      var eventType = event.type;
      var touches   = event.touches;
      event.preventDefault();

      if (eventType !== 'touchend'){

         for (var index in touches){
            touch = touches[index];

            scaleTouches.push({
               id: touch.identifier,
               x: ((devGameJs.width  * (touch.clientX-devGameJs.scaleLeft))/devGameJs.scaleWidth)-25,
               y: ((devGameJs.height * (touch.clientY-devGameJs.scaleTop))/devGameJs.scaleHeight)-25,
               width: 50,
               height: 50
            });
            
         }
      
      }else{
         touch = event.changedTouches[0];

         scaleTouches = {
            id: touch.identifier,
            x: ((devGameJs.width  * touch.clientX)/devGameJs.scaleWidth)-25,
            y: ((devGameJs.height * touch.clientY)/devGameJs.scaleHeight)-25,
            width: 50,
            height: 50
         };

      }
      
      _callGameObjectMethods(eventType, scaleTouches);
   },

   mouse : function(event){
      var eventType = event.type;
      event.preventDefault();
      var mouse = {
         id: 0,
         x: ((devGameJs.width  * event.clientX)/devGameJs.scaleWidth)-13,
         y: ((devGameJs.height * event.clientY)/devGameJs.scaleHeight)-26,
         width: 25,
         height: 25
      };
      _callGameObjectMethods(eventType, mouse);
   },
};