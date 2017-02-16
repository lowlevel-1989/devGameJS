(function(window, document, DEVGAME, undefined){
  'use strict'

  // Variables globales

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  // almacenara nuestros rectangulos
  var rect = []
  

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

    // Instanciamos cada uno de nuestros rectangulos
    rect[0] = new Rectangule({
      x:      100, 
      y:      100, 
      color: 'blue'
    })

    rect[1] = new Rectangule({
      x:      110,
      y:      230,
      color:  '#00FF00',
      limit:  200,
      hspeed: 2
    })
    
    rect[2] = new Rectangule({
      x:      rect[0].getX() + 70,
      y:      rect[0].getY(),
      color:  'red',
      limit:  65,
      vspeed: 4
    })
    
    // Agregamos todos los elementos a nuestro stage
    rect.forEach(function(obj){
      stage.add(obj)
    })

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
