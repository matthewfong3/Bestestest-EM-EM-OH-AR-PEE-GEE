let canvas;
let ctx;

let socket; 
let hash; 
let animationFrame;

let mouseX;
let mouseY;

let players;

let playerCount;

let bulletArray;

let up;
let down;
let right;
let left;

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

const init = () => {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext('2d');
  
  socket = io.connect();
    
  playerCount = 0;
    
  players = {};
    
  bulletArray = [];

  up = false;
  left = false;
  right = false;
  down = false;
  
  document.body.addEventListener('keydown', keyDownHandler);
  document.body.addEventListener('keyup', keyUpHandler);
  

  //find the mouse position
  canvas.addEventListener('mousemove',(evt)=>{
  let object = getmousemove(canvas,evt);
  mouseX = object.x;
  mouseY = object.y;
  });

  //if this user joins
  socket.on("joined",(data) => {
     setUser(data);
  });

  //if other players join
  socket.on("otherConnects",(data) => {
     setOtherplayers(data); 
  });
    
};

window.onload = init;