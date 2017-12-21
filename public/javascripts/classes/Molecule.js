
function Molecule(atoms, type){

  this.atoms = atoms;
  this.type = type;

	this.move = function(ctx){
		for(var i = 0; i<this.atoms.length; i++){
			this.atoms[i].move();
			this.atoms[i].obeyLimit(1000, 600);
			this.drawAtoms(this.atoms[i], ctx);
		}
	}

  this.divide = function(aloneAtoms){
    var angleReference = this.atoms[0].angle;
    aloneAtoms.push(this.atoms[0]);
    for(var i=1; i<this.atoms.length; i++){
      this.atoms[i].angle = Math.floor(Math.random() * ((angleReference+20) - (angleReference-20) + 1)) + (angleReference-20);
      //-----------------------------------------------------MAX---------------------MIN-------------------------MIN----------
      //this.atoms[i].angle = Math.floor((Math.random() * 359) + 1);//......................APENAS O "ÁTOMO CENTRAL" CONTINUARÁ COM O ÂNGULO ANTERIOR
      aloneAtoms.push(this.atoms[i]);
    }
    return aloneAtoms;
  }

  this.drawAtoms = function(atom, ctx){
      ctx.beginPath();
      //ctx.fillStyle = atom.color;
      ctx.arc(atom.circle['pos'].x, atom.circle['pos'].y, atom.circle['r'], 0, 2 * Math.PI);
      //ctx.fill();
      ctx.strokeStyle = "white";
			ctx.stroke();

      ctx.closePath();

      ctx.beginPath();
      ctx.fillStyle = "white";
      ctx.font = "20px ArialBold";
      if(this.type === "NH₃" || this.type === "H₂O" || this.type === "NaCl"){
        ctx.fillText(this.type, this.atoms[0].circle['pos'].x - 20, this.atoms[0].circle['pos'].y +7);
      }else if(this.type === "BF₃" || this.type === "CH₄" || this.type === "CO₂" || this.type === "HCl"){
        ctx.fillText(this.type, this.atoms[0].circle['pos'].x - 17, this.atoms[0].circle['pos'].y +7);
      }else if(this.type === "H₂SO₄"){
        ctx.fillText(this.type, this.atoms[0].circle['pos'].x - 29, this.atoms[0].circle['pos'].y +7);
      }else if(this.type === "HNO₃"){
        ctx.fillText(this.type, this.atoms[0].circle['pos'].x - 25, this.atoms[0].circle['pos'].y +7);
      }else if(this.type === "H₂O₂"){
        ctx.fillText(this.type, this.atoms[0].circle['pos'].x + 2, this.atoms[0].circle['pos'].y +7);
      }
      ctx.closePath();
	}

}
