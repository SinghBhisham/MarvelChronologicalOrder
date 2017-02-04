var Promise = require('bluebird');
var mgr = require('./dbManager').getInst();
var initiated = false;

function init(){
    initiated = true;
    return mgr.initiateDB();
}

module.exports.init =  init ;

module.exports.getDB = function(){
    if(!initiated){
        return init();
    }
    return Promise.resolve(mgr);
};

module.exports.close = function(){
    if(initiated)
        return Promise.try(()=>{
            mgr.closeConnection();
        });
    return Promise.resolve();
};
