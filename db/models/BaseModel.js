var mgr = require('../index.js');
var Promise = require("bluebird");
/*
 * this class is for abstacting the crud operations
 * all the model classes should inherit it
 */

function BaseModel(){}


BaseModel.prototype.create = function(){
    let self = this;
    return mgr.getDB().then(db=>{
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.create).apply(model, arguments);
    });
};

BaseModel.prototype.createMultiple = function(){
    let self = this;
    return mgr.getDB().then(db=>{
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.collection.insert).apply(model, arguments);
    });
};


BaseModel.prototype.update = function(){
    let self = this;
    return mgr.getDB().then(db=>{
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.update).apply(model, arguments);
    });
};

BaseModel.prototype.find = function(){
    let self = this;
    return mgr.getDB().then(db=>{
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.find).apply(model, arguments);
    });
};

BaseModel.prototype.findOneAndUpdate = function(){
    let self = this;
    return mgr.getDB().then(db=>{
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.create).findOneAndUpdate(model, arguments);
    });
};



module.exports = BaseModel;
