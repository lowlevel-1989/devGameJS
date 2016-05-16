module.exports = (context) ->
  context.fillStyle = @color
  context.fillRect @x, @y, @width, @height
