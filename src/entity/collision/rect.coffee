module.exports = (obj) ->
  if (@x + @width) < obj.x
    return false
  if (@y + @height) < obj.y
    return false
  if @x > (obj.x + obj.width)
    return false
  if @y > (obj.y + obj.height)
    return false

  return true
