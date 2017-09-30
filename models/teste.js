
//<!-- @TESTE -->

// Os conteúdos de teste:
var message = 'TESTE COM O MODEL FOI UM SUCESSO';
// ...

var Teste = { //O model propriamente dito

  getMessage: function() {
    return message;// ele retorna um conteúdo de teste (message)
  }

}

module.exports = Teste; // É por essa variável que os controllers vão se comunicar com o model de teste
