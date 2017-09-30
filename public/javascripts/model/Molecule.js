
function Molecule(atoms, angle){

  this.atoms = atoms;
  this.angle = angle;

	this.move = function(){
		for(var i = 0; i<this.atoms.length; i++){
			this.atoms[i].move(this.angle, 1);
			this.atoms[i].obeyLimit(1000, 600);
			drawAtom(ctx, this.atoms[i].circle, this.atoms[i].color);
		}
	}

  this.divide = function(aloneAtoms){
    for(var i=0; i<this.atoms.length; i++){
      aloneAtoms.push(this.atoms[i]);
    }
    return aloneAtoms;
  }

}
