function Nave(x, y, width, height, speed, color){
  DevGame.Entity.call(this, x, y, width, height)
  this.speed = speed
  this.color = color
  this.layer = 1
  this.btn = {
    left: false,
    right: false,
    fire: false
  }
}

Nave.prototype = Object.create(DevGame.Entity.prototype)

Nave.prototype.keyDown = function(event){
  if (event.keyCode === 65){
    this.btn.left = true
  }else if(event.keyCode === 68){
    this.btn.right = true
  }else if(event.keyCode === 32){
    this.btn.fire = true
  }
}

Nave.prototype.keyUp = function(event){
  if (event.keyCode === 65){
    this.btn.left = false 
  }else if(event.keyCode === 68){
    this.btn.right = false
  }else if(event.keyCode === 32){
    this.btn.fire = false
  }
}

Nave.prototype.move = function(delta){
  this.dx = 0
  if (this.btn.left){
    this.dx = -this.speed
  }
  if (this.btn.right){
    this.dx = +this.speed
  }
  if ( (this.dx < 0 && this.x < 10 ) || (this.dx > 0 && this.x > canvas.width - (this.width + 10)) ){
    return
  }
  this.super.move.call(this, delta)
}

Nave.prototype.fire = function(){
  if (this.btn.fire){
    var fire = new Fire(this.x+(this.width/2), this.y)
    game.entities.push(fire)
  }
}

Nave.prototype.logic = function(delta){
  this.move(delta)
  this.fire()
}

