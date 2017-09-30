
function desenharNave(ctx, nave){
		ctx.beginPath();
		ctx.moveTo(nave.x1, nave.y1);
		ctx.lineTo(nave.x3, nave.y3);
		ctx.lineTo(nave.x4, nave.y4);
		ctx.lineTo(nave.x5, nave.y5);
		ctx.lineTo(nave.x1, nave.y1);
		ctx.fillStyle = "white";
		ctx.fill();
		ctx.closePath();
}
