(function(window, document, DEVGAME, undefined){
  'use strict'

  // Se apunta al canvas del html
  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  // Se crea una entidad rectangulo con la clase Rect
  // los argumentos son { x, y, ancho, alto }
  var rect1 = new DEVGAME.entity.Rect(100, 100, 50, 50)
  var rect2 = new DEVGAME.entity.Rect(110, 230, 50, 50)

  // Se asigna el contexto al rectangulo
  rect1.setContext(context)
  // Con el atributo color se le puede asignar un color
  rect1.color = 'blue'
  // Asignamos el flag para que lo pinte completo
  rect1.fill = true

  // Asignamos el contexto al segundo rectangulo
  rect2.setContext(context)
  rect2.color = '#00FF00'


  // Clonamos el rectangulo 1 para crear un tercer rectangulo
  var rect3 = rect1.clone()
  // Este no toma recibe el contexto asi que se debe asignar
  rect3.setContext(context)
  // Nos movemos 70 px a la derecha
  // recordar que iniciamos en la posicion x y
  // de la instancia original
  rect3.x += 70
  // Para identificarlo lo pintaremos de rojo
  rect3.color = 'red'

  // Para mostrar los rectangulos en pantalla
  rect1.draw()
  rect2.draw()
  rect3.draw()

})(window, document, DEVGAME)
