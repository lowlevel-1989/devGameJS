(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  var stage = new DEVGAME.Container()
  stage.setContext(context)

  var rect = new DEVGAME.entity.Rect(100, 100, 50, 150)
  rect.color = 'blue'

  stage.add(rect)
  stage.render()
    

})(window, document, DEVGAME)
