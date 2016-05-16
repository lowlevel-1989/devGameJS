function Fire(x, y){
  DevGame.entity.Rect.call(this, x, y-30, 2, 30)
  this.color = '#FF0'
  this.speed = -300
  this.dy = this.speed
  this.layer = 2
}

Fire.prototype = Object.create(DevGame.entity.Rect.prototype)

Fire.prototype.logic = function(delta){
  this.move(delta)
  var entity = game.entities.all()
/*
  for (var x=0, n=entity.length; x<n; x++){
    this.collision(entity[x])
  }
*/
}

Fire.prototype.move = function(delta){
  this.super.move.call(this, delta)
  if (this.y < -20){
    this.dead = true
  }
}

Fire.prototype.collision = function(entity){
  if (entity instanceof Alien){
    if (this.collisionRect(entity)){
      entity.dead = this.dead = true
    }
  }
}
