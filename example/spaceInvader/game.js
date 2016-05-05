/*

function SpaceInvader(canvas, fps){
  DevGame.call(this)
  this.canvas   = canvas
  this.context  = canvas.getContext('2d')
  this.fps      = fps
  this.interval = 1000/fps
  this.keyboard = []
  this.state    = 1
  this.count    = 0

  self = this
  window.addEventListener('keydown', function(event){
    event.preventDefault()
    self.keyboard[event.keyCode] = true
  }, false)

  window.addEventListener('keyup', function(event){
    event.preventDefault()
    self.keyboard[event.keyCode] = false
  }, false)

  this.reset()
  this.start()

}

SpaceInvader.prototype = Object.create(DevGame.prototype)

SpaceInvader.prototype.showFps = function(){
  this.context.fillStype = '#000'
  this.context.font      = 'normal 16pt Arial'
  this.context.fillText(this.nFps + ' fps', 10, 26)
}

SpaceInvader.prototype.logic = function(timestamp){

  var delta  = this.delta(timestamp)

  if (this.state){

    var entity = this.entities.all()

    for (var x=0, n=entity.length; x<n; x++){
      entity[x].logic(delta)
    }
    if (this.alertAlien){
      this.emit('alien:collision')
    }

    this.clearEntities()
    this.sortLayer()

  }

  this.nFps = ((1/delta)*1000) | 1
}

SpaceInvader.prototype.draw = function(){
  var entity = this.entities.all()

  this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
  for (var x=0, n=entity.length; x<n; x++){
    entity[x].draw(this.context)
  }
  this.showFps()
}

SpaceInvader.prototype.reset = function(){

  test = false

  this.entities.clear()

  var nave = new Nave(this, 370, 550, 40, 25, 300, '#00F')
  this.entities.add(nave)

  for (var row=0; row<5; row++){
    for (var x=0; x<12; x++){
      var alien = new Alien(this, 100+x*50, 50+row*30, 40, 25, 75, '#0F0')
      this.entities.add(alien)
    }
  }
}

SpaceInvader.prototype.loop = function(timestamp){
  stats.begin()

  self.logic(timestamp)
  self.draw()

  stats.end()

  setTimeout(function() {
    cycleFrame(self.loop)
  }, self.interval)
}

SpaceInvader.prototype.start = function(){
  self = this
  cycleFrame = this.animate()
  cycleFrame(this.loop)
}

*/

var stats = new Stats()
document.body.appendChild(stats.dom)

var canvas  = document.getElementById('game')
var context = canvas.getContext('2d')
var game = new DevGame()

game.fps      = 30
game.interval = 1000/game.fps
game.keyboard = []

game.showFps = function(){
  context.fillStype = '#000'
  context.font      = 'normal 16pt Arial'
  context.fillText(this.nFps + ' fps', 10, 26)
}

game.logic = function(timestamp){

  var delta  = this.delta(timestamp)
  var entity = this.entities.all()

  for (var x=0, n=entity.length; x<n; x++){
    entity[x].logic(delta)
  }
  if (this.alertAlien){
    this.emit('alien:collision')
  }

  this.clearEntities()
  this.sortLayer()

  this.nFps = ((1/delta)*1000) | 1
}

game.draw = function(){
  var entity = this.entities.all()

  context.clearRect(0, 0, canvas.width, canvas.height)
  for (var x=0, n=entity.length; x<n; x++){
    entity[x].draw(context)
  }
  this.showFps()
}


cycleFrame = game.animate()

var gameLoop = function(timestamp){
  stats.begin()
  
  game.logic(timestamp)
  game.draw()
  
  stats.end()

  setTimeout(function() {
    cycleFrame(gameLoop)
  }, game.interval)
}


function reset(){
  game.entities.clear()
  var nave = new Nave(370, 550, 40, 25, 300, '#00F')
  game.entities.add(nave)

  for (var row=0; row<5; row++){
    for (var x=0; x<12; x++){
      var alien = new Alien(100+x*50, 50+row*30, 40, 25, 75, '#0F0')
      game.entities.add(alien)
    }
  }
}

function test(){
  game.entities.add(new Alien(300, 30, 40, 25, -30, '#FF0'))
}

reset()
cycleFrame(gameLoop)


window.addEventListener('keydown', function(event){
  event.preventDefault()
  game.keyboard[event.keyCode] = true
}, false)

window.addEventListener('keyup', function(event){
  event.preventDefault()
  game.keyboard[event.keyCode] = false
}, false)
