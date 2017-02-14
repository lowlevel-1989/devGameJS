(function(window, document, DEVGAME, undefined){
  'use strict'

  // Variables globales

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  var rect1
  var rect2
  var rect3


  // La primera funcion que se ejecuta al cargar la pagina
  // y solo se ejecuta una sola vez
  function init(){

    rect1 = new DEVGAME.entity.Rect(100, 100, 50, 50)
    rect2 = new DEVGAME.entity.Rect(110, 230, 50, 50)
    // recordaar que clone solo copia x, y, alto y ancho
    rect3 = rect1.clone()
  
    // Se asigna el contexto al rectangulo
    rect1.setContext(context)
    // Con el atributo color se le puede asignar un color
    rect1.color = 'blue'
    // Asignamos el flag para que lo pinte completo
    rect1.fill = true

    // Asignamos el contexto al segundo rectangulo
    rect2.setContext(context)
    rect2.color = '#00FF00'


    // Este no toma recibe el contexto asi que se debe asignar
    rect3.setContext(context)
    // Nos movemos 70 px a la derecha
    // recordar que iniciamos en la posicion x y
    // de la instancia original
    rect3.x += 70
    // Para identificarlo lo pintaremos de rojo
    rect3.color = 'red'


    // Creamos la logica para el segundo rectangulo
    rect3.steps     = 0   // Contador de pasos
    rect3.limit     = 65 // Limite de pasos para cambiar de direccion
    rect3.direction = 1   // Direcccion arr (-1) o aba (1) 
    rect3.vspeed    = 4   // Velocidad horizontal 2 px
    rect3.logic = function(){
    
      // Se cuentan los pasos que se ha desplazado el objeto
      // si has pasado el limite cambia de direccion
      if (this.steps > this.limit){
        this.direction *= -1
        this.steps = 0
      }

      // Cambiamos la posicion en y del objeto
      this.y += this.vspeed * this.direction
      // Incrementmos los pasos
      this.steps += this.vspeed;

    }

    
    // Creamos la logica para el segundo rectangulo
    rect2.steps     = 0   // Contador de pasos
    rect2.limit     = 200 // Limite de pasos para cambiar de direccion
    rect2.direction = 1   // Direcccion izq (-1) o der (1) 
    rect2.hspeed    = 2   // Velocidad horizontal 2 px
    rect2.logic = function(){
    
      // Se cuentan los pasos que se ha desplazado el objeto
      // si has pasado el limite cambia de direccion
      if (this.steps > this.limit){
        this.direction *= -1
        this.steps = 0
      }

      // Cambiamos la posicion en x del objeto
      this.x += this.hspeed * this.direction
      // Incrementmos los pasos
      this.steps += this.hspeed;

    }

    
    // Iniciamos el GameLoop
    run(loop)

  }

  // Funcion que se ejecuta en cada ciclo
  // y es donde se ejecuto cada paso de 
  // nuestros objetos
  function exec(timestamp){
  
    // el metodo exec no es mas que un contador de pasos
    // y es necesario para el funcionamiento del metodo
    // logic
    rect2.exec()

    // No olvidemos ejecutar tambien los pasos del rect
    // rojo
    rect3.exec()

    // Viendo esto imaginemos que tenemos 100 objetos 
    // en pantalla, no creen que seria un poco complejo
    // manejarlo? solo piensa que tendrias que dibujar
    // los 100 objetos uno a uno y adicional a eso a cada
    // objeto le tendrias que ejecutar los pasos con exec.
    //
    // BUENO NO TE PREOCUPES, MANEJAR MUCHOS OBJETOS TIENE
    // UNA SOLUCION SENCILLA Y MUY PRACTICA LA CUAL MOSTRARE
    // EN EL SIGUIENTE EJEMPLO.

  }


  // funcion donde se dibujara todo lo
  // que se quiera mostrar en pantalla
  function draw(){

    // Si quieres una animacion limpia nunca te olvides
    // de limpiar tu lienzo ( canvas )
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    
    rect1.draw()
    rect2.draw()
    rect3.draw()
  }


  // El loop de juego 
  function loop(timestamp){

    exec(timestamp)
    // Dibujamos en pantalla
    draw()
    run(loop)
  }

  var run = DEVGAME.requestAnimationFrame(loop)

  // Espera a que cargue la pagina e inicia
  // la funcion init
  window.addEventListener('load', init, false)

})(window, document, DEVGAME)
