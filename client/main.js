let canvas, ctx, canvas_overlay, ctx_overlay, canvas_back, ctx_back, width, height, animationFrame;

let socket, hash, isHost = false, hosted = {}, roomName;

let bgAudio = undefined, effectAudio = undefined, currentEffect = 0, currentDirection = 1;

let mouse = {x:0,y:0};
let IMAGES = {};

let bufferTime = 0;
let canFire = true;
let lastTime;

let STATES = {
  wait: 'wait',
  preload: 'preload',
  title: 'title',
  setupGame: 'setupGame',
  game: 'game',
  gameover: 'gameover',
};
let gameState = STATES.wait;

let players = {};
let bulletArray = [];
let enemies = [];

const directions = {
  DOWNLEFT: 0,
  DOWN: 1,
  DOWNRIGHT: 2, 
  LEFT: 3,
  UPLEFT: 4,
  RIGHT: 5, 
  UPRIGHT: 6,
  UP: 7
};

//handle for key down events
const keyDownHandler = (e) => {
  var keyPressed = e.which;
  const player = players[hash];

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    // move character up
    player.moveUp = true;
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    // move character left
    player.moveLeft = true;
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    // move character down
    player.moveDown = true;
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    //move character right
    player.moveRight = true;
  }
  
  e.preventDefault();
};

//handler for key up events
const keyUpHandler = (e) => {
  var keyPressed = e.which;
  const player = players[hash];

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    // stop character from moving up
    player.moveUp = false;
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    // stop character from moving left
    player.moveLeft = false;
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    // stop character from moving down
    player.moveDown = false;
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    // stop character from moving right
    player.moveRight = false;
  }
};

const doOnMouseMove = (e) => {
  mouse = getMouse(e);
}
const doOnMouseDown = (e) => { 
  fire(e);
}
const doOnMouseUp = (e) => { }
const doOnMouseOut = (e) => { }

const stateHandler = () => {
  switch(gameState){
    case STATES.wait:
      waitLoop();
      break;
    case STATES.preload:
      preloadLoop();
      break;
    case STATES.setupGame:
      setupGame();
      break;
    case STATES.title:
      titleLoop();
      break;
    case STATES.game:
      gameUpdateLoop();
      break;
    case STATES.gameover:
      gameOverLoop();
      break;
  }
  
  animationFrame = requestAnimationFrame(stateHandler);
}

const init = () => {
  setupCanvas(); 
  setupSockets();
  
  resetGame();
  
  setupSound();
  
  preloadImages(toLoadImgs, IMAGES);
  animationFrame = requestAnimationFrame(stateHandler);
};

window.onload = init;