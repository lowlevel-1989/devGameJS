(function(){

   devGameJs.addGameObject({
      scene: 'global',
      name : 'fps',
      obj  : function () {

         var sCurrent = '0';
         var nLayer   = 5;

         return {

            layer: nLayer,

            update : function() {
               sCurrent = devGameJs.module('fps').update().toString();
            },

            draw : function () {
               devGameJs.module('text').draw(0, 10, sCurrent, 16);
            }

         };
      }

   });

})();