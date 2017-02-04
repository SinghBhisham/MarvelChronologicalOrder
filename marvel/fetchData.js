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


function saveCharacter(char){
    debug('saveCharacer');
    return charModel.create({
        name: char.trim()
    });
}

function saveAppearances(char, appearances){
    debug('saveAppearances');
    var apps = _.map(appearances, a=>{
        return {
            name: a,
            numOfAliased: 0,//implement this
            characterId: char
        };
    });
    return Promise.map(apps, a=>{
        appearModel.create(a);
    });
}

function fetch(){
    return Promise.map(indices, inx=> {
        debug('fetching for index ',inx);
        return gethtml(url.resolve(basepath ,inx)).then($=> {
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
            return Promise.all(createPs);
        });

    });
}
db.init().then(()=>{
    return fetch();
}).then(()=>{
    console.info('DONE!!!!!');
    db.close();
});

