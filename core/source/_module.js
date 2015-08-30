var _canvas      = require('./_canvas');
var _fps         = require('./_fps');
var _state       = require('./_state');
var _gameObjects = require('../_gameObjects').all();

var modules = {};

function add(name, builder){
   if (typeof name === 'string') {
      if (!modules[name]) {
         modules[name] = {
            builder : builder
         };
      }
   }
}

function get(name){
   var oModule;
   if (modules.hasOwnProperty(name)) {
      oModule = modules[name];
      return oModule.instance;
   }
}

function build(){
   var name, oModule;

   var oBinding = {
      canvas      : {ctx: _canvas.ctx},
      fps         : _fps,
      gameObjects : _gameObjects,
      state       : _state
   };

   for (name in modules) {
      if (modules.hasOwnProperty(name)) {
         oModule = modules[name];
         if (oModule) {
            oModule.instance = oModule.builder(oBinding);
            if (oModule.instance.init)
               oModule.instance.init();
         }
      }
   }
}

module.exports = {
   add: add,
   get: get,
   build: build
};