describe('devGameJs.module', function(){

   function module(oBinding){

      function print(string){
         return string;
      }

      return {
         print : print
      };
   }

   it('Se crea un nuevo modulo?', function(){
      devGameJs.addModule('print', module);
      devGameJs.startGame();
      expect('print' in devGameJs.module('print') ? true : false).toBe(true);
   });

   it('Se ejecuta el modulo', function(){
      var print = devGameJs.module('print').print;
      expect(print('devGameJs') === 'devGameJs').toBe(true);
   });

});
