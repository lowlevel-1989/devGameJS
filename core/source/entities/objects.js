var _new    = require('./_new');
var _delete = require('./_delete');

module.exports = function objects() {
   return {
      new:            _new,
      delete:         _delete,
      applyCollision: _applyCollision,
      applyGravity:   _applyGravity,
      setAnimations:  _setAnimations,
      preUpdate:      _preUpdate,
      postUpdate:     _postUpdate,
      on:             _on,
      emit:           _emit,
      layer: 9
   };
};