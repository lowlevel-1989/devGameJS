module.exports = () ->
  if @frame == @frameCurrent
    @context.fillStyle = @color
    @context.fillRect @x, @y, @width, @height
    @frameCurrent = 0
  else
    @frameCurrent++
