
function Nave(triangulo, width, height){

	this.triangulo = triangulo;
	this.angulo = 0;

	this.x = width/2;
	this.y = height/2;

	//MÉTODOS
	this.impulsionar = function(){
		this.y -= 1;
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
