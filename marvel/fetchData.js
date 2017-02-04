var gethtml = require('./lib/getHtmlData.js');
var config = require('../config');
var Promise = require('bluebird');
var url = require('url');
var debug = require('debug')('fetchdata');

var db = require('../db');
var charModel = require('../db/models').character;
var appearModel = require('../db/models').appearance;
var _ = require('lodash');

var indices = config.marvel.indices;
var basepath = config.marvel.basepath;
var extn = config.marvel.extn;


function saveCharacter(char){
    var aliases = char.split("/");
    return charModel.create({
        name: _.slice(aliases, 0,1),
        aliases: _.slice(aliases, 1)
    });
}

function saveAppearances(char, appearances){
    var apps = _.map(appearances, a=>{
        return {
            name: a,
            numOfAliases: char.aliases.length,
            characterId: char._id
        };
    });
    //return appearModel.createMultiple(apps); This is not working somehow
    return Promise.map(apps, a=>{
        appearModel.create(a);
    });
}

function fetch(){
    return Promise.each(indices, inx=> {
        debug('fetching for index ',inx);
        return gethtml(url.resolve(basepath ,inx + extn)).then($=> {
            let characters = $('#chrons > p');
            var createPs= [];
            characters.each(c=>{
                c = $(characters.get(c));
                var char = c.children('.char').text();
                var  chron = c.children('.chron').text();
                createPs.push(saveCharacter(char).then((charid)=>{
                    return saveAppearances(charid, chron.split(/\n/));
                }));
            });
            return Promise.all(createPs).tap(debug("done for %s", inx));
        });

    });
}
db.init().then(()=>{
    return fetch();
}).finally(()=>{
    console.info('DONE!!!!!');
    db.close();
});

