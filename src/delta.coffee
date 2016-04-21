module.exports = (timestamp) ->
  this.timeElapsed = timestamp if !this.timeElapsed
  delta = timestamp - this.timeElapsed
  this.timeElapsed = timestamp
  return delta
