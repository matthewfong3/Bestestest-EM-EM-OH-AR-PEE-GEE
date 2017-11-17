let canvas, ctx, canvas_overlay, ctx_overlay, canvas_back, ctx_back, width, height, animationFrame;

let socket, hash, isHost = false, hosted = {}, roomName;

let bgAudio = undefined, effectAudio = undefined, currentEffect = 0, currentDirection = 1;

let mouse = {x:0,y:0};
let IMAGES = {};

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
let playerCount = 0;
let bulletArray = [];

let up = false;
let down = false;
let right = false;
let left = false;

//handle for key down events
const keyDownHandler = (e) => {
  var keyPressed = e.which;

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    // move character up
    up = true;
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    // move character left
    left = true;
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    // move character down
    down = true;
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    //move character right
    right = true;
  }
  
  e.preventDefault();
};

//handler for key up events
const keyUpHandler = (e) => {
  var keyPressed = e.which;

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    // stop character from moving up
    up = false;
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    // stop character from moving left
    left = false;
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    // stop character from moving down
    down = false;
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    // stop character from moving right
    right = false;
  }
};

const doOnMouseMove = (e) => {
  mouse = getMouse(e);
}
const doOnMouseDown = (e) => { }
const doOnMouseUp = (e) => { }
const doOnMouseOut = (e) => { }

const stateHandler = () => {
  if(gameState === STATES.wait){
    waitLoop();
  } 
  else if(gameState === STATES.preload){
    preloadLoop();
  } 
  else if(gameState === STATES.setupGame){
    setupGame();
  } 
  else if(gameState === STATES.title){
    titleLoop();
  } 
  else if(gameState === STATES.game){
    gameUpdateLoop();
  } 
  else if(gameState === STATES.gameover){
    gameOverLoop();
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