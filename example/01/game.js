(function(window, document, DEVGAME, undefined){
  'use strict'

  // Se apunta al canvas del html
  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  // Se crea una entidad rectangulo con la clase Rect
  // los argumentos son { x, y, ancho, alto }
  var rect = new DEVGAME.entity.Rect(100, 100, 50, 150)

  // Se asigna el contexto al rectangulo
  rect.setContext(context)

  // Con el atributo color se le puede asignar un color
  rect.color = 'blue'

  // Asignamos el flag para que lo pinte completo
  rect.fill = true

  // Para mostrar el rectangulo en pantalla
  rect.draw()

})(window, document, DEVGAME)
