
function Shot(circle, angle){

	this.circle = circle;
	this.angle = angle;
	this.reach = 15;

	this.move = function(i){
			if ((this.angle < 90 || this.angle > 270) || (this.angle > 90 && this.angle < 270)) {//CIMA BAIXO
	        this.circle['pos'].y -= Math.cos(this.angle * Math.PI / 180) * i;
	    }
	    if ((this.angle < 360 && this.angle > 180) || (this.angle < 180 && this.angle > 0)) { //DIREITA ESQUERDA
	        this.circle['pos'].x += Math.sin(this.angle * Math.PI / 180) * i;
	    }
	}

	this.LoseReach = function(i){
			this.reach -= i;
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

	this.drawShot = function(ctx){
	    ctx.beginPath();
	    ctx.fillStyle = "white";
	    ctx.arc(this.circle['pos'].x, this.circle['pos'].y, this.circle['r'], 0, 2 * Math.PI);
	    ctx.fill();
	    ctx.closePath();
	}

}
