
function drawShip(ctx, triangle){

		ctx.beginPath();
		ctx.lineWidth = 1;
    ctx.moveTo(triangle['points'][0]['x'], triangle['points'][0]['y']);
    ctx.lineTo(triangle['points'][1]['x'], triangle['points'][1]['y']);
    ctx.lineTo(triangle['points'][2]['x'], triangle['points'][2]['y']);
    ctx.lineTo(triangle['points'][0]['x'], triangle['points'][0]['y']);
    ctx.strokeStyle = "white";
    ctx.stroke();
    ctx.closePath();

}
