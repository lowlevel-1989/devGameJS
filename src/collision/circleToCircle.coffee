distance = require '../distance/circleToCircle'

module.exports = (circleA, circleB) ->
  return distance(circleA, circleB) < 0
