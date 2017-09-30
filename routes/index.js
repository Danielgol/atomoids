
var express = require('express');
var router = express.Router();

var game = require('./../controllers/game');
var index = require('./../controllers/index');
var submit = require('./../controllers/submit');
var teste = require('./../controllers/teste');

/* GET home page. */
router.get('/', index.controller.load);
router.get('/game', game.controller.load);//router.get('/submit', submit.controller.load);

router.post('/submit', game.controller.sendToSubmit);
router.post('/added', submit.controller.sendAddedMessage);


//router.post('/submited', submit.controller.submitNewScore);

//<!-- @TESTE -->
router.get('/teste', teste.controller.sendMessage);

module.exports = router;
