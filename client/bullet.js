class bullet {
    constructor(characterpoint, mousepoint) {
    // position variables
    this.prevX = 572;
    this.prevY = 324;
    this.x = 572;
    this.y = 324;
    this.destX = 572;
    this.destY = 324;
    this.alpha = 0.05;
    //need to work on this
    this.direction = characterpoint - mousepoint;
    }
}