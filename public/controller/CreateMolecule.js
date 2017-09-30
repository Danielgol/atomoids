
/**
* @return {Molecule} Created molecule.
*/
function createMolecule(width, height){

	var circle = new SAT.Circle(new SAT.Vector(Math.floor((Math.random() * width-1) + 1),
	Math.floor((Math.random() * height-1) + 1)), Math.floor((Math.random() * 30) + 10));

	var molecule = new Molecule(circle, Math.floor((Math.random() * 359) + 1));

	return molecule;

}
