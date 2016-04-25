module.exports = (attr='dead') ->
  @entities = @entities.filter (entity) -> entity[attr] != true
  
