class Character {
  constructor(hash, image) {
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
    
    this.direction = 0;
    
    this.moveLeft = false;
    this.moveRight = false;
    this.moveUp = false;
    this.moveDown = false;
    
    // if using circle-to-circle collision
    this.radius = 15;
    this.hp = 10;
    this.maxHP = 10;
    
    image = image || {};
    this.object = image;
  }
}
