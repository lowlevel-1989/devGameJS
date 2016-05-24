Block = ( entity = [] ) ->
  @_entities = if entity.json then entity.json() else entity
  @

BASE = (_prop, _immutable=false) ->
  return () ->
    if _immutable
      new Block( @_entities[_prop].apply @_entities, arguments )
    else
      @_entities[_prop].apply @_entities, arguments

SUPPORT_MUTABLE   = ['push', 'unshift', 'pop', 'splice', 'sort', 'reverse']
SUPPORT_IMMUTABLE = ['concat', 'map', 'filter', 'forEach']

for prop in SUPPORT_MUTABLE
  Block.prototype[prop] = BASE prop
  
for prop in SUPPORT_IMMUTABLE
  Block.prototype[prop] = BASE prop, true

Block.prototype.json = Block.prototype.all = () -> @_entities

Block.prototype.add = () -> @_entities.push.apply @_entities, arguments

Block.prototype.length = () -> @_entities.length

Block.prototype.clear = () ->  @_entities = []

module.exports = Block
