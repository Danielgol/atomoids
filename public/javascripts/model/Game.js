
function Game(ctx, scr){

  this.ctx = ctx;
  this.scr = scr;

  this.hasMoleculesAndAtoms = true;
  this.hasShip = true;

  this.ship;
  this.level = 1;
  this.lifes = 3;

  this.shots = [];
  this.aloneAtoms = [];
  this.molecules = [];

  this.IntervalId;
  this.score = new Score(new Date().toISOString());

}
