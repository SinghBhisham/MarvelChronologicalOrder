/*
 * @module config
 * load all the configs files required
 * connectorConfig.json will be use to override the configs
 * for more info see connectorConfig.json.sample
 */
var convict = require('convict');
var path = require('path');
var fs = require('fs');
var Promise = require('bluebird');
var debug = require('debug')('config');
var configs = 'configs';
Promise.promisifyAll(fs);


var _dir = __dirname;


/**
 * noop for convict formatter
 * if no formatting is required for a type
 *
 * @returns {undefined} undefined
 */
function noop() {}


/**
 * pathLoader
 * @param {String} relativePath
 * @returns  {String} absolutePath
 */
function pathLoader(relativePath) {
    return path.join(_dir, '..', relativePath);
}


convict.addFormat('path', noop, pathLoader); // add path format to the convict


convict.addFormat({
    name: "reference",
    validate: function(val) {
        /* validate proper path here */
    },
    coerce: function(val, config) {
        var match = /\$\{([\w\.]+)}/.exec(val);
        if (match && match.length) {
            return config.get(match[1]); //make sure that the reference json is already loaded
        }
    }
});
// load all the files from the configs folder
var conf = convict(path.join(_dir, configs));
var overrideConfig = conf.get('app.overrideconfig'); //path of the file to override configs ->override.json
if (fs.existsSync(overrideConfig)) {
    conf.loadFile(overrideConfig);
    debug('configs overriden with : %s', overrideConfig);
}
module.exports = conf._instance;

