var _canvas = require('./_canvas');
var _debug  = require('./_console');
var _scale  = require('./_scale');

module.exports = function(oSetting) {
   if (oSetting.title)
      document.title = oSetting.title;
   if (oSetting.width)
      _canvas.background.width  = _canvas.entities.width  = oSetting.width;
   if (oSetting.height)
      _canvas.background.height = _canvas.entities.height = oSetting.height;
   if (oSetting.scale)
      _scale(oSetting.scale);
   if (oSetting.debug)
      _debug();
};