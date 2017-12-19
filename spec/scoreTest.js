function Score(date){

  this._id = date;
  this.points = 0;

  this.increaseScore = function(i){
      this.points += i;
  }

}



describe("Score Test", function() {

    var score;

    it("test increaseScore", function(){
        score = new Score(1, 0);

        score.increaseScore(10);

        expect(10).toBe(score.points);
    });

});