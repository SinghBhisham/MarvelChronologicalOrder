var modelName = 'character';
var util = require('util');
var BaseModel = require('./BaseModel');
var debug = require("debug")("model:character");


function Character(){
    this.modelName = modelName;
}
util.inherits(Character, BaseModel);

module.exports.getInst = function(){
    return new Character();
};
