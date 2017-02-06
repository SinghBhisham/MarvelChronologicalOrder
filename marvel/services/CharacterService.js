var Promise   = require('bluebird');
var debug     = require('debug')('characterService');

var charModel = require('../../db/models').character;
var appearModel = require('../../db/models').appearance;
var _         = require('lodash');

function CharacterService(){}

CharacterService.prototype.getMatchingCharIds = function(queries){
    if(!_.isArray(queries)){
        console.log("queries", queries);
        queries = [queries];
    }
    return Promise.map(queries, q => {
        q = q.toLowerCase();
        return charModel.findOne({"aliases": q }, {_id: 1}).then(res=> res && res._id||"");
        }).catch(e => {
            console.error("errror", e);
            return Promise.reject(e);
        });
};

CharacterService.prototype.getCharacterByComics = function(qs, op){
    debug('getComicsByCharacter');
    if(!_.isArray(qs)){
        qs = [qs];
    }
    let retP;
    op = op && op.toLowerCase() || "or";
    if(op === "and"){//case c prob 2 
        retP = Promise.map(qs, q => {
            return appearModel.find({$text: {$search: q}}).tap(JSON.stringify).then(comics => _.map(comics, comic => comic.characterId));
        }).then(comics => {
            return _.intersection.apply(_, comics);
        });
    } else {//case b prob 2 and also case a if qs.length == 1
        retP =  appearModel.find({comicName: {$in: qs}}, {characterId: 1}).then(comics =>{
            comics = _.map(comics, comic => comic.characterId);
            return _.chain(comics).uniq().compact().value();
        });
    }
    return retP.then(cIds => {
        return charModel.getCharacterByIds(cIds);
    }).catch(e => {
        console.error(e);
    });
};

module.exports = {
    getInst: function(){
        return new CharacterService();
    }
};
