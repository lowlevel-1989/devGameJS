function Nave(game, x, y, width, height, speed, color){
  DevGame.Entity.call(this, x, y, width, height)
  this.speed = speed
  this.color = color
  this.layer = 1
  this.game = game
}

Nave.prototype = Object.create(DevGame.Entity.prototype)

Nave.prototype.move = function(delta){
  this.dx = 0
  if (this.game.keyboard[65]){
    this.dx = -this.speed
  }
  if (this.game.keyboard[68]){
    this.dx = +this.speed
  }
  if ( (this.dx < 0 && this.x < 10 ) || (this.dx > 0 && this.x > canvas.width - (this.width + 10)) ){
    return
  }
  this.super.move.call(this, delta)
}

Nave.prototype.fire = function(){
  if (this.game.keyboard[32]){
    var fire = new Fire(this.game, this.x+(this.width/2), this.y)
    this.game.entities.add(fire)
  }
}

Nave.prototype.logic = function(delta){
  this.move(delta)
  this.fire()
}

