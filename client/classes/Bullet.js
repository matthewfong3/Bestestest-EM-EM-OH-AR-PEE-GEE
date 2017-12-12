class Bullet {
    constructor(characterpoint, direction, hash) {
    // position variables
    this.prevX = characterpoint.x;
    this.prevY = characterpoint.y;
    this.x = characterpoint.x;
    this.y = characterpoint.y;
    this.destX = characterpoint.x;
    this.destY = characterpoint.y;
    this.alpha = 0.05;
    this.bulletSpeed = 60;
    this.radius = 10;
    this.style = "yellow";
    this.firedfrom = hash;
    //need to work on this
    this.direction = direction;
    }
}