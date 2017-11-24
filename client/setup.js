//--initial game setup-------------------region
const setupCanvas = () => {
  canvas = document.querySelector('#canvas_main');
  ctx = canvas.getContext('2d');
  canvas_overlay = document.querySelector('#canvas_overlay');
  ctx_overlay = canvas_overlay.getContext('2d');
  canvas_back = document.querySelector('#canvas_back');
  ctx_back = canvas_back.getContext('2d');
  
  width = canvas.width;
  height = canvas.height;
};

const playersProps = {};
const setupSockets = () => {
  socket = io.connect();
  
  socket.emit('join', {});
  
  // only runs if it's this user is the first to join a room
  socket.on('setHost', () => {
    isHost = true;
  });
  
  // once this user successfully joins
  socket.on("joined",(data) => {
     setUser(data);
  });

  //if other players join
  socket.on("otherConnects",(data) => {
     setOtherplayers(data); 
  });
  
  // should only run on host client
  socket.on('updatedKeys', update);
  
  socket.on('updatedFire', (data) => {
    playersProps[data.hash] = data;
    //console.log(playersProps[data.hash]);
  });
  
  // should only run on clients that are not the host
  socket.on('updatedPos', update);
  
  socket.on('updatedFireProps', (data) => {
    canFire = data.canFire;
    //console.log('receveied: ' + canFire);
  });
  
  socket.on('updatedBullets', (data) => {
    bulletArray = data.bulletArray;
  });
  
  socket.on('spawnedEnemies', (data) => {
    //console.log('received');
    enemies = data.enemies;
  });
  
  socket.on('updatedEnemies', (data) => {
    enemies = data.enemies;
  });
};

const setupGame = () => {
  //assign game key/mouse events
  setupEvents();
  
  console.log('starting up game');
  
  //game setup
  //TODO setup game stuff
  
  //play audio
  playBgAudio();
  
  //go to game loop
  gameState = STATES.game;
} //setup and start the game

//endregion

//--events-------------------------region
const setupEvents = () => {
  document.onkeydown = keyDownHandler;
  document.onkeyup = keyUpHandler;
  
  //find the mouse position
  canvas_overlay.onmousemove = doOnMouseMove;
  canvas_overlay.onmousedown = doOnMouseDown;
  //console.log('assigned startup game keys');
}; //events for gameplay

const assignStartupEvents = () => {
  if(gameState === STATES.title){
    document.onkeyup = () => {
      removeStartupEvents();
      gameState = STATES.setupGame;
      console.log('setting up game')
    }
    canvas_overlay.onmousedown = () => {
      removeStartupEvents();
      gameState = STATES.setupGame; 
      console.log('setting up game')
    }
  }
  //console.log('assigned pregame keys');
} //event to start game
const removeStartupEvents = () => {
  //console.log('removed pregame keys');
  if(gameState === STATES.title){
    document.onkeyup = undefined;
    canvas_overlay.onmousedown = undefined;
  }
} //remove those events
//endregion