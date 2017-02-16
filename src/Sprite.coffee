Timer = require './Timer'

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
  @_frame = 0
  @_play  = 0
  @_timer = null
  @is_animation = false
  @is_animation = true if options.fps
  @_play = 1 if options.fps

  if @is_animation
    self = @
    @_timer = new Timer(fps: @fps)
    @_timer.logic = () ->
      if self._play == 1
        self._frame = ++self._frame % self.animations[self.animation].length
      self._update.apply self

  return @

Sprite.prototype._update = () ->
  frame = @animations[@animation][@_frame]
  @sx = frame.sx
  @sy = frame.sy

Sprite.prototype._setFrame = () ->
  if @is_animation
    @_timer.reset()
  else
    @_update()

Sprite.prototype.use   = (animation) ->
  if @animation != animation
    @animation   = animation
    @_setFrame()

Sprite.prototype.frame = (n) ->
  @_frame = n if @animations[@animation][n]
  @_setFrame()

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
  if @is_animation then @_timer.exec()

module.exports = Sprite
