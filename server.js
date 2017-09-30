
// Carrega a biblioteca HTTP do Node.js.
 var http = require('http');
 // Cria um serviço web para tratar a requisição de resposta da mensagem Hello World.
 var fs = require('fs');

 var server = http.createServer(function (request, response) {

   var page = 'index.html';

   if(request.url != '/'){
     page = request.url+'.html';
   }

   fs.readFile('./'+page, function(err, data){

     var headStatus = 200;

     if(err){
       var headStatus = 404;
       data = fs.readFileSync('./view/error/404.html');
     }

     // Define os parâmetros de cabeçalho de resposta.
     response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
     // Escreve uma mensagem de resposta do servidor.
     response.write(data);
     // Envia uma resposta para o cliente
     response.end();
   });


 });
 // Define a porta e IP que será executado a aplicação.
 server.listen(3000);
 // Imprime mensagem no terminal do servidor.
 console.log('Servidor Node.js em execução');

//https://udgwebdev.com/node-js-para-leigos-instalacao-e-configuracao/
