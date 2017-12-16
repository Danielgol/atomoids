
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
		// TIRO--------------------------------------------------------------------------------------------------------------
		game.moveShots();
		// MOLÉCULAS E COLISÕES---------------------------------------------------------------------------------------------
		for(i = 0; i<game.molecules.length; i++){
				game.molecules[i].move(game.ctx);//......................................................MOVE A MOLECULA;
				for(j = 0; j<game.molecules[i].atoms.length; j++){
						for(x = 0; x<game.shots.length; x++){
				        game.verifyShotMoleculeColision(i,x,game.molecules[i].atoms[j].circle);//........VERIFICA COLISÃO (TIRO, MOLÉCULA);
				    }
						if(game.hasShip === true && game.ship.imortality === false){
							var response = new SAT.Response();
					    var collided = SAT.testPolygonCircle
							(game.ship.triangle, game.molecules[i].atoms[j].circle, response);//...............VERIFICA COLISÃO (NAVE, MOLÉCULA);
							if(collided === true){
								game.doShipMoleculeColision(i);
								setTimeout(function() {
									if(game.lifes === 0){
										game.submitForm();//.........................................................ENVIA O SCORE PARA SUBMIT.ejs
									}else{
										game.respawnShip();//........................................................FAZ RESPAWN DA NAVE;
									}
				        }, 2000);
				        setTimeout(function() {
										game.ship.setImortality(false);//............................................RETORNA A MORTALIDADE DA NAVE (3s)
				            document.getElementById("pauseButton").style.visibility="visible";
				        }, 5000);
							}
						}
				}
		}
		// ÁTOMOS (SOZINHOS) E COLISÕES-------------------------------------------------------------------------------------
		for(i = 0; i<game.aloneAtoms.length; i++){
				game.moveAloneAtoms(i);//................................................................MOVE OS ÁTOMOS
				for(x = 0; x<game.shots.length; x++){
						game.verifyShotAtomColision(i,x,game.aloneAtoms[i].circle);//........................VERIFICA COLISÃO (TIROS, ÁTOMO)
				}
				if(game.hasShip === true && game.ship.imortality === false){
					var response = new SAT.Response();
					var collided = SAT.testPolygonCircle
					(game.ship.triangle, game.aloneAtoms[i].circle, response);//...........................VERIFICA COLISÃO (NAVE, ÁTOMO)
					if(collided === true){
							game.doShipAtomColision(i);
							setTimeout(function(){
								if(game.lifes === 0){//..........................................................CONDIÇÃO DO FIM
									game.submitForm();//...........................................................ENVIA O SCORE PARA SUBMIT.ejs
								}else{
									game.respawnShip();//..........................................................FAZ RESPAWN DA NAVE;
								}
							}, 2000);
							setTimeout(function() {
								game.ship.setImortality(false);//................................................RETORNA A MORTALIDADE DA NAVE (3s)
								document.getElementById("pauseButton").style.visibility="visible";
							}, 5000);
					}
				}
		}
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
	game.loadMolecules();
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
