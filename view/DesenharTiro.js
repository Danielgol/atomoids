
function desenharTiro(ctx, ponto){

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(ponto['pos'].x, ponto['pos'].y, ponto['r'], 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

    

}