
function drawAtom(ctx, circle, color){

    ctx.beginPath();
    //ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.arc(circle['pos'].x, circle['pos'].y, circle['r'], 0, 2 * Math.PI);
    //ctx.stroke();
    ctx.fill();
    ctx.closePath();

}
