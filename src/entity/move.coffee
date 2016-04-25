module.exports = (delta) ->
  @x += (delta*@dx)/1000
  @y += (delta*@dy)/1000
