//-- init & spawn enemies --region
const initEnemies = (numEnemies) => {
  for(let i = 0; i < numEnemies; i++){
    enemies.push(new Enemy());
  }
};

const spawnEnemies = () => {
  for(let i = 0; i < enemies.length; i++){
    let x = getRandomRange(20, canvas.width - 20);
    let y = getRandomRange(20, canvas.height - 20);
    
    enemies[i].prevX = x;
    enemies[i].prevY = y;
    enemies[i].x = x;
    enemies[i].y = y;
    enemies[i].destX = x;
    enemies[i].destY = y;
  }
};
//endregion

// when we receive character updates from the server
const update = (data) => {
  if(isHost){
    console.log('keys updated');
    players[data.hash].moveUp = data.input.moveUp;
    players[data.hash].moveLeft = data.input.moveLeft;
    players[data.hash].moveDown = data.input.moveDown;
    players[data.hash].moveRight = data.input.moveRight;
  } else{
    console.log('updatedPos');
    players[data.player.hash] = data.player;
  }
};

//-- set users on connect --region
const setUser = (data) => {
  hash = data.hash; // set this client's hash to the unique hash the server gives them
  players[hash] = new Character(hash);
  
  console.log('joined server');
  gameState = STATES.preload // start animating;
};

const setOtherplayers = (data) => {
  if(data.hash === hash)
    return;
  console.log('another user joined');
  players[data.hash] = new Character(data.hash);
  
  if(isHost) socket.emit('spawnEnemies', {id: data.id, enemies: enemies});
};
//endregion

//do the shooting and send to server
const shooting = (data) => {
    
};

// update this client's position and send to server
const updatePosition = () => {
  let keys = Object.keys(players);
  
  for(let i = 0; i < keys.length; i++){
    let plr = players[keys[i]];
    
    plr.prevX = plr.x;
    plr.prevY = plr.y;
  
    if(plr.moveUp && plr.destY - 20 > 0)
    {
        plr.destY -= 2;
    }
    if(plr.moveDown && plr.destY + 20 < canvas.height)
    {
        plr.destY += 2;
    }
    if(plr.moveLeft && plr.destX - 20 > 0)
    {
        plr.destX -= 2;
    }
    if(plr.moveRight && plr.destX + 20 < canvas.width)
    {
        plr.destX += 2;
    }
  
    plr.alpha = 0.05;
    plr.lastUpdate = new Date().getTime();
    
    if(plr.alpha < 1)
    {
        plr.alpha += 0.05;
    }

    plr.x = lerp(plr.prevX,plr.destX,plr.alpha);
    plr.y = lerp(plr.prevY,plr.destY,plr.alpha);
    
    socket.emit("updatePos", {player: plr});
  }    
};

const resetGame = () => {
  //game setup
  players = {};
  bulletArray = [];
};

const startGame = () => {
  //assign game key/mouse events
  setupEvents();
  
  console.log('starting up game');
  
  //game setup
  //TODO setup game stuff
  if(isHost){
    initEnemies(2);
    spawnEnemies();
  }
  
  
  //play audio
  playBgAudio();
  
  //go to game loop
  gameState = STATES.game;
}; //setup and start the game

const doOnPreloadDone = () => {
  console.log('done loading images');
  gameState = STATES.title;
  assignStartupEvents();
  
  cursor = new Sprite({sheet: ANIMATIONS.cursor });
  setAnim(cursor, 'default', 'default');
  
  document.onmousemove = doOnMouseMove;
  document.onmousedown = doOnMouseDown;
  document.onmouseup = doOnMouseUp;
  document.onmouseout = doOnMouseOut;
};

const suspendPlayerControls = () => {
  document.onkeydown = undefined;
  document.onkeyup = undefined;
}; 
const restorePlayerControls = () => {
  document.onkeydown = keyDownHandler;
  document.onkeyup = keyUpHandler;
}; 

//--GAME LOOPS---------------------region
const waitLoop = () => {
  drawWait();
  console.log('waiting for connection to server...');
} //wait until client joined the server

const preloadLoop = () => {
  //check if images are loaded then go to startup
  if(loadQueue == numLoaded){
    //console.log('done loading images');
    doOnPreloadDone();
    return;
  }
  
  drawPreload();
  
  console.log('loading game...');
};

const titleLoop = () => {
  drawTitle();
};

const gameOverLoop = () => {
  drawGameOver();
  
  console.log('game over');
};

const gameUpdateLoop = () => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx_overlay.clearRect(0,0,canvas_overlay.width,canvas_overlay.height);
  
  drawPlaceholder();
  
  //update game
  if(isHost){
    // updates players movement
    updatePosition();
    
    for(let i = 0; i < enemies.length; i++){
      enemies[i].seperate(enemies);
      if(enemies[i].seeking) enemies[i].seekTarget(players);
    }
    socket.emit('updateEnemies', {enemies: enemies});
    
    // constantly check if other client's fired a bullet
    // if so, add a new bullet to bulletArray
    otherClientFire();
    // calc other client's fire cooldown
    otherClientFireCD();
 
    //move bullets
    movebullets();
    
    //update lasttime
    lastTime = performance.now();
    
    //bullet firing cooldown
    firecoolDown();
  
    //remove bullet
    OutofBoundbullet();
  }
  
  // draw enemies
  drawEnemies();
  // draw players
  drawPlayers();
  // draw bullets
  drawBullets();
};

//endregion