Timer = (options) ->
  @set options
  return @

Timer.prototype.set = (options) ->
  if typeof options is 'object'
    @_interval = if options.fps then 1000/options.fps else options.ms
  else
    @_interval = options

  @delta = 0
  @_timestamp  = +new Date
  @_timeelapse = @_timestamp
  
Timer.prototype.reset = () -> @_timeelapse = 0

Timer.prototype.logic = () ->

Timer.prototype.exec = () ->
  @_timestamp  = +new Date
  @delta  = @_timestamp - @_timeelapse

  if @delta > @_interval
    @logic(@delta)

    @_timeelapse = @_timestamp - (@delta % @_interval)

module.exports = Timer
