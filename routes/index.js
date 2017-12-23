
var express = require('express');
var router = express.Router();

var game = require('./../controllers/game');
var index = require('./../controllers/index');
var submit = require('./../controllers/submit');
var ranking = require('./../controllers/ranking');
var help = require('./../controllers/help');

var NodeCouchDb = require('node-couchdb');
var couch = new NodeCouchDb();

var dbName = 'atomoids_ranking';
var viewUrl = '_design/all_scores/_view/all';

/* Home.ejs */
router.get('/', index.controller.load);
router.get('/game', game.controller.load);
//router.get('/ranking', ranking.controller.load);

couch.listDatabases().then(function(dbs){
  console.log(dbs);
});

router.get('/ranking', function(req, res){
  couch.get(dbName, viewUrl).then(
    function(data, headers, status){
      console.log(data.data.rows);
      data.data.rows.sort(function(a, b){
         if(Number(a.value.points) > Number(b.value.points)) return -1;
         if(Number(a.value.points) < Number(b.value.points)) return 1;
         if(a.value.playerName < b.value.playerName) return -1;
         if(a.value.playerName > b.value.playerName) return 1;
         return 0;
      });
      var points = ""+data.data.rows[0].value.points;
      var names = ""+data.data.rows[0].value.playerName;
      for(var i=1; i<data.data.rows.length; i++){
        points += "|"+data.data.rows[i].value.points;
        names += "|"+data.data.rows[i].value.playerName;
      }
      res.render('ranking', {points: points, names: names});
    },
    function(err){
      res.send(err);
    });
});

/* Game.ejs */
//router.post('/submit', game.controller.sendToSubmit);

router.post('/submit', function(req, res){

  couch.get(dbName, viewUrl).then(
    function(data, headers, status){
      data.data.rows.sort(function(a, b){
         if(Number(a.value.points) > Number(b.value.points)) return -1;
         if(Number(a.value.points) < Number(b.value.points)) return 1;
         if(a.value.playerName < b.value.playerName) return -1;
         if(a.value.playerName > b.value.playerName) return 1;
         return 0;
      });
      var recordMessage = "";
      if(req.body.points > data.data.rows[0].value.points){
        recordMessage = "Novo recorde";
      }
      res.render('submit', {points: req.body.points , date: req.body.date, recordMessage: recordMessage} );
    },
    function(err){
      res.send(err);
    });
});


/* Submit.ejs */
//router.post('/submited', submit.controller.sendAddedMessage);

router.post('/submited', function(req, res){
  var points = req.body.points;
  var playerName = req.body.playerName;
  couch.uniqid().then(function(ids){
    var id = ids[0];
    couch.insert('atomoids_ranking', {
      _id: id,
      points: points,
      playerName: playerName
    }).then(
        function (data, headers, status){
          res.render('index', { message: 'O score de '+playerName+' foi adicionado' });
        },
        function (err){
          res.send(err);
        });
  });
});

/* Help.ejs */
router.get('/help', help.controller.load);

module.exports = router;
