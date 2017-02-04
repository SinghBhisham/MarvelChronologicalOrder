
function loadModel(Schema, db){
    var appearance = new Schema({
        comicName : String,
        characterId : String,
        numOfAliases: Number
    });

    db.model('appearance', appearance);
}

module.exports = loadModel;
