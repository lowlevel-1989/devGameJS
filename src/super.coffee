module.exports = (self, method, args=[]) ->
  self.prototype[method].apply self, args
