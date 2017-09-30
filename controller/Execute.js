
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
							molecules.splice(i, 1);//	REMOVE A MOLECULA
							shots.splice(x, 1);//	REMOVE O TIRO
							score.increaseScore(10);// AUMENTA O SCORE
						}
				}

				//COLISÃO (NAVE COM MOLECULAS);
				var response = new SAT.Response();
				var collided = SAT.testPolygonCircle(ship.triangle, molecules[i].circle, response);// VERIFICA A COLISÃO
				if(collided === true){//	SE COLIDIU...
					molecules.splice(i, 1);//	REMOVE A MOLECULA
					ship.respawn(canvas.width/2, canvas.height/2);// FAZ COM QUE A NAVE VOLTE PARA O CENTRO
				}
		}

		drawScore(ctx, score.score, (canvas.width/2)-5, 20);// EXIBE O SCORE ATUAL


		//X---ALTERAR TUDO ABAIXO DEPOIS--------------------------------------------------------------------------X

		//	A CONDIÇÃO DO FIM SERÁ ALTERADA DEPOIS PARA: SE A VIDA DA NAVE FOR IGUAL A ZERO
		//	SALVAR AS COISAS A PARTIR DAQUI
		if(molecules.length === 0){// CONDIÇÃO DO FIM

			clearInterval(IntervalId);// INTERROMPE O LOOP;

			//	FAZ A MINI "TELINHA" DE SUBMISSÃO
			ctx.beginPath();ctx.lineWidth = 2;
			ctx.moveTo((canvas.width/2)-250, (canvas.height/2)-150 );
			ctx.lineTo((canvas.width/2)-250, (canvas.height/2)+150 );
			ctx.lineTo((canvas.width/2)+250, (canvas.height/2)+150 );
			ctx.lineTo((canvas.width/2)+250, (canvas.height/2)-150 );
			ctx.lineTo((canvas.width/2)-250, (canvas.height/2)-150 );
			ctx.strokeStyle = "white";
			ctx.stroke();ctx.closePath();
			ctx.clearRect((canvas.width/2)-250, (canvas.height/2)-150, 500, 300);
			ctx.beginPath();
		  ctx.fillStyle = "white";
		  ctx.font = "17px Arial";
		  ctx.fillText("FIM DO JOGO!", (canvas.width/2)-60, (canvas.height/2)-100);
		  ctx.closePath();

			//	TORNA O CAMPO DE TEXTO VISIVEL: https://stackoverflow.com/questions/3961422/conditional-display-of-html-element-forms
			document.getElementById("nameBox").style.visibility="visible";

			//ISSUE:	Aparecer o campo para digitar o nome + submit + validação (nome vazio, caracteres..., fazer depois)
			//ISSUE:	Salvar o score no banco
			//ISSUE: 	Quit (reiniciar sem salvar o score, o reiniciar é para depois)

		}

		//X-------------------------------------------------------------------------------------------------------X

}



function start(){

		molecules.push(createMolecule(canvas.width, canvas.height));
		molecules.push(createMolecule(canvas.width, canvas.height));
		molecules.push(createMolecule(canvas.width, canvas.height));
		molecules.push(createMolecule(canvas.width, canvas.height));

		ship = createShip(canvas.width/2, canvas.height/2);

		score = new Score();// Data? lugar? ...

		//ZERAR AS COISAS (para que as coisas do jogo anterior não continuem, ex: moleculas, tiros, ...):
		//molecules, shots, IntervalId, ...

		drawScreen(ctx, canvas.width, canvas.height);

		IntervalId = setInterval(loop, 5);//https://stackoverflow.com/questions/109086/stop-setinterval-call-in-javascript/109098

}



var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var molecules = [];
var shots = [];
var score;
var IntervalId;
var ship;


start();
