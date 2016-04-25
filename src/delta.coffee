module.exports = (timestamp) ->
  @timeElapsed = timestamp if !@timeElapsed
  delta = timestamp - @timeElapsed
  @timeElapsed = timestamp
  return delta
