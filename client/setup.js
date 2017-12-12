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
  
  socket.emit('initialJoin', {});
  
  socket.on('initialJoined', (data) => {
    gameState = STATES.preload
    canBered = data.Red;
    canBepurple = data.Purple;
    canBegreen = data.Green;
    canBeblue = data.Blue;

    colorOptionred = new colorOption(canvas.width * .1, 150,150,300,"Red",canBered);
    colorOptionpurple = new colorOption(canvas.width * .32, 150,150,300,"Purple",canBepurple);
    colorOptiongreen = new colorOption(canvas.width * .54, 150,150,300, "Green", canBegreen);
    colorOptionblue = new colorOption(canvas.width * .75, 150,150,300, "Blue", canBeblue);
    
    colorOptionblue.available = true;
    colorOptionred.available = true;
    colorOptiongreen.available = true;
    colorOptionpurple.available = true;
  
  
  });
  
  // only runs if it's this user is the first to join a room
  socket.on('setHost', () => {
    isHost = true;
    console.log('I am the host');
    initEnemies(0);
    spawnEnemies();
  });
  
  // once this user successfully joins
  socket.on("joined",(data) => {
    setUser(data);
    socket.emit('getRoomData', {});
  });

  //if other players join
  socket.on("otherConnects",(data) => {
     setOtherplayers(data); 
  });
  
  // should only run on host client
  socket.on('updatedKeys', update);
  
  socket.on('updatedFire', (data) => {
    playersProps[hash] = data;
    //console.log(playersProps[data.hash]);
  });
  
  // should only run on clients that are not the host
  socket.on('updatedPos', update);
  
  socket.on('updatedFireProps', (data) => {
    if(gameState === STATES.game){
      canFire = data.canFire; 
    }
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
  
  socket.on('updatedRoom', (data) => {
    if(!host){
      setRoom(data.room);
      coins = data.coins;
      console.log(`set room: ${data.room.name}`);
    }
    console.log('got room update');
  });
  
  socket.on('sendRoomData', () => {
    console.log('got send room req');
    if(isHost) socket.emit('updateRoom', { room: ROOMS.current, coins: coins });
  });
  
  socket.on('gainedCoins', (data) => {
    console.log('in gain coin');
    if(isHost){
      coins += data.coinGain;
      //console.log(`coins: ${coins}`);
      socket.emit('updateCoins', {coins: coins});
    }
  });
  
  socket.on('updatedCoins', (data) => {
    coins = data.coins;
    console.log(`coins: ${coins}`);
  });
  
  socket.on('playerCollided', (data) => {
    //console.log('received: player collision detected with enemy');
    playEffect("SlimeShotAtk", false);
    playEffect("OnHit", false);
    players[data.player.hash] = data.player;
  });
  
  socket.on('reconnect', () => {
    console.log('reconnected');
  });
  
  socket.on('deleteDisconnect', (data) => {
    delete players[data.hash];
  });
    
  socket.on('reviveTohost',(data) => {
    console.log("someone is getting revived");
     revive(data.hash,"moving"); 
  });
    
  socket.on('revivedtoSer',(data) => {
      console.log("revived message recieved from host");
      players[data.hash] = data;
  });
    
  socket.on('revivedtoClients', (data) => {
      console.log("revived members being recieved by host");
      players[data.player.hash] = data.player;
  });
    
  socket.on("reviveAllTohost", () => {
     console.log("revive everyone since we are transitioning");
      reviveAll("moving");
  });
  
  socket.on('rpcCalled', rpcCall);
  
  socket.on('playedShootEffect', () => {
    playEffect("Shooting", false);
  });
  
  socket.on('playedMonsterOnHitEffect', () => {
    playEffect("MonsterOnHit", false);
  });
  
  socket.on('playedPop', () => {
    playEffect("Pop", false);
  });
  
  socket.on('playedDeathGrunt', () => {
    playEffect("DeathGrunt", false);
  });
  
  socket.on('playedCoin', () => {
    playerEffect("Coin", false);
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


const setupCursor= () => {
  cursor = new Sprite({sheet: ANIMATIONS.cursor });
  cursor.over = false;
  
  cursor.enterButton = (button) => {
    cursor.over = button;
    if(button.available)
      setAnim(cursor, 'available', 'pingPong' ); 
    else setAnim(cursor, 'unavailable', 'pingPong' ); 
  }

  cursor.exitButton = () => {
    cursor.over = false;
    setAnim(cursor, 'default', 'default' ); 
  }

  cursor.isOverButton = (button) => {
    let isOver = false;
    if(button.radius) {
      isOver = inInCircle(cursor, button);
    } else {
      isOver = isInBounds(cursor, button);
    }
    return isOver;
  }
};

const checkButton = () => {
  if(cursor.over !== false ) {
    cursor.over.callback();
    playEffect("UIButton", false);
  }
}

//endregion

//--events-------------------------region
const setupEvents = () => {
  document.onkeydown = keyDownHandler;
  document.onkeyup = keyUpHandler;
  
  //find the mouse position
  //canvas_overlay.onmousemove = doOnMouseMove;
  //canvas_overlay.onmousedown = doOnMouseDown;
  //console.log('assigned startup game keys');
}; //events for gameplay

const assignStartupEvents = () => {
  if(gameState === STATES.title){
    /*
    document.onkeyup = () => {
      removeStartupEvents();
      gameState = STATES.setupGame;
      console.log('setting up game')
    }
    */
    canvas_overlay.onmousedown = () => {
      let startBool = buttonTap(startButton);
      let shopBool = buttonTap(shopButton);
        
      if(startBool)
      {
        gameState = STATES.characterSelect; 
        assignStartupEvents();
        console.log('setting up game');
      }
        
      if(shopBool)
      {
          gameState = STATES.shop;
          assignStartupEvents();
          console.log("going to shop");
      }
      checkButton();
      setAnim(cursor, 'click', 'once' );
    }
  }
    
  if(gameState === STATES.shop){
    
      canvas_overlay.onmousedown = () => {
          let backBool = buttonTap(backButton);
          
          if(backBool)
            {
                gameState = STATES.title;
                assignStartupEvents();
                console.log("back to title screen")
            }
            checkButton();
            setAnim(cursor, 'click', 'once' );
      }  
  }
    
  if(gameState === STATES.characterSelect){

    canvas_overlay.onmousedown = () => {

      let selectBool = buttonTap(selectButton);
      colorOptiontap();
      if(selectBool && color != undefined)
      {
        removeStartupEvents();
        gameState = STATES.setupGame; 
        console.log('setting up game');
        socket.emit('join', {color});
      }
      checkButton();
      setAnim(cursor, 'click', 'once' );
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