module.exports = () ->
  this.entities.sort (entityA, entityB) -> entityA.layer - entityB.layer
