(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')

  var stage = new DEVGAME.Container()
  stage.setContext(context)

  stage.render()
    

})(window, document, DEVGAME)
