describe('objects.collision', function(){

   var objA   = devGameJs.objects.new();
   var objB = devGameJs.objects.new();
   
   objA.title = 'soyVinicio';
   objA.applyCollision();

   var response = false;

   objB.applyReaction = function(other){
      objB.result = other.title;
   };

   devGameJs.addObject(objA);
   devGameJs.addObject(objB);


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