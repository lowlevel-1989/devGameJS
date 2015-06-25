var hero = devGameJs.objects.new();
hero.layer = 1;

hero.draw = function(canvas){
   canvas.bufferContext.fillStyle = '#007';
   canvas.bufferContext.fillRect(this.x, this.y, this.width, this.height);
};

devGameJs.addGameObject(hero);