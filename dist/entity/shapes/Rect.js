// Generated by CoffeeScript 1.10.0
(function() {
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

}).call(this);
