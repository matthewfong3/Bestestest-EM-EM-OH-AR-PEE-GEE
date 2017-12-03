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
    this.bulletSpeed = 60;
    this.radius = 10;
    this.style = "yellow";
    //need to work on this
    this.direction = direction;
};
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var button = function () {
  function button(x, y, opts) {
    _classCallCheck(this, button);

    opts = opts || {};

    this.x = x;
    this.y = y;
    this.width = 200;
    this.height = 50;
    this.text = opts.text || '---';
    this.available = opts.available || true;
    this.callback = emptyFunct;
  }

  _createClass(button, [{
    key: 'setText',
    value: function setText(text) {
      this.text = text;
    }
  }]);

  return button;
}();
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
  this.radius = 10;
  this.hp = 10;
};
"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Enemy = function () {
  function Enemy() {
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
    this.hp = 10;

    this.target;

    this.maxSpeed = 20;
    this.seeking = true;
  }

  // methods


  _createClass(Enemy, [{
    key: "seekTarget",
    value: function seekTarget(players) {
      var keys = Object.keys(players);

      var location = {
        x: this.x,
        y: this.y
      };

      var shortestDist = getDistance(players[keys[0]], location);

      this.target = players[keys[0]];

      for (var i = 0; i < keys.length; i++) {
        var distance = getDistance(players[keys[i]], location);

        if (distance < shortestDist) this.target = players[keys[i]];
      }

      var desired = {
        x: this.target.x - this.x,
        y: this.target.y - this.y
      };

      var mag = Math.sqrt(desired.x * desired.x + desired.y * desired.y);

      var normDesired = {
        x: desired.x / mag,
        y: desired.y / mag
      };

      this.destX = this.x + normDesired.x * this.maxSpeed;
      this.destY = this.y + normDesired.y * this.maxSpeed;
      this.prevX = this.x;
      this.prevY = this.y;
      this.x = lerp(this.prevX, this.destX, this.alpha);
      this.y = lerp(this.prevY, this.destY, this.alpha);
    }
  }, {
    key: "seperate",
    value: function seperate(enemies) {
      var sepDistance = 50;

      var location = {
        x: this.x,
        y: this.y
      };

      var sum = { x: 0, y: 0 };
      var count = 0;

      var maxSpeed = 20;

      for (var i = 0; i < enemies.length; i++) {
        var enemyLoc = {
          x: enemies[i].x,
          y: enemies[i].y
        };

        var distance = getDistance(location, enemyLoc);

        // enemies within safe radius (too close!)
        if (distance > 0 && distance < sepDistance) {
          var sepVector = {
            x: enemies[i].x - location.x,
            y: enemies[i].y - location.y
          };

          var mag = Math.sqrt(sepVector.x * sepVector.x + sepVector.y * sepVector.y);

          var normSepVector = {
            x: sepVector.x / mag,
            y: sepVector.y / mag
          };

          sum.x += normSepVector.x;
          sum.y += normSepVector.y;
          count++;
          this.seeking = false;
        } else {
          this.seeking = true;
        }
      }

      if (count > 0) {
        sum.x /= count;
        sum.y /= count;

        this.destX = this.x + sum.x;
        this.destY = this.y + sum.y;
        this.prevX = this.x;
        this.prevY = this.y;
        this.x = lerp(this.prevX, this.destX, this.alpha);
        this.y = lerp(this.prevY, this.destY, this.alpha);
      }
    }
  }]);

  return Enemy;
}();
'use strict';

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var room =

/* ex connection:
  room_2: { //room ID
    name: 'cellar',
    enter_location: 2, //which door in room you come out of
    spawn_1: {x: 25, y: 25}; //where they are spawned in next
    spawn_2: {x: 25, y: 50};
    spawn_3: {x: 50, y: 25};
    spawn_4: {x: 50, y: 50};
  }
*/ //<- ex connection

function room(props) {
  _classCallCheck(this, room);

  this.ID = props.ID || -1; //unique name
  this.name = props.name || 'room'; //display name
  this.bg_music = props.bg_music || 'default';
  this.bg_image = props.bg_image || undefined;

  this.connection = props.connections || {}; //connected rooms
  this.objects = props.objects || {}; //walls and stuff
  this.goals = props.goals || {}; //clear goals or treasure goals
  this.mobs = props.mobs || {}; //enemies and npcs
  this.items = props.items || {}; //items and treasure chests

  this.visited = props.visited || false;
  this.cleared = props.cleared || false;
  this.main_entrance = props.main_entrance || undefined;
  this.entered_from = props.entered_from || undefined;

  //where players are spawned in room. set in [move to room]
  this.spawn_1 = props.spawn_1 || undefined;
  this.spawn_2 = props.spawn_2 || undefined;
  this.spawn_3 = props.spawn_3 || undefined;
  this.spawn_4 = props.spawn_4 || undefined;
};

;

var connection = function connection(props) {
  _classCallCheck(this, connection);

  this.ID = props.ID || -1;
  this.name = props.name || 'room';
  this.enter_location = props.enter_location || undefined; //which entrance in next room
  this.spawn_1 = props.spawn_1 || undefined;
  this.spawn_2 = props.spawn_2 || undefined;
  this.spawn_3 = props.spawn_3 || undefined;
  this.spawn_4 = props.spawn_4 || undefined;
};
'use strict';

var drawPlayers = function drawPlayers(time) {
  //draw things
  var keys = Object.keys(players);
  for (var i = 0; i < keys.length; i++) {
    var playerdrawn = players[keys[i]];
    if (playerdrawn.hp > 0) drawPlayer(playerdrawn);
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
  ctx.fillText('waiting for connection to server...', canvas.width / 2, canvas.height / 2);
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
  //ctx.fillText('- Click or press any button to play! -', canvas.width/2,canvas.height/2+40);
  drawButton(startButton, "Start", "Color");
  ctx.drawImage(IMAGES.logo.img, canvas.width / 2 - 25, canvas.height / 2 - 100);
}; //app title screen

var drawCharacterselect = function drawCharacterselect() {
  ctx.fillStyle = 'grey';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = '30pt Courier';
  ctx.fillText('Select your Character', canvas.width / 2, canvas.height * .10);
  ctx.font = '15pt Courier';
  //ctx.fillText('- Click or press any button to play! -', canvas.width/2,canvas.height/2+40);
  drawButton(startButton, "Choose", "Color");
  ctx.fillStyle = 'white';
  ctx.fillRect(canvas.width * .1, 150, 150, 300);
  ctx.fillRect(canvas.width * .32, 150, 150, 300);
  ctx.fillRect(canvas.width * .54, 150, 150, 300);
  ctx.fillRect(canvas.width * .75, 150, 150, 300);
  //ctx.drawImage(IMAGES.logo.img, canvas.width/2-25,canvas.height/2-100);

}; //character select screen, more of a template right now 

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
// ----- bullet Stuff (host)--------------------------------------------------region
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
    bullet.x = lerp(bullet.prevX, bullet.destX, bullet.alpha);
    bullet.y = lerp(bullet.prevY, bullet.destY, bullet.alpha);
    //bullet.alpha += 0.05;
  }
  socket.emit('updateBullets', { bulletArray: bulletArray });
};

var OutofBoundbullet = function OutofBoundbullet() {
  for (var i = 0; i < bulletArray.length; i++) {
    var bullet = bulletArray[i];
    if (bullet.x > canvas_overlay.width || bullet.x < 0 || bullet.y > canvas_overlay.height || bullet.y < 0) {
      bulletArray.splice(i, 1);
      socket.emit('updateBullets', { bulletArray: bulletArray });
    }
  }
};

// -----------------------------------------------------------------endregion

// -- fire logic for other clients that only host will calculate ----- region
var otherClientFire = function otherClientFire() {
  var keys = Object.keys(playersProps);

  for (var i = 0; i < keys.length; i++) {
    if (playersProps[keys[i]].canFire) {
      var playerPos = { x: players[playersProps[keys[i]].hash].x, y: players[playersProps[keys[i]].hash].y };
      var vector = { x: playersProps[keys[i]].mouse.x - playerPos.x, y: playersProps[keys[i]].mouse.y - playerPos.y };
      var mag = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
      var normVec = { x: vector.x / mag, y: vector.y / mag };
      var bullet = new Bullet(playerPos, normVec);
      bulletArray.push(bullet);
      playersProps[keys[i]].canFire = false;
      socket.emit('updateFireProps', { id: playersProps[keys[i]].id, canFire: playersProps[keys[i]].canFire });
    }
  }
};

var otherClientFireCD = function otherClientFireCD() {
  var keys = Object.keys(playersProps);

  for (var i = 0; i < keys.length; i++) {
    if (playersProps[keys[i]].canFire == false) {
      playersProps[keys[i]].bufferTime += calculateDT();
      if (playersProps[keys[i]].bufferTime >= 0.5) {
        playersProps[keys[i]].canFire = true;
        playersProps[keys[i]].bufferTime = 0;
        socket.emit('updateFireProps', { id: playersProps[keys[i]].id, canFire: playersProps[keys[i]].canFire });
        delete playersProps[keys[i]];
      }
    }
  }
};
//endregion

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

// check collision method for bullet and enemies
var checkCollisions = function checkCollisions(arr1, arr2) {
  for (var i = 0; i < arr1.length; i++) {
    for (var j = 0; j < arr2.length; j++) {
      if (arr1[i] && arr2[j]) {
        if (circlesIntersect(arr1[i], arr2[j])) {
          console.log('collision b/w bullet and enemy detected');
          arr1.splice(i, 1);
          // deal dmg to enemy here
          if (arr2[j].hp > 0) {
            arr2[j].hp -= 2;
          } else {
            arr2.splice(j, 1);
          }
          socket.emit('updateBullets', { bulletArray: arr1 });
          socket.emit('updateEnemies', { enemies: enemies });
        }
      }
    }
  }
};

var checkCollisionsPlayersVEnemies = function checkCollisionsPlayersVEnemies(plrObj, array) {
  var keys = Object.keys(plrObj);

  for (var i = 0; i < keys.length; i++) {
    for (var j = 0; j < array.length; j++) {
      if (circlesIntersect(plrObj[keys[i]], array[j])) {
        console.log('collision b/w character and enemy detected');
        if (plrObj[keys[i]].hp > 0) {
          plrObj[keys[i]].hp -= 2;
        } else {
          // what happens to player when they 'die'
          console.log('player should be dead');
        }
        socket.emit('playerCollide', { player: plrObj[keys[i]] });
      }
    }
  }
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
  ctx.save();
  ctx.fillStyle = color || button.color;
  ctx.lineWidth = 1.5;
  drawRoundedRect(button.x, button.y, button.width, button.height, 3, ctx, true);
  fillText(ctx, text || button.text, button.x + button.width / 2, button.y + button.height / 2, 'bold 13pt Trebuchet MS', button.textColor || 'black', true);
  ctx.restore();
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

var buttonTap = function buttonTap(button) {
  if (cursor.x > button.x && cursor.x < button.x + button.width && cursor.y > button.y && cursor.y < button.y + button.height) {
    return true;
  } else {
    return false;
  }
};
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
var ANIMATIONS = {};
var cursor = undefined;
var dragging = false;

var bufferTime = 0;
var canFire = true;
var lastTime = void 0;

var startButton = void 0,
    selectButton = void 0,
    roomButton = void 0;

var STATES = {
  wait: 'wait',
  preload: 'preload',
  title: 'title',
  setupGame: 'setupGame',
  game: 'game',
  gameover: 'gameover',
  characterSelect: 'characterSelect'
};
var gameState = STATES.wait;
var paused = false,
    debug = true;

var players = {};
var bulletArray = [];
var enemies = [];
var rooms = {};

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

  if (player.hp > 0) {
    // W OR UP
    if (keyPressed === 87 || keyPressed === 38) {
      // move character up
      player.moveUp = true;
      e.preventDefault();
    }
    // A OR LEFT
    else if (keyPressed === 65 || keyPressed === 37) {
        // move character left
        player.moveLeft = true;
        e.preventDefault();
      }
      // S OR DOWN
      else if (keyPressed === 83 || keyPressed === 40) {
          // move character down
          player.moveDown = true;
          e.preventDefault();
        }
        // D OR RIGHT
        else if (keyPressed === 68 || keyPressed === 39) {
            //move character right
            player.moveRight = true;
            e.preventDefault();
          }

    var input = {
      moveUp: player.moveUp,
      moveLeft: player.moveLeft,
      moveDown: player.moveDown,
      moveRight: player.moveRight
    };

    if (!isHost && gameState === STATES.game) socket.emit('updateKeys', { hash: hash, input: input });
  }
};

//handler for key up events
var keyUpHandler = function keyUpHandler(e) {
  var keyPressed = e.which;
  var player = players[hash];
  if (player.hp > 0) {
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

    var input = {
      moveUp: player.moveUp,
      moveLeft: player.moveLeft,
      moveDown: player.moveDown,
      moveRight: player.moveRight
    };

    if (!isHost && gameState === STATES.game) socket.emit('updateKeys', { hash: hash, input: input });
  }
};

var emptyFunct = function emptyFunct() {};

var doOnMouseMove = function doOnMouseMove(e) {
  mouse = getMouse(e);
  cursor.x = mouse.x;
  cursor.y = mouse.y;

  if (cursor.over !== false && !cursor.isOverButton(cursor.over)) {
    cursor.exitButton();
  }
};
var doOnMouseDown = function doOnMouseDown(e) {
  if (gameState === STATES.game) {
    var player = players[hash];
    if (player.hp > 0) {
      if (isHost) fire(e);else {
        if (gameState === STATES.game) socket.emit('updateFire', { canFire: canFire, mouse: mouse, bufferTime: bufferTime });
      }
    }

    if (menu.open) menu.checkClose();
  }

  checkButton();
  setAnim(cursor, 'click', 'once');
  dragging = true;
};
var doOnMouseUp = function doOnMouseUp(e) {
  setAnim(cursor, 'click', 'onceReverse', function () {
    return setAnim(cursor, 'default', 'default');
  });
  dragging = false;
};
var doOnMouseOut = function doOnMouseOut(e) {
  dragging = false;
};

var stateHandler = function stateHandler() {
  ctx_overlay.clearRect(0, 0, canvas_overlay.width, canvas_overlay.height);

  switch (gameState) {
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

  if (cursor != undefined) {
    playAnim(ctx_overlay, cursor);
  }

  animationFrame = requestAnimationFrame(stateHandler);
};

var init = function init() {
  setupCanvas();
  setupSockets();

  resetGame();

  setupSound();

  preloadImages(toLoadImgs, IMAGES);
  preloadImages(toLoadAnims, ANIMATIONS);
  animationFrame = requestAnimationFrame(stateHandler);

  playBgAudio();
};

window.onload = init;

var pauseGame = function pauseGame() {
  paused = true;
  //stop animation loop
  cancelAnimationFrame(animationFrame);

  stopBgAudio();
};

var resumeGame = function resumeGame() {
  //stop animation loop just in case
  cancelAnimationFrame(animationFrame);

  playBgAudio();
  paused = false;

  //call update
  requestAnimationFrame(stateHandler);
};

var toggleDebug = function toggleDebug() {
  if (debug) {
    debug = false;
    return;
  }
  debug = true;
};

//ONBLUR
window.onblur = function () {
  pauseGame();
  //console.log('blur');
};
//ONFOCUS
window.onfocus = function () {
  resumeGame();
  //console.log('focus');
};
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

var toLoadAnims = [{
  name: 'cursor',
  url: 'assets/img/cursor.png',
  animData: {
    default: {
      row: 1,
      cols: 4,
      total: 4,
      playSpeed: 16,
      height: 50,
      width: 50
    },
    available: {
      row: 2,
      cols: 3,
      playSpeed: 10
    },
    unavailable: {
      row: 3,
      cols: 3,
      playSpeed: 10
    },
    click: {
      row: 4,
      cols: 3,
      playSpeed: 4
    }
  }
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

//--animation/sprites----------------------region
var Sprite = function Sprite(data) {
  var sprite = {};

  var sheet = data.sheet;
  sprite.sheet = sheet;
  sprite.animData = sheet.animData;
  sprite.filter = 0;
  sprite.x = data.x || 0;
  sprite.y = data.y || 0;

  sprite.width = sheet.animData.default.width || sheet.width / sheet.animData.default.cols;
  sprite.height = sheet.animData.default.height || sheet.height / sheet.animData.default.total;
  sprite.z = data.z || 0;

  sprite.frameCount = 0;
  sprite.frame = 0;
  sprite.currentAnim = {
    name: 'default',
    onDone: emptyFunct
  };
  sprite.playSpeed = sheet.animData.default.speed || 14;
  sprite.playStyle = false;

  sprite.moveUp = false;
  sprite.moveLeft = false;
  sprite.moveRight = false;
  sprite.moveDown = false;
  sprite.playDir = -1;

  setAnim(sprite, 'default');

  return sprite;
};

//sets a new animation to play for a sprite
/* parameters
anim = animation name (default, walk, attack, etc) *named in to loadAnims
playstyles:
once, onceReverse -> play once and stop on last frame
default, reverse -> play on loop endlessly
pingPong -> play then play in reverse and repeat
onDone: for play once playstyles, callback function to call once animation reaches the end
*/ //anim parameters
var setAnim = function setAnim(targetSprite, anim, playStyle, onDone) {
  targetSprite.frameWidth = targetSprite.sheet.width / targetSprite.animData[anim].cols;

  targetSprite.frameHeight = targetSprite.animData[anim].height || targetSprite.height;
  targetSprite.frameWidth = targetSprite.animData[anim].width || targetSprite.width;

  if (targetSprite.currentAnim.name != anim) targetSprite.frame = 0;
  targetSprite.row = targetSprite.animData[anim].row;
  targetSprite.cols = targetSprite.animData[anim].cols;
  targetSprite.currentAnim.name = anim;
  targetSprite.playSpeed = targetSprite.animData[anim].playSpeed;

  if (playStyle === 'pingPong') {
    targetSprite.playStyle = 'pingPong';
    if (targetSprite.playDir == -1) targetSprite.playDir = 0;
  } else if (playStyle === 'once') {
    targetSprite.playStyle = 'once';
    targetSprite.playDir = 0;
  } else if (playStyle === 'onceReverse') {
    targetSprite.playStyle = 'onceReverse';
    targetSprite.playDir = 1;
    targetSprite.frame = targetSprite.cols - 1;
  } else if (playStyle === 'reverse') {
    targetSprite.playStyle = 'reverse';
    targetSprite.playDir = 1;
    targetSprite.frame = targetSprite.cols - 1;
  }

  targetSprite.currentAnim.onDone = onDone || emptyFunct;
};
//play current animation for a ssprite (freeze to suspend frame)
var playAnim = function playAnim(ctx, targetSprite, freeze) {
  targetSprite.frameCount++;

  if (freeze) targetSprite.frame = 0;else if (targetSprite.playStyle == 'pingPong') {
    if (targetSprite.frameCount % targetSprite.playSpeed === 0) {

      if (targetSprite.playDir == 0) {
        if (targetSprite.frame < targetSprite.cols - 1) {
          targetSprite.frame++;
        } else {
          targetSprite.playDir = 1;
        }
      }
      if (targetSprite.playDir == 1) {
        if (targetSprite.frame > 0) {
          targetSprite.frame--;
        } else {
          targetSprite.playDir = 0;
          targetSprite.frame++;
        }
      }
    }
  } else if (targetSprite.playStyle == 'once' || targetSprite.playStyle == 'onceReverse') {
    if (targetSprite.frameCount % targetSprite.playSpeed === 0) {

      if (targetSprite.playDir == 0) {
        if (targetSprite.frame < targetSprite.cols - 1) {
          targetSprite.frame++;
        } else if (targetSprite.currentAnim.onDone != emptyFunct) {
          targetSprite.currentAnim.onDone();
          targetSprite.currentAnim.onDone = emptyFunct;
        }
      }
      if (targetSprite.playDir == 1) {
        if (targetSprite.frame > 0) {
          targetSprite.frame--;
        } else if (targetSprite.currentAnim.onDone != emptyFunct) {
          targetSprite.currentAnim.onDone();
          targetSprite.currentAnim.onDone = emptyFunct;
        }
      }
    }
  } else if (targetSprite.playStyle == 'reverse') {
    //switch frames after time
    if (targetSprite.frameCount % targetSprite.playSpeed === 0) {
      //move through animation and loop
      if (targetSprite.frame > 0) {
        targetSprite.frame--;
      } else {
        targetSprite.frame = targetSprite.cols - 1;
      }
    }
  } else {
    //switch frames after time
    if (targetSprite.frameCount % targetSprite.playSpeed === 0) {
      //move through animation and loop
      if (targetSprite.frame < targetSprite.cols - 1) {
        targetSprite.frame++;
      } else {
        targetSprite.frame = 0;
      }
    }
  }

  ctx.drawImage(targetSprite.sheet.img, targetSprite.frameWidth * targetSprite.frame, targetSprite.height * (targetSprite.row - 1), targetSprite.frameWidth, targetSprite.frameHeight, targetSprite.x, targetSprite.y, targetSprite.frameWidth, targetSprite.frameHeight);
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

var playBgAudio = function playBgAudio(reset) {
  if (reset) bgAudio.currentTime = 0;
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

var stopBgAudio = function stopBgAudio(reset) {
  bgAudio.pause();
  if (reset) bgAudio.currentTime = 0;
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

//handles map related functions
var menu = {
  open: false,
  options: {},
  title: 'menu'
};

var setMenu = function setMenu(props) {
  menu.open = props.open || false;
  menu.options = props.options || {};
  menu.title = props.title || 'menu title';
};

var setVoteMenu = function setVoteMenu() {
  var opts = {};
  opts.options = {
    yes: new button(100, 100, { text: 'yes' }),
    no: new button(100, 170, { text: 'no' }),
    meh: new button(100, 240, { text: 'meh' })
  };

  opts.options.meh.callback = function () {
    return console.log('meh');
  };
  opts.options.yes.callback = function () {
    return console.log('yes');
  };
  opts.options.no.callback = function () {
    return console.log('no');
  };

  opts.title = 'enter room? - response in in console';
  opts.open = true;

  setMenu(opts);
};

var setPauseMenu = function setPauseMenu() {
  var opts = {};

  opts.options = {
    resume: new button(100, 100, { text: 'resume' }),
    quit: new button(100, 170, { text: 'quit' })
  };

  opts.title = 'pause menu';
  opts.open = true;

  setMenu(opts);
};

var resetMenu = function resetMenu() {
  var opts = {};

  opts.options = {
    vote: new button(100, 100, { text: 'vote' }),
    pause: new button(100, 170, { text: 'pause' }),
    unavailable: new button(100, 240, { available: false, text: 'unavailable' })

    //fixme: dont know why button constructor wont set avaiible to false vv
  };opts.options.unavailable.available = false;

  opts.options.vote.callback = setVoteMenu;
  opts.options.pause.callback = setPauseMenu;
  opts.options.unavailable.callback = function () {
    return console.log('button is unavailable');
  };

  opts.title = 'testing menu - click outside menu to close and reset';

  setMenu(opts);
};resetMenu();

console.dir(menu.options);

menu.checkClose = function () {
  if (!isInBounds(cursor, { x: 30, y: 30, width: width - 100, height: height - 100 })) closeMenu();
};

menu.toggle = function () {
  //if(roomSelect.open) closeRoomSelect();
  openMenu();
};

var openMenu = function openMenu() {
  suspendPlayerControls();

  menu.open = true;
  console.log('open menu');
};

var closeMenu = function closeMenu() {
  restorePlayerControls();

  menu.open = false;
  console.log('close menu');

  //toremove: reset menu for testing
  resetMenu();
};

var checkMenu = function checkMenu() {
  if (menu.open) {
    var keys = Object.keys(menu.options);
    for (var i = 0; i < keys.length; i++) {
      var btn = menu.options[keys[i]];
      if (cursor.isOverButton(btn)) cursor.enterButton(btn);
    }
  }
};

var drawMenu = function drawMenu() {
  if (menu.open) {
    ctx_overlay.fillStyle = 'rgba(108, 108, 108, 0.4)';
    ctx_overlay.strokeStyle = 'black';
    ctx_overlay.lineWidth = 3;
    drawRoundedRect(50, 50, width - 100, height - 100, 7, ctx_overlay, true);

    ctx_overlay.textAlign = 'left';
    fillText(ctx_overlay, menu.title, 100, 80, '15pt courier', 'white');

    var keys = Object.keys(menu.options);
    for (var i = 0; i < keys.length; i++) {
      var btn = menu.options[keys[i]];
      drawButton(btn, btn.text, "white");
    }
  }
};
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

var playersProps = {};
var setupSockets = function setupSockets() {
  socket = io.connect();

  socket.emit('initialJoin', {});

  socket.on('initialJoined', function () {
    return gameState = STATES.preload;
  });

  // only runs if it's this user is the first to join a room
  socket.on('setHost', function () {
    isHost = true;
  });

  // once this user successfully joins
  socket.on("joined", function (data) {
    setUser(data);
  });

  //if other players join
  socket.on("otherConnects", function (data) {
    setOtherplayers(data);
  });

  // should only run on host client
  socket.on('updatedKeys', update);

  socket.on('updatedFire', function (data) {
    playersProps[data.hash] = data;
    //console.log(playersProps[data.hash]);
  });

  // should only run on clients that are not the host
  socket.on('updatedPos', update);

  socket.on('updatedFireProps', function (data) {
    canFire = data.canFire;
    //console.log('receveied: ' + canFire);
  });

  socket.on('updatedBullets', function (data) {
    bulletArray = data.bulletArray;
  });

  socket.on('spawnedEnemies', function (data) {
    //console.log('received');
    enemies = data.enemies;
  });

  socket.on('updatedEnemies', function (data) {
    enemies = data.enemies;
  });

  socket.on('playerCollided', function (data) {
    console.log('received: player collision detected with enemy');
    players[data.hash] = data;
  });
};

var setupGame = function setupGame() {
  //assign game key/mouse events
  setupEvents();

  console.log('starting up game');

  //game setup
  //TODO setup game stuff

  //play audio
  playBgAudio();

  //go to game loop
  gameState = STATES.game;
}; //setup and start the game


var setupCursor = function setupCursor() {
  cursor = new Sprite({ sheet: ANIMATIONS.cursor });
  cursor.over = false;

  cursor.enterButton = function (button) {
    cursor.over = button;
    if (button.available) setAnim(cursor, 'available', 'pingPong');else setAnim(cursor, 'unavailable', 'pingPong');
  };

  cursor.exitButton = function () {
    cursor.over = false;
    setAnim(cursor, 'default', 'default');
  };

  cursor.isOverButton = function (button) {
    var isOver = false;
    if (button.radius) {
      isOver = inInCircle(cursor, button);
    } else {
      isOver = isInBounds(cursor, button);
    }
    return isOver;
  };
};

var checkButton = function checkButton() {
  if (cursor.over !== false) cursor.over.callback();
};

//endregion

//--events-------------------------region
var setupEvents = function setupEvents() {
  document.onkeydown = keyDownHandler;
  document.onkeyup = keyUpHandler;

  //find the mouse position
  //canvas_overlay.onmousemove = doOnMouseMove;
  //canvas_overlay.onmousedown = doOnMouseDown;
  //console.log('assigned startup game keys');
}; //events for gameplay

var assignStartupEvents = function assignStartupEvents() {
  if (gameState === STATES.title) {
    /*
    document.onkeyup = () => {
      removeStartupEvents();
      gameState = STATES.setupGame;
      console.log('setting up game')
    }
    */
    canvas_overlay.onmousedown = function () {
      var startBool = buttonTap(startButton);

      if (startBool) {
        gameState = STATES.characterSelect;
        assignStartupEvents();
        console.log('setting up game');
      }
      checkButton();
      setAnim(cursor, 'click', 'once');
    };
  }

  if (gameState === STATES.characterSelect) {

    canvas_overlay.onmousedown = function () {

      var selectBool = buttonTap(selectButton);

      if (selectBool) {
        removeStartupEvents();
        gameState = STATES.setupGame;
        console.log('setting up game');
        socket.emit('join', {});
      }
      checkButton();
      setAnim(cursor, 'click', 'once');
    };
  }
  //console.log('assigned pregame keys');
}; //event to start game
var removeStartupEvents = function removeStartupEvents() {
  //console.log('removed pregame keys');
  if (gameState === STATES.title) {
    document.onkeyup = undefined;
    canvas_overlay.onmousedown = undefined;
  }
}; //remove those events
//endregion
'use strict';

//-- init & spawn enemies --region
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
//endregion

// when we receive character updates from the server
var update = function update(data) {
  if (isHost) {
    //console.log('keys updated');
    players[data.hash].moveUp = data.input.moveUp;
    players[data.hash].moveLeft = data.input.moveLeft;
    players[data.hash].moveDown = data.input.moveDown;
    players[data.hash].moveRight = data.input.moveRight;
  } else {
    //console.log('updatedPos');
    players[data.player.hash] = data.player;
  }
};

//-- set users on connect --region
var setUser = function setUser(data) {
  hash = data.hash; // set this client's hash to the unique hash the server gives them
  players[hash] = new Character(hash);
  console.log(data.id);
  console.log('joined server');
  //gameState = STATES.preload // start animating;
};

var setOtherplayers = function setOtherplayers(data) {
  if (data.hash === hash) return;
  console.log('another user joined');
  players[data.hash] = new Character(data.hash);

  if (isHost) socket.emit('spawnEnemies', { id: data.id, enemies: enemies });
};
//endregion

//do the shooting and send to server
var shooting = function shooting(data) {};

// update this client's position and send to server
var updatePosition = function updatePosition() {
  var keys = Object.keys(players);

  for (var i = 0; i < keys.length; i++) {
    var plr = players[keys[i]];

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

    if (plr.alpha < 1) {
      plr.alpha += 0.05;
    }

    plr.x = lerp(plr.prevX, plr.destX, plr.alpha);
    plr.y = lerp(plr.prevY, plr.destY, plr.alpha);

    socket.emit("updatePos", { player: plr });
  }
};

var resetGame = function resetGame() {
  //game setup
  players = {};
  bulletArray = [];
};

var startGame = function startGame() {
  //assign game key/mouse events
  setupEvents();

  console.log('starting up game');

  //game setup
  //TODO setup game stuff
  if (isHost) {
    initEnemies(2);
    spawnEnemies();
  }

  //play audio
  playBgAudio();

  //go to game loop
  gameState = STATES.game;
}; //setup and start the game

var doOnPreloadDone = function doOnPreloadDone() {
  console.log('done loading images');
  startButton = new button(canvas.width / 2 - 100, canvas.height * .75);
  selectButton = new button(canvas.width / 2 - 100, canvas.height * .75);

  roomButton = new button(30, 30);
  roomButton.callback = menu.toggle;

  gameState = STATES.title;
  assignStartupEvents();

  setupCursor();
  setAnim(cursor, 'default', 'default');

  document.onmousemove = doOnMouseMove;
  document.onmousedown = doOnMouseDown;
  document.onmouseup = doOnMouseUp;
  document.onmouseout = doOnMouseOut;
};

var suspendPlayerControls = function suspendPlayerControls() {
  document.onkeydown = undefined;
  document.onkeyup = undefined;
};
var restorePlayerControls = function restorePlayerControls() {
  document.onkeydown = keyDownHandler;
  document.onkeyup = keyUpHandler;
};

//--GAME LOOPS---------------------region
var waitLoop = function waitLoop() {
  drawWait();
  console.log('waiting for connection to server...');
}; //wait until client joined the server

var preloadLoop = function preloadLoop() {
  //check if images are loaded then go to startup
  if (loadQueue == numLoaded) {
    //console.log('done loading images');
    doOnPreloadDone();
    return;
  }

  drawPreload();

  console.log('loading game...');
};

var titleLoop = function titleLoop() {
  drawTitle();

  if (cursor.isOverButton(startButton)) cursor.enterButton(startButton);
};

var gameOverLoop = function gameOverLoop() {
  drawGameOver();

  console.log('game over');
};

var characterSelectLoop = function characterSelectLoop() {
  drawCharacterselect();

  if (cursor.isOverButton(selectButton)) cursor.enterButton(selectButton);

  //console.log('select a character');
};

var gameUpdateLoop = function gameUpdateLoop() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx_overlay.clearRect(0, 0, canvas_overlay.width, canvas_overlay.height);

  drawPlaceholder();

  //update game
  if (isHost) {
    // updates players movement
    updatePosition();

    for (var i = 0; i < enemies.length; i++) {
      enemies[i].seperate(enemies);
      if (enemies[i].seeking) enemies[i].seekTarget(players);
    }
    socket.emit('updateEnemies', { enemies: enemies });

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
  }

  // draw enemies
  drawEnemies();
  // draw players
  drawPlayers();
  // draw bullets
  drawBullets();

  drawButton(roomButton, "menu", '#ffc7c7');

  if (cursor.isOverButton(roomButton)) cursor.enterButton(roomButton);

  checkMenu();
  drawMenu();
};

//endregion
