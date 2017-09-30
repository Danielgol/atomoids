
function loop(){

		cleanScreen(ctx, canvas.width, canvas.height);//	LIMPA A TELA (O RASTRO DAS COISAS)

		ship.move(keys);//	MOVE A NAVE
		ship.regulateForcesLimit();// Limita a "velocidade" da nave (forças)
		ship.slide();// Faz com que a nave retarde
		ship.applyForces();// faz com que a nave ganhe "velocidade" (força)
		ship.obeyLimit(canvas.width, canvas.height);//	FAZ COM QUE A NAVE OBEDEÇA OS LIMITES DA TELA
		drawShip(ctx, ship.triangle);//	DESENHA A NAVE

	  shots = ship.shoot(shots, keys);//	ADICIONA UM NOVO TIRO (SE ATIROU)
		for(i = 0; i<shots.length; i++){// REALIZA AS ATIVIDADES ABAIXO PARA TODOS OS TIROS
				shots[i].move();//	MOVE O TIRO
				shots[i].obeyLimit(canvas.width, canvas.height);//	FAZ COM QUE O TIRO OBEDEÇA OS LIMITES DA TELA
				shots[i].LostReach();
				if(shots[i].reach <= 0){// VERIFICA O TEMPO DE VIDA DO TIRO
					shots.splice(i, 1);//	REMOVE O TIRO
				}else{
					drawShot(ctx, shots[i].circle);// DESENHA O TIRO
				}
		}

		for(i = 0; i<molecules.length; i++){// REALIZA AS ATIVIDADES ABAIXO PARA TODAS AS MOLECULAS
				molecules[i].move();//	MOVE A MOLECULA
				molecules[i].obeyLimit(canvas.width, canvas.height);//	FAZ COM QUE A MOLECULA OBEDEÇA OS LIMITES DA TELA
				drawMolecule(ctx, molecules[i].circle);// DESENHA A MOLECULA
				//COLISÃO (TIROS COM MOLECULAS);
				for(x = 0; x<shots.length; x++){
						if(molecules.length>0){
								//Está dando erro: Unable to get property 'circle' of undefined or null reference
								var response = new SAT.Response();
								var collided = SAT.testCircleCircle(molecules[i].circle, shots[x].circle, response);// VERIFICA A COLISÃO
								if(collided === true){//	SE COLIDIU...
									molecules.splice(i, 1);//	REMOVE A MOLECULA
									shots.splice(x, 1);//	REMOVE O TIRO
									score.points += 10;// AUMENTA O SCORE
								}
						}else{
								break;
						}
				}
				//COLISÃO (NAVE COM MOLECULAS);
				if(molecules.length>0){
						var response = new SAT.Response();
						var collided = SAT.testPolygonCircle(ship.triangle, molecules[i].circle, response);// VERIFICA A COLISÃO
						if(collided === true){//	SE COLIDIU...
							molecules.splice(i, 1);//	REMOVE A MOLECULA
							ship.respawn(canvas.width/2, canvas.height/2);// FAZ COM QUE A NAVE VOLTE PARA O CENTRO
						}
			  }else{
						break;
				}
		}

		drawScore(ctx, score.points, (canvas.width/2)-5, 20);// EXIBE O SCORE ATUAL

		if(molecules.length === 0){// CONDIÇÃO DO FIM
			clearInterval(IntervalId);// INTERROMPE O LOOP;
			window.document.formulario.date.value = ''+score._id;
			window.document.formulario.points.value = ''+score.points;
			document.getElementById("form").submit();
		}

}


function start(){
		molecules.push(createMolecule(canvas.width, canvas.height));
		molecules.push(createMolecule(canvas.width, canvas.height));
		molecules.push(createMolecule(canvas.width, canvas.height));
		molecules.push(createMolecule(canvas.width, canvas.height));

		ship = createShip(canvas.width/2, canvas.height/2);
		drawScreen(ctx, canvas.width, canvas.height);
		IntervalId = setInterval(loop, 5);//https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript/109098
}


var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var molecules = [];
var shots = [];
var IntervalId;
var ship;

var score = {
	_id: new Date().toISOString(),
	points: 0
}


start();
