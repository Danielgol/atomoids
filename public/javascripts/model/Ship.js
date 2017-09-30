
function Ship(triangle, centerX, centerY){

	this.triangle = triangle;
	this.x = centerX;
	this.y = centerY;
	this.angle = 0;
	this.resultingAngle = 0;
	this.forceX = 0;
	this.forceY = 0;
	this.energy = 15;

	this.applyForces = function(){
		this.triangle.translate(-this.x, -this.y);
		this.x += this.forceX;
		this.y -= this.forceY;
		this.triangle.translate(this.x, this.y);
	}

	this.slide = function(){
				var delay = 0.001;
				if (this.forceX > 0) {
						if (this.forceX - delay > 0) {
								this.forceX -= delay;
						} else {
								this.forceX = 0;
						}
				} else if (this.forceX < 0) {
						if (this.forceX + delay < 0) {
								this.forceX += delay;
						} else {
								this.forceX = 0;
						}
				}
				if (this.forceY > 0) {
						if (this.forceY - delay > 0) {
								this.forceY -= delay;
						} else {
								this.forceY = 0;
						}
				} else if (this.forceY < 0) {
						if (this.forceY + delay < 0) {
								this.forceY += delay;
						} else {
								this.forceY = 0;
						}
				}
	}

	this.regulateForcesLimit = function(){
		  var maxVelocity = 1.5;
			if (this.forceX > maxVelocity) {
					this.forceX = maxVelocity;
			} else if (this.forceX < (-maxVelocity)) {
					this.forceX = (-maxVelocity);
			}
			if (this.forceY > maxVelocity) {
					this.forceY = maxVelocity;
			} else if (this.forceY < (-maxVelocity)) {
					this.forceY = (-maxVelocity);
			}
	}

	this.move = function(keys){
				if (38 in keys) {
					this.boost();
					this.throwFire();
				}
				if (39 in keys) {
					this.turn(1);
				}
				if (37 in keys) {
					this.turn(-1);
				}
	}

	this.throwFire = function(){

			var losangle = new SAT.Polygon(new SAT.Vector(0, 0),
			[new SAT.Vector(-3, -3), new SAT.Vector(0,-5), new SAT.Vector(3,-3), new SAT.Vector(0,5)]);

			losangle.translate(this.x, this.y);

			losangle.translate(-this.x, -(this.y-13));
			losangle.rotate((Math.PI/180)* this.angle );
			losangle.translate(this.x, this.y);

			ctx.beginPath();
			ctx.lineWidth = 1;
	    ctx.moveTo(losangle['points'][0]['x'], losangle['points'][0]['y']);
	    ctx.lineTo(losangle['points'][1]['x'], losangle['points'][1]['y']);
	    ctx.lineTo(losangle['points'][2]['x'], losangle['points'][2]['y']);
			ctx.lineTo(losangle['points'][3]['x'], losangle['points'][3]['y']);
	    ctx.lineTo(losangle['points'][0]['x'], losangle['points'][0]['y']);
	    ctx.strokeStyle = "white";
	    ctx.stroke();
	    ctx.closePath();

	}

	this.boost = function(){
			this.resultingAngle = this.angle;
			if ((this.angle < 90 || this.angle > 270) || (this.angle > 90 && this.angle < 270)) {//CIMA BAIXO
		           this.forceY += Math.cos(this.angle * Math.PI / 180) * 0.006;
		  }
		  if ((this.angle < 360 && this.angle > 180) || (this.angle < 180 && this.angle > 0)) { //DIREITA ESQUERDA
		           this.forceX += Math.sin(this.angle * Math.PI / 180) * 0.006;
		  }
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
