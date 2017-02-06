var modelName = 'character';
var util = require('util');
var BaseModel = require('./BaseModel');
var _ = require('lodash');
var debug = require("debug")("model:character");


function Character(){
    this.modelName = modelName;
}

util.inherits(Character, BaseModel);

Character.prototype.getCharacterByIds = function(ids){
    debug('getCharacterByIds');
    if(_.isArray(ids)){
        ids = ids;
    }
    return this.find({_id: {
        $in: ids
    }});
};

Character.prototype.resolveId = function(id){
    debug('resolveId', id);
    return this.findOne({_id: id});
};


module.exports.getInst = function(){
    return new Character();
};
