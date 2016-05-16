function Nave(x, y, width, height, speed, color){
  DevGame.entity.Rect.call(this, x, y, width, height)
  this.speed = speed
  this.color = color
  this.layer = 1
}

Nave.prototype = Object.create(DevGame.entity.Rect.prototype)

Nave.prototype.move = function(delta){
  this.dx = 0
  if (game.keyboard[65]){
    this.dx = -this.speed
  }
  if (game.keyboard[68]){
    this.dx = +this.speed
  }
  if ( (this.dx < 0 && this.x < 10 ) || (this.dx > 0 && this.x > canvas.width - (this.width + 10)) ){
    return
  }
  this.super.move.call(this, delta)
}

Nave.prototype.fire = function(){
  if (game.keyboard[32]){
    var fire = new Fire(this.x+(this.width/2), this.y)
    game.entities.add(fire)
  }
}

Nave.prototype.logic = function(delta){
  this.move(delta)
  this.fire()
}

