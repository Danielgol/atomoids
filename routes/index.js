
var express = require('express');
var router = express.Router();

var game = require('./../controllers/game');
var index = require('./../controllers/index');
var submit = require('./../controllers/submit');
var ranking = require('./../controllers/ranking');

/* Home.ejs */
router.get('/', index.controller.load);
router.get('/game', game.controller.load);
router.get('/ranking', ranking.controller.load);

/* Game.ejs */
router.post('/submit', game.controller.sendToSubmit);

/* Submit.ejs */
router.post('/submited', submit.controller.sendAddedMessage);

module.exports = router;
