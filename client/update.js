//-- init & spawn enemies --region
const initEnemies = (numEnemies) => {  
  for(let i = 0; i < numEnemies; i++){
    enemies.push(new Enemy());
  }
};

const spawnEnemies = () => {
    //average all player locations
    let xtotal = 0;
    let ytotal = 0;
    let keys = Object.keys(players);
    let avgPos;
  
  //if it is the start of game
  if(keys.length == 0)
  {
    xtotal = canvas.width/2;
    ytotal = canvas.height/2;
    avgPos = {x:xtotal,y:ytotal};
  }

  //else count for avg
  else
  {
      for(let j =0; j < keys.length; j++){
         let player = players[keys[j]];  
         xtotal += player.x;
         ytotal += player.y;
    }
      avgPos = {x:xtotal/keys.length,y:ytotal/keys.length};
  }
    
  for(let i = 0; i < enemies.length; i++){
    let enemiesplaced = false;
      
    while (enemiesplaced == false) {
    //previous was {20, canvas.width - 20}
    let x = getRandomRange(77.5, 1071.5);
    let y = getRandomRange(66.5, 578.5);
    
    let testposition = {x,y};
        
    let distance = getDistance(avgPos,testposition);
        
      if(distance >= 200)
      {
          enemies[i].prevX = x;
          enemies[i].prevY = y;
          enemies[i].x = x;
          enemies[i].y = y;
          enemies[i].destX = x;
          enemies[i].destY = y;
          enemiesplaced = true;
      }
    }
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
    let keys = Object.keys(data.players);
    for(let i = 0; i < keys.length; i++){
      if(players[data.players[keys[i]].hash]){
        // if players[hash] exist only update the position variables
        players[data.players[keys[i]].hash].destX = data.players[keys[i]].destX;
        players[data.players[keys[i]].hash].destY = data.players[keys[i]].destY;
        players[data.players[keys[i]].hash].prevX = data.players[keys[i]].prevX;
        players[data.players[keys[i]].hash].prevY = data.players[keys[i]].prevY;
        players[data.players[keys[i]].hash].x = data.players[keys[i]].x;
        players[data.players[keys[i]].hash].y = data.players[keys[i]].y;
        players[data.players[keys[i]].hash].alpha = data.players[keys[i]].alpha; 
      } else {
        // if does not exist, create it
        players[data.players[keys[i]].hash] = data.players[keys[i]];
      }
    }
  }
};

//-- set users on connect --region
const setUser = (data) => {
  hash = data.hash; // set this client's hash to the unique hash the server gives them
  if(color == "blue")
  {
    players[hash] = new Character(hash, IMAGES.player_blue);
  }
  if(color == "red")
  {
    players[hash] = new Character(hash, IMAGES.player_red);
  }
  if(color == "green")
  {
    players[hash] = new Character(hash, IMAGES.player_green);
  }
  if(color == "purple")
  {
    players[hash] = new Character(hash, IMAGES.player_purple);
  }
  console.log(data.id);
  console.log('joined server');
  //gameState = STATES.preload // start animating;
};

const setOtherplayers = (data) => {
  if(data.hash === hash)
    return;
  console.log('another user joined');
  if(data.color == "green")
  {
    players[data.hash] = new Character(data.hash, IMAGES.player_green);
  }
  else if(data.color == "blue")
  {
    players[data.hash] = new Character(data.hash, IMAGES.player_blue);
  }
  else if(data.color == "red")
  {
    players[data.hash] = new Character(data.hash, IMAGES.player_red);
  }
  if(data.color == "purple")
  {
    players[data.hash] = new Character(data.hash, IMAGES.player_purple);
  }
  
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
      
    
    //socket.emit("updatePos", {player: plr});
  }   
  socket.emit("updatePos", {players: players});
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
  
  //play audio
  playBgAudio();
  
  setupDungeonAssets();
  
  //go to game loop
  gameState = STATES.game;
}; //setup and start the game

const doOnPreloadDone = () => {
  console.log('done loading images');
  startButton = new button(canvas.width/2-100,canvas.height * .75);
  selectButton = new button(canvas.width/2-100,canvas.height * .75);
  
  debugButton = new button(10,10, {width: 70, height: 35, text: '[debug]'});
  debugButton.callback = menu.toggle;
  
  moveButton = new button(90,10, {width: 50, height: 35, text: 'move'});
  moveButton.callback = function(){
    setChangeRoomMenu();
    menu.toggle();
  };
  
  gameState = STATES.title;
  assignStartupEvents();
  
  setupCursor();
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
  
  if( cursor.isOverButton(startButton) ) cursor.enterButton(startButton);
};

const gameOverLoop = () => {
  drawGameOver();
  
  console.log('game over');
};

const characterSelectLoop = () => {
  drawCharacterselect();
  
  if( cursor.isOverButton(selectButton) ) cursor.enterButton(selectButton);
  
  //console.log('select a character');
};
let endGame = 0;
const gameUpdateLoop = () => {
  ctx.clearRect(0,0,canvas.width,canvas.height);
  ctx_overlay.clearRect(0,0,canvas_overlay.width,canvas_overlay.height);
  
  //drawPlaceholder();
  
  // non-host clients send key updates to server
  if(players[hash]){
  
    let input = {
      moveUp: players[hash].moveUp,
      moveLeft: players[hash].moveLeft,
      moveDown: players[hash].moveDown,
      moveRight: players[hash].moveRight
    };
    
    if(!isHost && gameState === STATES.game) socket.emit('updateKeys', {hash: hash, input: input});
  }
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
    
    // check collisions b/w bullets and enemies
    checkCollisions(bulletArray, enemies);
    
    // check collisions b/w characters (players) and enemies
    checkCollisionsPlayersVEnemies(players, enemies);
      
    //see if we need to restart 
    restart();
    
    // if in last room, make call to RPC
    if(ROOMS.current === room_10){
      if(endGame === 0){
        rpcCall();
        socket.emit('rpcCall', {});
        endGame = 1;
      }
    }
  }
  
  // move particles
  if(particles.length > 0){
    console.log(particles.length);
    moveParticles();
  }
  
  ROOMS.current.drawRoom();
  
  // draw enemies
  drawEnemies();
  // draw players
  drawPlayers();
  // draw bullets
  drawBullets();
  
  // draw particles
  drawParticles();
    
  //draw Health
  drawHealthbar();
  
  drawButton(debugButton, debugButton.text, '#ffc7c7');
  drawButton(moveButton, moveButton.text, '#ffc7c7');
  
  if( cursor.isOverButton(debugButton) ) cursor.enterButton(debugButton);
  if( cursor.isOverButton(moveButton) ) cursor.enterButton(moveButton);
  
  checkMenu();
  drawMenu();

  let keys = Object.keys(players);
  for(let i = 0; i < keys.length; i++)
  {
      let player = players[keys[i]];
      console.log( i + ": has killed " + player.enemiesKilled);
  }  
};

//function to revive all if everyone is dead
const restart = () => {
    let keys = Object.keys(players);
    let count = keys.length;
    let playersdead = 0;
    for(let i =0; i < keys.length;i++)
    {
        let player = players[keys[i]];
        if(player.hp == 0)
        {
            playersdead += 1;
        }
    }
    if(count == playersdead)
    {
        //get rid of enemies
        //revive everyone
        reviveAll("restart");
        emptyEnemiesandBullets();
        initEnemies(ROOMS.current.enemiesCount);
        PositionReset();
        spawnEnemies();
    }
};


//endregion