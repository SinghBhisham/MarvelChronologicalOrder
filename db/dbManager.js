var mongoose = require('mongoose'),
    config = require('../config'),
    db = config.db,
    fs = require('fs'),
    path = require('path'),
    Promise = require('bluebird'),
    util = require('util');


/**
 * This function boots schemas from 'schemas' directory
 */
function _bootSchemas(context) {
    var dir = path.join(__dirname , 'schemas');
    // grab a list of our route files
    fs.readdirSync(dir).forEach(function(file) {
        require(dir + '/' + file)(context.Schema, context.db);
    });
}

function DBManager() {}

function getDbConnectionString(dbconfig) {
    var connString;

    var connprefix = dbconfig.prefix;
    var credentials;

    if(dbconfig.authEnabled === true){
        credentials = dbconfig.userName + ":" + dbconfig.password +"@";
        connprefix += credentials;
    }
    connString = util.format(connprefix +'%s:%s/%s', dbconfig.host, dbconfig.port, dbconfig.database);
    return connString;
}

DBManager.prototype = {
    /**
     * This function initiates the database by loading the schemas into Mongoose
     * Instance
     */
    initiateDB: function() {
        _bootSchemas({
            'db': mongoose,
            'Schema': mongoose.Schema
        });
        var connStr = getDbConnectionString(db);

        this.connection = mongoose.connect(connStr);
        return Promise.resolve(this);
    },

    /**
     * This function returns the connection object by creating connection with
     * Mongo DB.
     */
    getConnection: function () {

        return this.connection;
    },

    /**
     * This function releases the connection object by closing connection with
     * Mongo DB.
     */
    closeConnection: function () {
        return mongoose.connection.close();
    },

    /**
     * This method returns the Model matching the name *
     *
     * @param modelName
     */
    getModel: function (modelName) {
        return this.getConnection().model(modelName);
    }

};
module.exports = {
    'getInst': function () {
        return (new DBManager());
    }
};
