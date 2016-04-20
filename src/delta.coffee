module.exports = (timestamp) ->
  delta = timestamp - this.timeElapsed
  this.timeElapsed = timestamp
  return delta
