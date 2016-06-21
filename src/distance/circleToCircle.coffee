module.exports = (circleA, circleB) ->
  dx = circleA.getX() - circleB.getX()
  dy = circleA.getY() - circleB.getY()
  return (Math.sqrt(dx*dx+dy*dy)-(circleA.radius+circleB.radius))
