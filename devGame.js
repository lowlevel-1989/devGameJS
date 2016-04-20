(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DevGame = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
module.exports = function(interval) {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    return window.setTimeout(callback, interval);
  };
};


},{}],2:[function(require,module,exports){
var DevGame;

module.exports = DevGame = function(canvas) {
  if (!canvas) {
    console.error('require canvas');
  }
  this.canvas = canvas;
  this.context = canvas.getContext('2d');
  this.timeElapsed = new Date().getTime();
  return this;
};


},{}],3:[function(require,module,exports){
module.exports = function(timestamp) {
  var delta;
  delta = timestamp - this.timeElapsed;
  this.timeElapsed = timestamp;
  return delta;
};


},{}],4:[function(require,module,exports){
module.exports = function() {
  if (this.frame === this.frameCurrent) {
    this.context.fillStyle = this.color;
    this.context.fillRect(this.x, this.y, this.width, this.height);
    return this.frameCurrent = 0;
  } else {
    return this.frameCurrent++;
  }
};


},{}],5:[function(require,module,exports){
var Entity;

Entity = function(context) {
  this.x = 0;
  this.y = 0;
  this.dx = 0;
  this.dy = 0;
  this.width = 0;
  this.height = 0;
  this.color = '#000';
  this.frame = 0;
  this.frameCurrent = 0;
  this.context = context;
  return this;
};

Entity.prototype.draw = require('./draw');

Entity.prototype.move = require('./move');

module.exports = Entity;


},{"./draw":4,"./move":6}],6:[function(require,module,exports){
module.exports = function(delta) {
  this.x += (delta * this.dx) / 1000;
  return this.y += (delta * this.dy) / 1000;
};


},{}],7:[function(require,module,exports){
var DevGame;

DevGame = require('./core');

DevGame.prototype.animate = require('./animate');

DevGame.prototype.delta = require('./delta');

DevGame.Entity = require('./entity');

module.exports = DevGame;


},{"./animate":1,"./core":2,"./delta":3,"./entity":5}]},{},[7])(7)
});