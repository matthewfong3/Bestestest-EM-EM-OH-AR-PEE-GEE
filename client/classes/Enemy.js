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
    this.hp = 10;
    
    this.target;
    
    this.maxSpeed = 20;
    this.seeking = true;
  }
  
  // methods
  seekTarget(players){
    let keys = Object.keys(players);
    
    let location = {
      x: this.x,
      y: this.y
    };
    
    let shortestDist = getDistance(players[keys[0]], location);
    
    this.target = players[keys[0]];
    
    for(let i = 0; i < keys.length; i++){
      let distance = getDistance(players[keys[i]], location);
      
      if(distance < shortestDist) this.target = players[keys[i]];
    }
    
    let desired = {
      x: this.target.x - this.x,
      y: this.target.y - this.y
    };
    
    let mag = Math.sqrt((desired.x * desired.x) + (desired.y * desired.y));
    
    let normDesired = {
      x: desired.x / mag,
      y: desired.y / mag
    };
    
    this.destX = this.x + (normDesired.x * this.maxSpeed);
    this.destY = this.y + (normDesired.y * this.maxSpeed);
    this.prevX = this.x;
    this.prevY = this.y;
    this.x = lerp(this.prevX, this.destX, this.alpha);
    this.y = lerp(this.prevY, this.destY, this.alpha);
  }
  
  seperate(enemies){
    let sepDistance = 50;
    
    let location = {
      x: this.x,
      y: this.y
    };
    
    let sum = {x: 0, y: 0};
    let count = 0;
    
    const maxSpeed = 20;
    
    for(let i = 0; i < enemies.length; i++){
      let enemyLoc = {
        x: enemies[i].x,
        y: enemies[i].y
      }
      
      let distance = getDistance(location, enemyLoc);
      
      // enemies within safe radius (too close!)
      if((distance > 0) && (distance < sepDistance)){
        let sepVector = {
          x: enemies[i].x - location.x,
          y: enemies[i].y - location.y
        };
        
        let mag = Math.sqrt((sepVector.x * sepVector.x) + (sepVector.y * sepVector.y));
        
        let normSepVector = {
          x: sepVector.x / mag,
          y: sepVector.y / mag
        }
        
        sum.x += normSepVector.x;
        sum.y += normSepVector.y;
        count++;
        this.seeking = false;
      } else {
        this.seeking = true;
      }
    }
    
    if(count > 0){
      sum.x /= count;
      sum.y /= count;
      
      this.destX = this.x + (sum.x);
      this.destY = this.y + (sum.y);
      this.prevX = this.x;
      this.prevY = this.y;
      this.x = lerp(this.prevX, this.destX, this.alpha);
      this.y = lerp(this.prevY, this.destY, this.alpha);
    } 
  }
}