
/**
* @return {Molecule} Created molecule.
*/
function createMolecule(width, height, type){

	if(type === 1){

		var atoms = [];

		//var position = new SAT.Vector(  Math.floor((Math.random() * width-1) + 1), Math.floor((Math.random() * height-1) + 1 ));

		var x = Math.floor((Math.random() * width-1) + 1);
		var y = Math.floor((Math.random() * height-1) + 1);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
		var circle2 = new SAT.Circle(new SAT.Vector(x-20, y+10), 15);
		var circle3 = new SAT.Circle(new SAT.Vector(x, y+25), 15);
		var circle4 = new SAT.Circle(new SAT.Vector(x+20, y+10), 15);

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

	}else{

		var atoms = [];

		var x = Math.floor((Math.random() * width-1) + 1);
		var y = Math.floor((Math.random() * height-1) + 1);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 35);
		var circle2 = new SAT.Circle(new SAT.Vector(x-25, y+25), 25);
		var circle3 = new SAT.Circle(new SAT.Vector(x+35, y+25), 25);

		var atom1 = new Atom(circle1);
		var atom2 = new Atom(circle2);
		var atom3 = new Atom(circle3);

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);

		var molecule = new Molecule(Math.floor((Math.random() * 359) + 1), atoms);

		return molecule;

	}

}
