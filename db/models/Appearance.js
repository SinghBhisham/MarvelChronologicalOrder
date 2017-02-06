var modelName = 'appearance';
var util = require('util');
var BaseModel = require('./BaseModel');
var debug = require("debug")("model:appearance");


function Appearance(){
    this.modelName = modelName;
}
util.inherits(Appearance, BaseModel);

Appearance.prototype.getComicsByMostCharacter = function(limit){
    return this.aggregate([
        {
            $group: {
                _id: "$comicName",
                count: {
                    $sum: 1
                }
            }
        },{
            $sort: {
                count: -1
            }
        }, {
            $limit: parseInt(limit ? limit: 30)
        }
    ]);
};

Appearance.prototype.getComicsByMostAliases = function(limit){
    return this.aggregate([
        {
            $group: {
                _id: "$comicName",
                count: {
                    $sum: "$numOfAliases"
                }
            }
        },{
            $sort: {
                count: -1
            }
        }, {
            $limit: parseInt(limit ? limit: 30)
        }
    ]);
};

Appearance.prototype.getTopCharacters = function(limit){
    return this.aggregate([
        {
            $group: {
                _id: "$characterId",
                count: {
                    $sum: 1
                }
            }
        },{
            $sort: {
                count: -1
            }
        }, {
            $limit: parseInt(limit ? limit: 30)
        }
    ]);
};



module.exports.getInst = function(){
    return new Appearance();
};
