module.exports = (circle, rect) ->
  circleDistanceX = Math.abs( circle.getX() - rect.getX() - rect.width/2  )
  circleDistanceY = Math.abs( circle.getY() - rect.getY() - rect.height/2 )

  if circleDistanceX > (rect.width/2  + circle.radius) then return false
  if circleDistanceY > (rect.height/2 + circle.radius) then return false

  if circleDistanceX <= (rect.width/2 ) then return true
  if circleDistanceY <= (rect.height/2) then return true

  cornerDistanceSQ = Math.pow( circleDistanceX - rect.width/2, 2) + Math.pow( circleDistanceY - rect.height/2, 2)
  return (cornerDistanceSQ <= (Math.pow(circle.radius, 2)))
