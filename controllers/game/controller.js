
module.exports = {

  load: function(req, res, next) {
    res.render('game');
  },

  sendToSubmit: function(req, res ,next){
    res.render('submit', {points: req.body.points , date: req.body.date} );
  }

}
