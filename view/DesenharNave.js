
function desenharNave(ctx, triangulo){

		ctx.beginPath();
    	ctx.moveTo(triangulo['points'][0]['x'], triangulo['points'][0]['y']);// /_ ponta esquerda
    	ctx.lineTo(triangulo['points'][1]['x'], triangulo['points'][1]['y']);// /^\ ponta do meio (não é o centro)
        ctx.lineTo(triangulo['points'][2]['x'], triangulo['points'][2]['y']); // _\ ponta direita
        ctx.lineTo(triangulo['points'][0]['x'], triangulo['points'][0]['y']);//SE TIRAR O STROKE TIRE ISSO
        ctx.strokeStyle = "white";
        ctx.stroke();
        ctx.closePath();
		
}
