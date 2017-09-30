
/**
* @return {Molecule} Created molecule.
*/
function createMolecule(width, height, type){

	if(type === 1){

		var atoms = [];

		//var position = new SAT.Vector(  Math.floor((Math.random() * width-1) + 1), Math.floor((Math.random() * height-1) + 1 ));

		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
		var circle2 = new SAT.Circle(new SAT.Vector(x-35, y+15), 15);
		var circle3 = new SAT.Circle(new SAT.Vector(x, y+40), 15);
		var circle4 = new SAT.Circle(new SAT.Vector(x+35, y+15), 15);

		var angle = Math.floor((Math.random() * 359) + 1);

		var atom1 = new Atom(circle1, angle);
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1));
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1));
		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1));

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);
		atoms.push(atom4);

		var molecule = new Molecule(atoms, angle);

		return molecule;

	}else if(type === 2){

		var atoms = [];

		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 35);
		var circle2 = new SAT.Circle(new SAT.Vector(x-25, y+25), 25);
		var circle3 = new SAT.Circle(new SAT.Vector(x+35, y+25), 25);

		var angle = Math.floor((Math.random() * 359) + 1);

		var atom1 = new Atom(circle1, angle);
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1));
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1));

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);

		var molecule = new Molecule(atoms, angle);

		return molecule;

	}else if(type === 3){

		var atoms = [];

		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 35);
		var circle2 = new SAT.Circle(new SAT.Vector(x-25, y+25), 25);
		var circle3 = new SAT.Circle(new SAT.Vector(x+35, y+25), 25);

		var angle = Math.floor((Math.random() * 359) + 1);

		var atom1 = new Atom(circle1, angle);
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1));
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1));

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);

		var molecule = new Molecule(atoms, angle);

		return molecule;

	}else if(type === 4){

		var atoms = [];

		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 35);
		var circle2 = new SAT.Circle(new SAT.Vector(x-25, y+25), 25);
		var circle3 = new SAT.Circle(new SAT.Vector(x+35, y+25), 25);

		var angle = Math.floor((Math.random() * 359) + 1);

		var atom1 = new Atom(circle1, angle);
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1));
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1));

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);

		var molecule = new Molecule(atoms, angle);

		return molecule;

	}else if(type === 5){

		var atoms = [];

		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 35);
		var circle2 = new SAT.Circle(new SAT.Vector(x-25, y+25), 25);
		var circle3 = new SAT.Circle(new SAT.Vector(x+35, y+25), 25);

		var angle = Math.floor((Math.random() * 359) + 1);

		var atom1 = new Atom(circle1, angle);
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1));
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1));

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);

		var molecule = new Molecule(atoms, angle);

		return molecule;

	}

}
