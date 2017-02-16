// Ahora crearemos una Clase rectangulo
// el cual podamos tener un mejor control
// de el y reutilizarlo las veces que lo 
// necesitemos
var Rectangule = function(options){
  
  // Todo el codigo que coloquemos aqui
  // se ejecutara una vez se instancie la clase

  var x = options.x || 0
  var y = options.y || 0
  
  // Esto ejecuta el constructor de su padre
  // en nuestro caso heredamos de Rect
  DEVGAME.entity.Rect.call(this, x, y, 50, 50)
  
  this.color     = options.color     || '#000'
  this.fill      = true
  this._steps    = 0 // _ se utiliza para identificar atributos privados
  this.limit     = options.limit     || 100
  this.direction = options.direction || 1
  this.vspeed    = options.vspeed    || 0
  this.hspeed    = options.hspeed    || 0
}

// En el metodo logic asignamos toda la logica que 
// queramos para nuestros objetos rectangulos
Rectangule.prototype.logic = function(){

  if (this._steps > this.limit){
    this.direction *= -1
    this._steps = 0
  }

  var coor = null
  if (this.vspeed > 0) coor = 'y'
  if (this.hspeed > 0) coor = 'x'

  this.speed = this.hspeed + this.vspeed

  this[coor]  += this.speed * this.direction
  this._steps += this.speed 
}

// Con esta linea extendemos nuestra clase Rectangulo
// para que herede todos los metodos de su padre, la
// funcion extend soporta multiherencia
DEVGAME.extend(Rectangule, DEVGAME.entity.Rect)

