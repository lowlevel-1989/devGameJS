var oState  = {
   INIT  : 0,
   PAUSE : 1
};

var state = oState.INIT;

function set(nState){
   state = nState;
}

function get(){
   return state;
}

function getAll(){
   return oState;
}

module.exports = {
   set: set,
   get: get,
   getAll: getAll
};