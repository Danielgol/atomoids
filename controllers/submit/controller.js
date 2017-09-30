
//var Score = require('./../../models/score');

module.exports = {

  // load: function(req, res, next) {
  //   res.render('submit', {points: '42' , date: 'DATA'});
  // },

  //@Deprecated
  sendAddedMessage: function(req, res ,next) {
    console.log(req.body.playerName);//res.redirect('/');
    res.render('index', { message: 'O score de '+req.body.playerName+' foi adicionado' } );
  }//,

  // submitNewScore: function(req, res, next){
  //    res.render('index', { message: 'O score de '+req.body.playerName+' foi adicionado',
  //    scores: Score.submitNewScoreDB(req.body.date, req.body.points, req.body.playerName) } );
  // }

}
