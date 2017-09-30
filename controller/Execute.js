
function loop(){

		cleanScreen(ctx, canvas.width, canvas.height);

		ship.move();
		ship.obeyLimit(canvas.width, canvas.height);
		drawShip(ctx, ship.triangle);

	  shots = ship.shoot(shots);
		for(i = 0; i<shots.length; i++){
				shots[i].move();
				shots[i].obeyLimit(canvas.width, canvas.height);
				drawShot(ctx, shots[i].circle);
		}

		for(i = 0; i<molecules.length; i++){
				molecules[i].move();
				molecules[i].obeyLimit(canvas.width, canvas.height);
				drawMolecule(ctx, molecules[i].circle);

				//COLISÃO (TIROS COM MOLECULAS);
				for(x = 0; x<shots.length; x++){
						var response = new SAT.Response();
						var collided = SAT.testCircleCircle(molecules[i].circle, shots[x].circle, response);
						if(collided === true){
							molecules.splice(i, 1);
							shots.splice(x, 1);

							//x---AQUI DEVERÁ AUMENTAR O PLACAR---x

							//score.score += ???;

						}
				}

				//COLISÃO (NAVE COM MOLECULAS);
				var response = new SAT.Response();
				var collided = SAT.testPolygonCircle(ship.triangle, molecules[i].circle, response);
				if(collided === true){
					molecules.splice(i, 1);
					ship.respawn(canvas.width/2, canvas.height/2);
				}
		}
}



function start(ctx, width, height){

		molecules.push(createMolecule(width, height));
		molecules.push(createMolecule(width, height));
		molecules.push(createMolecule(width, height));
		molecules.push(createMolecule(width, height));

		//	var score = new Score(...);

		drawScreen(ctx, width, height);

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
var ship = createShip(canvas.width/2, canvas.height/2);


start(ctx, canvas.width, canvas.height);
