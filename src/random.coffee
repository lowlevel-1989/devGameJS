module.exports = (min=0, max=null) ->
  if max == null then max = min

  return ~~(Math.random()*(max-min+1)+min)
