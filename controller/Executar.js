
function loopDoJogo(){

	apagarRastro(ctx, canvas.height, canvas.width);

	comandosTeclado(nave);

	desenharNave(ctx, nave.triangulo);

}

function jogo(ctx, height, width){

	var triangulo = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6), 
	new SAT.Vector(6,-6), new SAT.Vector(0,7)]);

	nave = new Nave(triangulo, width, height);

	nave.triangulo.rotate((Math.PI/180)*180);
	nave.triangulo.translate(width/2, height/2);

	desenharLimite(ctx, height, width);

	setInterval(loopDoJogo, 5);

}

var canvas = document.getElementById("mycanvas");

var ctx = canvas.getContext("2d");

var nave;

jogo(ctx, canvas.height, canvas.width, nave);
