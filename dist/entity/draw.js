// Generated by CoffeeScript 1.10.0
(function() {
  module.exports = function() {
    if (this.frame === this.frameCurrent) {
      this.context.fillStyle = this.color;
      this.context.fillRect(this.x, this.y, this.width, this.height);
      return this.frameCurrent = 0;
    } else {
      return this.frameCurrent++;
    }
  };

}).call(this);