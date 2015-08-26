var canvas = require('./_canvas');
var debug  = require('./_console');
var scale  = require('./_scale');

module.exports = function (oSetting) {
   if (oSetting.title)
      document.title = oSetting.title;
   if (oSetting.width)
      canvas.background.width  = canvas.entities.width  = oSetting.width;
   if (oSetting.height)
      canvas.background.height = canvas.entities.height = oSetting.height;
   if (oSetting.scale)
      scale(oSetting.scale);
   if (oSetting.debug)
      debug();
};