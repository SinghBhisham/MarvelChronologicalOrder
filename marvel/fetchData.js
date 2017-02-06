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


function saveCharacter(name, title, aliases){
    return charModel.create({
        name: name,
        aliases: aliases
    });
}

function saveAppearances(char, appearances){
    appearances = _.compact(appearances);
    var apps = _.map(appearances, a=>{
        return {
            comicName: a,
            numOfAliases: char.aliases.length,
            characterId: char._id
        };
    });
    //return appearModel.createMultiple(apps); This is not working somehow
    return Promise.map(apps, a=>{
        appearModel.create(a);
    });
}

function fetch(_indices){
    var extIndices = [];
    return Promise.each(_indices, inx=> {
        var _url = url.resolve(basepath, inx);
        console.info('fetching _url ', _url);
        return gethtml(_url).then($=> {
            let characters = $('#chrons > p');
            var createPs= [];
            characters.each(c=>{
                c = $(characters.get(c));
                var name = c.attr('id');
                var char = c.children('.char').text();
                var  chron = c.children('.chron').text();
                if(!name){
                    var link = c.find('a').attr('href');
                    var linkMatch = link.match(/^(.*)\.php/);
                    if(linkMatch){
                        if(_indices.indexOf(linkMatch[0]) < 0 && extIndices.indexOf(linkMatch[0]) < 0){
                            console.log('external link', linkMatch[0]);
                            extIndices.push(linkMatch[0]);
                        }
                    }
                }
                createPs.push(saveCharacter(name, char, char.toLowerCase().split(/\//)).then((char)=>{
                    return saveAppearances(char, chron.split(/\n/));
                }));
            });
            return Promise.all(createPs).tap(console.info("done for %s", _url));
        });

    });
}
db.init().then(()=>{
    indices = _.map(indices, inx => inx + extn);
    return fetch(indices);
}).finally(()=>{
    console.info('DONE!!!!!');
    db.close();
});

