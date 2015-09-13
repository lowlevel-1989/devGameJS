describe('DevGameJs', function(){

   it('Se creo la class devGameJs?', function(){
      
      var response = devGameJs ? true : false;
      expect(response).toBe(true);

      if (response){

         describe('objects', function(){

            it('Existe el metodo objects?', function(){
               expect('objects' in devGameJs).toBe(true);
            });

         });
      }

   });

});
