
function Game(ctx, scr){

  this.ctx = ctx;
  this.scr = scr;

  this.hasMoleculesAndAtoms = true;
  this.hasShip = true;
  this.hasCollision = false;

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

  this.moveAloneAtoms = function(i){
    this.aloneAtoms[i].move();
    this.aloneAtoms[i].obeyLimit(this.scr.width, this.scr.height);
    this.aloneAtoms[i].drawAtom(this.ctx);
  }

  this.verifyShotMoleculeColision = function(i,x,circle){
    var response = new SAT.Response();
    var collided = SAT.testCircleCircle(circle, this.shots[x].circle, response);//.....VERIFICA A COLISÃO
    if(collided === true){
      this.aloneAtoms = this.molecules[i].divide(this.aloneAtoms);//...................DIVIDE A MOLÉCULA
      this.molecules.splice(i, 1);//...................................................REMOVE A MOLÉCULA
      this.shots.splice(x, 1);//.......................................................REMOVE O TIRO
      this.score.increaseScore(10);//..................................................AUMENTA O SCORE
      var audio = new Audio('./../../sounds/shoted.m4a');
      audio.play();
      this.hasCollision = true;
    }else{
      this.hasCollision = false;
    }
  }

  this.verifyShotAtomColision = function(i,x,circle){
    var response = new SAT.Response();
    var collided = SAT.testCircleCircle(circle,this.shots[x].circle, response);//......VERIFICA A COLISÃO
    if(collided === true){
      this.aloneAtoms.splice(i, 1);//..................................................REMOVE O ÁTOMO
      this.shots.splice(x, 1);//.......................................................REMOVE O TIRO
      this.score.increaseScore(10);//..................................................AUMENTA O SCORE
      var audio = new Audio('./../../sounds/shoted.m4a');
      audio.play();
      this.hasCollision = true;
    }else{
      this.hasCollision = false;
    }
  }

  this.doShipMoleculeColision = function(i){
      document.getElementById("pauseButton").style.visibility="hidden";
      this.aloneAtoms = this.molecules[i].divide(this.aloneAtoms);
      this.molecules.splice(i, 1);//...................................................REMOVE A MOLECULA
      this.lifes -= 1;//...............................................................FAZ A NAVE PERDER VIDA
      this.hasShip = false;//..........................................................ACIONA O TEMPORIZADOR DE RESPAWN
      var audio = new Audio('./../../sounds/bum.m4a');
      audio.play();
  }

  this.doShipAtomColision = function(i){
      document.getElementById("pauseButton").style.visibility="hidden";
      this.aloneAtoms.splice(i, 1);//..................................................REMOVE O ÁTOMO
      this.lifes -= 1;//...............................................................FAZ A NAVE PERDER VIDA
      this.hasShip = false;//..........................................................ACIONA O TEMPORIZADOR DE RESPAWN
      var audio = new Audio('./../../sounds/bum.m4a');
      audio.play();
  }

  this.respawnShip = function(){
    this.createShip();//...............................................................RECRIA A NAVE
    this.hasShip = true;
    this.ship.setImortality(true);
  }

  this.submitForm = function(){
    clearInterval(this.IntervalId);//..................................................INTERROMPE O LOOP;
    window.document.formulario.date.value = ''+this.score._id;
    window.document.formulario.points.value = ''+this.score.points;
    document.getElementById("form").submit();//........................................ENVIA O SCORE PARA A PÁGINA DE SUBMISSÃO
  }

  this.setShots = function(shots){
    this.shots = shots;
  }

  // MOlÉCULAS-----------------------------------------------------------------------------------------------------------------

  this.loadMolecules = function(){
  	for(i = 0; i<(this.level+5); i++){
  		var moleculeId = Math.floor(Math.random() * 10 + 1);
  		this.createMolecule(moleculeId);
  	}
  }

  // ₀₁₂₃₄₅₆₇₈₉
  this.createMolecule = function(type){

  	if(type === 1){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 30);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-38, y+25), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y+45), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x+38, y+25), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "orange", "N"));
  		atoms.push(new Atom(circle2, angle, "blue", "H"));
  		atoms.push(new Atom(circle3, angle, "blue", "H"));
  		atoms.push(new Atom(circle4, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "NH₃");

  		this.molecules.push(molecule);

  	}else if(type === 2){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-35, y+15), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x+35, y+15), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "red", "O"));
  		atoms.push(new Atom(circle2, angle, "blue", "H"));
  		atoms.push(new Atom(circle3, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "H₂O");

  		this.molecules.push(molecule);

  	}else if(type === 3){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 26);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-35, y+15), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y-40), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x+35, y+15), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "purple", "B"));
  		atoms.push(new Atom(circle2, angle, "grey", "F"));
  		atoms.push(new Atom(circle3, angle, "grey", "F"));
  		atoms.push(new Atom(circle4, angle, "grey", "F"));

  		var molecule = new Molecule(atoms, "BF₃");

  		this.molecules.push(molecule);

  	}else if(type === 4){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 28);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-38, y+18), 15);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y+42), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x, y-42), 15);
  		var circle5 = new SAT.Circle(new SAT.Vector(x+38, y+18), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "brown", "C"));
  		atoms.push(new Atom(circle2, angle, "blue", "H"));
  		atoms.push(new Atom(circle3, angle, "blue", "H"));
  		atoms.push(new Atom(circle4, angle, "blue", "H"));
  		atoms.push(new Atom(circle5, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "CH₄");

  		this.molecules.push(molecule);

  	}else if(type === 5){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 35);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-58, y), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x, y+58), 25);
  		var circle4 = new SAT.Circle(new SAT.Vector(x, y-58), 25);
  		var circle5 = new SAT.Circle(new SAT.Vector(x+58, y), 25);
  		var circle6 = new SAT.Circle(new SAT.Vector(x-60, y-40), 15);
  		var circle7 = new SAT.Circle(new SAT.Vector(x+60, y+40), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "green", "S"));
  		atoms.push(new Atom(circle2, angle, "red", "O"));
  		atoms.push(new Atom(circle3, angle, "red", "O"));
  		atoms.push(new Atom(circle4, angle, "red", "O"));
  		atoms.push(new Atom(circle5, angle, "red", "O"));
  		atoms.push(new Atom(circle6, angle, "blue", "H"));
  		atoms.push(new Atom(circle7, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "H₂SO₄");

  		this.molecules.push(molecule);

  	}else if(type === 6){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 30);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-44, y+32), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x+44, y+32), 25);
  		var circle4 = new SAT.Circle(new SAT.Vector(x, y-55), 25);
  		var circle5 = new SAT.Circle(new SAT.Vector(x+68, y), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "orange", "N"));
  		atoms.push(new Atom(circle2, angle, "red", "O"));
  		atoms.push(new Atom(circle3, angle, "red", "O"));
  		atoms.push(new Atom(circle4, angle, "red", "O"));
  		atoms.push(new Atom(circle5, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "HNO₃");

  		this.molecules.push(molecule);

  	}else if(type === 7){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 40);
  		var circle2 = new SAT.Circle(new SAT.Vector(x+68, y), 30);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "#9ACD32", "Na"));
  		atoms.push(new Atom(circle2, angle, "tan", "Cl"));

  		var molecule = new Molecule(atoms, "NaCl");

  		this.molecules.push(molecule);

  	}else if(type === 8){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 25);
  		var circle2 = new SAT.Circle(new SAT.Vector(x+48, y), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x-30, y+25), 15);
  		var circle4 = new SAT.Circle(new SAT.Vector(x+78, y-25), 15);

  		atoms.push(new Atom(circle1, angle, "red", "O"));
  		atoms.push(new Atom(circle2, angle, "red", "O"));
  		atoms.push(new Atom(circle3, angle, "blue", "H"));
  		atoms.push(new Atom(circle4, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "H₂O₂");

  		this.molecules.push(molecule);

  	}else if(type === 9){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 28);
  		var circle2 = new SAT.Circle(new SAT.Vector(x-48, y), 25);
  		var circle3 = new SAT.Circle(new SAT.Vector(x+48, y), 25);

  		atoms.push(new Atom(circle1, angle, "brown", "C"));
  		atoms.push(new Atom(circle2, angle, "red", "O"));
  		atoms.push(new Atom(circle3, angle, "red", "O"));

  		var molecule = new Molecule(atoms, "CO₂");

  		this.molecules.push(molecule);

  	}else if(type === 10){

  		var atoms = [];

  		var x = Math.floor(Math.random() * ((this.scr.width-200) - 200) + 200);
  		var y = Math.floor(Math.random() * ((this.scr.height-200) - 200) + 200);

  		var circle1 = new SAT.Circle(new SAT.Vector(x, y), 30);
  		var circle2 = new SAT.Circle(new SAT.Vector(x+44, y), 15);

  		var angle = Math.floor((Math.random() * 359) + 1);

  		atoms.push(new Atom(circle1, angle, "tan", "Cl"));
  		atoms.push(new Atom(circle2, angle, "blue", "H"));

  		var molecule = new Molecule(atoms, "HCl");

  		this.molecules.push(molecule);

  	}
  }

}
