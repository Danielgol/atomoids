
var express = require('express');
var router = express.Router();

var game = require('./../controllers/game');
var index = require('./../controllers/index');
var submit = require('./../controllers/submit');
var pause = require('./../controllers/pause');
//var teste = require('./../controllers/teste');

/* Home.ejs */
router.get('/', index.controller.load);
router.get('/game', game.controller.load);//router.get('/submit', submit.controller.load);

/* Game.ejs */
router.post('/submit', game.controller.sendToSubmit);

/* Submit.ejs */
router.post('/submited', submit.controller.sendAddedMessage);
//router.post('/submited', submit.controller.submitNewScore);

router.post('/pause', game.controller.pauseTheGame);

router.post('/game', pause.controller.continueTheGame);

//<!-- @TESTE MODEL -->
//router.get('/teste', teste.controller.sendMessage);

module.exports = router;
