var _new            = require('./_new');
var _delete         = require('./_delete');
var _applyCollision = require('../physics/_applyCollision');
var _applyGravity   = require('../physics/_applyGravity');
var _setAnimations  = require('./_setAnimations');
var _preUpdate      = require('./_preUpdate');
var _postUpdate     = require('./_postUpdate');
var _on             = require('./_on');
var _emit           = require('./_emit');

module.exports = function objects(gameObjects){
   return {
      new:            _new,
      delete:         _delete,
      applyCollision: _applyCollision,
      applyGravity:   _applyGravity,
      setAnimations:  _setAnimations,
      preUpdate:      _preUpdate,
      postUpdate:     _postUpdate,
      on:             _on,
      emit:           _emit(gameObjects),
   };
};