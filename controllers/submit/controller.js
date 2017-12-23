
var NodeCouchDb = require('node-couchdb');
var couch = new NodeCouchDb();

module.exports = {

  sendAddedMessage: function(req, res, next){
    var points = req.body.points;
    var playerName = req.body.playerName;
    console.log(playerName);
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
  }

}
