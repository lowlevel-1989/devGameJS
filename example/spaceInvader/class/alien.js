function Alien(x, y, width, height, speed, color){
  DevGame.entity.Rect.call(this, x, y, width, height)
  this.speed = speed
  this.dx = -this.speed
  this.color = color
  this.layer = 3

  this.on('alien:collision', function(i, finish){
    this.dx = -this.dx
    this.y += 10
    if (i === finish){
      game.alertAlien = false
    }
  })
}

Alien.prototype = Object.create(DevGame.entity.Rect.prototype)

Alien.prototype.move = function(delta){
  if ((this.dx < 0 && this.x < 10) || (this.dx > 0 && this.x > canvas.width - (this.width + 10))){

    game.alertAlien = true

  }  
  this.super.move.call(this, delta)
}

Alien.prototype.logic = function(delta){
  this.move(delta)
}
