
var db = new PouchDB('atomoids_ranking');

var Score = {

  getAllScores: function() {
      var allScores = null;
      db.allDocs({include_docs: true, descending: true}).then(function(docs){
        allScores = docs.rows;
        var string = "SCORES: \n";
        for(var f = 0; f<scores.length; f++){
            string += "Name: "+scores[f].doc.name+" Score:"+scores[f].doc.points+"\n";
        }
        return string;
      });
  },

  submitNewScoreDB: function(date, points, name){
      var score = {
          _id: date,
          points: points,
          name: name
      }
      db.put(score, function callback(err, result){
          if(!err){
              console.log(score.name+' foi cadastrado com sucesso');
              return score.name+' foi cadastrado com sucesso';
          }
      });
  }

}

module.exports = Score;
