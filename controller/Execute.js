
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

				for(x = 0; x<shots.length; x++){
						var response = new SAT.Response();
						var collided = SAT.testCircleCircle(molecules[i].circle, shots[x].circle, response);
						if(collided === true){
							molecules.splice(i, 1);
							shots.splice(x, 1);
						}
				}
		}
		//  ...
}



function start(ctx, width, height){

		molecules.push(createMolecule(width, height));
		drawScreen(ctx, width, height);
		setInterval(loop, 5);

}



var canvas = document.getElementById("mycanvas");
var ctx = canvas.getContext("2d");

var molecules = [];
var shots = [];
var ship = createShip(canvas.width/2, canvas.height/2);


start(ctx, canvas.width, canvas.height);
