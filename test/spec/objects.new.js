describe('objects.new', function(){

   var obj = devGameJs.objects.new();

   it('Existe el metodo new?', function(){
      expect('new' in devGameJs.objects).toBe(true);
   });

   it('Se instancia un nuevo objeto?', function(){
      expect(obj ? true : false).toBe(true);
   });

});