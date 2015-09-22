var _clone  = require('./plus/_clone');

var current  = 0;
var screenObjects = [];

function add(obj){
   var clone = _clone(obj);
   screen.push(clone);
}

module.exports = {
                     add: add
};