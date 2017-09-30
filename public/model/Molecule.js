
function Molecule(circle, angle){

	this.circle = circle;
  this.angle = angle;
	//(RESTO)

	this.move = function(){

			if ((this.angle < 90 || this.angle > 270) || (this.angle > 90 && this.angle < 270)) {//CIMA BAIXO
	        this.circle['pos'].y -= Math.cos(this.angle * Math.PI / 180) * 1;
	    }
	    if ((this.angle < 360 && this.angle > 180) || (this.angle < 180 && this.angle > 0)) { //DIREITA ESQUERDA
	        this.circle['pos'].x += Math.sin(this.angle * Math.PI / 180) * 1;
	    }
	}

	this.obeyLimit = function(width, height){

			if(this.circle['pos'].x > width){
					this.circle['pos'].x = 0;
			}else if(this.circle['pos'].x < 0){
					this.circle['pos'].x = width;
			}else if(this.circle['pos'].y > height){
					this.circle['pos'].y = 0;
			}else if(this.circle['pos'].y < 0){
					this.circle['pos'].y = height;
			}
	}

}
