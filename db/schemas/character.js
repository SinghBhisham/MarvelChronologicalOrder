
function loadModel(Schema, db){
    var character = new Schema({
        name: String,
        title: String,
        aliases : {
            type: [String],
            default: []
        }
    });

    db.model('character', character);
}

module.exports = loadModel;
