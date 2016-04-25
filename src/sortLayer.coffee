module.exports = (attr='layer') ->
  @entities.sort (entityA, entityB) -> entityA[attr] - entityB[attr]
