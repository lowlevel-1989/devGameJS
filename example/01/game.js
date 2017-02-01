(function(window, document, DEVGAME, undefined){
  'use strict'

  // Se apunta al canvas del html
  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  // Se crea la primera escena del juego
  // esto se hace con la clase Container
  var stage = new DEVGAME.Container()

  // Se asigna el contexto a la escena
  stage.setContext(context)

  // Se crea una entidad rectangulo con la clase Rect
  // los argumentos son { x, y, ancho, alto } 
  var rect = new DEVGAME.entity.Rect(100, 100, 50, 150)

  // Con el atributo color se le puede asignar un color
  rect.color = 'blue'

  // Agregamos la instancia del rectangulo a la escena
  stage.add(rect)

  // Para finalizar se dibuja el primer frame de juego
  // para mostrar el rectangulo en pantalla
  stage.render()

})(window, document, DEVGAME)
