devGameJs.setup({title: 'DevGameJS', width: 900, height: 400, scale: 'aspect fit'});

describe('devGameJs', function(){

   it('Se creo la class devGameJs?', function(){
      
      var response = devGameJs ? true : false;
      expect(response).toBe(true);

      describe('devGameJs.methods', function(){

         it('Existe el metodo startGame?', function(){
            expect('startGame' in devGameJs).toBe(true);
         });

         it('Existe el metodo objects?', function(){
            expect('objects' in devGameJs).toBe(true);
         });

         it('Existe el metodo addObject?', function(){
            expect('addObject' in devGameJs).toBe(true);
         });

         it('Existe el metodo random?', function(){
            expect('random' in devGameJs).toBe(true);
         });

         it('Existe el metodo module?', function(){
            expect('module' in devGameJs).toBe(true);
         });
         
         it('Existe el metodo addModule?', function(){
            expect('addModule' in devGameJs).toBe(true);
         });

         it('Existe el metodo setup?', function(){
            expect('setup' in devGameJs).toBe(true);
         });

         it('Existe el metodo version?', function(){
            expect('version' in devGameJs).toBe(true);
         });
         
      });

   });

});
