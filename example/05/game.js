(function(window, document, DEVGAME, undefined){
  'use strict'

  var canvas  = document.getElementById('game')
  var context = canvas.getContext('2d')
  context.font = 'normal 16px monospace'
  
  // Variable que almacena el delta time
  var deltaTime  = 0

  // Almacena el tiempo transcurrido 
  // en cada frame
  var timeElapse = 0

  // Almacena el fps actual
  var _fps = 0
  // Almacena el cpu consumido
  var _cpu = 0
  // Cuenta los frames
  var _frames = 0
  // Cuenta los ciclos maquina
  var _cicles = 0
  // Flag utilizado para que el sistema
  // sepa cuando debe dibujar en pantalla
  var _render = true

  // Constante, un segundo en milisegundos
  var SECOND = 1000

  // Almacena el tiempo transcurrido
  var _timeCount = 0

  // Variable que utilizaremos para instanciar 
  // un timer, el cual servira para limitar los
  // fps por segundo
  var timeRender = null


  // Funcion que se ejecuta cada paso de ciclo maquina
  function exec(timestamp){

    // Se incrementa cada ciclo
    _cicles++

    // Si el timeElapse es 0, quiere decir que va iniciando
    // el juego y se asigna el valor de timestamp de caso
    // contrario se mantiene su valor
    timeElapse = timeElapse === 0 ? timestamp : timeElapse
  
    // Se calcula el delta time
    deltaTime  = timestamp - timeElapse

    // Se actualiza el tiempo transcurrido
    timeElapse = timestamp

    // Si el delta time es mayor a 1 segundo
    // lo hacemos cero, esto para evitar que
    // el juego siga corriendo mientras nos
    // movemos a otra pesta;a del navegador
    if (deltaTime > SECOND){
      deltaTime = 0
    }

    // Se calcula el tiempo transcurrido
    _timeCount += deltaTime


    // Si ya ha pasado mas de un segundo
    // actualizamos los datos
    if (_timeCount > SECOND){
      _cpu = _cicles
      _fps = _frames
      _cicles = 0
      _frames = 0
      _timeCount -= SECOND
    }

    // La instancia timeRender tiene un metodo
    // exec el cual es necesario ejecutarlo en
    // cada ciclo del sistema
    timeRender.exec()
  }

  // Funcion que se encarga de dibujar toda la escena
  function draw(){
    // Verifica el flag render
    // para saber si debe dibujar,
    // como se comento se utiliza 
    // para limitar los fps
    if (_render){

      // Se establece el flag a false
      _render = false
      // Se incrementa el contador de frame
      _frames++
      // Importante se limpia toda la pantalla del canvas
      context.clearRect(0, 0, canvas.clientWidth, canvas.clientHeight)
      
      // Se dibujan las variables en pantalla
      context.fillText( 'CPU: '+ _cpu, 10, 20 )
      context.fillText( 'FPS: '+ _fps, 10, 36 )
    }
  }

  // El loop de juego 
  function loop(timestamp){

    exec(timestamp)
    draw()

    run(loop)
  }

  var run = DEVGAME.requestAnimationFrame(loop)


  // La funcion init es una funcion que solo
  // se ejecuta una vez y es donde asignamos
  // el timer y corremos el juego
  function init(){

    timeRender = new DEVGAME.Timer({fps: 30})

    timeRender.logic = function(delta){
      _render = true
    }

    run(loop)
  }

  window.addEventListener('load', init, false)

})(window, document, DEVGAME)
