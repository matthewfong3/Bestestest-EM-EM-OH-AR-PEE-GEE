let canvas, ctx, canvas_overlay, ctx_overlay, canvas_back, ctx_back, width, height, animationFrame;

let socket, hash, isHost = false, hosted = {}, roomName;

let bgAudio = undefined, effectAudio = undefined, ambienceAudio = undefined, currentEffect = 0, currentDirection = 1;

let mouse = {x:0,y:0};
let cursor = undefined;
let dragging = false;

let IMAGES = {};
let ANIMATIONS = {};

let bufferTime = 0;
let canFire = true;
let lastTime;

let color;
let canBered;
let canBepurple;
let canBegreen;
let canBeblue;

let colorOptionred;
let colorOptionpurple;
let colorOptionblue;
let colorOptiongreen;

let startButton, selectButton, debugButton, moveButton;

let STATES = {
  wait: 'wait',
  preload: 'preload',
  title: 'title',
  setupGame: 'setupGame',
  game: 'game',
  gameover: 'gameover',
  characterSelect: 'characterSelect',
};
let gameState = STATES.wait;
let paused = false, debug = true;
let gameLocked = false;

let players = {};
let bulletArray = [];
let enemies = [];
let rooms = {};
let coins = 0;
let endGame = 0;

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
  
  if(player.hp > 0){
    // W OR UP
    if(keyPressed === 87 || keyPressed === 38) {
      // move character up
      player.moveUp = true;
      e.preventDefault();
    }
    // A OR LEFT
    else if(keyPressed === 65 || keyPressed === 37) {
      // move character left
      player.moveLeft = true;
      e.preventDefault();
    }
    // S OR DOWN
    else if(keyPressed === 83 || keyPressed === 40) {
      // move character down
      player.moveDown = true;
      e.preventDefault();
    }
    // D OR RIGHT
    else if(keyPressed === 68 || keyPressed === 39) {
      //move character right
      player.moveRight = true;
      e.preventDefault();
    }
  }
    //if the person is dead, make sure that they aren't moving anymore
    else {
      player.moveUp = false;
      player.moveDown = false;
      player.moveLeft = false;
      player.moveRight = false;
    }
};

//handler for key up events
const keyUpHandler = (e) => {
  var keyPressed = e.which;
  const player = players[hash];
  if(player.hp > 0){
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
  }
};

const emptyFunct = () => { };

const doOnMouseMove = (e) => {
  mouse = getMouse(e);
  cursor.x = mouse.x;
  cursor.y = mouse.y;
  
  if(cursor.over !== false && !cursor.isOverButton(cursor.over) ){
    cursor.exitButton();
  }
}
const doOnMouseDown = (e) => {
  if(gameState === STATES.game){
    const player = players[hash];
    if(player.hp > 0){
      if(isHost) fire(e);
      else {
        if(gameState === STATES.game) socket.emit('updateFire', {canFire: canFire, mouse: mouse, bufferTime: bufferTime});
      }
    }
    
    if(menu.open) menu.checkClose();
  }
  
  checkButton();
  setAnim(cursor, 'click', 'once' );
  dragging = true;
}
const doOnMouseUp = (e) => { 
  setAnim(cursor, 'click', 'onceReverse', () =>  setAnim(cursor, 'default', 'default'));
  dragging = false;
}
const doOnMouseOut = (e) => { dragging = false }

const stateHandler = () => {
  ctx_overlay.clearRect(0, 0, canvas_overlay.width, canvas_overlay.height);
  
  switch(gameState){
    case STATES.wait:
      waitLoop();
      break;
    case STATES.preload:
      preloadLoop();
      break;
    case STATES.setupGame:
      startGame();
      break;
    case STATES.title:
      titleLoop();
      break;
    case STATES.characterSelect:
      characterSelectLoop();
      break;
    case STATES.game:
      gameUpdateLoop();
      break;
    case STATES.gameover:
      gameOverLoop();
      break;
  }
  
  if(cursor != undefined){
    playAnim(ctx_overlay ,cursor);
  } 
  
  animationFrame = requestAnimationFrame(stateHandler);
}

const init = () => {
  setupCanvas(); 
  setupSockets();
  
  resetGame();
  
  setupSound();
  
  preloadImages(toLoadImgs, IMAGES);
  preloadImages(toLoadAnims, ANIMATIONS);
  
  animationFrame = requestAnimationFrame(stateHandler);
  
  playBgAudio();
 
  color = undefined;
};

window.onload = init;

const pauseGame = () => {
  paused = true;
  //stop animation loop
  //cancelAnimationFrame(animationFrame);
  
  stopBgAudio();
};

const resumeGame = () => {
  //stop animation loop just in case
  //cancelAnimationFrame(animationFrame);
  
  playBgAudio();
  paused = false;
  
  //call update
  //requestAnimationFrame(stateHandler);
};

const toggleDebug =  () => {
  if(debug){
    debug = false;
    return;
  }
  debug = true;
};

//ONBLUR
window.onblur = function() { 
  pauseGame();
  //console.log('blur');
}
//ONFOCUS
window.onfocus = function() {
  resumeGame();
  //console.log('focus');
};