var _canvas = require('./_canvas');
var _scale  = require('./_scale');

module.exports = function(oSetting) {
   if (oSetting.title)
      document.title = oSetting.title;
   if (oSetting.width)
      _canvas.main.width  = oSetting.width;
   if (oSetting.height)
      _canvas.main.height = oSetting.height;
   if (oSetting.scale)
      _scale(oSetting.scale);
};