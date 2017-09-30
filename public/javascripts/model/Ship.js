
function Ship(triangle, centerX, centerY){

	this.triangle = triangle;
	this.angle = 0;
	this.x = centerX;
	this.y = centerY;
	this.energy = 15;

	this.move = function(keys){
				if (38 in keys) {
					this.boost();
				}
				if (39 in keys) {
					this.turn(1);
				}
				if (37 in keys) {
					this.turn(-1);
				}
	}

	this.boost = function(){
			this.triangle.translate(-this.x, -this.y);
			if ((this.angle < 90 || this.angle > 270) || (this.angle > 90 && this.angle < 270)) {//CIMA BAIXO
		           this.y -= Math.cos(this.angle * Math.PI / 180) * 1;
		  }
		  if ((this.angle < 360 && this.angle > 180) || (this.angle < 180 && this.angle > 0)) { //DIREITA ESQUERDA
		           this.x += Math.sin(this.angle * Math.PI / 180) * 1;
		  }
			this.triangle.translate(this.x, this.y);
	}

	this.turn = function(i){
			this.angle += i;

			if(this.angle === 360){
	        this.angle = 0;
	    }else if(this.angle === -1){
	        this.angle = 359;
	    }//PENSAR EM CRIAR UM MÉTODO PRA ISSO (SE É MAIS CORRETO)

			this.triangle.translate(-this.x, -this.y);
			this.triangle.rotate((Math.PI/180)* i );
			this.triangle.translate(this.x, this.y);
	}

	this.shoot = function(shots, keys){
			if(this.energy >= 15){
				if(17 in keys){
					var circle = new SAT.Circle(new SAT.Vector(this.x , this.y), 2);
					var shot = new Shot(circle, this.angle);
					shots.push(shot);
					this.energy -= 15;
				}
			}else{
				this.energy += 0.5;
			}
			return shots;
	}

	this.obeyLimit = function(width, height){
			if(this.x > width){
						this.triangle.translate(-this.x, -this.y);
						this.x = 0;
						this.triangle.translate(this.x, this.y);
			}else if(this.x < 0){
						this.triangle.translate(-this.x, -this.y);
						this.x = width;
						this.triangle.translate(this.x, this.y);
			}else if(this.y > height){
						this.triangle.translate(-this.x, -this.y);
						this.y = 0;
						this.triangle.translate(this.x, this.y);
			}else if(this.y < 0){
						this.triangle.translate(-this.x, -this.y);
						this.y = height;
						this.triangle.translate(this.x, this.y);
			}
	}

	this.respawn = function(centerX, centerY){
			// PENSAR EM COMO ZERAR O ANGULO
			this.triangle.translate(-this.x, -this.y);
			this.x = centerX;
			this.y = centerY;
			this.triangle.translate(this.x, this.y);
	}

}
