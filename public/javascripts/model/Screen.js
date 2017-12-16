
function Screen(width, height){

	this.width = width;
	this.height = height;

  this.drawScreen = function(ctx){
  	ctx.beginPath();
  	ctx.lineWidth = 2;
  	ctx.moveTo(0, 0);
  	ctx.lineTo(this.width, 0);
  	ctx.lineTo(this.width, this.height);
  	ctx.lineTo(0 , this.height);
  	ctx.lineTo(0, 0);
  	ctx.strokeStyle = "white";
  	ctx.stroke();
  	ctx.closePath();
  }

  this.drawScore = function(ctx, score, x, y){
    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "15px Hyper";
    ctx.fillText("Score: "+score, x, y);
    ctx.closePath();
  }

  this.drawLevel = function(ctx, level){
  	ctx.beginPath();
  	ctx.fillStyle = "white";
  	ctx.fillText("lvl: " + level, 10, 590);
  	ctx.closePath();
  }

  this.drawLifes = function(ctx, lifes){
  	var space = 20;
  	for(l = 0; l<lifes; l++){
  			ctx.beginPath();
  			ctx.lineWidth = 1;
  	    ctx.moveTo(space, 10);
  	    ctx.lineTo(space+5, 20);
  	    ctx.lineTo(space-5, 20);
  	    ctx.lineTo(space, 10);
  	    ctx.strokeStyle = "white";
  	    ctx.stroke();
  	    ctx.closePath();
  			space+=15;
  	}
  }

  this.cleanScreen = function(ctx){
  	ctx.clearRect(1, 1, this.width - 2, this.height - 2);
  }
}
