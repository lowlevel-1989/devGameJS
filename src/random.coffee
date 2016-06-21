module.exports = (min=0, max=null) ->
  if max == null
    max = min
    min = 0

  return ~~(Math.random()*(max-min+1)+min)
