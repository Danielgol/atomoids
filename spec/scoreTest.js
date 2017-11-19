function Score(){

  this.id = 0;
  this.score = 0;
  this.playerName = "";

  this.increaseScore = function(i){
      this.score += i;
  }

}



describe("Score Test", function() {

    var score;

    it("test increaseScore", function(){
        score = new Score(1, 0, "Name");

        score.increaseScore(10);

        expect(10).toBe(score.score);
    });

});