
function Atom(circle, angle){

	this.circle = circle;
	this.angle = angle;
	this.velocity = 1;//Math.floor((Math.random() * 1) + 1);

	this.move = function(angle, velocity){
			if ((angle < 90 || angle > 270) || (angle > 90 && angle < 270)) {//CIMA BAIXO
	        this.circle['pos'].y -= Math.cos(angle * Math.PI / 180) * velocity;
	    }
	    if ((angle < 360 && angle > 180) || (angle < 180 && angle > 0)) { //DIREITA ESQUERDA
	        this.circle['pos'].x += Math.sin(angle * Math.PI / 180) * velocity;
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
