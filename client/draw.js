// function that lerps player's movement
const lerp = (v0, v1, alpha) => {
  return (1 - alpha) * v0 + alpha * v1;
};

const redraw = (time) => {
  updatePosition();
  
  animationFrame = requestAnimationFrame(redraw);
};