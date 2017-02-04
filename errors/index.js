var _ = require('lodash');
var errors = require('restify-errors');
var Promise = require('bluebird');
var fs = Promise.promisifyAll(require('fs'));

function _toString (){
    return this.name + ' : ' +  (this.msg || this.message);
}

function registerErrors(data){
    if(typeof data === 'object'){
        _.each(data, function(options, name){
            options.toString = _toString;
            errors.makeConstructor(name, options);
        });
    }
}

if(errors.registerErrors){
    throw new Error('registerErrors is already defined');
} else {
    errors.registerErrors = registerErrors;
}

fs.readdirAsync(__dirname).then(files =>{
    _.each(files, file => {
        if(file !== 'index.js'){
           registerErrors(require(__dirname+'/'+ file)); 
        }
    });
});

