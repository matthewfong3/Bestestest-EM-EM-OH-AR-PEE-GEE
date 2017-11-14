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

//handle for key down events
const keyDownHandler = (e) => {
  var keyPressed = e.which;

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    // move character up
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    // move character left
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    // move character down
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    //move character right
  }
};

//handler for key up events
const keyUpHandler = (e) => {
  var keyPressed = e.which;

  // W OR UP
  if(keyPressed === 87 || keyPressed === 38) {
    // stop character from moving up
  }
  // A OR LEFT
  else if(keyPressed === 65 || keyPressed === 37) {
    // stop character from moving left
  }
  // S OR DOWN
  else if(keyPressed === 83 || keyPressed === 40) {
    // stop character from moving down
  }
  // D OR RIGHT
  else if(keyPressed === 68 || keyPressed === 39) {
    // stop character from moving right
  }
};

const init = () => {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext('2d');
  
  socket = io.connect();
    
  playerCount = 0;
    
  players = {};
    
  bulletArray = [];
  
  document.body.addEventListener('keydown', keyDownHandler);
  document.body.addEventListener('keyup', keyUpHandler);

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