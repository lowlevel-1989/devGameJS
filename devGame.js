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
  return this;
};


},{}],3:[function(require,module,exports){
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
var entities;

entities = [];

module.exports = entities;


},{}],5:[function(require,module,exports){
module.exports = function(context) {
  if (this.frame === this.frameCurrent) {
    context.fillStyle = this.color;
    context.fillRect(this.x, this.y, this.width, this.height);
    return this.frameCurrent = 0;
  } else {
    return this.frameCurrent++;
  }
};


},{}],6:[function(require,module,exports){
var entities;

entities = require('../entities');

module.exports = function(id, args) {
  var _entities, entity, i, key, n, ref, results, x;
  if (args == null) {
    args = [];
  }
  n = args.length;
  _entities = entities.filter(function(entity) {
    return typeof entity.listen[id] === 'function';
  });
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


},{"../entities":4}],7:[function(require,module,exports){
var Entity;

Entity = function(x, y, width, height) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (width == null) {
    width = 0;
  }
  if (height == null) {
    height = 0;
  }
  this.x = x;
  this.y = y;
  this.layer = 0;
  this.width = width;
  this.height = height;
  this.dx = 0;
  this.dy = 0;
  this.speed = 0;
  this.color = '#000';
  this.frame = 0;
  this.frameCurrent = 0;
  this.listen = {};
  this["super"] = Object.create(Entity.prototype);
  return this;
};

Entity.prototype.draw = require('./draw');

Entity.prototype.move = require('./move');

Entity.prototype.on = require('./on');

Entity.prototype.emit = require('./emit');

Entity.prototype.logic = function() {};

module.exports = Entity;


},{"./draw":5,"./emit":6,"./move":8,"./on":9}],8:[function(require,module,exports){
module.exports = function(delta) {
  this.x += (delta * this.dx) / 1000;
  return this.y += (delta * this.dy) / 1000;
};


},{}],9:[function(require,module,exports){
module.exports = function(id, callback) {
  return this.listen[id] = callback;
};


},{}],10:[function(require,module,exports){
var DevGame;

DevGame = require('./core');

DevGame.prototype.animate = require('./animate');

DevGame.prototype.entities = require('./entities');

DevGame.prototype.delta = require('./delta');

DevGame.prototype.emit = require('./entity/emit');

DevGame.prototype.sortLayer = require('./sortLayer');

DevGame.Entity = require('./entity');

module.exports = DevGame;


},{"./animate":1,"./core":2,"./delta":3,"./entities":4,"./entity":7,"./entity/emit":6,"./sortLayer":11}],11:[function(require,module,exports){
module.exports = function() {
  return this.entities.sort(function(entityA, entityB) {
    return entityA.layer - entityB.layer;
  });
};


},{}]},{},[10])(10)
});