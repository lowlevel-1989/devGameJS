module.exports = (id, args=[]) ->
  n = args.length
  
  _entities = this.entities.filter (entity) -> typeof entity.listen[id] is 'function'

  _entities = _entities.all()
  x = _entities.length-1

  for key in [0..x]
    entity = _entities[key]
    args[n] = key
    args[n+1] = x
    entity.listen[id].apply entity, args
