
function Nave(triangulo, width, height){

	this.triangulo = triangulo;

	this.angulo = 0;

	this.x = width/2;
	this.y = height/2;

	//MÉTODOS
	this.impulsionar = function(){

		if ((this.angulo < 90 || this.angulo > 270) || (this.angulo > 90 && this.angulo < 270)) {//CIMA BAIXO
            this.y -= Math.cos(this.angulo * Math.PI / 180) * 1;
        }
        if ((this.angulo < 360 && this.angulo > 180) || (this.angulo < 180 && this.angulo > 0)) { //DIREITA ESQUERDA
            this.x += Math.sin(this.angulo * Math.PI / 180) * 1;
        }
		
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
