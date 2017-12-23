
var NodeCouchDb = require('node-couchdb');
var couch = new NodeCouchDb();

var dbName = 'atomoids_ranking';
var viewUrl = '_design/all_scores/_view/all';

module.exports = {

  load: function(req, res, next) {
    res.render('game');
  },

  sendToSubmit: function(req, res, next){
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
        console.log(data.data.rows[0].value.points);
        if(req.body.points > data.data.rows[0].value.points){
          recordMessage = "Novo recorde";
        }
        console.log(req.body.points);
        res.render('submit', {points: req.body.points , date: req.body.date, recordMessage: recordMessage} );
      },
      function(err){
        res.send(err);
      });
  }

}
