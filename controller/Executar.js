
function loopDoJogo(){

	apagarRastro(ctx, canvas.height, canvas.width);

	comandosTeclado(nave);

	desenharNave(ctx, nave);

}

function jogo(ctx, height, width){

	nave = new Nave(canvas.width, canvas.height);

	desenharLimite(ctx, height, width);

	setInterval(loopDoJogo, 5);

}

var canvas = document.getElementById("mycanvas");

var ctx = canvas.getContext("2d");

var nave;

jogo(ctx, canvas.height, canvas.width, nave);
