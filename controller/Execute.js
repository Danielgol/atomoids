
function loop(){

		cleanScreen(ctx, canvas.width, canvas.height);//	LIMPA A TELA (O RASTRO DAS COISAS)

		ship.move(keys);//	MOVE A NAVE
		ship.obeyLimit(canvas.width, canvas.height);//	FAZ COM QUE A NAVE OBEDEÇA OS LIMITES DA TELA
		drawShip(ctx, ship.triangle);//	DESENHA A NAVE

	  shots = ship.shoot(shots, keys);//	ADICIONA UM NOVO TIRO (SE ATIROU)
		for(i = 0; i<shots.length; i++){// REALIZA AS ATIVIDADES ABAIXO PARA TODOS OS TIROS
				shots[i].move();//	MOVE O TIRO
				shots[i].obeyLimit(canvas.width, canvas.height);//	FAZ COM QUE O TIRO OBEDEÇA OS LIMITES DA TELA
				drawShot(ctx, shots[i].circle);// DESENHA O TIRO
		}

		for(i = 0; i<molecules.length; i++){// REALIZA AS ATIVIDADES ABAIXO PARA TODAS AS MOLECULAS
				molecules[i].move();//	MOVE A MOLECULA
				molecules[i].obeyLimit(canvas.width, canvas.height);//	FAZ COM QUE A MOLECULA OBEDEÇA OS LIMITES DA TELA
				drawMolecule(ctx, molecules[i].circle);// DESENHA A MOLECULA

				//COLISÃO (TIROS COM MOLECULAS);
				for(x = 0; x<shots.length; x++){
						var response = new SAT.Response();
						var collided = SAT.testCircleCircle(molecules[i].circle, shots[x].circle, response);// VERIFICA A COLISÃO
						if(collided === true){//	SE COLIDIU...
							molecules.splice(i, 1);//	REMOVA A MOLECULA
							shots.splice(x, 1);//	REMOVA O TIRO
							score.increaseScore(10);// AUMENTA O SCORE
						}
				}

				//COLISÃO (NAVE COM MOLECULAS);
				var response = new SAT.Response();
				var collided = SAT.testPolygonCircle(ship.triangle, molecules[i].circle, response);// VERIFICA A COLISÃO
				if(collided === true){//	SE COLIDIU...
					molecules.splice(i, 1);//	REMOVA A MOLECULA
					ship.respawn(canvas.width/2, canvas.height/2);// FAZ COM QUE A NAVE VOLTE PARA O CENTRO
				}
		}

		drawScore(ctx, score.score, (canvas.width/2)-5, 20);

}



function start(){

		molecules.push(createMolecule(canvas.width, canvas.height));
		molecules.push(createMolecule(canvas.width, canvas.height));
		molecules.push(createMolecule(canvas.width, canvas.height));
		molecules.push(createMolecule(canvas.width, canvas.height));

		score = new Score();// Data? lugar? ...

		drawScreen(ctx, canvas.width, canvas.height);

		setInterval(loop, 5);

		//https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript/109098
		//var IntervalId; colocar como global
		//IntervalId = setInterval(loop, 5); colocar aqui
		//clearInterval(IntervalId); colocar na condição para parar o jogo

}



var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var molecules = [];
var shots = [];
var score;
var ship = createShip(canvas.width/2, canvas.height/2);


start();
