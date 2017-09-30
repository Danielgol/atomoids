

function Tiro(ponto, angulo){

	this.ponto = ponto;

    this.angulo = angulo;

	//MÉTODOS
	this.mover = function(){

		if ((this.angulo < 90 || this.angulo > 270) || (this.angulo > 90 && this.angulo < 270)) {//CIMA BAIXO
            this.ponto['pos'].y -= Math.cos(this.angulo * Math.PI / 180) * 3;
        }
        if ((this.angulo < 360 && this.angulo > 180) || (this.angulo < 180 && this.angulo > 0)) { //DIREITA ESQUERDA
            this.ponto['pos'].x += Math.sin(this.angulo * Math.PI / 180) * 3;
        }
		
	}

	this.destruir = function(){
	}
}

