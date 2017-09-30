
function Molecula(circulo, angulo){

	this.circulo = circulo;

    this.angulo = angulo;

	//MÉTODOS
	this.mover = function(){

		if ((this.angulo < 90 || this.angulo > 270) || (this.angulo > 90 && this.angulo < 270)) {//CIMA BAIXO
            this.circulo['pos'].y -= Math.cos(this.angulo * Math.PI / 180) * 1;
        }
        if ((this.angulo < 360 && this.angulo > 180) || (this.angulo < 180 && this.angulo > 0)) { //DIREITA ESQUERDA
            this.circulo['pos'].x += Math.sin(this.angulo * Math.PI / 180) * 1;
        }
		
	}

	this.destruir = function(){
	}
}

