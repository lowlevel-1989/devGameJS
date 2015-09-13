describe('objects.gravity', function(){

   if (devGameJs){

      var obj = null;
      obj = devGameJs.objects.new();

      if (obj){

         it('El objeto inicia con gravedad en 0.98?', function(){
            expect(obj.gravity).toBe(0.98);
         });

         it('El objeto inicia con la gravedad inactiva?', function(){
            var key = 'gravity';
            var response = obj.aPreUpdate[key] ? true : false;
            expect(response).toBe(false);
         });

         it('El objeto tiene el metodo applyGravity?', function(){
            expect('applyGravity' in obj).toBe(true);                        
         });

         it('Puedo aplicar la gravedad?', function(){
            obj.applyGravity();
            var key = 'gravity';
            var response = obj.aPreUpdate[key] ? true : false;
            expect(response).toBe(true);
         });

      }
   }

});