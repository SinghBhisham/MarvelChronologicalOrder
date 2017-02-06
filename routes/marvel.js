var express = require('express');
var router = express.Router();
var handler = require('./reqHandler.js').reqHandler;
var charService = require("../marvel/services/CharacterService.js").getInst();
var appearService = require("../marvel/services/AppearanceService.js").getInst();

router.get('/characters/search', function(req, res) {
    var q = req.query.q;
    var searchP = charService.getMatchingCharIds(q);
    handler(req, res, searchP);
});

router.get('/comics/searchbycharacter', function(req, res) {
    var q = req.query.q;
    var op = req.query.op;
    var searchP = appearService.getComicsByCharacter(q, op);
    handler(req, res, searchP);
});

router.get('/characters/searchbycomics', function(req, res) {
    var q = req.query.q;
    var op = req.query.op;
    var searchP = charService.getCharacterByComics(q, op);
    handler(req, res, searchP);
});

router.get('/topcomics/bycharacter', function(req, res) {
    var limit = req.query.limit;
    var searchP = appearService.getComicsByMostCharacter(limit);
    handler(req, res, searchP);
});

router.get('/topcomics/byaliases', function(req, res) {
    var limit = req.query.limit;
    var searchP = appearService.getComicsByMostAliases(limit);
    handler(req, res, searchP);
});

router.get('/topcharacters', function(req, res) {
    var limit = req.query.limit;
    var searchP = appearService.getTopCharacters(limit);
    handler(req, res, searchP);
});




module.exports = router;
