(function(){

	devGameJs.addModule('pepito', function (oBinding) {
		var mensaje = 'Hola mi modulo numero 1';

		function msj(){
			console.log(oBinding.canvas.buffer.width);
		}

		return {
			init : msj
		}
	});

})();