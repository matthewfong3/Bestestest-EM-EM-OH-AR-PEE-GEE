"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function Bullet(characterpoint, direction) {
    _classCallCheck(this, Bullet);

    // position variables
    this.prevX = characterpoint.x;
    this.prevY = characterpoint.y;
    this.x = characterpoint.x;
    this.y = characterpoint.y;
    this.destX = characterpoint.x;
    this.destY = characterpoint.y;
    this.alpha = 0.05;
    this.bulletSpeed = 40;
    this.radius = 10;
    this.style = "yellow";
    //need to work on this
    this.direction = direction;
};
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = function Character(hash) {
  _classCallCheck(this, Character);

  this.hash = hash;
  this.lastUpdate = new Date().getTime();

  // position variables
  this.prevX = 572;
  this.prevY = 324;
  this.x = 572;
  this.y = 324;
  this.destX = 572;
  this.destY = 324;

  this.alpha = 0.05;

  this.direction = 0;

  this.moveLeft = false;
  this.moveRight = false;
  this.moveUp = false;
  this.moveDown = false;

  // if using circle-to-circle collision
  this.radius = 20;
};
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enemy = function Enemy() {
  _classCallCheck(this, Enemy);

  this.lastUpdate = new Date().getTime();

  // position variables
  this.prevX = 0;
  this.prevY = 0;
  this.x = 0;
  this.y = 0;
  this.destX = 0;
  this.destY = 0;

  this.alpha = 0.05;

  this.direction = 0;

  this.radius = 20;

  this.target;
};
'use strict';

var drawPlayers = function drawPlayers(time) {
  //draw things
  var keys = Object.keys(players);
  for (var i = 0; i < keys.length; i++) {
    var playerdrawn = players[keys[i]];
    drawPlayer(playerdrawn);
  }
}; //draw all players in the players list

var drawPlayer = function drawPlayer(playerdrawn) {
  ctx.save();
  ctx.beginPath();

  ctx.fillStyle = playerdrawn.style;
  ctx.arc(playerdrawn.x, playerdrawn.y, playerdrawn.radius, 0, Math.PI * 2, false);

  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

var drawBullets = function drawBullets(time) {
  //draw things
  for (var i = 0; i < bulletArray.length; i++) {
    var bullet = bulletArray[i];
    drawBullet(bullet);
  }
};

var drawBullet = function drawBullet(bulletdrawn) {
  ctx.save();
  ctx.beginPath();

  ctx.fillStyle = bulletdrawn.style;
  ctx.arc(bulletdrawn.x, bulletdrawn.y, bulletdrawn.radius, 0, Math.PI * 2, false);

  ctx.closePath();
  ctx.fill();
  ctx.restore();
};

var drawEnemies = function drawEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    drawEnemy(enemies[i]);
  }
};

var drawEnemy = function drawEnemy(enemy) {
  ctx.save();
  ctx.beginPath();
  ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.restore();
};

//--draw game screens-------------
var drawPlaceholder = function drawPlaceholder() {
  ctx_back.fillStyle = '#626262';
  ctx_back.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '15pt Courier';
  ctx.fillStyle = 'white';
  ctx.fillText('There is nothing here yet', canvas.width / 2, canvas.height / 2);
}; //just a placeholder screen

var drawPreload = function drawPreload() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '15pt Courier';
  ctx.fillStyle = 'white';
  ctx.fillText('Loading App...', canvas.width / 2, canvas.height / 2);
}; //loading images screen

var drawWait = function drawWait() {
  ctx_back.fillStyle = 'black';
  ctx_back.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '15pt Courier';
  ctx.fillStyle = 'white';
  ctx.fillText('waiting for connection ro server...', canvas.width / 2, canvas.height / 2);
}; //waiting for server connction

var drawTitle = function drawTitle() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = '30pt Courier';
  ctx.fillText('Besteststs MMORPG evar', canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = '15pt Courier';
  ctx.fillText('- Click or press any button to play! -', canvas.width / 2, canvas.height / 2 + 40);
  ctx.drawImage(IMAGES.logo.img, canvas.width / 2 - 25, canvas.height / 2 - 100);
}; //app title screen

var drawGameOver = function drawGameOver() {
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = '30pt Courier';
  ctx.fillText('Game Ended', canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = '15pt Courier';
  ctx.fillText('- Click or press any button to play again! -', canvas.width / 2, canvas.height / 2 + 40);
  ctx.drawImage(IMAGES.logo.img, canvas.width / 2 - 25, canvas.height / 2 - 100);
}; //game over screen
'use strict';

var getMouse = function getMouse(e) {
  var offset = canvas_overlay.getBoundingClientRect();
  return {
    x: e.clientX - offset.left,
    y: e.clientY - offset.top
  };
};
// ----- bullet Stuff --------------------------------------------------
var fire = function fire(e) {
  if (canFire) {
    var playerPos = { x: players[hash].x, y: players[hash].y };
    var vector = { x: mouse.x - playerPos.x, y: mouse.y - playerPos.y };
    var mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    var normVec = { x: vector.x / mag, y: vector.y / mag };
    var bullet = new Bullet(playerPos, normVec);
    bulletArray.push(bullet);
    canFire = false;
  }
};

var firecoolDown = function firecoolDown() {

  if (canFire == false) {
    bufferTime += calculateDT();
    if (bufferTime >= 0.5) {
      canFire = true;
      bufferTime = 0;
    }
  }
};

var movebullets = function movebullets() {
  for (var i = 0; i < bulletArray.length; i++) {
    var bullet = bulletArray[i];
    bullet.destX = bullet.x + bullet.bulletSpeed * bullet.direction.x;
    bullet.destY = bullet.y + bullet.bulletSpeed * bullet.direction.y;
    bullet.alpha = 0.05;
    bullet.prevX = bullet.x;
    bullet.prevY = bullet.y;
    bullet.x = lerp(bullet.x, bullet.destX, bullet.alpha);
    bullet.y = lerp(bullet.y, bullet.destY, bullet.alpha);
    //bullet.alpha += 0.05;
  }
};

var OutofBoundbullet = function OutofBoundbullet() {
  for (var i = 0; i < bulletArray.length; i++) {
    var bullet = bulletArray[i];
    if (bullet.x > canvas_overlay.width || bullet.x < 0 || bullet.y > canvas_overlay.height || bullet.y < 0) {
      bulletArray.splice(i, 1);
    }
  }
};

// -----------------------------------------------------------------

var lerp = function lerp(v0, v1, alpha) {
  return (1 - alpha) * v0 + alpha * v1;
};

var calculateDT = function calculateDT() {
  var now, fps;
  now = performance.now();
  fps = 1000 / (now - lastTime);
  fps = clampValue(fps, 12, 60);
  lastTime = now;
  return 1 / fps;
};

var clampValue = function clampValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
};

var getRandomRange = function getRandomRange(min, max) {
  return Math.random() * (max - min) + min;
};

var getDistance = function getDistance(c1, c2) {
  var dx = c2.x - c1.x;
  var dy = c2.y - c1.y;
  return Math.sqrt(dx * dx + dy * dy);
};

//--collision---------------------------------------
//check if point is in square [box]: {x, y, height, width}
var isInBounds = function isInBounds(point, box) {
  if (point.y < box.y || point.y > box.y + box.height || point.x < box.x || point.x > box.x + box.width) {
    return false;
  }
  return true;
};

//check if point is in circle bounds [circle]: {x, y, radius}
var isInCircle = function isInCircle(point, circle) {
  var dx = point.x - circle.x;
  var dy = point.y - circle.y;
  return dx * dx + dy * dy <= circle.radius * circle.radius;
};

//check circle x circle intersections [circle]: {x, y, radius}
var circlesIntersect = function circlesIntersect(c1, c2) {
  var distance = getDistance(c1, c2);
  return distance < c1.radius + c2.radius;
};

//--draw--------------------------------------------
var fillText = function fillText(targetCtx, string, x, y, font, color, center) {
  targetCtx.save();
  if (center) {
    targetCtx.textAlign = 'center';
    targetCtx.textBaseline = 'middle';
  };
  targetCtx.font = font;
  targetCtx.fillStyle = color;
  targetCtx.fillText(string, x, y);
  targetCtx.restore();
};

var drawRoundedRect = function drawRoundedRect(x, y, w, h, amt, targetCtx, stroke) {
  targetCtx.save();
  //targetCtx.fillRect(x,y,w,h);
  if (amt * 2 >= h) {
    amt = h / 2;
  }
  if (amt * 2 >= w) {
    amt = w / 2;
  }

  w -= amt * 2;
  h -= amt * 2;

  targetCtx.beginPath();
  targetCtx.moveTo(x + amt, y); //top left inner

  targetCtx.lineTo(x + w + amt, y); //top side
  targetCtx.quadraticCurveTo(x + w + amt * 2, y, x + w + amt * 2, y + amt); //top right corner

  targetCtx.lineTo(x + w + amt * 2, y + h + amt); //right side
  targetCtx.quadraticCurveTo(x + w + amt * 2, y + h + amt * 2, x + w + amt, y + h + amt * 2); //bottom right corner

  targetCtx.lineTo(x + amt, y + h + amt * 2); //bottom side
  targetCtx.quadraticCurveTo(x, y + h + amt * 2, x, y + h + amt); //bottom right corner

  targetCtx.lineTo(x, y + amt); //left side
  targetCtx.quadraticCurveTo(x, y, x + amt, y); //bottom left corner

  targetCtx.fill();
  if (stroke) targetCtx.stroke();
  targetCtx.restore();
};

//draw a ui (top-canvas) button [button]: {x, y, height, width}
var drawButton = function drawButton(button, text, color) {
  ctx_top.fillStyle = color || button.color;
  ctx_top.lineWidth = 1.5;
  drawRoundedRect(button.x, button.y, button.width, button.height, 3, ctx_top, true);
  fillText(ctx_top, text || button.text, button.x + button.width / 2, button.y + button.height / 2, 'bold 13pt Trebuchet MS', button.textColor || 'black', true);
};

function wrapText(context, text, x, y, maxWidth, lineHeight) {
  var words = text.replace(/\n/g, " \n ").split(" ");
  var line = '';

  var totalheight = lineHeight;
  var starty = y;

  for (var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;

    if (words[n] === '\n') {
      context.fillText(line, x, y);
      line = '';
      y += lineHeight;
      totalheight += lineHeight;
    } else if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
      totalheight += lineHeight;
    } else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
  context.fillRect(x - 5, starty, 3, totalheight);

  return totalheight;
}
'use strict';

var canvas = void 0,
    ctx = void 0,
    canvas_overlay = void 0,
    ctx_overlay = void 0,
    canvas_back = void 0,
    ctx_back = void 0,
    width = void 0,
    height = void 0,
    animationFrame = void 0;

var socket = void 0,
    hash = void 0,
    isHost = false,
    hosted = {},
    roomName = void 0;

var bgAudio = undefined,
    effectAudio = undefined,
    currentEffect = 0,
    currentDirection = 1;

var mouse = { x: 0, y: 0 };
var IMAGES = {};

var bufferTime = 0;
var canFire = true;
var lastTime = void 0;

var STATES = {
  wait: 'wait',
  preload: 'preload',
  title: 'title',
  setupGame: 'setupGame',
  game: 'game',
  gameover: 'gameover'
};
var gameState = STATES.wait;

var players = {};
var bulletArray = [];
var enemies = [];

var directions = {
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
var keyDownHandler = function keyDownHandler(e) {
  var keyPressed = e.which;
  var player = players[hash];

  // W OR UP
  if (keyPressed === 87 || keyPressed === 38) {
    // move character up
    player.moveUp = true;
  }
  // A OR LEFT
  else if (keyPressed === 65 || keyPressed === 37) {
      // move character left
      player.moveLeft = true;
    }
    // S OR DOWN
    else if (keyPressed === 83 || keyPressed === 40) {
        // move character down
        player.moveDown = true;
      }
      // D OR RIGHT
      else if (keyPressed === 68 || keyPressed === 39) {
          //move character right
          player.moveRight = true;
        }

  e.preventDefault();
};

//handler for key up events
var keyUpHandler = function keyUpHandler(e) {
  var keyPressed = e.which;
  var player = players[hash];

  // W OR UP
  if (keyPressed === 87 || keyPressed === 38) {
    // stop character from moving up
    player.moveUp = false;
  }
  // A OR LEFT
  else if (keyPressed === 65 || keyPressed === 37) {
      // stop character from moving left
      player.moveLeft = false;
    }
    // S OR DOWN
    else if (keyPressed === 83 || keyPressed === 40) {
        // stop character from moving down
        player.moveDown = false;
      }
      // D OR RIGHT
      else if (keyPressed === 68 || keyPressed === 39) {
          // stop character from moving right
          player.moveRight = false;
        }
};

var doOnMouseMove = function doOnMouseMove(e) {
  mouse = getMouse(e);
};
var doOnMouseDown = function doOnMouseDown(e) {
  fire(e);
};
var doOnMouseUp = function doOnMouseUp(e) {};
var doOnMouseOut = function doOnMouseOut(e) {};

var stateHandler = function stateHandler() {
  switch (gameState) {
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
};

var init = function init() {
  setupCanvas();
  setupSockets();

  resetGame();

  setupSound();

  preloadImages(toLoadImgs, IMAGES);
  animationFrame = requestAnimationFrame(stateHandler);
};

window.onload = init;
"use strict";

//--vars-----------------------------region
var bgTracks = {
  floralLife: { src: 'assets/audio/Floral Life (Henesys).mp3', lastTime: 0 },
  current: {}
};
var effectSounds = ["1.mp3", "2.mp3", "3.mp3", "4.mp3", "5.mp3", "6.mp3", "7.mp3", "8.mp3"];

//image preloading vv
var loadQueue = -1;
var numLoaded = 0;

var toLoadImgs = [{
  name: 'logo',
  url: 'assets/img/logo.png'
}];
//endregion

//--image preloader--------------------region
var preloadImages = function preloadImages(imgArr, targetList) {
  if (loadQueue === -1) loadQueue = 0;
  targetList.toloadcount = 0;
  targetList.loadcount = 0;

  var _loop = function _loop(i) {
    var data = imgArr[i];

    var img = new Image();
    img.src = data.url;
    targetList.toloadcount++;
    loadQueue++;
    //console.log(`toloadcount: ${targetList.toloadcount}`);

    img.onload = function (e) {
      targetList[data.name] = {
        img: img,
        name: data.name,
        height: img.naturalHeight,
        width: img.naturalWidth
      };
      if (data.animData) targetList[data.name].animData = data.animData;

      targetList.loadcount++;
      numLoaded++;
      //console.log(`loaded: ${data.name}, loadcount: ${targetList.loadcount}, anim?: ${data.animData}`);
    };
  };

  for (var i = 0; i < imgArr.length; i++) {
    _loop(i);
  }
};
//endregion

//--sound---------------------------region
var setupSound = function setupSound() {
  bgAudio = document.querySelector("#bgAudio");
  bgAudio.volume = 0.25;
  effectAudio = document.querySelector("#effectAudio");
  effectAudio.volume = 0.3;
  bgAudio.src = bgTracks.floralLife.src;
  bgAudio.current = bgTracks.floralLife;
};

var playBgAudio = function playBgAudio() {
  bgAudio.play();
};

var swapBg = function swapBg(track, reset) {
  bgTracks.current.lastTime = bgAudio.currentTime;
  bgTracks.current = bgTracks[track];
  bgAudio.src = bgTracks[track].src;

  bgAudio.currentTime = bgTracks.current.lastTime;
  if (reset) bgAudio.currentTime = bgTracks.current.lastTime = 0;
  bgAudio.play();
};

var stopBgAudio = function stopBgAudio() {
  bgAudio.pause();
  bgAudio.currentTime = 0;
};

var playEffect = function playEffect() {
  currentEffect = Math.round(Math.random() * 8) - 1;
  if (currentEffect < 0) currentEffect = 0;
  effectAudio.src = "assets/audio/" + effectSounds[currentEffect];
  //console.log(currentEffect);
  effectAudio.play();
};
//endregion
'use strict';

//--initial game setup-------------------region
var setupCanvas = function setupCanvas() {
  canvas = document.querySelector('#canvas_main');
  ctx = canvas.getContext('2d');
  canvas_overlay = document.querySelector('#canvas_overlay');
  ctx_overlay = canvas_overlay.getContext('2d');
  canvas_back = document.querySelector('#canvas_back');
  ctx_back = canvas_back.getContext('2d');

  width = canvas.width;
  height = canvas.height;
};
var setupSockets = function setupSockets() {
  socket = io.connect();

  //if this user joins
  socket.on("joined", function (data) {
    setUser(data);
  });

  //if other players join
  socket.on("otherConnects", function (data) {
    setOtherplayers(data);
  });
};

var setupGame = function setupGame() {
  //assign game key/mouse events
  setupEvents();

  console.log('starting up game');

  //game setup
  //TODO setup game stuff
  initEnemies(5);
  spawnEnemies();

  //play audio
  playBgAudio();

  //go to game loop
  gameState = STATES.game;
}; //setup and start the game

//endregion

//--events-------------------------region
var setupEvents = function setupEvents() {
  document.onkeydown = keyDownHandler;
  document.onkeyup = keyUpHandler;

  //find the mouse position
  canvas_overlay.onmousemove = doOnMouseMove;
  canvas_overlay.onmousedown = doOnMouseDown;
  //console.log('assigned startup game keys');
}; //events for gameplay

var assignStartupEvents = function assignStartupEvents() {
  document.onkeyup = function () {
    removeStartupEvents();
    gameState = STATES.setupGame;
    console.log('setting up game');
  };
  canvas_overlay.onmousedown = function () {
    removeStartupEvents();
    gameState = STATES.setupGame;
    console.log('setting up game');
  };
  //console.log('assigned pregame keys');
}; //event to start game
var removeStartupEvents = function removeStartupEvents() {
  //console.log('removed pregame keys');
  document.onkeyup = undefined;
  canvas_overlay.onmousedown = undefined;
}; //remove those events
//endregion
'use strict';

var initEnemies = function initEnemies(numEnemies) {
  for (var i = 0; i < numEnemies; i++) {
    enemies.push(new Enemy());
  }
};

var spawnEnemies = function spawnEnemies() {
  for (var i = 0; i < enemies.length; i++) {
    var x = getRandomRange(20, canvas.width - 20);
    var y = getRandomRange(20, canvas.height - 20);

    enemies[i].prevX = x;
    enemies[i].prevY = y;
    enemies[i].x = x;
    enemies[i].y = y;
    enemies[i].destX = x;
    enemies[i].destY = y;
  }
};

var seekTargets = function seekTargets() {
  var keys = Object.keys(players);

  for (var i = 0; i < enemies.length; i++) {
    var shortestDist = getDistance(players[keys[0]], enemies[i]);

    enemies[i].target = players[keys[0]];
    for (var j = 1; j < keys.length; j++) {
      var distance = getDistance(players[keys[j]], enemies[i]);

      if (distance < shortestDist) enemies[i].target = players[keys[j]];
    }
  }

  //for(let i = 0; i < enemies.length; i++){
  //  enemies[i].target = players[hash];
  //}
};

var moveEnemies = function moveEnemies() {
  var maxSpeed = 20;
  for (var i = 0; i < enemies.length; i++) {
    var desired = {
      x: enemies[i].target.x - enemies[i].x,
      y: enemies[i].target.y - enemies[i].y
    };

    var mag = Math.sqrt(desired.x * desired.x + desired.y * desired.y);

    var normDesired = {
      x: desired.x / mag,
      y: desired.y / mag
    };

    enemies[i].destX = enemies[i].x + normDesired.x * maxSpeed;
    enemies[i].destY = enemies[i].y + normDesired.y * maxSpeed;
    enemies[i].prevX = enemies[i].x;
    enemies[i].prevY = enemies[i].y;
    enemies[i].x = lerp(enemies[i].prevX, enemies[i].destX, enemies[i].alpha);
    enemies[i].y = lerp(enemies[i].prevY, enemies[i].destY, enemies[i].alpha);
  }
};

// when we receive character updates from the server
var update = function update(data) {};

// 
var setUser = function setUser(data) {
  hash = data.hash; // set this client's hash to the unique hash the server gives them
  players[hash] = new Character(hash);

  console.log('joined server');
  gameState = STATES.preload; // start animating;
};

var setOtherplayers = function setOtherplayers(data) {
  players[data.hash] = new Character(data.hash);

  //requestAnimationFrame(redraw); // start animating;
};

//do the shooting and send to server
var shooting = function shooting(data) {};

// update this client's position and send to server
var updatePosition = function updatePosition() {
  var plr = players[hash];

  plr.prevX = plr.x;
  plr.prevY = plr.y;

  if (plr.moveUp && plr.destY - 20 > 0) {
    plr.destY -= 2;
  }
  if (plr.moveDown && plr.destY + 20 < canvas.height) {
    plr.destY += 2;
  }
  if (plr.moveLeft && plr.destX - 20 > 0) {
    plr.destX -= 2;
  }
  if (plr.moveRight && plr.destX + 20 < canvas.width) {
    plr.destX += 2;
  }

  plr.alpha = 0.05;
  plr.lastUpdate = new Date().getTime();
};

// move the sphere arround
var move = function move() {

  var keys = Object.keys(players);
  //grab each user
  for (var x = 0; x < keys.length; x++) {
    var plr = players[keys[x]];

    if (plr.alpha < 1) {
      plr.alpha += 0.05;
    }

    plr.x = lerp(plr.prevX, plr.destX, plr.alpha);
    plr.y = lerp(plr.prevY, plr.destY, plr.alpha);
  }
};

var resetGame = function resetGame() {
  //game setup
  players = {};
  bulletArray = [];
};

//--GAME LOOPS---------------------region
var waitLoop = function waitLoop() {
  drawWait();
  console.log('waiting for connection to server...');
}; //wait until client joined the server

var preloadLoop = function preloadLoop() {
  //check if images are loaded then go to startup
  if (loadQueue == numLoaded) {
    console.log('done loading images');
    assignStartupEvents();
    gameState = STATES.title;
    return;
  }

  drawPreload();

  console.log('loading game...');
};

var titleLoop = function titleLoop() {
  drawTitle();
};

var gameOverLoop = function gameOverLoop() {
  drawGameOver();

  console.log('game over');
};

var gameUpdateLoop = function gameUpdateLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  drawPlaceholder();

  //check player input

  //update game
  updatePosition();
  move();

  // draw enemies
  seekTargets();
  moveEnemies();
  drawEnemies();

  //move bullets
  movebullets();

  //draw game
  drawPlayers();
  drawBullets();

  //update lasttime
  lastTime = performance.now();

  //bullet firing cooldown
  firecoolDown();

  //remove bullet
  OutofBoundbullet();
  //console.log(bulletArray.length);
};

//endregion
