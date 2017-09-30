
var express = require('express');
var router = express.Router();

var game = require('./../controllers/game');
var index = require('./../controllers/index');
var submit = require('./../controllers/submit');

/* GET home page. */
router.get('/', index.controller.load);
router.get('/game', game.controller.load);//router.get('/submit', submit.controller.load);

router.post('/submit', game.controller.sendToSubmit);
router.post('/added', submit.controller.sendAddedMessage);

module.exports = router;
