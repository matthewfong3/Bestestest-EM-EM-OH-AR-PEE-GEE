class Enemy{
  constructor(){
    this.lastUpdate = new Date().getTime();
    
    // position variables
    this.prevX = 0;
    this.prevY = 0;
    this.x = 0;
    this.y = 0;
    this.destX = 0;
    this.destY = 0;
    
    this.alpha = 0.05;
    
    this.direction = 0;
    
    this.radius = 20;
    
    this.target;
  }
}