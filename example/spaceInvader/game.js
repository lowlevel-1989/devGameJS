var canvas  = document.getElementById('game')
var context = canvas.getContext('2d')
var game = new DevGame()


var stats = new Stats()
document.body.appendChild(stats.dom)


var nave = new Nave(370, 550, 40, 25, 300, '#00F')
game.entities.push(nave)


for (var row=0; row<5; row++){
  for (var x=0; x<12; x++){
    var alien = new Alien(100+x*50, 50+row*30, 40, 25, 75, '#0F0')
    game.entities.push(alien)
  }
}


game.showFps = function(context){
  context.fillStyle = '#000'
  context.font      = "normal 16pt Arial"
  context.fillText(this.nFps + ' fps', 10, 26)
}

game.logic = function(timestamp){

  var delta = this.delta(timestamp)

  for (var x=0, n=this.entities.length; x<n; x++){
    this.entities[x].logic(delta)
  }
  if (this.alertAlien){
    this.emit('alien:collision')
  }

  this.clearEntities()
  this.sortLayer()
  this.nFps = ((1/delta)*1000) | 1
}

game.draw = function(context){
  context.clearRect(0, 0, canvas.width, canvas.height)
  for (var x=0, n=this.entities.length; x<n; x++){
    this.entities[x].draw(context)
  }
  this.showFps(context)
}


game.fps = 30
game.interval = 1000/game.fps

var cycleFrame  = game.animate()
game.loop = function(timestamp){ 

  stats.begin()

  game.logic(timestamp)
  game.draw(context)

  stats.end()


  setTimeout(function() {
    cycleFrame(game.loop)
  }, game.interval)
}
cycleFrame(game.loop)


window.addEventListener('keydown', function(event){
  event.preventDefault()
  nave.keyDown(event)
}, false)

window.addEventListener('keyup', function(event){
  event.preventDefault()
  nave.keyUp(event)
}, false)

