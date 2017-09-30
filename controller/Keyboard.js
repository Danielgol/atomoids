
var keys = [];

document.addEventListener("keydown", function (e) {
	keys[e.keyCode] = true; //alert(e.keyCode);
}, false);
document.addEventListener("keyup", function (e) {
	delete keys[e.keyCode];
}, false);
