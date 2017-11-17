// when we receive character updates from the server
const update = (data) => {
  
};

// 
const setUser = (data) => {
  hash = data.character.hash; // set this client's hash to the unique hash the server gives them
  players[data.character.hash] = data.character;
  playerCount += 1;
  
  //if(playerCount == 4)
  //{
  console.log('joined server');
  gameState = STATES.preload // start animating;
  //}
};

const setOtherplayers = (data) => {
  players[data.hash] = data;
  playerCount += 1;
    
  //if(playerCount == 4)
  //{
      //requestAnimationFrame(redraw); // start animating;
  //}
};

//do the shooting and send to server
const shooting = (data) => {
    
};

// update this client's position and send to server
const updatePosition = () => {
    let plr = players[hash];

    plr.prevX = plr.x;
    plr.prevY = plr.y;

    if(up && plr.destY - 20 > 0)
    {
        plr.destY -= 2;
    }
    if(down && plr.destY + 20 < canvas.height)
    {
        plr.destY += 2;
    }
    if(left && plr.destX - 20 > 0)
    {
        plr.destX -= 2;
    }
    if(right && plr.destX + 20 < canvas.width)
    {
        plr.destX += 2;
    }

    plr.alpha = 0.05;
    plr.lastUpdate = new Date().getTime();
};

// move the sphere arround
const movement = () => {

    let keys = Object.keys(players);
    //grab each user
    for(let x =0;x<keys.length;x++)
    {
        let plr = players[keys[x]];

        if(plr.alpha < 1)
        {
            plr.alpha += 0.05;
        }

        plr.x = lerp(plr.prevX,plr.destX,plr.alpha);
        plr.y = lerp(plr.prevY,plr.destY,plr.alpha);
    }
};

const resetGame = () => {
  //game setup
  playerCount = 0;
  players = {};
  bulletArray = [];

  up = false;
  left = false;
  right = false;
  down = false;
};

//--GAME LOOPS---------------------region
const waitLoop = () => {
  drawWait();
  console.log('waiting for connection to server...');
} //wait until client joined the server

const preloadLoop = () => {
  //check if images are loaded then go to startup
  if(loadQueue == numLoaded){
    console.log('done loading images');
    assignStartupEvents();
    gameState = STATES.title;
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
  
  drawPlaceholder();
  
  //check player input
  
  //update game
  updatePosition();
  movement();
  
  //draw game
  drawPlayers();
};

//endregion