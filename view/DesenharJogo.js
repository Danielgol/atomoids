
function desenharLimite(ctx, height, width){

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

function apagarRastro(ctx, height, width){

	ctx.clearRect(1, 1, width - 2, height - 2);

}
