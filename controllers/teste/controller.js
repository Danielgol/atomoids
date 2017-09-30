
//<!-- @TESTE -->

var Teste = require('./../../models/teste'); // Ele chama o model de teste

module.exports = {// Esse é o controlador de teste

  sendMessage: function(req, res ,next) {
    res.render('teste', { message: Teste.getMessage()});
    // Ele pede para o model de teste pegar uma mensagem, e envia para a página teste
  }

}
