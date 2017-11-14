// function that lerps player's movement
const lerp = (v0, v1, alpha) => {
  return (1 - alpha) * v0 + alpha * v1;
};

const redraw = (time) => {
  updatePosition();
  
  //draw things
  let keys = Object.keys(players);
  for(let i =0; i < keys.length; i++)
  {
    let playerdrawn = players[keys[i]];
    ctx.save();
    ctx.fillStyle = playerdrawn.style;
    ctx.arc(playerdrawn.x,playerdrawn.y,playerdrawn.radius,0,Math.PI * 2,false);
    ctx.fill();
    ctx.restore();   
  }
    
    
    
  animationFrame = requestAnimationFrame(redraw);
};