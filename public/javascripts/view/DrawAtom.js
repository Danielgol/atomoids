
function drawAtom(ctx, circle, color, element){

    ctx.beginPath();
    //ctx.strokeStyle = color;
    ctx.fillStyle = color;
    ctx.arc(circle['pos'].x, circle['pos'].y, circle['r'], 0, 2 * Math.PI);
    //ctx.stroke();
    ctx.fill();
    ctx.closePath();

    ctx.beginPath();
    ctx.fillStyle = "white";
    ctx.font = "20px Arial Bold";
    ctx.fillText(element, circle['pos'].x -7, circle['pos'].y +7);
    ctx.closePath();

}
