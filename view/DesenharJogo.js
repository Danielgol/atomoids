
function desenharLimite(ctx, height, width){

	ctx.beginPath();
	ctx.moveTo(250, 20);
	ctx.lineTo(250, height - 20);
	ctx.lineTo(width - 250, height - 20);
	ctx.lineTo(width - 250, 20);
	ctx.lineTo(250, 20);
	ctx.strokeStyle = "white";
	ctx.stroke();
	ctx.closePath();

}

function apagarRastro(ctx, height, width){

	ctx.clearRect(251, 21, width - 502, height - 42);
	
}
