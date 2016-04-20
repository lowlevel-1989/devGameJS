module.exports = (delta) ->
  this.x += (delta*this.dx)/1000
  this.y += (delta*this.dy)/1000
