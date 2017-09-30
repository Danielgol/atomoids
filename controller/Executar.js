
function loopDoJogo(){

	apagarRastro(ctx, canvas.height, canvas.width);

	comandosTeclado(nave);

	moleculas[0].mover();

	desenharNave(ctx, nave.triangulo);
	
	desenharMolecula(ctx, moleculas[0].circulo);

}

function jogo(ctx, height, width){

	var triangulo = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6), 
	new SAT.Vector(6,-6), new SAT.Vector(0,7)]);

	nave = new Nave(triangulo, width, height);

	nave.triangulo.rotate((Math.PI/180)*180);
	nave.triangulo.translate(width/2, height/2);



	var circulo = new SAT.Circle(new SAT.Vector(Math.floor((Math.random() * width-1) + 1),  
	Math.floor((Math.random() * height-1) + 1)), Math.floor((Math.random() * 30) + 10));

	//var circulo = new SAT.Circle(new SAT.Vector(500, 300), 10);	

	var molecula = new Molecula(circulo, Math.floor((Math.random() * 359) + 1));

	moleculas.push(molecula);




	desenharLimite(ctx, height, width);

	setInterval(loopDoJogo, 5);

}

var canvas = document.getElementById("mycanvas");

var ctx = canvas.getContext("2d");

var moleculas = [];

var nave;

jogo(ctx, canvas.height, canvas.width, nave);
