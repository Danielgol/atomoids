
function loop(){

		cleanScreen(ctx, canvas.width, canvas.height);//	LIMPA A TELA (O RASTRO DAS COISAS)

		// PARTE DA NAVE---------------------------------------------------------------------------------------------------------------

		if(timingSpawningShip === false){

			ship.move(keys);//............................................................MOVE A NAVE
			ship.regulateVelocity(1.5);//.................................................LIMITA A VELOCIDADE DA NAVE (FORÇAS)
			ship.slide(0.001);//..........................................................Faz COM QUE A NAVE RETARDE
			ship.applyForces();//.........................................................fAZ COM QUE A NAVE GANHE "VELOCIDADE" (FORÇA)
			ship.obeyLimit(canvas.width, canvas.height);//................................FAZ COM QUE A NAVE OBEDEÇA OS LIMITES DA TELA
			drawShip(ctx, ship.triangle);//...............................................DESENHA A NAVE

		}

		// PARTE DO TIRO---------------------------------------------------------------------------------------------------------------

	  shots = ship.shoot(shots, keys);//............................................ADICIONA UM NOVO TIRO (SE ATIROU)

		for(i = 0; i<shots.length; i++){
				shots[i].move(3);//........................................................MOVE O TIRO
				shots[i].obeyLimit(canvas.width, canvas.height);//........................FAZ COM QUE O TIRO OBEDEÇA OS LIMITES DA TELA
				shots[i].LoseReach(0.1);//................................................FAZ QUE O TIRO PERCA "TEMPO DE VIDA"
				if(shots[i].reach <= 0){//................................................VERIFICA O TEMPO DE VIDA DO TIRO
					shots.splice(i, 1);//......................................................REMOVE O TIRO
				}else{
					drawShot(ctx, shots[i].circle);//.......................................DESENHA O TIRO
				}
		}

		// PARTE DA MOLECULA + COLISÕES ----------------------------------------------------------------------------------------------

		for(i = 0; i<molecules.length; i++){
				molecules[i].move();//....................................................MOVE A MOLECULA
				molecules[i].obeyLimit(canvas.width, canvas.height);//....................FAZ COM QUE A MOLECULA OBEDEÇA OS LIMITES DA TELA
				drawMolecule(ctx, molecules[i].circle);//.................................DESENHA A MOLECULA

				for(x = 0; x<shots.length; x++){
								//Está dando erro: Unable to get property 'circle' of undefined or null reference
						var response = new SAT.Response();
						var collided = SAT.testCircleCircle(molecules[i].circle, shots[x].circle, response);// VERIFICA A COLISÃO
						if(collided === true){//..........................................SE UM TIRO COLIDIU COM UMA MOlÉCULA
							molecules.splice(i, 1);//..........................................REMOVE A MOLECULA
							shots.splice(x, 1);//..............................................REMOVE O TIRO
							score.points += 10;//..............................................AUMENTA O SCORE
						}
				}
				//COLISÃO (NAVE COM MOLECULAS);

				if(timingSpawningShip === false){
						var response = new SAT.Response();
						var collided = SAT.testPolygonCircle(ship.triangle, molecules[i].circle, response);// VERIFICA A COLISÃO
						if(collided === true){//...........................................SE A NAVE COLIDIU COM UMA MOLÉCULA
								molecules.splice(i, 1);//..........................................REMOVE A MOLECULA
								lifes -= 1;//......................................................FAZ A NAVE PERDER VIDA
								timingSpawningShip = true;//.......................................ACIONA O TEMPORIZADOR
								setTimeout(function() {
										if(lifes === 0){
											clearInterval(IntervalId);// INTERROMPE O LOOP;
											window.document.formulario.date.value = ''+score._id;
											window.document.formulario.points.value = ''+score.points;
											document.getElementById("form").submit();
										}else{
											ship = createShip(canvas.width/2, canvas.height/2);
										}
										timingSpawningShip = false;
								}, 2000);
						}
				}
		}

		//---------------------------------------------------------------------------------------------------------------------------

		drawScore(ctx, score.points, (canvas.width/2)-5, 20);// EXIBE O SCORE ATUAL

		if(molecules.length === 0 && timingLoadMolecules === false){
				timingLoadMolecules = true;
				setTimeout(function() {
						loadMolecules();
						timingLoadMolecules = false;
				}, 2000);
		}
}

function loadMolecules(){
	molecules.push(createMolecule(canvas.width, canvas.height));//}loadMolecules(lvl);
	molecules.push(createMolecule(canvas.width, canvas.height));//}
	molecules.push(createMolecule(canvas.width, canvas.height));//}
	molecules.push(createMolecule(canvas.width, canvas.height));//}
}

function start(){
		ship = createShip(canvas.width/2, canvas.height/2);
		loadMolecules();
		drawScreen(ctx, canvas.width, canvas.height);
		IntervalId = setInterval(loop, 5);//https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript/109098
}


var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var timingLoadMolecules = false;
var timingSpawningShip = false;

var lifes = 3;

var ship;
var shots = [];
var molecules = [];
var IntervalId;
var score = {
	_id: new Date().toISOString(),
	points: 0
}


start();
