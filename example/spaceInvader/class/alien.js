function Alien(game, x, y, width, height, speed, color){
  DevGame.Entity.call(this, x, y, width, height)
  this.speed = speed
  this.dx = -this.speed
  this.color = color
  this.layer = 3
  this.game = game

  this.on('alien:collision', function(i, finish){
    this.dx = -this.dx
    this.y += 10
    if (i === finish){
      this.game.alertAlien = false
    }
  })
}

Alien.prototype = Object.create(DevGame.Entity.prototype)

Alien.prototype.move = function(delta){
  if ((this.dx < 0 && this.x < 10) || (this.dx > 0 && this.x > canvas.width - (this.width + 10))){
    this.game.alertAlien = true
  }  
  this.super.move.call(this, delta)
}

Alien.prototype.logic = function(delta){
  this.move(delta)
}
