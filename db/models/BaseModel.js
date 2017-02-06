var mgr = require('../index.js');
var Promise = require("bluebird");
    /*
     * this class is for abstacting the crud operations
     * all the model classes should inherit it
     */

function BaseModel(){}


BaseModel.prototype.create = function(){
    let self = this;
    return mgr.getDB().then(db => {
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.create).apply(model, arguments).then(res => res.toJSON());
    });
};

BaseModel.prototype.createMultiple = function(){
    let self = this;
    return mgr.getDB().then(db => {
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.collection.insertMany).apply(model, arguments).then(res => res.toJSON());
    });
};


BaseModel.prototype.update = function(){
    let self = this;
    return mgr.getDB().then(db => {
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.update).apply(model, arguments).then(res => res.toJSON());
    });
};

BaseModel.prototype.find = function(){
    let self = this;
    return mgr.getDB().then(db => {
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.find).apply(model, arguments).then(res => res.map(r => r.toJSON()));
    });
};

BaseModel.prototype.findOne = function(){
    let self = this;
    return mgr.getDB().then(db => {
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.findOne).apply(model, arguments).then(res =>res&& res.toJSON()||null);
    });
};


BaseModel.prototype.aggregate = function(){
    let self = this;
    return mgr.getDB().then(db => {
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.aggregate).apply(model, arguments);
    });
};


BaseModel.prototype.findOneAndUpdate = function(){
    let self = this;
    return mgr.getDB().then(db => {
        let model = db.getModel(self.modelName);
        return Promise.promisify(model.create).findOneAndUpdate(model, arguments).then(res => res.toJSON());
    });
};



module.exports = BaseModel;
