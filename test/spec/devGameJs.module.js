devGameJs.addModule('print', function (oBinding){
   function print(string){
      return string;
   }

   return {
      print : print
   };
});

devGameJs.startGame();


describe('devGameJs.module', function(){

   it('Se crea un nuevo modulo?', function(){
      expect('print' in devGameJs.module('print') ? true : false).toBe(true);
   });

   it('Se ejecuta el modulo', function(){
      var print = devGameJs.module('print').print;
      expect(print('devGameJs') === 'devGameJs').toBe(true);
   });

});
