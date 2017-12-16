
var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var scr = new Screen(canvas.width, canvas.height);
var game = new Game(ctx, scr);

function loop(){

		if(isPaused === false){
			game.scr.drawScreen(game.ctx);//.............................................................DESENHA A BORDA BRANCA DA TELA;
			game.scr.cleanScreen(game.ctx);//............................................................LIMPA A TELA (O RASTRO DAS COISAS);

			// NAVE--------------------------------------------------------------------------------------------------------------
			if(game.hasShip === true){
				game.moveShip(keys);
				game.setShots(game.ship.shoot(game.shots, keys));//........................................ADICIONA UM NOVO TIRO (SE ATIROU);
			}

// PARTE DO TIRO---------------------------------------------------------------------------------------------------------------

// 		for(i = 0; i<shots.length; i++){
// 				shots[i].move(3);//.......................................................MOVE O TIRO
// 				shots[i].obeyLimit(canvas.width, canvas.height);//........................FAZ COM QUE O TIRO OBEDEÇA OS LIMITES DA TELA
// 				shots[i].LoseReach(0.1);//................................................FAZ QUE O TIRO PERCA "TEMPO DE VIDA"
// 				if(shots[i].reach <= 0){//................................................VERIFICA O TEMPO DE VIDA DO TIRO
// 					shots.splice(i, 1);//......................................................REMOVE O TIRO
// 				}else{
// 					drawShot(ctx, shots[i].circle);//.......................................DESENHA O TIRO
// 				}
// 		}
//
// // PARTE DAS MOLECULAS E ATOMOS + COLISÕES ------------------------------------------------------------------------------------
//
// 		for(i = 0; i<molecules.length; i++){
// 				molecules[i].move();//....................................................MOVE A MOLECULA
// 				for(j = 0; j<molecules[i].atoms.length; j++){
// 						for(x = 0; x<shots.length; x++){
// 								var response = new SAT.Response();
// 								var collided = SAT.testCircleCircle(molecules[i].atoms[j].circle, shots[x].circle, response);// VERIFICA A COLISÃO
// 								if(collided === true){//..............................................SE UM TIRO COLIDIU COM UMA MOlÉCULA
// 									var audio = new Audio('./../../sounds/shoted.m4a');
// 									audio.play();
// 									aloneAtoms = molecules[i].divide(aloneAtoms);
// 									molecules.splice(i, 1);
// 									shots.splice(x, 1);//..................................................REMOVE O TIRO
// 									score.points += 10;//..................................................AUMENTA O SCORE
// 								}
// 						}
// 						if(hasShip === true && imortality === false){
// 								var response = new SAT.Response();
// 								var collided = SAT.testPolygonCircle(ship.triangle, molecules[i].atoms[j].circle, response);// VERIFICA A COLISÃO
// 								if(collided === true){//..............................................SE A NAVE COLIDIU COM UMA MOLÉCULA
// 										document.getElementById("pauseButton").style.visibility="hidden";
// 										aloneAtoms = molecules[i].divide(aloneAtoms);
// 										molecules.splice(i, 1);//............................................REMOVE A MOLECULA
// 										lifes -= 1;//........................................................FAZ A NAVE PERDER VIDA
// 										hasShip = false;//.........................................ACIONA O TEMPORIZADOR DE RESPAWN
//
// 										var audio = new Audio('./../../sounds/bum.m4a');
// 										audio.play();
//
// 										setTimeout(function() {
// 												if(lifes === 0){//............................................CONDIÇÃO DO FIM
// 													clearInterval(IntervalId);//................................INTERROMPE O LOOP;
// 													window.document.formulario.date.value = ''+score._id;
// 													window.document.formulario.points.value = ''+score.points;
// 													//window.document.formulario.time.value = "TEMPO RESTANTE: "+Math.floor(time/60)+":"+seconds;
// 													document.getElementById("form").submit();//.................ENVIA O SCORE PARA A PÁGINA DE SUBMISSÃO
// 												}else{
// 													ship = createShip(canvas.width/2, canvas.height/2);
// 												}
// 												hasShip = true;
// 												imortality = true;
// 										}, 2000);
//
// 										setTimeout(function() {
// 												imortality = false;
// 												document.getElementById("pauseButton").style.visibility="visible";
// 										}, 5000);
// 								}
// 						}
// 				}
// 		}
//
// 		for(i = 0; i<aloneAtoms.length; i++){
// 				aloneAtoms[i].move(aloneAtoms[i].angle, aloneAtoms[i].velocity);
// 				aloneAtoms[i].obeyLimit(canvas.width, canvas.height);
// 				drawAtom(ctx, aloneAtoms[i].circle, aloneAtoms[i].color, aloneAtoms[i].element);
// 				for(x = 0; x<shots.length; x++){
// 						var response = new SAT.Response();
// 						var collided = SAT.testCircleCircle(aloneAtoms[i].circle, shots[x].circle, response);// VERIFICA A COLISÃO
// 						if(collided === true){//..............................................SE UM TIRO COLIDIU COM UMA MOlÉCULA
// 							aloneAtoms.splice(i, 1);
// 							shots.splice(x, 1);//..................................................REMOVE O TIRO
// 							score.points += 10;//..................................................AUMENTA O SCORE
// 							var audio = new Audio('./../../sounds/shoted.m4a');
// 							audio.play();
// 						}
// 				}
// 				if(hasShip === true && imortality === false){
// 						var response = new SAT.Response();
// 						var collided = SAT.testPolygonCircle(ship.triangle, aloneAtoms[i].circle, response);// VERIFICA A COLISÃO
// 						if(collided === true){//..............................................SE A NAVE COLIDIU COM UMA MOLÉCULA
// 								document.getElementById("pauseButton").style.visibility="hidden";
// 								aloneAtoms.splice(i, 1);//............................................REMOVE A MOLECULA
// 								lifes -= 1;//........................................................FAZ A NAVE PERDER VIDA
// 								hasShip = false;//.........................................ACIONA O TEMPORIZADOR DE RESPAWN
//
// 								var audio = new Audio('./../../sounds/bum.m4a');
// 								audio.play();
//
// 								setTimeout(function() {
// 										if(lifes === 0){//............................................CONDIÇÃO DO FIM
// 											clearInterval(IntervalId);//................................INTERROMPE O LOOP;
// 											window.document.formulario.date.value = ''+score._id;
// 											window.document.formulario.points.value = ''+score.points;
// 											//window.document.formulario.time.value = "TEMPO RESTANTE: "+Math.floor(time/60)+":"+seconds;
// 											document.getElementById("form").submit();//.................ENVIA O SCORE PARA A PÁGINA DE SUBMISSÃO
// 										}else{
// 											ship = createShip(canvas.width/2, canvas.height/2);
// 										}
// 										hasShip = true;
// 										imortality = true;
// 								}, 2000);
//
// 								setTimeout(function() {
// 										imortality = false;
// 										document.getElementById("pauseButton").style.visibility="visible";
// 								}, 5000);
// 						}
// 				}
// 		}
//
// 		if(molecules.length === 0 && aloneAtoms.length === 0 && hasMoleculesAndAtoms === true){//................CONDIÇÃO PARA CARREGAR NOVAS MOLÉCULAS
// 				hasMoleculesAndAtoms = false;//................................................ACIONA O TEMPORIZADOR PARA CARREGAR MOLÉCULAS
// 				document.getElementById("pauseButton").style.visibility="hidden";
// 				setTimeout(function() {
// 						level += 1;
// 						loadMolecules(level);//.......................................................CARREGAR NOVAS MOLÉCULAS
// 						hasMoleculesAndAtoms = true;
// 						imortality = true;
// 				}, 2000);
//
// 				setTimeout(function() {
// 						imortality = false;
// 						document.getElementById("pauseButton").style.visibility="visible";
// 				}, 4000);
// 		}
//
// // OUTROS----------------------------------------------------------------------------------------------------------------------
//
// 		drawScore(ctx, score.points, (canvas.width/2)-5, 20);//.......................EXIBE O SCORE ATUAL
//
// 		drawLifes(ctx, lifes);
//
// 		drawLevel(ctx, level);

//-----------------------------------------------------------------------------------------------------------------------------

	}

}


// function loadMolecules(lvl){
// 	for(i = 0; i<(lvl+5); i++){//lvl+5
// 		var moleculeId = Math.floor(Math.random() * 10 + 1);
//
// 		molecules.push(createMolecule(canvas.width, canvas.height, moleculeId));
// 	}
// }

// function start(){
// 		ship = createShip(canvas.width/2, canvas.height/2);
// 		loadMolecules(level);
// 		drawScreen(ctx, canvas.width, canvas.height);
//
// 		setTimeout(function() {
// 			drawScore(ctx, score.points, (canvas.width/2)-5, 20);//.......................EXIBE O SCORE ATUAL
// 			drawLifes(ctx, lifes);
// 			drawLevel(ctx, level);
// 		}, 1000);
//
// 		setTimeout(function() {
// 			IntervalId = setInterval(loop, 5);//https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript/109098
// 		}, 2000);
//
// 		setTimeout(function() {
// 			imortality = false;
// 			document.getElementById("pauseButton").style.visibility="visible";
// 		}, 5000);
// }

function start(){
	game.createShip();
	//game.loadMolecules();
	game.scr.drawScreen(game.ctx);
	setTimeout(function() {
		game.scr.drawScore(game.ctx, game.score.points, (game.scr.width/2)-5, 20);//.......................EXIBE O SCORE ATUAL
		game.scr.drawLifes(game.ctx, game.lifes);
		game.scr.drawLevel(game.ctx, game.level);
	}, 1000);
	setTimeout(function() {
		game.IntervalId = setInterval(loop, 5);//https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript/109098
	}, 2000);
	setTimeout(function() {
		game.ship.setImortality(false);
		document.getElementById("pauseButton").style.visibility="visible";
	}, 5000);
}

start();
