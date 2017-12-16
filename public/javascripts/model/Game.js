
function Game(ctx, scr){

  this.ctx = ctx;
  this.scr = scr;

  this.hasMoleculesAndAtoms = true;
  this.hasShip = true;

  this.ship;
  this.level = 1;
  this.lifes = 3;

  this.shots = [];
  this.aloneAtoms = [];
  this.molecules = [];

  this.IntervalId;
  this.score = new Score(new Date().toISOString());

  this.createShip = function(){
  	var triangle = new SAT.Polygon(new SAT.Vector(0, 0), [new SAT.Vector(-6, -6),
  	new SAT.Vector(6,-6), new SAT.Vector(0,7)]);
  	triangle.rotate((Math.PI/180)*180);
  	triangle.translate(this.scr.width/2, this.scr.height/2);
  	var ship = new Ship(triangle, this.scr.width/2, this.scr.height/2);
  	this.ship = ship;
  }

  this.moveShip = function(keys){
    this.ship.move(keys);//..........................................................MOVE A NAVE
    this.ship.regulateVelocity(1.5);//...............................................LIMITA A VELOCIDADE DA NAVE (FORÇAS)
    this.ship.slide(0.001);//........................................................FAZ COM QUE A NAVE RETARDE
    this.ship.applyForces();//.......................................................FAZ COM QUE A NAVE GANHE "VELOCIDADE" (FORÇA)
    this.ship.obeyLimit(this.scr.width, this.scr.height);//..........................FAZ COM QUE A NAVE OBEDEÇA OS LIMITES DA TELA
    this.ship.drawShip(this.ctx);
  }

  this.moveShots = function(){
    for(i = 0; i<this.shots.length; i++){
				this.shots[i].move(3);//......................................................MOVE O TIRO
				this.shots[i].obeyLimit(this.scr.width, this.scr.height);//...................FAZ COM QUE O TIRO OBEDEÇA OS LIMITES DA TELA
				this.shots[i].LoseReach(0.1);//...............................................FAZ QUE O TIRO PERCA "TEMPO DE VIDA"
				if(this.shots[i].reach <= 0){//...............................................VERIFICA O TEMPO DE VIDA DO TIRO
					this.shots.splice(i, 1);//..................................................REMOVE O TIRO
				}else{
					this.shots[i].drawShot(this.ctx);//.........................................DESENHA O TIRO
				}
		}
  }

  this.setShots = function(shots){
    this.shots = shots;
  }

  // MOLÉCULAS--------------------------------------------------------------------------------------------------------------------

  this.loadMolecules = function(){
  	for(i = 0; i<(this.level+5); i++){
  		var moleculeId = Math.floor(Math.random() * 10 + 1);
  		this.molecules.push(createMolecule(canvas.width, canvas.height, moleculeId));
  	}
  }

  this.createMolecule = function(width, height, type){

  	if(type === 1){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 30);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-38, y+25), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y+45), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x+38, y+25), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var atom1 = new Atom(circle1, angle, "orange", "N");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "blue", "H");
  		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "blue", "H");
  		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "blue", "H");

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

  		var atom1 = new Atom(circle1, angle, "red", "O");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "blue", "H");
  		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "blue", "H");

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

  		var atom1 = new Atom(circle1, angle, "purple", "B");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "grey", "F");
  		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "grey", "F");
  		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "grey", "F");

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

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 28);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-38, y+18), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y+42), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x, y-42), 15);
  		var circle5 = new SAT.Circle(new SAT.Vector(x+38, y+18), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var atom1 = new Atom(circle1, angle, "brown", "C");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "blue", "H");
  		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "blue", "H");
  		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "blue", "H");
  		var atom5 = new Atom(circle5, Math.floor((Math.random() * 359) + 1), "blue", "H");

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

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 35);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-58, y), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y+58), 25);
  		var circle4 = new SAT.Circle(new SAT.Vector(x, y-58), 25);
  		var circle5 = new SAT.Circle(new SAT.Vector(x+58, y), 25);
  		var circle6 = new SAT.Circle(new SAT.Vector(x-60, y-40), 15);
  		var circle7 = new SAT.Circle(new SAT.Vector(x+60, y+40), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var atom1 = new Atom(circle1, angle, "green", "S");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "red", "O");
  		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "red", "O");
  		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "red", "O");
  		var atom5 = new Atom(circle5, Math.floor((Math.random() * 359) + 1), "red", "O");
  		var atom6 = new Atom(circle6, Math.floor((Math.random() * 359) + 1), "blue", "H");
  		var atom7 = new Atom(circle7, Math.floor((Math.random() * 359) + 1), "blue", "H");

  		atoms.push(atom1);
  		atoms.push(atom2);
  		atoms.push(atom3);
  		atoms.push(atom4);
  		atoms.push(atom5);
  		atoms.push(atom6);
  		atoms.push(atom7);

  		var molecule = new Molecule(atoms, angle);

  		return molecule;

  	}else if(type === 6){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 30);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-44, y+32), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x+44, y+32), 25);
  		var circle4 = new SAT.Circle(new SAT.Vector(x, y-55), 25);
  		var circle5 = new SAT.Circle(new SAT.Vector(x+68, y), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var atom1 = new Atom(circle1, angle, "orange", "N");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "red", "O");
  		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "red", "O");
  		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "red", "O");
  		var atom5 = new Atom(circle5, Math.floor((Math.random() * 359) + 1), "blue", "H");

  		atoms.push(atom1);
  		atoms.push(atom2);
  		atoms.push(atom3);
  		atoms.push(atom4);
  		atoms.push(atom5);

  		var molecule = new Molecule(atoms, angle);

  		return molecule;

  	}else if(type === 7){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 40);
  		var circle2 = new SAT.Circle(new SAT.Vector(x+68, y), 30);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var atom1 = new Atom(circle1, angle, "#9ACD32", "Na");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "tan", "Cl");

  		atoms.push(atom1);
  		atoms.push(atom2);

  		var molecule = new Molecule(atoms, angle);

  		return molecule;

  	}else if(type === 8){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
  		var circle2 = new SAT.Circle(new SAT.Vector(x+48, y), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x-30, y+25), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x+78, y-25), 15);

  		var atom1 = new Atom(circle1, angle, "red", "O");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "red", "O");
  		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "blue", "H");
  		var atom4 = new Atom(circle4, Math.floor((Math.random() * 359) + 1), "blue", "H");

  		atoms.push(atom1);
  		atoms.push(atom2);
  		atoms.push(atom3);
  		atoms.push(atom4);

  		var molecule = new Molecule(atoms, angle);

  		return molecule;

  	}else if(type === 9){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 28);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-48, y), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x+48, y), 25);

  		var atom1 = new Atom(circle1, angle, "brown", "C");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "red", "O");
  		var atom3 = new Atom(circle3, Math.floor((Math.random() * 359) + 1), "red", "O");

  		atoms.push(atom1);
  		atoms.push(atom2);
  		atoms.push(atom3);

  		var molecule = new Molecule(atoms, angle);

  		return molecule;

  	}else if(type === 10){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 30);
  		var circle2 = new SAT.Circle(new SAT.Vector(x+44, y), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var atom1 = new Atom(circle1, angle, "tan", "Cl");
  		var atom2 = new Atom(circle2, Math.floor((Math.random() * 359) + 1), "blue", "H");

  		atoms.push(atom1);
  		atoms.push(atom2);

  		var molecule = new Molecule(atoms, angle);

  		return molecule;

  	}

  }


}
