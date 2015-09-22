describe('objects.gravity', function(){

   var obj = devGameJs.objects.new();
   var key = 'gravity';

   it('El objeto inicia con gravedad en 0.98?', function(){
      expect(obj.gravity).toBe(0.98);
   });

   it('El objeto inicia con la gravedad inactiva?', function(){
      expect(obj.aPreUpdate[key] ? true : false).toBe(false);
   });

   it('El objeto tiene el metodo applyGravity?', function(){
      expect('applyGravity' in obj).toBe(true);                        
   });

   it('Puedo aplicar la gravedad?', function(){
      obj.applyGravity();
      expect(obj.aPreUpdate[key] ? true : false).toBe(true);
   });

});