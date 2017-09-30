
function drawAtom(ctx, circle){

    ctx.beginPath();
    ctx.strokeStyle = "white";
    ctx.arc(circle['pos'].x, circle['pos'].y, circle['r'], 0, 2 * Math.PI);
    ctx.stroke();
    ctx.closePath();

}
