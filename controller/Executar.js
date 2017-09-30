
function loopDoJogo(){

	apagarRastro(ctx, canvas.height, canvas.width);

	comandosTeclado(nave);

	atirarTeclado(nave);

	moleculas[0].mover();


	if(tiros.length > 0){

		for(i = 0; i<tiros.length; i++){
			tiros[i].mover();
			desenharTiro(ctx, tiros[i].ponto);
		}

	}
	

	if(nave.x > canvas.width){
       	nave.triangulo.translate(-nave.x, -nave.y);
        nave.x = 0;
        nave.triangulo.translate(nave.x, nave.y);
    }else if(nave.x < 0){
        nave.triangulo.translate(-nave.x, -nave.y);
        nave.x = canvas.width;
        nave.triangulo.translate(nave.x, nave.y);
    }else if(nave.y > canvas.height){
        nave.triangulo.translate(-nave.x, -nave.y);
        nave.y = 0;
        nave.triangulo.translate(nave.x, nave.y);
    }else if(nave.y < 0){
        nave.triangulo.translate(-nave.x, -nave.y);
        nave.y = canvas.height;
        nave.triangulo.translate(nave.x, nave.y);
    }


	if(moleculas[0].circulo['pos'].x > canvas.width){
        moleculas[0].circulo['pos'].x = 0;
    }else if(moleculas[0].circulo['pos'].x < 0){
        moleculas[0].circulo['pos'].x = canvas.width;
    }else if(moleculas[0].circulo['pos'].y > canvas.height){
        moleculas[0].circulo['pos'].y = 0;
    }else if(moleculas[0].circulo['pos'].y < 0){
        moleculas[0].circulo['pos'].y = canvas.height;
    }

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

var tiros = [];

var nave;

jogo(ctx, canvas.height, canvas.width, nave);
