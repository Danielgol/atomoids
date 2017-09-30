
function drawScreen(ctx, width, height){

		ctx.beginPath();
		ctx.lineWidth = 2;
		ctx.moveTo(0, 0);
		ctx.lineTo(width, 0);
		ctx.lineTo(width, height);
		ctx.lineTo(0 , height);
		ctx.lineTo(0, 0);
		ctx.strokeStyle = "white";
		ctx.stroke();
		ctx.closePath();

}

function drawScore(ctx, score, x, y){

  ctx.beginPath();
  ctx.fillStyle = "white";
  ctx.font = "15px Hyper";
  ctx.fillText("Score: "+score, x, y);
  ctx.closePath();

}

function drawLevel(ctx, level){

	ctx.beginPath();
	ctx.fillStyle = "white";
	ctx.fillText("lvl: " + level, 10, 590);
	ctx.closePath();

}

function drawLifes(ctx, lifes){

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

function cleanScreen(ctx, width, height){

		ctx.clearRect(1, 1, width - 2, height - 2);

}
