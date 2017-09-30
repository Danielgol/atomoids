
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

		var atom1 = new Atom(circle1, angle, "red");
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "blue");
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "blue");
		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "blue");

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

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
		var circle2 = new SAT.Circle(new SAT.Vector(x-35, y+15), 15);
		var circle3 = new SAT.Circle(new SAT.Vector(x+35, y+15), 15);

		var angle = Math.floor((Math.random() * 359) + 1);

		var atom1 = new Atom(circle1, angle, "blue");
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "green");
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "green");

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);

		var molecule = new Molecule(atoms, angle);

		return molecule;

	}else if(type === 3){

		var atoms = [];

		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
		var circle2 = new SAT.Circle(new SAT.Vector(x-35, y+15), 15);
		var circle3 = new SAT.Circle(new SAT.Vector(x, y-40), 15);
		var circle4 = new SAT.Circle(new SAT.Vector(x+35, y+15), 15);

		var angle = Math.floor((Math.random() * 359) + 1);

		var atom1 = new Atom(circle1, angle, "red");
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "yellow");
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "yellow");
		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "yellow");

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);
		atoms.push(atom4);

		var molecule = new Molecule(atoms, angle);

		return molecule;

	}else if(type === 4){

		var atoms = [];

		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
		var circle2 = new SAT.Circle(new SAT.Vector(x-35, y+15), 15);
		var circle3 = new SAT.Circle(new SAT.Vector(x, y+40), 15);
		var circle4 = new SAT.Circle(new SAT.Vector(x, y-40), 15);
		var circle5 = new SAT.Circle(new SAT.Vector(x+35, y+15), 15);

		var angle = Math.floor((Math.random() * 359) + 1);

		var atom1 = new Atom(circle1, angle, "orange");
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "purple");
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "purple");
		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "purple");
		var atom5 = new Atom(circle5, Math.floor((Math.random() * 359) + 1), "purple");

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);
		atoms.push(atom4);
		atoms.push(atom5);

		var molecule = new Molecule(atoms, angle);

		return molecule;

	}else if(type === 5){

		var atoms = [];

		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
		var circle2 = new SAT.Circle(new SAT.Vector(x-40, y), 15);
		var circle3 = new SAT.Circle(new SAT.Vector(x, y+40), 15);
		var circle4 = new SAT.Circle(new SAT.Vector(x, y-40), 15);
		var circle5 = new SAT.Circle(new SAT.Vector(x+40, y), 15);
		var circle6 = new SAT.Circle(new SAT.Vector(x-40, y-25), 10);
		var circle7 = new SAT.Circle(new SAT.Vector(x+40, y+25), 10);

		var angle = Math.floor((Math.random() * 359) + 1);

		var atom1 = new Atom(circle1, angle, "green");
		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "yellow");
		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "yellow");
		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "yellow");
		var atom5 = new Atom(circle5, Math.floor((Math.random() * 359) + 1), "yellow");
		var atom6 = new Atom(circle6, Math.floor((Math.random() * 359) + 1), "blue");
		var atom7 = new Atom(circle7, Math.floor((Math.random() * 359) + 1), "blue");

		atoms.push(atom1);
		atoms.push(atom2);
		atoms.push(atom3);
		atoms.push(atom4);
		atoms.push(atom5);
		atoms.push(atom6);
		atoms.push(atom7);

		var molecule = new Molecule(atoms, angle);

		return molecule;

	}

}
