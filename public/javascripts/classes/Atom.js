
function Atom(circle, angle, color, element){

	this.circle = circle;
	this.angle = angle;
	this.velocity = 1;
	this.color = color;
	this.element = element;

	this.move = function(){
			if ((this.angle < 90 || this.angle > 270) || (this.angle > 90 && this.angle < 270)) {//CIMA BAIXO
	        this.circle['pos'].y -= Math.cos(this.angle * Math.PI / 180) * this.velocity;
	    }
	    if ((this.angle < 360 && this.angle > 180) || (this.angle < 180 && this.angle > 0)) { //DIREITA ESQUERDA
	        this.circle['pos'].x += Math.sin(this.angle * Math.PI / 180) * this.velocity;
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

	this.drawAtom = function(ctx){
	    ctx.beginPath();
			ctx.lineWidth = 1.5;
	    //ctx.fillStyle = this.color;
	    ctx.arc(this.circle['pos'].x, this.circle['pos'].y, this.circle['r'], 0, 2 * Math.PI);
	    //ctx.fill();
			ctx.strokeStyle = "white";
			ctx.stroke();

	    ctx.closePath();

	    ctx.beginPath();
	    ctx.fillStyle = "white";
	    ctx.font = "20px ArialBold";
	    ctx.fillText(this.element, this.circle['pos'].x -7, this.circle['pos'].y +7);
	    ctx.closePath();
	}

}
