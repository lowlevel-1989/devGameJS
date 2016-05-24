###
Constant values used in DevGame
@lends DEVGAME
###

CONST =
  ###
  String of the current DevGame version
  
  @property {string} VERSION
  @static
  @contant
  ###
  VERSION: '__VERSION__'

  PI: Math.PI

  ###
  @property {number} PI_2 - two Pi
  @static
  @contant
  ###
  PI_2: Math.PI * 2

  ###
  @property {number} RAD_TO_DEG - Constant conversion factor for converting radians to degres
  @static
  @contant
  ###
  RAD_TO_DEG: 180 / Math.PI

  ###
  @property {number} DEG_TO_RAD
  @static
  @contant
  ###
  DEG_TO_RAD: Math.PI / 180

  ###
  Constants thet identify shapes

  @static
  @contant
  @property {object} SHAPES
  @property {object} SHAPES.RECT = 0
  @property {object} SHAPES.ARC  = 1
  ###
  SHAPES:
    RECT: 0
    ARC:  1

module.exports = CONST
