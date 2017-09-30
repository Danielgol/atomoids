
module.exports = {

  continueTheGame: function(req, res ,next) {
    res.render('game', { game: 'game' } );
  }

}
