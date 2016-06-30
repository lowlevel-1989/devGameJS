Sprite = (options) ->
  @source = options.source
  @spritesheet = new Image()
  @spritesheet.src = @source
  @animations = options.animations
  @width  = 0
  @height = 0
  @sx = options.sx || 0
  @sy = options.sy || 0
  @swidth  = options.swidth
  @sheight = options.sheight
  @fps   = options.fps || 0
  @animation = options.animation
  @_interval = 1000/@fps
  @_timestamp  = +new Date
  @_timeelapse = @_timestamp
  @_deltatime  = 0
  @_frame = 0
  @_play  = 1

Sprite.prototype.use   = (animation) ->
  if @animation != animation
    @animation   = animation
    @_timeelapse = 0

Sprite.prototype.frame = (n) ->
  @_frame = n if @animations[@animation][n]
  @_timeelapse = 0

Sprite.prototype.play = () -> @_play = 1

Sprite.prototype.stop = () ->
  @_frame = 0
  @_play  = 0

Sprite.prototype.pause = () -> @_play = 2

Sprite.prototype.next = () -> @_frame = ++@_frame if (@_frame+1) < @animations[@animation].length

Sprite.prototype.preview = () -> @_frame = --@_frame if @_frame > 0

Sprite.prototype.load = (callback) ->
  self = @
  @spritesheet.onload  = () ->
    self.width  = @width
    self.height = @height
    callback.call self, null
  @spritesheet.onerror = (event) ->
    callback.call self, event

Sprite.prototype.get = () -> return @spritesheet

Sprite.prototype.exec = () ->
  @_timestamp  = +new Date
  @_deltatime  = @_timestamp - @_timeelapse

  if @_deltatime > @_interval
    if @_play == 1
      @_frame = ++@_frame % @animations[@animation].length
    frame = @animations[@animation][@_frame]
    @sx = frame.sx
    @sy = frame.sy

    @_timeelapse = @_timestamp - (@_deltatime % @_interval)
    

module.exports = Sprite
