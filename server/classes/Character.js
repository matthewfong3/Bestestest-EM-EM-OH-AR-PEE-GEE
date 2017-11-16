class Character {
  constructor(hash) {
    this.hash = hash;
    this.lastUpdate = new Date().getTime();

    // position variables
    this.prevX = 572;
    this.prevY = 324;
    this.x = 572;
    this.y = 324;
    this.destX = 572;
    this.destY = 324;
    this.alpha = 0.05;
    this.fillstyle = "black";
    // if using circle-to-circle collision
    this.radius = 20;
  }
}

module.exports = Character;
