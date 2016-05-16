(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DevGame = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    return window.setTimeout(function() {
      return callback(+(new Date));
    }, 1000 / 60);
  };
};


},{}],2:[function(require,module,exports){
var DevGame;

module.exports = DevGame = function() {
  this.entities = require('./entities');
  return this;
};


},{"./entities":6}],3:[function(require,module,exports){
module.exports = function(timestamp) {
  var delta;
  if (!this.timeElapsed) {
    this.timeElapsed = timestamp;
  }
  delta = timestamp - this.timeElapsed;
  this.timeElapsed = timestamp;
  return delta;
};


},{}],4:[function(require,module,exports){
module.exports = function(id, args) {
  var _entities, entity, i, key, n, ref, results, x;
  if (args == null) {
    args = [];
  }
  n = args.length;
  _entities = this.entities.filter(function(entity) {
    return typeof entity.listen[id] === 'function';
  });
  _entities = _entities.all();
  x = _entities.length - 1;
  results = [];
  for (key = i = 0, ref = x; 0 <= ref ? i <= ref : i >= ref; key = 0 <= ref ? ++i : --i) {
    entity = _entities[key];
    args[n] = key;
    args[n + 1] = x;
    results.push(entity.listen[id].apply(entity, args));
  }
  return results;
};


},{}],5:[function(require,module,exports){
var BASE, Block, SUPPORT_IMMUTABLE, SUPPORT_MUTABLE, i, j, len, len1, prop;

Block = function(entity) {
  if (entity == null) {
    entity = [];
  }
  this._entities = entity.json ? entity.json() : entity;
  return this;
};

BASE = function(_prop, _immutable) {
  if (_immutable == null) {
    _immutable = false;
  }
  return function() {
    if (_immutable) {
      return new Block(this._entities[_prop].apply(this._entities, arguments));
    } else {
      return this._entities[_prop].apply(this._entities, arguments);
    }
  };
};

SUPPORT_MUTABLE = ['push', 'unshift', 'pop', 'splice', 'sort', 'reverse'];

SUPPORT_IMMUTABLE = ['concat', 'map', 'filter', 'forEach'];

for (i = 0, len = SUPPORT_MUTABLE.length; i < len; i++) {
  prop = SUPPORT_MUTABLE[i];
  Block.prototype[prop] = BASE(prop);
}

for (j = 0, len1 = SUPPORT_IMMUTABLE.length; j < len1; j++) {
  prop = SUPPORT_IMMUTABLE[j];
  Block.prototype[prop] = BASE(prop, true);
}

Block.prototype.json = Block.prototype.all = function() {
  return this._entities;
};

Block.prototype.add = function() {
  return this._entities.push.apply(this._entities, arguments);
};

Block.prototype.length = function() {
  return this._entities.length;
};

Block.prototype.clear = function() {
  return this._entities = [];
};

module.exports = Block;


},{}],6:[function(require,module,exports){
var Block;

Block = require('./block');

module.exports = new Block();


},{"./block":5}],7:[function(require,module,exports){
var Generic;

Generic = function(x, y) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  this.x = x;
  this.y = y;
  this.layer = 0;
  this.dx = 0;
  this.dy = 0;
  this.speed = 0;
  this.vSpeed = 0;
  this.hSpeed = 0;
  this.color = '#000';
  this.listen = {};
  this["super"] = Object.create(Generic.prototype);
  return this;
};

Generic.prototype.logic = function() {};

Generic.prototype.draw = function() {};

Generic.prototype.move = require('./move');

Generic.prototype.on = require('./on');

module.exports = Generic;


},{"./move":8,"./on":9}],8:[function(require,module,exports){
module.exports = function(delta) {
  this.x += (delta * this.dx) / 1000;
  return this.y += (delta * this.dy) / 1000;
};


},{}],9:[function(require,module,exports){
module.exports = function(id, callback) {
  return this.listen[id] = callback;
};


},{}],10:[function(require,module,exports){
module.exports = {
  Generic: require('./generic'),
  Rect: require('./rect')
};


},{"./generic":7,"./rect":12}],11:[function(require,module,exports){
module.exports = function(context) {
  context.fillStyle = this.color;
  return context.fillRect(this.x, this.y, this.width, this.height);
};


},{}],12:[function(require,module,exports){
var Generic, Rect;

Generic = require('../generic');

Rect = function(x, y, width, height) {
  Generic.call(this, x, y);
  this.width = width;
  this.height = height;
  this["super"] = Object.create(Rect.prototype);
  this._figure = 'rect';
  return this;
};

Rect.prototype = Object.create(Generic.prototype);

Rect.prototype.draw = require('./draw');

module.exports = Rect;


},{"../generic":7,"./draw":11}],13:[function(require,module,exports){
var DevGame;

DevGame = require('./core');

DevGame.prototype.animate = require('./animate');

DevGame.prototype.delta = require('./delta');

DevGame.prototype.emit = require('./emit');

DevGame.prototype.sortLayer = require('./sortLayer');

DevGame.entity = require('./entity');

module.exports = DevGame;


},{"./animate":1,"./core":2,"./delta":3,"./emit":4,"./entity":10,"./sortLayer":14}],14:[function(require,module,exports){
module.exports = function(attr) {
  if (attr == null) {
    attr = 'layer';
  }
  return this.entities.sort(function(entityA, entityB) {
    return entityA[attr] - entityB[attr];
  });
};


},{}]},{},[13])(13)
});