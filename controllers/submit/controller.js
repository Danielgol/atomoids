
module.exports = {

  sendAddedMessage: function(req, res ,next) {
    res.render('index', { message: 'O score de '+req.body.playerName+' foi adicionado' } );
  }

}
