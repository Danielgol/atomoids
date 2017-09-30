
function drawShot(ctx, circle){

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.arc(circle['pos'].x, circle['pos'].y, circle['r'], 0, 2 * Math.PI);
    ctx.fill();
    ctx.closePath();

}
