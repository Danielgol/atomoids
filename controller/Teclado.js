
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
	if (39 in teclas) {//direita

		nave.angulo +=1;

		if(nave.angulo === 360){
            nave.angulo = 0;
        }else if(nave.angulo === -1){
            nave.angulo = 359;
        }

		nave.triangulo.translate(-nave.x, -nave.y);
		nave.triangulo.rotate((Math.PI/180)*1);
		nave.triangulo.translate(nave.x, nave.y);
	}
	if (37 in teclas) {//esquerda

		nave.angulo -=1;

		if(nave.angulo === 360){
            nave.angulo = 0;
    	}else if(nave.angulo === -1){
        	nave.angulo = 359;
        }

		nave.triangulo.translate(-nave.x, -nave.y);
		nave.triangulo.rotate((Math.PI/180)*(-1));
		nave.triangulo.translate(nave.x, nave.y);
	}
}
