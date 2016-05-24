###
The Point object represents a location in a two-dimensional coordinate system,
where x represents the horizontal axis and y represents the vertical axis

@class
@memberof DEVGAME.entity
@param x {number} position of the point on the x axis
@param y {number} position of the point on the y axis
###
Point = (x=0, y=0) ->

  ###
  @member {number}
  @default 0
  ###
  @x = x

  ###
  @member {number}
  @default 0
  ###
  @y = y

  return @


###
Creates a clone od this Rectangle

@return {DEVGAME.entity.Rect}
###
Point.prototype.clone = () -> new Point(@x, @y)


###
Sets the point to a new x and y position

@param x {number} position of the point on the x axis
@param y {number} position of the point on the y axis
###
Point.prototype.set = (x=0, y=0) ->

  ###
  @member {number}
  @default 0
  ###
  @x = x

  ###
  @member {number}
  @default 0
  ###
  @y = y


###
Copies x and y from the given point

@param point {DEVGAME.entity.Point}
###
Point.prototype.copy = (point) -> @set(point.x, point.y)


###
Returns true if the given point is equal to this point

@param point {DEVGAME.entity.Point}
@return {boolean}
###
Point.prototype.equals = (point) -> return (point.x == @x) and (point.y == @y)


module.exports = Point
