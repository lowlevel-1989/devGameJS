module.exports = () ->
  
  args = [].slice.call arguments
  
  ClassChild = args.shift()
  _temp = {}

  for ClassPather in args by -1
    source = ClassPather.prototype
    Object.keys(source).map (method) ->
      if !_temp[method] and typeof source[method] == 'function'
        _temp[method] = source[method]

  Object.keys(_temp).map (method) ->
    if !ClassChild.prototype[method]
      ClassChild.prototype[method] = _temp[method]
