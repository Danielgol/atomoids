
var teclas = [];

document.addEventListener("keydown", function (e) {
	teclas[e.keyCode] = true; //alert(e.keyCode);
}, false);
document.addEventListener("keyup", function (e) {
	delete teclas[e.keyCode];
}, false);

function comandosTeclado(nave) {

	if (38 in teclas) {

		nave.triangulo.translate(-nave.x, -nave.y);
		nave.impulsionar();
		nave.triangulo.translate(nave.x, nave.y);
	}
	if (39 in teclas) {

		nave.triangulo.translate(-nave.x, -nave.y);
		nave.x += 1;
		nave.triangulo.translate(nave.x, nave.y);
	}
	if (37 in teclas) {

		nave.triangulo.translate(-nave.x, -nave.y);
		nave.x -= 1;
		nave.triangulo.translate(nave.x, nave.y);
	}
	if (40 in teclas) {

		nave.triangulo.translate(-nave.x, -nave.y);
		nave.y += 1;
		nave.triangulo.translate(nave.x, nave.y);
	}
}
