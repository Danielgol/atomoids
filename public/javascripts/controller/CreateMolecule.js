
/**
* @return {Molecule} Created molecule.
*/
function createMolecule(width, height){

	var atoms = [];

	var circle1 = new SAT.Circle(new SAT.Vector(30, 30), 20);
	var circle2 = new SAT.Circle(new SAT.Vector(15, 45), 15);
	var circle3 = new SAT.Circle(new SAT.Vector(30, 50), 15);
	var circle4 = new SAT.Circle(new SAT.Vector(45, 45), 15);

	var atom1 = new Atom(circle1);
	var atom2 = new Atom(circle2);
	var atom3 = new Atom(circle3);
	var atom4 = new Atom(circle4);

	atoms.push(atom1);
	atoms.push(atom2);
	atoms.push(atom3);
	atoms.push(atom4);

	var molecule = new Molecule(Math.floor((Math.random() * 359) + 1), atoms);

	return molecule;

}
