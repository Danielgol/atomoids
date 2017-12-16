
function Score(date){

  this._id = date;
  this.points = 0;

  this.increaseScore = function(i){
      this.points += i;
  }

}
