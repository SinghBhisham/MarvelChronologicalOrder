var request = require('request-promise');
var Promise = require('bluebird');
var _       = require('lodash');
var cheerio  = require('cheerio');
var debug  = require('debug')('gethtmldata');


function fetchdata(url){
    debug("request recieved for url", url);
    return request(url);
}

function parse(data){
    debug("data recieved");
    return Promise.try(function(){
        debug("trying to parse data to html");
        return cheerio.load(data);
    });
}


function getdata(url){
    return fetchdata(url).then(res => parse(res));
}

module.exports = getdata;
