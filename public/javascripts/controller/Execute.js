
function loop(){

		if(isPaused === false){

		drawScreen(ctx, canvas.width, canvas.height);

		cleanScreen(ctx, canvas.width, canvas.height);//..............................LIMPA A TELA (O RASTRO DAS COISAS)

// PARTE DA NAVE---------------------------------------------------------------------------------------------------------------

		if(hasShip === true){
			ship.move(keys);//..........................................................MOVE A NAVE
			ship.regulateVelocity(1.5);//...............................................LIMITA A VELOCIDADE DA NAVE (FORÇAS)
			ship.slide(0.001);//........................................................FAZ COM QUE A NAVE RETARDE
			ship.applyForces();//.......................................................FAZ COM QUE A NAVE GANHE "VELOCIDADE" (FORÇA)
			ship.obeyLimit(canvas.width, canvas.height);//..............................FAZ COM QUE A NAVE OBEDEÇA OS LIMITES DA TELA
			if(imortality === true){
				contador += 1;
				if(contador%2 === 0){
					drawShip(ctx, ship.triangle);//.............................................DESENHA A NAVE
				}
			}else{
				contador = 0;
				drawShip(ctx, ship.triangle);
			}
			shots = ship.shoot(shots, keys);//..........................................ADICIONA UM NOVO TIRO (SE ATIROU)
		}

// PARTE DO TIRO---------------------------------------------------------------------------------------------------------------

		for(i = 0; i<shots.length; i++){
				shots[i].move(3);//.......................................................MOVE O TIRO
				shots[i].obeyLimit(canvas.width, canvas.height);//........................FAZ COM QUE O TIRO OBEDEÇA OS LIMITES DA TELA
				shots[i].LoseReach(0.1);//................................................FAZ QUE O TIRO PERCA "TEMPO DE VIDA"
				if(shots[i].reach <= 0){//................................................VERIFICA O TEMPO DE VIDA DO TIRO
					shots.splice(i, 1);//......................................................REMOVE O TIRO
				}else{
					drawShot(ctx, shots[i].circle);//.......................................DESENHA O TIRO
				}
		}

// PARTE DAS MOLECULAS E ATOMOS + COLISÕES ------------------------------------------------------------------------------------

		for(i = 0; i<molecules.length; i++){
				molecules[i].move();//....................................................MOVE A MOLECULA
				for(j = 0; j<molecules[i].atoms.length; j++){
						for(x = 0; x<shots.length; x++){
								var response = new SAT.Response();
								var collided = SAT.testCircleCircle(molecules[i].atoms[j].circle, shots[x].circle, response);// VERIFICA A COLISÃO
								if(collided === true){//..............................................SE UM TIRO COLIDIU COM UMA MOlÉCULA
									var audio = new Audio('./../../sounds/shoted.m4a');
									audio.play();
									aloneAtoms = molecules[i].divide(aloneAtoms);
									molecules.splice(i, 1);
									shots.splice(x, 1);//..................................................REMOVE O TIRO
									score.points += 10;//..................................................AUMENTA O SCORE
								}
						}
						if(hasShip === true && imortality === false){
								var response = new SAT.Response();
								var collided = SAT.testPolygonCircle(ship.triangle, molecules[i].atoms[j].circle, response);// VERIFICA A COLISÃO
								if(collided === true){//..............................................SE A NAVE COLIDIU COM UMA MOLÉCULA
										document.getElementById("pauseButton").style.visibility="hidden";
										aloneAtoms = molecules[i].divide(aloneAtoms);
										molecules.splice(i, 1);//............................................REMOVE A MOLECULA
										lifes -= 1;//........................................................FAZ A NAVE PERDER VIDA
										hasShip = false;//.........................................ACIONA O TEMPORIZADOR DE RESPAWN

										var audio = new Audio('./../../sounds/bum.m4a');
										audio.play();

										setTimeout(function() {
												if(lifes === 0){//............................................CONDIÇÃO DO FIM
													clearInterval(IntervalId);//................................INTERROMPE O LOOP;
													window.document.formulario.date.value = ''+score._id;
													window.document.formulario.points.value = ''+score.points;
													document.getElementById("form").submit();//.................ENVIA O SCORE PARA A PÁGINA DE SUBMISSÃO
												}else{
													ship = createShip(canvas.width/2, canvas.height/2);
												}
												hasShip = true;
												imortality = true;
										}, 2000);

										setTimeout(function() {
												imortality = false;
												document.getElementById("pauseButton").style.visibility="visible";
										}, 5000);
								}
						}
				}
		}

		for(i = 0; i<aloneAtoms.length; i++){
				aloneAtoms[i].move(aloneAtoms[i].angle, aloneAtoms[i].velocity);
				aloneAtoms[i].obeyLimit(canvas.width, canvas.height);
				drawAtom(ctx, aloneAtoms[i].circle, aloneAtoms[i].color);
				for(x = 0; x<shots.length; x++){
						var response = new SAT.Response();
						var collided = SAT.testCircleCircle(aloneAtoms[i].circle, shots[x].circle, response);// VERIFICA A COLISÃO
						if(collided === true){//..............................................SE UM TIRO COLIDIU COM UMA MOlÉCULA
							aloneAtoms.splice(i, 1);
							shots.splice(x, 1);//..................................................REMOVE O TIRO
							score.points += 10;//..................................................AUMENTA O SCORE
							var audio = new Audio('./../../sounds/shoted.m4a');
							audio.play();
						}
				}
				if(hasShip === true && imortality === false){
						var response = new SAT.Response();
						var collided = SAT.testPolygonCircle(ship.triangle, aloneAtoms[i].circle, response);// VERIFICA A COLISÃO
						if(collided === true){//..............................................SE A NAVE COLIDIU COM UMA MOLÉCULA
								document.getElementById("pauseButton").style.visibility="hidden";
								aloneAtoms.splice(i, 1);//............................................REMOVE A MOLECULA
								lifes -= 1;//........................................................FAZ A NAVE PERDER VIDA
								hasShip = false;//.........................................ACIONA O TEMPORIZADOR DE RESPAWN

								var audio = new Audio('./../../sounds/bum.m4a');
								audio.play();

								setTimeout(function() {
										if(lifes === 0){//............................................CONDIÇÃO DO FIM
											clearInterval(IntervalId);//................................INTERROMPE O LOOP;
											window.document.formulario.date.value = ''+score._id;
											window.document.formulario.points.value = ''+score.points;
											document.getElementById("form").submit();//.................ENVIA O SCORE PARA A PÁGINA DE SUBMISSÃO
										}else{
											ship = createShip(canvas.width/2, canvas.height/2);
										}
										hasShip = true;
										imortality = true;
								}, 2000);

								setTimeout(function() {
										imortality = false;
										document.getElementById("pauseButton").style.visibility="visible";
								}, 5000);
						}
				}
		}

		if(molecules.length === 0 && aloneAtoms.length === 0 && hasMoleculesAndAtoms === true){//................CONDIÇÃO PARA CARREGAR NOVAS MOLÉCULAS
				hasMoleculesAndAtoms = false;//................................................ACIONA O TEMPORIZADOR PARA CARREGAR MOLÉCULAS
				document.getElementById("pauseButton").style.visibility="hidden";
				setTimeout(function() {
						level += 1;
						loadMolecules(level);//.......................................................CARREGAR NOVAS MOLÉCULAS
						hasMoleculesAndAtoms = true;
						imortality = true;
				}, 2000);

				setTimeout(function() {
						imortality = false;
						document.getElementById("pauseButton").style.visibility="visible";
				}, 4000);
		}

// OUTROS----------------------------------------------------------------------------------------------------------------------

		drawScore(ctx, score.points, (canvas.width/2)-5, 20);//.......................EXIBE O SCORE ATUAL

		drawLifes(ctx, lifes);

		drawLevel(ctx, level);

		ctx.beginPath();
	  ctx.fillText(time, 950, 580);
	  ctx.closePath();

		// ctx.beginPath();
	  // ctx.fillText("IMORTALIDADE: " + imortality, 20, 490);
	  // ctx.closePath();

//-----------------------------------------------------------------------------------------------------------------------------

	}

}


function loadMolecules(lvl){

	for(i = 0; i<(lvl+5); i++){
		var moleculeId = Math.floor(Math.random() * 5 + 1);
		molecules.push(createMolecule(canvas.width, canvas.height, moleculeId));
	}

	//  if(lvl === 1){
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 2));
	//  }else if(lvl === 2){
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 2));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	//  }else if(lvl === 3){
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 2));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	//  }else if(lvl === 4){
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 2));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	//  }else if(lvl === 5){
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 2));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	// 	 molecules.push(createMolecule(canvas.width, canvas.height, 1));
	//  }
}

function countTime(){
	if(isPaused===false){
		time -= 1;
	}
}


function start(){
		ship = createShip(canvas.width/2, canvas.height/2);
		loadMolecules(level);
		drawScreen(ctx, canvas.width, canvas.height);

		setTimeout(function() {
			drawScore(ctx, score.points, (canvas.width/2)-5, 20);//.......................EXIBE O SCORE ATUAL
			drawLifes(ctx, lifes);
			drawLevel(ctx, level);
		}, 1000);

		setTimeout(function() {
			IntervalId = setInterval(loop, 5);//https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript/109098
			setInterval(countTime, 1000);
		}, 2000);

		// setInterval(function() {
		// 	var audio = new Audio('./../../sounds/music.m4a');
		// 	audio.play();
		// }, 1800);

		setTimeout(function() {
			imortality = false;
			document.getElementById("pauseButton").style.visibility="visible";
		}, 5000);
}


var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

// Classe game contém:
//	Screen: height, widht, meio, (Em vetores)
//	Game.start() ...
//	Game contém todos os métodos do Controller
//	Tudo abaixo

var time = 180;
var contador = 0;
var imortality = true;
var level = 1;
var hasMoleculesAndAtoms = true;// colocar numa classe game
var hasShip = true;// colocar numa classe game
var lifes = 3;// colocar numa classe game
var ship;// colocar numa classe game
var shots = [];// colocar numa classe game
var aloneAtoms = [];
var molecules = [];// colocar numa classe game
var IntervalId;// colocar numa classe game
var score = {// colocar numa classe game
	_id: new Date().toISOString(),
	points: 0
}


//Adaptar os int x e int y em Vector(x,y) nos métodos

start();
