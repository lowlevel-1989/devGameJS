var objA   = devGameJs.objects.new();
var objB = devGameJs.objects.new();

objA.title = 'soyVinicio';
objA.applyCollision();

objB.applyReaction = function(other){
   objB.result = other.title;
};

devGameJs.addObject(objA);
devGameJs.addObject(objB);

describe('objects.collision', function(){
   
   var response = false;

   it('Funcionando el sistema de colision?', function(){
      
      runs(function(){
         setTimeout(function() {
            response = objB.result;
         }, 500);
      });

      waitsFor(function() {
         return response;
      }, 'No se aplico la reaccion.', 1000);

      runs(function() {
         expect(response === 'soyVinicio').toBe(true);
      });
      
   });

});