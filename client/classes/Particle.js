class Particle {
  constructor(x, y, color) {
    this.prevX = x;
    this.prevY = y;
    this.x = x;
    this.y = y;
    this.destX = x;
    this.destY = y;
    this.alpha = 0.05;
    this.radius = 10;
    this.fillStyle = color;
  }
};