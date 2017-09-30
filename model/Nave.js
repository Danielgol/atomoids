
function Nave(width, height){

	//VARIÁVEIS
	//ponta de cima
	this.x1 = (width / 2);
	this.y1 = (height / 2)-12;

	//ponta do meio esquerdo FALTA
	this.x2 = (width / 2);
	this.y2 = (height / 2);

	//ponta esquerda
	this.x3 = (width / 2)-7;
	this.y3 = (height / 2)+7;

	//ponta meio
	this.x4 = (width / 2);
	this.y4 = (height / 2)+2;

	//ponta direita
	this.x5 = (width / 2)+7;
	this.y5 = (height / 2)+7;

	//ponta do meio direito FALTA
	this.x6 = (width / 2);
	this.y6 = (height / 2)-12;

	this.forcaX = 0;
	this.forcaY = 0;

	this.angulo = 0;
	this.aceleracao = 0.006;

	//MÉTODOS

	this.impulsionar = function(){
		this.y1 -= 0.5;
		this.y2 -= 0.5;
		this.y3 -= 0.5;
		this.y4 -= 0.5;
		this.y5 -= 0.5;
		this.y6 -= 0.5;
	}

	this.retardar = function(){
	}

	this.virar = function(){
	}

	this.destruir = function(){
	}

	this.atirar = function(){
	}
}
