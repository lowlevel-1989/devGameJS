(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DEVGAME = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CONST, Container, Point;

CONST = require('./const');

Point = require('./entity/Point');


/*
@class
@memberof DEVGAME
 */

Container = function(x, y) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  Point.call(this, x, y);
  this.context = null;
  this.visible = true;
  this.parent = null;
  this.children = [];
  return this;
};

Container.prototype = Object.create(Point.prototype);

Container.prototype.exec = function() {
  var child, i, len, ref, results;
  ref = this.children;
  results = [];
  for (i = 0, len = ref.length; i < len; i++) {
    child = ref[i];
    results.push(child.exec());
  }
  return results;
};

Container.prototype.addChild = function() {
  var child, i, len, results;
  results = [];
  for (i = 0, len = arguments.length; i < len; i++) {
    child = arguments[i];
    child.parent = this;
    results.push(this.children.push(child));
  }
  return results;
};

module.exports = Container;


},{"./const":2,"./entity/Point":3}],2:[function(require,module,exports){

/*
Constant values used in DevGame
@lends DEVGAME
 */
var CONST;

CONST = {

  /*
  String of the current DevGame version
  
  @property {string} VERSION
  @static
  @contant
   */
  VERSION: '__VERSION__',
  PI: Math.PI,

  /*
  @property {number} PI_2 - two Pi
  @static
  @contant
   */
  PI_2: Math.PI * 2,

  /*
  @property {number} RAD_TO_DEG - Constant conversion factor for converting radians to degres
  @static
  @contant
   */
  RAD_TO_DEG: 180 / Math.PI,

  /*
  @property {number} DEG_TO_RAD
  @static
  @contant
   */
  DEG_TO_RAD: Math.PI / 180,

  /*
  Constants thet identify shapes
  
  @static
  @contant
  @property {object} SHAPES
  @property {object} SHAPES.RECT = 0
  @property {object} SHAPES.ARC  = 1
   */
  SHAPES: {
    RECT: 0,
    ARC: 1
  }
};

module.exports = CONST;


},{}],3:[function(require,module,exports){

/*
The Point object represents a location in a two-dimensional coordinate system,
where x represents the horizontal axis and y represents the vertical axis

@class
@memberof DEVGAME.entity
@param x {number} position of the point on the x axis
@param y {number} position of the point on the y axis
 */
var Point;

Point = function(x, y) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }

  /*
  @member {number}
  @default 0
   */
  this.x = x;

  /*
  @member {number}
  @default 0
   */
  this.y = y;
  return this;
};


/*
Creates a clone od this Rectangle

@return {DEVGAME.entity.Rect}
 */

Point.prototype.clone = function() {
  return new Point(this.x, this.y);
};


/*
Sets the point to a new x and y position

@param x {number} position of the point on the x axis
@param y {number} position of the point on the y axis
 */

Point.prototype.set = function(x, y) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }

  /*
  @member {number}
  @default 0
   */
  this.x = x;

  /*
  @member {number}
  @default 0
   */
  return this.y = y;
};


/*
Copies x and y from the given point

@param point {DEVGAME.entity.Point}
 */

Point.prototype.copy = function(point) {
  return this.set(point.x, point.y);
};


/*
Returns true if the given point is equal to this point

@param point {DEVGAME.entity.Point}
@return {boolean}
 */

Point.prototype.equals = function(point) {
  return (point.x === this.x) && (point.y === this.y);
};

module.exports = Point;


},{}],4:[function(require,module,exports){
var entity;

entity = {
  Point: require('./Point'),
  Rect: require('./shapes/Rect'),
  Arc: require('./shapes/Arc')
};

module.exports = entity;


},{"./Point":3,"./shapes/Arc":5,"./shapes/Rect":6}],5:[function(require,module,exports){
var Arc, CONST, Point;

CONST = require('../../const');

Point = require('../Point');


/*
@class
@memberof DEVGAME.entity
 */

Arc = function(x, y, radius, startAngle, endAngle, anticlockwise) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (radius == null) {
    radius = 0;
  }
  if (startAngle == null) {
    startAngle = 0;
  }
  if (endAngle == null) {
    endAngle = 0;
  }
  if (anticlockwise == null) {
    anticlockwise = false;
  }
  Point.call(this, x, y);
  this.parent = null;
  this.context = null;
  this.radius = radius;
  this.startAngle = startAngle;
  this.endAngle = endAngle;
  this.anticlockwise = anticlockwise;
  this.color = '#000';
  this.visible = true;

  /*
  The  type of the object
  
  @member {number}
   */
  this.type = CONST.SHAPES.ARC;
  return this;
};

Arc.prototype = Object.create(Point.prototype);


/*
Creates a clone od this Arc

@return {DEVGAME.entity.Arc}
 */

Arc.prototype.clone = function() {
  return new Arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
};

Arc.prototype.contains = function() {};

Arc.prototype.logic = function() {};

Arc.prototype.draw = function() {
  var context, x, y;
  if ((this.parent && this.parent.visible) || this.visible) {
    if (this.parent) {
      x = this.parent.x;
      y = this.parent.y;
    } else {
      x = 0;
      y = 0;
    }
    context = this.context || this.parent.context;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(x + this.x, y + this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
    context.closePath();
    return context.fill();
  }
};

Arc.prototype.exec = function() {
  this.logic();
  return this.draw();
};

module.exports = Arc;


},{"../../const":2,"../Point":3}],6:[function(require,module,exports){
var CONST, Point, Rect;

CONST = require('../../const');

Point = require('../Point');


/*
@class
@memberof DEVGAME.entity
@param x {number} The X coordinate of the upper-left corner of the rectangle
@param y {number} The Y coordinate of the upper-left corner of the rectangle
@param width {number} The overall width of the rectangle
@param height {number} The overall height of this rectangle
 */

Rect = function(x, y, width, height) {
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
  Point.call(this, x, y);
  this.parent = null;
  this.context = null;

  /*
  @member {number}
  @default 0
   */
  this.width = width;

  /*
  @member {number}
  @default 0
   */
  this.height = height;
  this.color = '#000';
  this.visible = true;

  /*
  The  type of the object
  
  @member {number}
   */
  this.type = CONST.SHAPES.RECT;
  return this;
};

Rect.prototype = Object.create(Point.prototype);


/*
Creates a clone od this Rectangle

@return {DEVGAME.entity.Rect}
 */

Rect.prototype.clone = function() {
  return new Rect(this.x, this.y, this.width, this.height);
};


/*
Checks whether the x and y coordinates given are contained within this Rectangle

@param x {number} The X coordinate of the point to test
@param y {number} The Y coordinate of the point to test
@return {boolean} Wheter the x/y coordinates are within this Rectangle
 */

Rect.prototype.contains = function() {
  if (this.width <= 0 || this.height <= 0) {
    return false;
  }
  if (x >= this.x && x < this.x + this.width) {
    if (y >= this.y && y < this.y + this.height) {
      return true;
    }
  }
  return false;
};

Rect.prototype.logic = function() {};

Rect.prototype.draw = function() {
  var context, x, y;
  if ((this.param && this.parent.visible) || this.visible) {
    if (this.parent) {
      x = this.parent.x;
      y = this.parent.y;
    } else {
      x = 0;
      y = 0;
    }
    context = this.context || this.parent.context;
    context.fillStyle = this.color;
    return context.fillRect(x + this.x, y + this.y, this.width, this.height);
  }
};

Rect.prototype.exec = function() {
  this.logic();
  return this.draw();
};

module.exports = Rect;


},{"../../const":2,"../Point":3}],7:[function(require,module,exports){
var DEVGAME;

DEVGAME = require('./const');

DEVGAME.Container = require('./Container');

DEVGAME.entity = require('./entity');

DEVGAME["super"] = require('./super');

module.exports = DEVGAME;


},{"./Container":1,"./const":2,"./entity":4,"./super":8}],8:[function(require,module,exports){
module.exports = function(self, method, args) {
  if (args == null) {
    args = [];
  }
  return self.prototype[method].apply(self, args);
};


},{}]},{},[7])(7)
});