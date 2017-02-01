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

    
    // Dibujamos en pantalla
    draw()

  }

  // funcion donde se dibujara todo lo
  // que se quiera mostrar en pantalla
  function draw(){
    rect1.draw()
    rect2.draw()
    rect3.draw()
  }

  // Espera a que cargue la pagina e inicia
  // la funcion init
  window.addEventListener('load', init, false)

})(window, document, DEVGAME)
