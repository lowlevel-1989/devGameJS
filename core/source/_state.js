var oState  = {
   INIT  : 0,
   PAUSE : 1
};

var state = oState.INIT;

function setState(nState){
   state = nState;
}

function getState(){
   return state;
}

function getStateAll(){
   return oState;
}

module.exports = {
   set: setState,
   get: getState,
   getAll: getStateAll
};