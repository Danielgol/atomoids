
/**
* @return {Ship} Created ship.
*/
function createShip(centerX, centerY){

	var triangle = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6),
	new SAT.Vector(6,-6), new SAT.Vector(0,7)]);

	triangle.rotate((Math.PI/180)*180);
	triangle.translate(centerX, centerY);

	var ship = new Ship(triangle, centerX, centerY);

	return ship;
}
