(function(window, document, DEVGAME, undefined){
  'use strict'

  // Variables globales

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  var rect1
  var rect2
  var rect3
  

  // Aqui inicia todo :3, Crearemos nuestro primer
  // contenedor. Este nos servire para contener todos
  // los elementos de una scena/nivel
  var stage = new DEVGAME.Container()

  // Ya que usaremos Container nos aprovechamos de eso
  // y solo asignamos el contexto para esta escena del
  // juego.
  //
  // De esta forma no se lo coloco a cada objeto en el 
  // juego.
  stage.setContext(context)


  // La primera funcion que se ejecuta al cargar la pagina
  // y solo se ejecuta una sola vez
  function init(){

    rect1 = new DEVGAME.entity.Rect(100, 100, 50, 50)
    rect2 = new DEVGAME.entity.Rect(110, 230, 50, 50)
    // recordaar que clone solo copia x, y, alto y ancho
    rect3 = rect1.clone()
  
    // Con el atributo color se le puede asignar un color
    rect1.color = 'blue'
    // Asignamos el flag para que lo pinte completo
    rect1.fill = true

    rect2.color = '#00FF00'


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

    
    // Agregamos todos los elementos a nuestro stage
    stage.add(rect1, rect2, rect3)



    // Iniciamos el GameLoop
    run(loop)

  }

  // Funcion que se ejecuta en cada ciclo
  // y es donde se ejecuto cada paso de 
  // nuestros objetos
  function exec(timestamp){
  
    // Ahora solo nos basta con ejecutar nuestra escena
    stage.exec()

  }


  // funcion donde se dibujara todo lo
  // que se quiera mostrar en pantalla
  function draw(){

    // Si quieres una animacion limpia nunca te olvides
    // de limpiar tu lienzo ( canvas )
    context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
    

    // TENEMOS QUE TENER EN CUENTA QUE LAS SCENAS NO LLAMAN UN METODO
    // DRAW, PARA DIBUJAR TODOS LOS OBJETOS DE LA ESCENA SE UTILIZA EL
    // METODO RENDER
    stage.render()

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
