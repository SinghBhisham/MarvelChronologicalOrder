var convict = require('convict');
var path = require('path');
var fs = require('fs');

function pathLoader(relativePath){
    return  path.join(__dirname, '..', relativePath);
}
convict.addFormat('path', function(){}, pathLoader);


var conf = convict(path.join(__dirname, 'app.json'));

//load all configs
var configs = path.join(__dirname, 'configs');
var configfiles = fs.readdirSync(configs);
configfiles.forEach(file=> conf.loadFile(path.join(configs, file)));
//conf.loadFile(configfiles);

//override config files
var overrideconfig = conf.get('overrideconfig');
if(fs.existsSync(overrideconfig)){
    conf.loadFile(overrideconfig);
    console.info("configs overridden with ", overrideconfig);
}

//validate the properties
conf.validate();

module.exports = conf;

