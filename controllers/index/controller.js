
//var Score = require('./../../models/scores');

module.exports = {

  load: function(req, res, next) {
    res.render('index', { message: ''});
  }//,

  // loadScores: function(req, res, next){
  //   res.render('index', { message: '', scores: Score.getAllScores()});
  // }

}
