class Character {
  constructor(hash) {
    this.hash = hash;
    this.lastUpdate = new Date().getTime();

    // position variables
    this.prevX = 0;
    this.prevY = 0;
    this.x = 0;
    this.y = 0;
    this.destX = 0;
    this.destY = 0;

    // if using circle-to-circle collision
    this.radius = 0;
  }
}

module.exports = Character;
