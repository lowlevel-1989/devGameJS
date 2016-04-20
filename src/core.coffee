module.exports = DevGame = (canvas) ->
  if !canvas then console.error 'require canvas'
  @canvas  = canvas
  @context = canvas.getContext '2d'
  @timeElapsed = new Date().getTime()
  return @
