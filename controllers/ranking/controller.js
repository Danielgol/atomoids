
var NodeCouchDb = require('node-couchdb');
var couch = new NodeCouchDb();

var dbName = 'atomoids_ranking';
var viewUrl = '_design/all_scores/_view/all';

module.exports = {
  
  load: function(req, res, next){
    couch.listDatabases().then(function(dbs){
      console.log(dbs);
    });
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
        console.log(points);
        for(var i=1; i<data.data.rows.length; i++){
          points += "|"+data.data.rows[i].value.points;
          names += "|"+data.data.rows[i].value.playerName;
        }
        res.render('ranking', {points: points, names: names});
      },
      function(err){
        res.send(err);
      });
  }

}
