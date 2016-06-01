module.exports = () ->
  window.requestAnimationFrame       or
  window.webkitRequestAnimationFrame or
  window.mozRequestAnimationFrame    or
  window.oRequestAnimationFrame      or
  window.msRequestAnimationFrame     or
  (callback) ->
    window.setTimeout(() ->
      callback(+new Date)
    , 1000/60)
