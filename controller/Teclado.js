
var teclas = [];

document.addEventListener("keydown", function (e) {
	teclas[e.keyCode] = true;
	//alert(e.keyCode);
}, false);
document.addEventListener("keyup", function (e) {
	delete teclas[e.keyCode];
}, false);

function comandosTeclado(nave) {

	if (38 in teclas) {

		nave.impulsionar();

	}
	if (39 in teclas) {//direita

		//nave.virar(-1 ou +1);
		nave.x1 +=0.5;
		nave.x2 +=0.5;
		nave.x3 +=0.5;
		nave.x4 +=0.5;
		nave.x5 +=0.5;
		nave.x6 +=0.5;
	}
	if (37 in teclas) {//esquerda

		//nave.virar(+1 ou -1);
		nave.x1 -=0.5;
		nave.x2 -=0.5;
		nave.x3 -=0.5;
		nave.x4 -=0.5;
		nave.x5 -=0.5;
		nave.x6 -=0.5;
	}
	if (40 in teclas) {
		nave.y1 += 0.5;
		nave.y2 += 0.5;
		nave.y3 += 0.5;
		nave.y4 += 0.5;
		nave.y5 += 0.5;
		nave.y6 += 0.5;
	}
	if (90 in teclas){
		//nave.atirar();
	}
}
