
function desenharMolecula(ctx, circulo){

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(circulo['pos'].x, circulo['pos'].y, circulo['r'], 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

}