(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.DEVGAME = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var CONST, Container, Generic, extend;

CONST = require('./const');

extend = require('./extend');

Generic = require('./entity/Generic');


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
  Generic.call(this, x, y);
  this.children = [];
  return this;
};

extend(Container, Generic);

Container.prototype.render = function() {
  var child, i, len, ref;
  this._save();
  ref = this.children;
  for (i = 0, len = ref.length; i < len; i++) {
    child = ref[i];
    if (this.context && child.context === null) {
      child.context = this.context;
    }
    child.render();
  }
  return this._restore();
};

Container.prototype.exec = function() {
  var child, i, len, ref;
  this.logic();
  this._save();
  ref = this.children;
  for (i = 0, len = ref.length; i < len; i++) {
    child = ref[i];
    child.exec();
  }
  return this._restore();
};

Container.prototype.add = function() {
  var child, i, len, results;
  results = [];
  for (i = 0, len = arguments.length; i < len; i++) {
    child = arguments[i];
    if (this.context && child.context === null) {
      child.context = this.context;
    }
    child.parent = this;
    results.push(this.children.push(child));
  }
  return results;
};

Container.prototype.get = function(id) {
  return this.children[id];
};

Container.prototype.forEach = function(callback) {
  return this.children.forEach(callback);
};

module.exports = Container;


},{"./const":9,"./entity/Generic":12,"./extend":18}],2:[function(require,module,exports){
var Sprite, Timer;

Timer = require('./Timer');

Sprite = function(options) {
  var self;
  this.source = options.source;
  this.spritesheet = new Image();
  this.spritesheet.src = this.source;
  this.animations = options.animations;
  this.width = 0;
  this.height = 0;
  this.sx = options.sx || 0;
  this.sy = options.sy || 0;
  this.swidth = options.swidth;
  this.sheight = options.sheight;
  this.fps = options.fps || 0;
  this.animation = options.animation;
  this._frame = 0;
  this._play = 0;
  this._timer = null;
  this.is_animation = false;
  if (options.fps) {
    this.is_animation = true;
  }
  if (options.fps) {
    this._play = 1;
  }
  if (this.is_animation) {
    self = this;
    this._timer = new Timer({
      fps: this.fps
    });
    this._timer.logic = function() {
      if (self._play === 1) {
        self._frame = ++self._frame % self.animations[self.animation].length;
      }
      return self._update.apply(self);
    };
  }
  return this;
};

Sprite.prototype._update = function() {
  var frame;
  frame = this.animations[this.animation][this._frame];
  this.sx = frame.sx;
  return this.sy = frame.sy;
};

Sprite.prototype._setFrame = function() {
  if (this.is_animation) {
    return this._timer.reset();
  } else {
    return this._update();
  }
};

Sprite.prototype.use = function(animation) {
  if (this.animation !== animation) {
    this.animation = animation;
    return this._setFrame();
  }
};

Sprite.prototype.frame = function(n) {
  if (this.animations[this.animation][n]) {
    this._frame = n;
  }
  return this._setFrame();
};

Sprite.prototype.play = function() {
  return this._play = 1;
};

Sprite.prototype.stop = function() {
  this._frame = 0;
  return this._play = 0;
};

Sprite.prototype.pause = function() {
  return this._play = 2;
};

Sprite.prototype.next = function() {
  if ((this._frame + 1) < this.animations[this.animation].length) {
    return this._frame = ++this._frame;
  }
};

Sprite.prototype.preview = function() {
  if (this._frame > 0) {
    return this._frame = --this._frame;
  }
};

Sprite.prototype.load = function(callback) {
  var self;
  self = this;
  this.spritesheet.onload = function() {
    self.width = this.width;
    self.height = this.height;
    return callback.call(self, null);
  };
  return this.spritesheet.onerror = function(event) {
    return callback.call(self, event);
  };
};

Sprite.prototype.get = function() {
  return this.spritesheet;
};

Sprite.prototype.exec = function() {
  if (this.is_animation) {
    return this._timer.exec();
  }
};

module.exports = Sprite;


},{"./Timer":3}],3:[function(require,module,exports){
var Timer;

Timer = function(options) {
  this.set(options);
  return this;
};

Timer.prototype.set = function(options) {
  if (typeof options === 'object') {
    this._interval = options.fps ? 1000 / options.fps : options.ms;
  } else {
    this._interval = options;
  }
  this.delta = 0;
  this._timestamp = +(new Date);
  return this._timeelapse = this._timestamp;
};

Timer.prototype.reset = function() {
  return this._timeelapse = 0;
};

Timer.prototype.logic = function() {};

Timer.prototype.exec = function() {
  this._timestamp = +(new Date);
  this.delta = this._timestamp - this._timeelapse;
  if (this.delta > this._interval) {
    this.logic(this.delta);
    return this._timeelapse = this._timestamp - (this.delta % this._interval);
  }
};

module.exports = Timer;


},{}],4:[function(require,module,exports){
var distance;

distance = require('../distance/circleToCircle');

module.exports = function(circleA, circleB) {
  return distance(circleA, circleB) < 0;
};


},{"../distance/circleToCircle":10}],5:[function(require,module,exports){
module.exports = function(circle, rect) {
  var circleDistanceX, circleDistanceY, cornerDistanceSQ;
  circleDistanceX = Math.abs(circle.getX() - rect.getX() - rect.width / 2);
  circleDistanceY = Math.abs(circle.getY() - rect.getY() - rect.height / 2);
  if (circleDistanceX > (rect.width / 2 + circle.radius)) {
    return false;
  }
  if (circleDistanceY > (rect.height / 2 + circle.radius)) {
    return false;
  }
  if (circleDistanceX <= (rect.width / 2)) {
    return true;
  }
  if (circleDistanceY <= (rect.height / 2)) {
    return true;
  }
  cornerDistanceSQ = Math.pow(circleDistanceX - rect.width / 2, 2) + Math.pow(circleDistanceY - rect.height / 2, 2);
  return cornerDistanceSQ <= (Math.pow(circle.radius, 2));
};


},{}],6:[function(require,module,exports){
module.exports = {
  rectToRect: require('./rectToRect'),
  rectToCircle: require('./rectToCircle'),
  circleToRect: require('./circleToRect'),
  circleToCircle: require('./circleToCircle')
};


},{"./circleToCircle":4,"./circleToRect":5,"./rectToCircle":7,"./rectToRect":8}],7:[function(require,module,exports){
module.exports = function(rect, circle) {
  var circleDistanceX, circleDistanceY, cornerDistanceSQ;
  circleDistanceX = Math.abs(circle.getX() - rect.getX() - rect.width / 2);
  circleDistanceY = Math.abs(circle.getY() - rect.getY() - rect.height / 2);
  if (circleDistanceX > (rect.width / 2 + circle.radius)) {
    return false;
  }
  if (circleDistanceY > (rect.height / 2 + circle.radius)) {
    return false;
  }
  if (circleDistanceX <= (rect.width / 2)) {
    return true;
  }
  if (circleDistanceY <= (rect.height / 2)) {
    return true;
  }
  cornerDistanceSQ = Math.pow(circleDistanceX - rect.width / 2, 2) + Math.pow(circleDistanceY - rect.height / 2, 2);
  return cornerDistanceSQ <= (Math.pow(circle.radius, 2));
};


},{}],8:[function(require,module,exports){
module.exports = function(rectA, rectB) {
  return rectA.getX() < rectB.getX() + rectB.width && rectA.getX() + rectA.width > rectB.getX() && rectA.getY() < rectB.getY() + rectB.height && rectA.getY() + rectA.height > rectB.getY();
};


},{}],9:[function(require,module,exports){

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
  VERSION: '0.5.1',
  requestAnimationFrame: require('./requestAnimationFrame'),
  KEY_F1: 112,
  KEY_F2: 113,
  KEY_F3: 114,
  KEY_F4: 115,
  KEY_F5: 116,
  KEY_F6: 117,
  KEY_F7: 118,
  KEY_F8: 119,
  KEY_F9: 120,
  KEY_F10: 121,
  KEY_F11: 122,
  KEY_F12: 123,
  KEY_LEFT: 37,
  KEY_UP: 38,
  KEY_RIGHT: 39,
  KEY_DOWN: 40,
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
    ARC: 1,
    CIRCLE: 2
  }
};

module.exports = CONST;


},{"./requestAnimationFrame":21}],10:[function(require,module,exports){
module.exports = function(circleA, circleB) {
  var dx, dy;
  dx = circleA.getX() - circleB.getX();
  dy = circleA.getY() - circleB.getY();
  return Math.sqrt(dx * dx + dy * dy) - (circleA.radius + circleB.radius);
};


},{}],11:[function(require,module,exports){
module.exports = {
  circleToCircle: require('./circleToCircle')
};


},{"./circleToCircle":10}],12:[function(require,module,exports){
var CONST, Generic, Point, extend;

CONST = require('../const');

extend = require('../extend');

Point = require('./Point');

Generic = function(x, y) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  Point.call(this, x, y);
  this.direction = 1;
  this.hSpeed = 0;
  this.vSpeed = 0;
  this.speed = 0;
  this.xPrevious = x;
  this.yPrevious = y;
  this.xStart = x;
  this.yStart = y;
  this.parent = null;
  this.context = null;
  this.color = '#000';
  this.visible = true;
  return this;
};

extend(Generic, Point);

Generic.prototype.setContext = function(context) {
  context.imageSmoothingEnabled = false;
  return this.context = context;
};

Generic.prototype.getX = function() {
  if (this.parent) {
    return this.parent.x + this.x;
  } else {
    return this.x;
  }
};

Generic.prototype.getY = function() {
  if (this.parent) {
    return this.parent.y + this.y;
  } else {
    return this.y;
  }
};

Generic.prototype._save = function() {
  this.xPrevious = this.x;
  this.yPrevious = this.y;
  this.x = this.getX();
  return this.y = this.getY();
};

Generic.prototype._restore = function() {
  this.x = this.xPrevious;
  return this.y = this.yPrevious;
};

Generic.prototype.logic = function() {};

Generic.prototype.draw = function() {};

Generic.prototype.render = function() {
  this._save();
  if ((this.parent && this.parent.visible) && this.visible) {
    this.draw();
  }
  return this._restore();
};

Generic.prototype.exec = function() {
  return this.logic();
};

module.exports = Generic;


},{"../const":9,"../extend":18,"./Point":13}],13:[function(require,module,exports){

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


},{}],14:[function(require,module,exports){
var entity;

entity = {
  Point: require('./Point'),
  Rect: require('./shapes/Rect'),
  Arc: require('./shapes/Arc'),
  Circle: require('./shapes/Circle')
};

module.exports = entity;


},{"./Point":13,"./shapes/Arc":15,"./shapes/Circle":16,"./shapes/Rect":17}],15:[function(require,module,exports){
var Arc, CONST, Generic, extend;

CONST = require('../../const');

extend = require('../../extend');

Generic = require('../Generic');


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
  Generic.call(this, x, y);
  this.fill = false;
  this.radius = radius;
  this.startAngle = startAngle;
  this.endAngle = endAngle;
  this.anticlockwise = anticlockwise;

  /*
  The  type of the object
  
  @member {number}
   */
  this.type = CONST.SHAPES.ARC;
  return this;
};

extend(Arc, Generic);


/*
Creates a clone od this Arc

@return {DEVGAME.entity.Arc}
 */

Arc.prototype.clone = function() {
  return new Arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
};

Arc.prototype.draw = function() {
  var context;
  if (this.fill) {
    context = this.context || this.parent.context;
    context.fillStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
    context.closePath();
    return context.fill();
  } else {
    context = this.context || this.parent.context;
    context.strokeStyle = this.color;
    context.beginPath();
    context.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.anticlockwise);
    context.closePath();
    return context.stroke();
  }
};

module.exports = Arc;


},{"../../const":9,"../../extend":18,"../Generic":12}],16:[function(require,module,exports){
var Arc, CONST, Circle, collision, extend;

CONST = require('../../const');

extend = require('../../extend');

Arc = require('./Arc');

collision = require('../../collision');


/*
@class
@memberof DEVGAME.entity
 */

Circle = function(x, y, radius, fill) {
  if (x == null) {
    x = 0;
  }
  if (y == null) {
    y = 0;
  }
  if (radius == null) {
    radius = 0;
  }
  if (fill == null) {
    fill = false;
  }
  Arc.call(this, x, y, radius, 0, CONST.PI_2);
  this.fill = fill;

  /*
  The  type of the object
  
  @member {number}
   */
  this.type = CONST.SHAPES.CIRCLE;
  return this;
};

extend(Circle, Arc);


/*
Creates a clone od this Arc

@return {DEVGAME.entity.Arc}
 */

Circle.prototype.clone = function() {
  return new Circle(this.x, this.y, this.radius);
};

Circle.prototype.collision = function(circle) {
  return collision.circleToCircle(this, circle);
};

Circle.prototype.collisionRect = function(rect) {
  return collision.circleToRect(this, rect);
};

module.exports = Circle;


},{"../../collision":6,"../../const":9,"../../extend":18,"./Arc":15}],17:[function(require,module,exports){
var CONST, Generic, Rect, collision, extend;

CONST = require('../../const');

extend = require('../../extend');

Generic = require('../Generic');

collision = require('../../collision');


/*
@class
@memberof DEVGAME.entity
@param x {number} The X coordinate of the upper-left corner of the rectangle
@param y {number} The Y coordinate of the upper-left corner of the rectangle
@param width {number} The overall width of the rectangle
@param height {number} The overall height of this rectangle
 */

Rect = function(x, y, width, height, fill) {
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
  if (fill == null) {
    fill = false;
  }
  Generic.call(this, x, y);

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
  this.fill = fill;
  this.sprite = null;

  /*
  The  type of the object
  
  @member {number}
   */
  this.type = CONST.SHAPES.RECT;
  return this;
};

extend(Rect, Generic);

Rect.prototype.setSprite = function(sprite) {
  return this.sprite = sprite;
};


/*
Creates a clone od this Rectangle

@return {DEVGAME.entity.Rect}
 */

Rect.prototype.clone = function() {
  return new Rect(this.x, this.y, this.width, this.height);
};

Rect.prototype.draw = function() {
  var context;
  context = this.context || this.parent.context;
  if (this.sprite) {
    return context.drawImage(this.sprite.get(), this.sprite.sx, this.sprite.sy, this.sprite.swidth, this.sprite.sheight, this.x, this.y, this.width, this.height);
  } else if (this.fill === true) {
    context.fillStyle = this.color;
    return context.fillRect(this.x, this.y, this.width, this.height);
  } else {
    context.strokeStyle = this.color;
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.closePath();
    return context.stroke();
  }
};

Rect.prototype.collision = function(rect) {
  return collision.rectToRect(this, rect);
};

Rect.prototype.collisionCircle = function(circle) {
  return collision.rectToCircle(this, circle);
};

Generic.prototype.exec = function() {
  this.logic();
  if (this.sprite) {
    return this.sprite.exec();
  }
};

module.exports = Rect;


},{"../../collision":6,"../../const":9,"../../extend":18,"../Generic":12}],18:[function(require,module,exports){
module.exports = function() {
  var ClassChild, ClassPather, _temp, args, i, source;
  args = [].slice.call(arguments);
  ClassChild = args.shift();
  _temp = {};
  for (i = args.length - 1; i >= 0; i += -1) {
    ClassPather = args[i];
    source = ClassPather.prototype;
    Object.keys(source).map(function(method) {
      if (!_temp[method] && typeof source[method] === 'function') {
        return _temp[method] = source[method];
      }
    });
  }
  return Object.keys(_temp).map(function(method) {
    if (!ClassChild.prototype[method]) {
      return ClassChild.prototype[method] = _temp[method];
    }
  });
};


},{}],19:[function(require,module,exports){
var DEVGAME;

DEVGAME = require('./const');

DEVGAME.Container = require('./Container');

DEVGAME.entity = require('./entity');

DEVGAME.collision = require('./collision');

DEVGAME.distance = require('./distance');

DEVGAME.random = require('./random');

DEVGAME.rgb = require('./rgb');

DEVGAME.Sprite = require('./Sprite');

DEVGAME.Timer = require('./Timer');

DEVGAME.extend = require('./extend');

DEVGAME["super"] = require('./super');

module.exports = DEVGAME;


},{"./Container":1,"./Sprite":2,"./Timer":3,"./collision":6,"./const":9,"./distance":11,"./entity":14,"./extend":18,"./random":20,"./rgb":22,"./super":23}],20:[function(require,module,exports){
module.exports = function(min, max) {
  if (min == null) {
    min = 0;
  }
  if (max == null) {
    max = null;
  }
  if (max === null) {
    max = min;
    min = 0;
  }
  return ~~(Math.random() * (max - min + 1) + min);
};


},{}],21:[function(require,module,exports){
module.exports = function() {
  return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) {
    return window.setTimeout(function() {
      return callback(+(new Date));
    }, 1000 / 60);
  };
};


},{}],22:[function(require,module,exports){
module.exports = function(red, green, blue) {
  if (red == null) {
    red = 0;
  }
  if (green == null) {
    green = 0;
  }
  if (blue == null) {
    blue = 0;
  }
  return 'rgb(' + red + ',' + green + ',' + blue + ')';
};


},{}],23:[function(require,module,exports){
module.exports = function(self, method, args) {
  if (args == null) {
    args = [];
  }
  return self.prototype[method].apply(self, args);
};


},{}]},{},[19])(19)
});