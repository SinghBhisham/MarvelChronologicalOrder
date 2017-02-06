var Promise   = require('bluebird');
var debug     = require('debug')('characterService');

var appearModel = require('../../db/models').appearance;
var charModel   = require('../../db/models').character;
var charService = require('./CharacterService.js').getInst();
var _         = require('lodash');

function AppearanceService(){}

AppearanceService.prototype.getComicsByCharacter = function(qs, op){
    debug('getComicsByCharacter');
    if(!_.isArray(qs)){
        console.log(qs, qs);
        qs = [qs];
    }
    op = op && op.toLowerCase() || "or";
    return charService.getMatchingCharIds(qs).then(charIds => {
        debug("ids.length", charIds.length);
        if(op === "and"){//case c prob 1 
            return Promise.map(charIds, cid => {
                return appearModel.find({characterId: cid}).then(res=>_.map(res, r=>r.comicName)).catch(()=>[]);
            }).then(comics => {
                console.log('comics.length', comics.length);
                return _.intersection.apply(_, comics);
            });
        } else {//case b prob 1 and also case a if qs.length == 1

           return appearModel.find({characterId: {$in: charIds}}).then(res=>_.map(res, r => r.comicName));
        }
    }).catch(e => {
        console.error("errror", e);
        return Promise.reject(e);
    });
};

AppearanceService.prototype.getComicsByMostCharacter = function(limit){
    return appearModel.getComicsByMostCharacter(limit).catch(e => {
        console.log(e);
        return Promise.reject(e);
    });
};

AppearanceService.prototype.getComicsByMostAliases = function(limit){
    return appearModel.getComicsByMostAliases(limit).catch(e => {
        console.log(e);
        return Promise.reject(e);
    });
};

AppearanceService.prototype.getTopCharacters = function(limit){
    return appearModel.getTopCharacters(limit)
        .then(charObs => {
            return Promise.map(charObs , charOb => {
                return charModel.resolveId(charOb._id).then(char => {
                    charOb.name = char.name;
                    return charOb;
                });
            });
        })
    .catch(e => {
        console.log(e);
        return Promise.reject(e);
    });
};


module.exports = {
    getInst: function(){
        return new AppearanceService();
    }
};
