
function loadModel(Schema, db){
    var character = new Schema({
        name: String,
        aliases : [String]
    });

    db.model('character', character);
}

module.exports = loadModel;
