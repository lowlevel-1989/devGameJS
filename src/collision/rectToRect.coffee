module.exports = (rectA, rectB) ->
 return (
   rectA.getX() < rectB.getX() + rectB.width  &&
   rectA.getX() + rectA.width  > rectB.getX() &&
   rectA.getY() < rectB.getY() + rectB.height &&
   rectA.getY() + rectA.height > rectB.getY()
 )
