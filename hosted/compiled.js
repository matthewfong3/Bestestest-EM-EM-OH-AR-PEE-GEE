"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Bullet = function Bullet(characterpoint, direction, hash) {
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
    this.firedfrom = hash;
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
    this.width = opts.width || 200;
    this.height = opts.height || 50;
    this.text = opts.text || '---';
    this.available = opts.available || true;
    this.callback = opts.callback || emptyFunct;
    this.textColor = opts.textColor || 'black';
  }

  _createClass(button, [{
    key: 'setText',
    value: function setText(text) {
      this.text = text;
    }
  }, {
    key: 'setAvailable',
    value: function setAvailable() {
      this.available = true;
    }
  }, {
    key: 'setUnavailable',
    value: function setUnavailable() {
      this.available = false;
    }
  }, {
    key: 'moveTo',
    value: function moveTo(x, y) {
      this.x = x;
      this.y = y;
    }
  }]);

  return button;
}();
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Character = function Character(hash, image) {
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
  this.revive = false;

  // if using circle-to-circle collision
  this.radius = 15;
  this.hp = 10;
  this.maxHP = 10;

  image = image || {};
  this.object = image;

  this.enemiesKilled = 0;
};
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var colorOption = function colorOption(x, y, width, height, text, avalability) {
    _classCallCheck(this, colorOption);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text = text;
    this.avalability = avalability;
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

      var shortestDist = -1;

      this.target = "";

      for (var i = 0; i < keys.length; i++) {
        //if the player is alive, count him in calculation
        if (players[keys[i]].hp > 0) {
          //find distance
          var distance = getDistance(players[keys[i]], location);
          //if the first one, replace the value
          if (shortestDist == -1) {
            shortestDist = distance;
            this.target = players[keys[i]];
          }
          //else if it has a value, look to see if the distance is smaller and replace if it is   
          else if (distance < shortestDist) {
              this.target = players[keys[i]];
              shortestDist = distance;
            }
        }
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
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Particle = function Particle(x, y, color) {
  _classCallCheck(this, Particle);

  this.prevX = x;
  this.prevY = y;
  this.x = x;
  this.y = y;
  this.destX = x;
  this.destY = y;
  this.alpha = 0.05;
  this.radius = 10;
  this.fillStyle = color;
};

;
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Room = function () {

  /* ex entrance
    top: {
      ID: 'room_1',
      name: 'roof',
      location: {x: width/2-doors.top.width/2, y: 0},
      object: doors.top,
      open: false,
      visited: false,
      conditions: [ goal_defeatAllEnemies ]
    },
  */ // <- ex entrance

  function Room(props) {
    _classCallCheck(this, Room);

    this.ID = props.ID || -1; //unique name
    this.name = props.name || 'room'; //display name
    this.bg_music = props.bg_music || 'default';
    this.bg_image = props.bg_image || undefined;

    this.objects = props.objects || {}; //walls and stuff
    this.goals = props.goals || {}; //clear goals or treasure goals
    this.mobs = props.mobs || {}; //enemies and npcs
    this.items = props.items || {}; //items and treasure chests

    this.visited = props.visited || false;
    this.cleared = props.cleared || false;
    this.entrances = props.entrances || undefined; //where players are spawned in room. set in [move to room]
    this.entered_from = props.entered_from || undefined;

    this.enemiesCount = Math.floor(Math.random() * 7) + 2;
  }

  _createClass(Room, [{
    key: 'loadRoom',
    value: function loadRoom() {
      //players = {};
      //bulletArray = [];
      //enemies = [];
      console.log('Loading room [' + this.name + '] ...');
      this.lockDoors();
    }
  }, {
    key: 'unlockDoors',
    value: function unlockDoors() {
      var keys = Object.keys(this.entrances);
      for (var i = 0; i < keys.length; i++) {
        var door = this.entrances[keys[i]];
        door.open = true;
      }
    }
  }, {
    key: 'lockDoors',
    value: function lockDoors() {
      var keys = Object.keys(this.entrances);
      for (var i = 0; i < keys.length; i++) {
        var door = this.entrances[keys[i]];
        door.open = false;
      }
    }
  }, {
    key: 'checkGoals',
    value: function checkGoals() {
      for (var i = 0; i < this.goals.length; i++) {
        var goal = this.goals[i]();
        if (goal === false) return false;
      }
      this.completeRoom();
    }
  }, {
    key: 'completeRoom',
    value: function completeRoom() {
      //console.log(`Room [${this.name}] cleared!`);
      this.unlockDoors();

      if (isHost) {
        moveButton.available = true;
        setChangeRoomMenu();
        menu.toggle();
      }
    }
  }, {
    key: 'drawDoors',
    value: function drawDoors() {
      var keys = Object.keys(this.entrances);
      for (var i = 0; i < keys.length; i++) {
        var door = this.entrances[keys[i]];
        if (door.open) ctx.drawImage(door.object.img_open.img, door.location.x, door.location.y);else ctx.drawImage(door.object.img_lock.img, door.location.x, door.location.y);
      }
    }
  }, {
    key: 'drawItems',
    value: function drawItems() {
      var keys = Object.keys(this.items);
      for (var i = 0; i < keys.length; i++) {
        var item = this.items[keys[i]];
        if (item.active) ctx.drawImage(item.object.active.img, item.location.x, item.location.y);else ctx.drawImage(item.object.inactive.img, item.location.x, item.location.y);
      }
    }
  }, {
    key: 'drawEnemies',
    value: function drawEnemies() {
      var keys = Object.keys(this.mobs);
      for (var i = 0; i < keys.length; i++) {
        var mob = this.mobs[keys[i]];
        if (mob.isAlive) ctx.drawImage(mob.object.active.img, mob.x - mob.object.width / 2, mob.y - mob.object.height / 2);else ctx.drawImage(mob.object.inactive.img, mob.x - mob.object.width / 2, mob.y - mob.object.height / 2);
      }
    }
  }, {
    key: 'drawRoom',
    value: function drawRoom() {
      //draw bg -> doors -> items
      if (this.bg_image) ctx.drawImage(IMAGES[this.bg_image].img, 0, 0);else ctx.drawImage(IMAGES.dungeon_walls.img, 0, 0);
      this.drawDoors();
      this.drawItems();

      //placeholder label for room name
      ctx_overlay.textAlign = 'left';
      fillText(ctx_overlay, this.name, 60, height - 15, '15pt courier', 'black');
    }
  }]);

  return Room;
}();

;
"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var shopOption = function shopOption(x, y, width, height, text1, text2) {
    _classCallCheck(this, shopOption);

    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.text1 = text1;
    this.text2 = text2;
    this.text1positionX = this.x + this.width / 2;
    this.text1positionY = this.y + 20;
    this.text2positionX = this.x + this.width / 2;
    this.text2positionY = this.y + this.height - 50;
};
"use strict";

var particles = [];

var rpcCall = function rpcCall() {
  for (var i = 0; i < 20; i++) {
    var randX = Math.random() * canvas_overlay.width;
    var randY = Math.random() * -200;
    var randColor = getRandomColor(Math.random() * (1 - 0.4 + 0.4));
    particles.push(new Particle(randX, randY, randColor));
  }
};

var drawParticles = function drawParticles() {
  for (var i = 0; i < particles.length; i++) {
    ctx.save();
    ctx.beginPath();
    ctx.arc(particles[i].x, particles[i].y, particles[i].radius, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.fillStyle = particles[i].fillStyle;
    ctx.fill();
    ctx.restore();
  }
};

var drawPlayers = function drawPlayers(time) {
  //draw things
  var keys = Object.keys(players);
  for (var i = 0; i < keys.length; i++) {
    var playerdrawn = players[keys[i]];
    drawPlayer(playerdrawn);
  }
}; //draw all players in the players list

var drawPlayer = function drawPlayer(playerdrawn) {
  if (playerdrawn.object) {

    if (playerdrawn.hp > 0) ctx.drawImage(IMAGES[playerdrawn.object.name].img, playerdrawn.x - playerdrawn.object.width / 2, playerdrawn.y - playerdrawn.object.height / 2);else {
      var nm = playerdrawn.object.name;
      var ko = nm + '_ko';
      ctx.drawImage(IMAGES[ko].img, playerdrawn.x - playerdrawn.object.width / 2, playerdrawn.y - playerdrawn.object.height / 2);
    }

    //ctx.drawImage(playerdrawn.object.img, playerdrawn.x-playerdrawn.object.width/2, playerdrawn.y -playerdrawn.object.height/2)
  } else {

    ctx.save();
    ctx.beginPath();

    ctx.fillStyle = playerdrawn.style;
    ctx.arc(playerdrawn.x, playerdrawn.y, playerdrawn.radius, 0, Math.PI * 2, false);

    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
};

var drawDeadPlayer = function drawDeadPlayer(playerdrawn) {
  ctx.save();
  ctx.beginPath();

  ctx.fillStyle = "black";
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

var drawHealthbar = function drawHealthbar() {
  //grab this client's player info
  var player = players[hash];
  var playerhealthPercentage = 200;
  if (player) {
    playerhealthPercentage = player.hp / player.maxHP * 200;
  }
  ctx.save();

  ctx.strokeStyle = "black";
  ctx.fillStyle = "red";

  ctx.strokeRect(875, 15, 200, 30);
  ctx.fillRect(875, 15, playerhealthPercentage, 30);

  ctx.textBaseline = 'top';
  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("HP:", 845, 15);

  ctx.fillText("coins:", 875, height - 45);
  ctx.textAlign = 'left';
  ctx.fillText(coins, 915, height - 45);

  ctx.restore();
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
  ctx.drawImage(IMAGES.mob_blue.img, enemy.x - enemy.radius / 2, enemy.y - enemy.radius / 2);
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
  ctx.fillStyle = '#242424';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = '30pt Courier';
  ctx.fillText('Dungeon Explorers Online', canvas.width / 2, canvas.height / 2 - 10);
  ctx.font = '15pt Courier';
  //ctx.fillText('- Click or press any button to play! -', canvas.width/2,canvas.height/2+40);
  drawButton(startButton, "Start", "Color");
  drawButton(shopButton, "Shop", "Color");
  ctx.drawImage(IMAGES.logo.img, canvas.width / 2 - IMAGES.logo.width / 2, canvas.height / 2 - IMAGES.logo.height / 2 - 130);
}; //app title screen

var drawShop = function drawShop() {
  ctx.fillStyle = '#242424';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = '30pt Courier';
  ctx.fillText('Shop', canvas.width / 2, canvas.height * .03);
  ctx.font = '15pt Courier';
  //ctx.fillText('- Click or press any button to play! -', canvas.width/2,canvas.height * .10);
  drawButton(backButton, "Back", "Color");
  drawShopOptions();
  //drawButton(shopButton,"Shop","Color");
  //ctx.drawImage(IMAGES.logo.img, canvas.width/2-IMAGES.logo.width/2,canvas.height/2-IMAGES.logo.height/2 -130);
};

var drawCharacterselect = function drawCharacterselect() {
  ctx.fillStyle = '#242424';
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

  drawcolorOptions();

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

var drawcolorOptions = function drawcolorOptions() {
  ctx.save();

  ctx.lineWidth = 5;

  var plr_width = IMAGES.player_red.width;
  var plr_height = IMAGES.player_red.height;

  ctx.strokeStyle = "black";

  ctx.font = '30pt Courier';

  if (canBered) {
    ctx.fillStyle = "white";
    ctx.fillRect(colorOptionred.x, colorOptionred.y, colorOptionred.width, colorOptionred.height);

    if (color === 'red') ctx.strokeStyle = 'yellow';else ctx.strokeStyle = 'black';
    ctx.strokeRect(colorOptionred.x, colorOptionred.y, colorOptionred.width, colorOptionred.height);
    ctx.fillStyle = "black";
    ctx.fillText("Red", colorOptionred.x + 75, colorOptionred.y + colorOptionred.height - 40);

    ctx.drawImage(IMAGES.player_red.img, colorOptionred.x + colorOptionred.width / 2 - plr_width / 2 * 2.9, colorOptionred.y + colorOptionred.height / 2 - plr_height / 2 * 2.9, plr_width * 2.9, plr_height * 2.9);
  }
  if (canBepurple) {
    ctx.fillStyle = "white";
    ctx.fillRect(colorOptionpurple.x, colorOptionpurple.y, colorOptionpurple.width, colorOptionpurple.height);

    if (color === 'purple') ctx.strokeStyle = 'yellow';else ctx.strokeStyle = 'black';
    ctx.strokeRect(colorOptionpurple.x, colorOptionpurple.y, colorOptionpurple.width, colorOptionpurple.height);
    ctx.fillStyle = "black";
    ctx.fillText("Purple", colorOptionpurple.x + 75, colorOptionpurple.y + colorOptionpurple.height - 40);

    ctx.drawImage(IMAGES.player_purple.img, colorOptionpurple.x + colorOptionpurple.width / 2 - plr_width / 2 * 2.9, colorOptionpurple.y + colorOptionpurple.height / 2 - plr_height / 2 * 2.9, plr_width * 2.9, plr_height * 2.9);
  }
  if (canBegreen) {
    ctx.fillStyle = "white";
    ctx.fillRect(colorOptiongreen.x, colorOptiongreen.y, colorOptiongreen.width, colorOptiongreen.height);

    if (color === 'green') ctx.strokeStyle = 'yellow';else ctx.strokeStyle = 'black';
    ctx.strokeRect(colorOptiongreen.x, colorOptiongreen.y, colorOptiongreen.width, colorOptiongreen.height);
    ctx.fillStyle = "black";
    ctx.fillText("Green", colorOptiongreen.x + 75, colorOptiongreen.y + colorOptiongreen.height - 40);

    ctx.drawImage(IMAGES.player_green.img, colorOptiongreen.x + colorOptiongreen.width / 2 - plr_width / 2 * 2.9, colorOptiongreen.y + colorOptiongreen.height / 2 - plr_height / 2 * 2.9, plr_width * 2.9, plr_height * 2.9);
  }
  if (canBeblue) {
    ctx.fillStyle = "white";
    ctx.fillRect(colorOptionblue.x, colorOptionblue.y, colorOptionblue.width, colorOptionblue.height);

    if (color === 'blue') ctx.strokeStyle = 'yellow';else ctx.strokeStyle = 'black';
    ctx.strokeRect(colorOptionblue.x, colorOptionblue.y, colorOptionblue.width, colorOptionblue.height);
    ctx.fillStyle = "black";
    ctx.fillText("Blue", colorOptionblue.x + 75, colorOptionblue.y + colorOptionblue.height - 40);

    ctx.drawImage(IMAGES.player_blue.img, colorOptionblue.x + colorOptionblue.width / 2 - plr_width / 2 * 2.9, colorOptionblue.y + colorOptionblue.height / 2 - plr_height / 2 * 2.9, plr_width * 2.9, plr_height * 2.9);
  }

  ctx.restore();
};

var drawShopOptions = function drawShopOptions() {
  ctx.save();

  ctx.lineWidth = 5;

  ctx.strokeStyle = "black";

  ctx.font = '12pt Courier';

  ctx.fillStyle = "white";
  ctx.fillRect(BronzeOption.x, BronzeOption.y, BronzeOption.width, BronzeOption.height);
  ctx.strokeRect(BronzeOption.x, BronzeOption.y, BronzeOption.width, BronzeOption.height);
  ctx.fillStyle = "black";
  ctx.fillText(BronzeOption.text1, BronzeOption.text1positionX, BronzeOption.text1positionY);
  ctx.fillText(BronzeOption.text2, BronzeOption.text2positionX, BronzeOption.text2positionY);
  ctx.fillStyle = "white";
  ctx.fillRect(SilverOption.x, SilverOption.y, SilverOption.width, SilverOption.height);
  ctx.strokeRect(SilverOption.x, SilverOption.y, SilverOption.width, SilverOption.height);
  ctx.fillStyle = "black";
  ctx.fillText(SilverOption.text1, SilverOption.text1positionX, SilverOption.text1positionY);
  ctx.fillText(SilverOption.text2, SilverOption.text2positionX, SilverOption.text2positionY);
  ctx.fillStyle = "white";
  ctx.fillRect(GoldOption.x, GoldOption.y, GoldOption.width, GoldOption.height);
  ctx.strokeRect(GoldOption.x, GoldOption.y, GoldOption.width, GoldOption.height);
  ctx.fillStyle = "black";
  ctx.fillText(GoldOption.text1, GoldOption.text1positionX, GoldOption.text1positionY);
  ctx.fillText(GoldOption.text2, GoldOption.text2positionX, GoldOption.text2positionY);

  ctx.restore();
};
'use strict';

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var editMode = true; //maybe if we make a room 'editor'

var doors = {};

var direction = "right";

/* [dungeon map]
     ___  ___  ___
     |4|--|5|--|6|
     ---  ---  ---
      |    |
___  ___  ___  ___  ____
|0|--|1|  |7|  |9|--|10|
---  ---  ---  ---  ----
      |    |    |
___  ___  ___   |
|3|--|2|  |8|---/
---  ---  ---  
*/

//test rooms
var ROOMS = {};
var room_0 = {};
var room_1 = {};
var room_2 = {};
var room_3 = {};
var room_4 = {};
var room_5 = {};
var room_6 = {};
var room_7 = {};
var room_8 = {};
var room_9 = {};
var room_10 = {};

var setupDungeonAssets = function setupDungeonAssets() {
  var _top;

  doors.top = {
    img_open: IMAGES.door_top,
    img_lock: IMAGES.door_top_lock,
    width: IMAGES.door_top.width,
    height: IMAGES.door_top.height
  };
  doors.bottom = {
    img_open: IMAGES.door_bottom,
    img_lock: IMAGES.door_bottom_lock,
    width: IMAGES.door_bottom.width,
    height: IMAGES.door_bottom.height
  };
  doors.left = {
    img_open: IMAGES.door_left,
    img_lock: IMAGES.door_left_lock,
    width: IMAGES.door_left.width,
    height: IMAGES.door_left.height
  };
  doors.right = {
    img_open: IMAGES.door_right,
    img_lock: IMAGES.door_right_lock,
    width: IMAGES.door_right.width,
    height: IMAGES.door_right.height
  };

  room_0 = new Room({
    ID: 'room_0',
    name: 'entrance hall',
    bg_music: 'exploration',
    bg_image: 'room_0',

    entrances: {
      right: {
        ID: 'room_1',
        name: '[left] main hall',
        location: { x: width - doors.right.width, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: false,
        object: doors.right
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_0'] = room_0;

  room_1 = new Room({
    ID: 'room_1',
    name: 'main hall',
    bg_music: 'exploration',
    bg_image: 'room_0',

    entrances: {
      bottom: {
        ID: 'room_2',
        name: '[down] basement A',
        location: { x: width / 2 - doors.bottom.width / 2, y: height - doors.bottom.height },
        open: true,
        visited: false,
        object: doors.bottom
      },
      top: (_top = {
        ID: 'room_4',
        name: '[up] roof A'
      }, _defineProperty(_top, 'name', '[up] roof A'), _defineProperty(_top, 'location', { x: width / 2 - doors.top.width / 2, y: 0 }), _defineProperty(_top, 'open', true), _defineProperty(_top, 'visited', false), _defineProperty(_top, 'object', doors.top), _top),
      left: {
        ID: 'room_0',
        name: '[left] entrance hall',
        location: { x: 0, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: true,
        object: doors.left
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_1'] = room_1;

  room_2 = new Room({
    ID: 'room_2',
    name: 'basement',
    bg_music: 'exploration',
    bg_image: 'room_2',

    entrances: {
      top: {
        ID: 'room_1',
        name: '[up] main hall',
        location: { x: width / 2 - doors.top.width / 2, y: 0 },
        object: doors.top,
        open: true,
        visited: true
      },
      left: {
        ID: 'room_3',
        name: '[left] storage room',
        location: { x: 0, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: false,
        object: doors.left
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_2'] = room_2;

  room_3 = new Room({
    ID: 'room_3',
    name: 'storage room',
    bg_music: 'exploration',
    bg_image: 'room_2',

    entrances: {
      right: {
        ID: 'room_2',
        name: '[right] basement',
        location: { x: width - doors.right.width, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: true,
        object: doors.right
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_3'] = room_3;

  room_4 = new Room({
    ID: 'room_4',
    name: 'roof A',
    bg_music: 'exploration',
    bg_image: 'room_1',

    entrances: {
      right: {
        ID: 'room_5',
        name: '[right] roof B',
        location: { x: width - doors.right.width, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: false,
        object: doors.right
      },
      bottom: {
        ID: 'room_1',
        name: '[down] main hall',
        location: { x: width / 2 - doors.bottom.width / 2, y: height - doors.bottom.height },
        open: true,
        visited: true,
        object: doors.bottom
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_4'] = room_4;

  room_5 = new Room({
    ID: 'room_5',
    name: 'roof B',
    bg_music: 'exploration',
    bg_image: 'room_1',

    entrances: {
      right: {
        ID: 'room_6',
        name: '[right] balcony',
        location: { x: width - doors.right.width, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: false,
        object: doors.right
      },
      bottom: {
        ID: 'room_7',
        name: '[down] hall B',
        location: { x: width / 2 - doors.bottom.width / 2, y: height - doors.bottom.height },
        open: true,
        visited: false,
        object: doors.bottom
      },
      left: {
        ID: 'room_4',
        name: '[left] roof A',
        location: { x: 0, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: true,
        object: doors.left
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_5'] = room_5;

  room_6 = new Room({
    ID: 'room_6',
    name: 'balcony',
    bg_music: 'exploration',
    bg_image: 'room_1',

    entrances: {
      left: {
        ID: 'room_5',
        name: '[left] roof B',
        location: { x: 0, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: true,
        object: doors.left
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_6'] = room_6;

  room_7 = new Room({
    ID: 'room_7',
    name: 'hall B',
    bg_music: 'exploration',
    bg_image: 'room_0',

    entrances: {
      bottom: {
        ID: 'room_8',
        name: '[down] basement B',
        location: { x: width / 2 - doors.bottom.width / 2, y: height - doors.bottom.height },
        open: true,
        visited: false,
        object: doors.bottom
      },
      top: {
        ID: 'room_5',
        name: '[up] roof B',
        location: { x: width / 2 - doors.top.width / 2, y: 0 },
        object: doors.top,
        open: true,
        visited: true
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_7'] = room_7;

  room_8 = new Room({
    ID: 'room_8',
    name: 'basement B',
    bg_music: 'exploration',
    bg_image: 'room_2',

    entrances: {
      right: {
        ID: 'room_9',
        name: '[right] hall C',
        location: { x: width - doors.right.width, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: false,
        object: doors.right
      },
      top: {
        ID: 'room_7',
        name: '[up] hall B',
        location: { x: width / 2 - doors.top.width / 2, y: 0 },
        object: doors.top,
        open: true,
        visited: true
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_8'] = room_8;

  room_9 = new Room({
    ID: 'room_9',
    name: 'hall C',
    bg_music: 'exploration',
    bg_image: 'room_0',

    entrances: {
      right: {
        ID: 'room_10',
        name: '[right] Throne room',
        location: { x: width - doors.right.width, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: false,
        object: doors.right
      },
      bottom: {
        ID: 'room_8',
        name: '[down] basement B',
        location: { x: width / 2 - doors.bottom.width / 2, y: height - doors.bottom.height },
        open: true,
        visited: true,
        object: doors.bottom
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_9'] = room_9;

  room_10 = new Room({
    ID: 'room_10',
    name: 'Throne room',
    bg_music: 'exploration',
    bg_image: 'room_0',

    entrances: {
      left: {
        ID: 'room_9',
        name: '[left] hall C',
        location: { x: 0, y: height / 2 - doors.right.height / 2 },
        open: true,
        visited: true,
        object: doors.left
      }
    },

    goals: [goal_defeatAllEnemies]

  });ROOMS['room_10'] = room_10;

  room_0.enemiesCount = 0;
  ROOMS.current = room_0;
  enterRoom(room_0);
};

// setup spawn locations
var spawnLeft = {
  player1: { x: 77.5, y: 280.5 },
  player2: { x: 77.5, y: 312.5 },
  player3: { x: 77.5, y: 342.5 },
  player4: { x: 77.5, y: 372.5 }
};

var spawnTop = {
  player1: { x: 526.5, y: 66.5 },
  player2: { x: 556.5, y: 66.5 },
  player3: { x: 586.5, y: 66.5 },
  player4: { x: 616.5, y: 66.5 }
};

var spawnBottom = {
  player1: { x: 534, y: 578.5 },
  player2: { x: 564, y: 578.5 },
  player3: { x: 594, y: 578.5 },
  player4: { x: 624, y: 578.5 }
};

var spawnRight = {
  player1: { x: 1071.5, y: 280.5 },
  player2: { x: 1071.5, y: 312.5 },
  player3: { x: 1071.5, y: 342.5 },
  player4: { x: 1071.5, y: 372.5 }
};

var enterRoom = function enterRoom(newRoom) {
  //set visited bool, and store 
  ROOMS.current.visited = true;
  var lastRoom = ROOMS.current;

  ROOMS.current = newRoom;
  ROOMS.current.entered_from = lastRoom;
  playEffect("Unlock", false);
  if (lastRoom != newRoom) {
    reviveAll("restart");

    positionInNextRoom(lastRoom, ROOMS.current);

    if (ROOMS.current.visited == false) {
      initEnemies(ROOMS.current.enemiesCount);
      spawnEnemies();
      moveButton.available = false;
    }
  }

  ROOMS.current.loadRoom();
  if (isHost) socket.emit('updateRoom', { room: ROOMS.current.ID, coins: coins });
};

var setRoom = function setRoom(room) {
  ROOMS.current = ROOMS[room] || ROOMS[room_0];
  ROOMS.current.lockDoors();
  console.log('set room');
};

//position chars in new room
var positionInNextRoom = function positionInNextRoom(lastRoom, currentRoom) {
  //try to find which direction we came from
  if (isHost) {

    emptyEnemiesandBullets();

    var entrances = lastRoom.entrances;
    for (var i in entrances) {
      if (entrances[i].ID == currentRoom.ID) {
        direction = i;
      }
    }
    //put each player in the right position after the program finds where party came from
    if (direction == "right") {
      var spawnKeys = Object.keys(spawnLeft);
      var playerKeys = Object.keys(players);
      for (var _i = 0; _i < playerKeys.length; _i++) {
        var player = players[playerKeys[_i]];
        var newLocation = spawnLeft[spawnKeys[_i]];
        player.x = newLocation.x;
        player.y = newLocation.y;
        player.prevX = newLocation.x;
        player.prevY = newLocation.y;
        player.destX = newLocation.x;
        player.destY = newLocation.y;
      }
    } else if (direction == "left") {
      var _spawnKeys = Object.keys(spawnRight);
      var _playerKeys = Object.keys(players);
      for (var _i2 = 0; _i2 < _playerKeys.length; _i2++) {
        var _player = players[_playerKeys[_i2]];
        var _newLocation = spawnRight[_spawnKeys[_i2]];
        _player.x = _newLocation.x;
        _player.y = _newLocation.y;
        _player.prevX = _newLocation.x;
        _player.prevY = _newLocation.y;
        _player.destX = _newLocation.x;
        _player.destY = _newLocation.y;
      }
    } else if (direction == "bottom") {
      var _spawnKeys2 = Object.keys(spawnTop);
      var _playerKeys2 = Object.keys(players);
      for (var _i3 = 0; _i3 < _playerKeys2.length; _i3++) {
        var _player2 = players[_playerKeys2[_i3]];
        var _newLocation2 = spawnTop[_spawnKeys2[_i3]];
        _player2.x = _newLocation2.x;
        _player2.y = _newLocation2.y;
        _player2.prevX = _newLocation2.x;
        _player2.prevY = _newLocation2.y;
        _player2.destX = _newLocation2.x;
        _player2.destY = _newLocation2.y;
      }
    } else if (direction == "top") {
      var _spawnKeys3 = Object.keys(spawnBottom);
      var _playerKeys3 = Object.keys(players);
      for (var _i4 = 0; _i4 < _playerKeys3.length; _i4++) {
        var _player3 = players[_playerKeys3[_i4]];
        var _newLocation3 = spawnBottom[_spawnKeys3[_i4]];
        _player3.x = _newLocation3.x;
        _player3.y = _newLocation3.y;
        _player3.prevX = _newLocation3.x;
        _player3.prevY = _newLocation3.y;
        _player3.destX = _newLocation3.x;
        _player3.destY = _newLocation3.y;
      }
    }
  }
};

//room clear goals
var goal_defeatAllEnemies = function goal_defeatAllEnemies() {
  var keys = Object.keys(enemies);
  for (var i = 0; i < keys.length; i++) {
    if (enemies[keys[i]]) return false;
  }
  return true;
};

var goal_waitForGameStart = function goal_waitForGameStart() {
  return gameLocked;
};

var goal_collectObjects = function goal_collectObjects(toCollect) {};

var goal_reachArea = function goal_reachArea(area) {
  if (area.radius) {
    //check circle collision with area
  } else {
      //check box collision with area
    }
};

var goal_triggerEvents = function goal_triggerEvents(events) {};

var goal_defeatBoss = function goal_defeatBoss(boss) {};
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
    var bullet = new Bullet(playerPos, normVec, hash);
    bulletArray.push(bullet);
    canFire = false;
    playEffect("Shooting", false);
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

var moveParticles = function moveParticles() {
  for (var i = 0; i < particles.length; i++) {
    var particle = particles[i];

    if (particle.y > canvas_overlay.height) {
      particle.y = Math.random() * -200;
    }
    particle.prevX = particle.x;
    particle.prevY = particle.y;
    var velX = Math.random() * 0;
    var velY = Math.random() * (40 - 20);
    particle.destX = particle.x + velX;
    particle.destY = particle.y + velY;
    particle.alpha = 0.05;
    particle.x = lerp(particle.prevX, particle.destX, particle.alpha);
    particle.y = lerp(particle.prevY, particle.destY, particle.alpha);
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
      var bullet = new Bullet(playerPos, normVec, players[playersProps[keys[i]].hash].hash);
      bulletArray.push(bullet);
      playersProps[keys[i]].canFire = false;
      socket.emit('updateFireProps', { id: playersProps[keys[i]].id, canFire: playersProps[keys[i]].canFire });
      socket.emit('playShootEffect', {});
    }
  }
  //socket.emit('updateFireProps', {id: playersProps[keys[i]].id, canFire: playersProps[keys[i]].canFire});
  //socket.emit('updateFireProps', {playersProps: playersProps});
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
  //socket.emit('updateFireProps', {playersProps: playersProps});
};
//endregion

var getRandomColor = function getRandomColor(a) {
  var red = Math.round(Math.random() * 254 + 1);
  var green = Math.round(Math.random() * 254 + 1);
  var blue = Math.round(Math.random() * 254 + 1);
  var a = a;
  var color = 'rgba(' + red + ',' + green + ',' + blue + ',' + a + ')';
  return color;
};

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
          //console.log('collision b/w bullet and enemy detected');
          var bullet = arr1.splice(i, 1);
          // deal dmg to enemy here
          if (arr2[j].hp > 0) {
            arr2[j].hp -= 2;
            playEffect("MonsterOnHit", false);
            socket.emit('playMonsterOnHit', {});
          } else {
            arr2.splice(j, 1);
            var hashout = bullet[0].firedfrom;
            players[hashout].enemiesKilled += 1;
            //playEffect("Pop", false);
            socket.emit('playPop', {});

            var coinGain = Math.floor(getRandomRange(10, 100));
            socket.emit('gainCoins', { coinGain: coinGain });

            playEffect("Coin", false);
            socket.emit('playCoin', {});
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
        //console.log('collision b/w character and enemy detected');

        playEffect("SlimeShotAtk", false);

        if (plrObj[keys[i]].hp > 0) {
          plrObj[keys[i]].hp -= 2;
          playEffect("OnHit", false);
        } else {
          // what happens to player when they 'die'

          console.log('player should be dead');
          playEffect("DeathGrunt", false);
          socket.emit('playDeathGrunt', {});
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
var drawButton = function drawButton(button, text, color, context) {
  var c = context || ctx;
  c.save();
  c.fillStyle = color || button.color;
  c.lineWidth = 1.5;
  drawRoundedRect(button.x, button.y, button.width, button.height, 3, c, true);
  fillText(c, text || button.text, button.x + button.width / 2, button.y + button.height / 2, 'bold 13pt Trebuchet MS', button.textColor || 'black', true);
  c.restore();
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

var colorOptiontap = function colorOptiontap() {

  if (cursor.x > colorOptionred.x && cursor.x < colorOptionred.x + colorOptionred.width && cursor.y > colorOptionred.y && cursor.y < colorOptionred.y + colorOptionred.height) {
    color = "red";
  } else if (cursor.x > colorOptiongreen.x && cursor.x < colorOptiongreen.x + colorOptiongreen.width && cursor.y > colorOptiongreen.y && cursor.y < colorOptiongreen.y + colorOptiongreen.height) {
    color = "green";
  } else if (cursor.x > colorOptionblue.x && cursor.x < colorOptionblue.x + colorOptionblue.width && cursor.y > colorOptionblue.y && cursor.y < colorOptionblue.y + colorOptionblue.height) {
    color = "blue";
  } else if (cursor.x > colorOptionpurple.x && cursor.x < colorOptionpurple.x + colorOptionpurple.width && cursor.y > colorOptionpurple.y && cursor.y < colorOptionpurple.y + colorOptionpurple.height) {
    color = "purple";
  }
};

var checkdeadtoplayerRadius = function checkdeadtoplayerRadius(hash) {

  var player = players[hash];
  var keys = Object.keys(players);
  for (var i = 0; i < keys.length; i++) {
    //if its the same character, skip over
    if (players[keys[i]].hash == hash) {} else {
      var otherPlayer = players[keys[i]];
      //see if that other player is dead 
      if (otherPlayer.hp <= 0) {
        var deltaX = Math.pow(player.x - otherPlayer.x, 2);
        var deltaY = Math.pow(player.y - otherPlayer.y, 2);
        var distance = Math.sqrt(deltaX + deltaY);
        if (distance <= 30) {
          var playerReviving = players[keys[i]].hash;
          return playerReviving;
        }
      }
    }
  }
  return undefined;
};

var revive = function revive(hashRevive, casein) {

  if (casein == "moving") {
    players[hashRevive].hp = players[hashRevive].maxHP / 2;
  } else if (casein == "restart") {
    players[hashRevive].hp = players[hashRevive].maxHP;
  }
  var player = players[hashRevive];
  socket.emit('revivedtoSer', { player: player });
};

var reviveAll = function reviveAll(casein) {
  //host revives all players as they transition into a new room.
  if (isHost) {
    var keys = Object.keys(players);
    for (var i = 0; i < keys.length; i++) {
      var player = players[keys[i]];
      if (player.hp <= 0) {
        revive(player.hash, casein);
      }
    }
  } else {
    socket.emit("revivedAlltoSer", {});
  }
};

var emptyEnemiesandBullets = function emptyEnemiesandBullets() {
  enemies = [];
  bulletArray = [];
  socket.emit('updateBullets', { bulletArray: bulletArray });
  socket.emit('updateEnemies', { enemies: enemies });
};

var PositionReset = function PositionReset() {
  /*
  let keys = Object.keys(players);
  for(let i = 0; i < keys.length; i++)
      {
          let player = players[keys[i]];
          player.x = canvas.width/2;
          player.y = canvas.height/2;
          player.prevX = canvas.width/2;
          player.prevY = canvas.height/2;
          player.destX = canvas.width/2;
          player.destY = canvas.height/2;
      }
  */
  //put each player in the right position after the program finds where party came from
  if (direction == "right") {
    var spawnKeys = Object.keys(spawnLeft);
    var playerKeys = Object.keys(players);
    for (var i = 0; i < playerKeys.length; i++) {
      var player = players[playerKeys[i]];
      var newLocation = spawnLeft[spawnKeys[i]];
      player.x = newLocation.x;
      player.y = newLocation.y;
      player.prevX = newLocation.x;
      player.prevY = newLocation.y;
      player.destX = newLocation.x;
      player.destY = newLocation.y;
    }
  } else if (direction == "left") {
    var _spawnKeys = Object.keys(spawnRight);
    var _playerKeys = Object.keys(players);
    for (var _i = 0; _i < _playerKeys.length; _i++) {
      var _player = players[_playerKeys[_i]];
      var _newLocation = spawnRight[_spawnKeys[_i]];
      _player.x = _newLocation.x;
      _player.y = _newLocation.y;
      _player.prevX = _newLocation.x;
      _player.prevY = _newLocation.y;
      _player.destX = _newLocation.x;
      _player.destY = _newLocation.y;
    }
  } else if (direction == "bottom") {
    var _spawnKeys2 = Object.keys(spawnTop);
    var _playerKeys2 = Object.keys(players);
    for (var _i2 = 0; _i2 < _playerKeys2.length; _i2++) {
      var _player2 = players[_playerKeys2[_i2]];
      var _newLocation2 = spawnTop[_spawnKeys2[_i2]];
      _player2.x = _newLocation2.x;
      _player2.y = _newLocation2.y;
      _player2.prevX = _newLocation2.x;
      _player2.prevY = _newLocation2.y;
      _player2.destX = _newLocation2.x;
      _player2.destY = _newLocation2.y;
    }
  } else if (direction == "top") {
    var _spawnKeys3 = Object.keys(spawnBottom);
    var _playerKeys3 = Object.keys(players);
    for (var _i3 = 0; _i3 < _playerKeys3.length; _i3++) {
      var _player3 = players[_playerKeys3[_i3]];
      var _newLocation3 = spawnBottom[_spawnKeys3[_i3]];
      _player3.x = _newLocation3.x;
      _player3.y = _newLocation3.y;
      _player3.prevX = _newLocation3.x;
      _player3.prevY = _newLocation3.y;
      _player3.destX = _newLocation3.x;
      _player3.destY = _newLocation3.y;
    }
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
    ambienceAudio = undefined,
    currentEffect = 0,
    currentDirection = 1;

var mouse = { x: 0, y: 0 };
var cursor = undefined;
var dragging = false;

var IMAGES = {};
var ANIMATIONS = {};

var bufferTime = 0;
var canFire = true;
var lastTime = void 0;

var color = void 0;
var canBered = void 0;
var canBepurple = void 0;
var canBegreen = void 0;
var canBeblue = void 0;

var colorOptionred = void 0;
var colorOptionpurple = void 0;
var colorOptionblue = void 0;
var colorOptiongreen = void 0;

var startButton = void 0,
    selectButton = void 0,
    debugButton = void 0,
    moveButton = void 0,
    shopButton = void 0,
    backButton = void 0,
    BuyButton = void 0;
var BronzeOption = void 0,
    SilverOption = void 0,
    GoldOption = void 0;

var STATES = {
  wait: 'wait',
  preload: 'preload',
  title: 'title',
  shop: 'shop',
  setupGame: 'setupGame',
  game: 'game',
  gameover: 'gameover',
  characterSelect: 'characterSelect'
};
var gameState = STATES.wait;
var paused = false,
    debug = true;
var gameLocked = false;

var players = {};
var bulletArray = [];
var enemies = [];
var rooms = {};
var coins = 0;
var endGame = 0;

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
    case STATES.shop:
      shopLoop();
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

  color = undefined;
};

window.onload = init;

var pauseGame = function pauseGame() {
  paused = true;
  //stop animation loop
  //cancelAnimationFrame(animationFrame);

  stopBgAudio();
};

var resumeGame = function resumeGame() {
  //stop animation loop just in case
  //cancelAnimationFrame(animationFrame);

  playBgAudio();
  paused = false;

  //call update
  //requestAnimationFrame(stateHandler);
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
'use strict';

//--vars-----------------------------region
var bgTracks = {
  floralLife: { src: 'assets/audio/Floral Life (Henesys).mp3', lastTime: 0 },
  exploration: { src: 'assets/audio/Exploration - Xenoblade Chronicles 2.mp3', lastTime: 0 },
  current: {}
};
var currentTrack = bgTracks.exploration;

var effectSounds = {
  //"1.mp3" ,"2.mp3", "3.mp3", "4.mp3", "5.mp3", "6.mp3", "7.mp3", "8.mp3"
  BarrelBreakBasement: { src: 'assets/audio/barrel-break-basement.wav', lastTime: 0 },
  BarrelBreakHall: { src: 'assets/audio/barrel-break-hall.wav', lastTime: 0 },
  BirdChirp: { src: 'assets/audio/bird_chirp.wav', lastTime: 0 },
  Coin: { src: 'assets/audio/coin.wav', lastTime: 0 },
  DeathGrunt: { src: 'assets/audio/death_grunt.wav', lastTime: 0 },
  FireCracking: { src: 'assets/audio/fire_cracking_ambience.wav', lastTime: 0 },
  HeartBeat: { src: 'assets/audio/heartbeat.wav', lastTime: 0 },
  OnHit: { src: 'assets/audio/hit_final.wav', lastTime: 0 },
  MonsterOnHit: { src: 'assets/audio/monster_onHit.wav', lastTime: 0 },
  Pop: { src: 'assets/audio/pop.wav', lastTime: 0 },
  PotBreakBasement: { src: 'assets/audio/pot_break_basement.wav', lastTime: 0 },
  PotBreakHall: { src: 'assets/audio/pot_break_hall.wav', lastTime: 0 },
  Reload: { src: 'assets/audio/reload.WAV', lastTime: 0 },
  Rumble: { src: 'assets/audio/rumble.wav', lastTime: 0 },
  Shooting: { src: 'assets/audio/shooting.wav', lastTime: 0 },
  SlimeShotAtk: { src: 'assets/audio/slime_shot_atk.wav', lastTime: 0 },
  UIButton: { src: 'assets/audio/ui_button_sound.wav', lastTime: 0 },
  Unlock: { src: 'assets/audio/unlock_final.WAV', lastTime: 0 },
  Wind: { src: 'assets/audio/wind_ambience.wav', lastTime: 0 }
};

//image preloading vv
var loadQueue = -1;
var numLoaded = 0;

var toLoadImgs = [{
  name: 'door_top_lock',
  url: 'assets/img/door-top-lock.png'
}, //top door lock
{
  name: 'door_top',
  url: 'assets/img/door-top.png'
}, //top door
{
  name: 'door_bottom_lock',
  url: 'assets/img/door-bottom-lock.png'
}, //bottom door lock
{
  name: 'door_bottom',
  url: 'assets/img/door-bottom.png'
}, //bottom door
{
  name: 'door_left_lock',
  url: 'assets/img/door-left-lock.png'
}, //left door lock
{
  name: 'door_left',
  url: 'assets/img/door-left.png'
}, //left door
{
  name: 'door_right_lock',
  url: 'assets/img/door-right-lock.png'
}, //right door lock
{
  name: 'door_right',
  url: 'assets/img/door-right.png'
}, //right door
{
  name: 'dungeon_walls',
  url: 'assets/img/dungeon-walls.png'
}, //dungeon walls
{
  name: 'room_0',
  url: 'assets/img/room_0.png'
}, //room 0
{
  name: 'room_1',
  url: 'assets/img/room_1.png'
}, //room 1
{
  name: 'room_2',
  url: 'assets/img/room_2.png'
}, //room 2
{
  name: 'player_red',
  url: 'assets/img/plr-red.png'
}, //red player
{
  name: 'player_blue',
  url: 'assets/img/plr-blue.png'
}, //blue player
{
  name: 'player_green',
  url: 'assets/img/plr-green.png'
}, //green player
{
  name: 'player_purple',
  url: 'assets/img/plr-purple.png'
}, //purple player
{
  name: 'player_red_ko',
  url: 'assets/img/plr-ko-red.png'
}, //red player
{
  name: 'player_blue_ko',
  url: 'assets/img/plr-ko-blue.png'
}, //blue player
{
  name: 'player_green_ko',
  url: 'assets/img/plr-ko-green.png'
}, //green player
{
  name: 'player_purple_ko',
  url: 'assets/img/plr-ko-purple.png'
}, //purple player
{
  name: 'mob_blue',
  url: 'assets/img/mob-blue.png'
}, //blue slime
{
  name: 'logo',
  url: 'assets/img/test.png'
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
  bgAudio.volume = 0.03;
  effectAudio = document.querySelector("#effectAudio");
  effectAudio.volume = 0.3;
  ambienceAudio = document.querySelector("#ambienceAudio");
  ambienceAudio.volume = 0.3;
  bgAudio.current = bgTracks.exploration;
  bgAudio.src = bgAudio.current.src;
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

var playEffect = function playEffect(fileName, loop) {
  //effectAudio.loop = loop;
  //currentEffect = Math.round(Math.random()*8)-1;
  //if(currentEffect<0)currentEffect=0;

  if (effectAudio.paused) {
    effectAudio.current = effectSounds[fileName];
    effectAudio.src = effectAudio.current.src;
    effectAudio.load();
    effectAudio.play();
  }

  //effectAudio.src = effectSounds[fileName].src; //"assets/audio/" + effectSounds[currentEffect];
  //console.log(currentEffect);
};

var playAmbience = function playAmbience(fileName) {
  if (fileName === "none") {
    ambienceAudio.pause();
    return;
  }

  if (ambienceAudio.paused) {
    ambienceAudio.current = effectSounds[fileName];
    ambienceAudio.src = ambienceAudio.current.src;
    ambienceAudio.load();
    ambienceAudio.play();
  }
};
//endregion
'use strict';

//handles map related functions
var COLORS = {
  available: 'white',
  unavailable: '#c1c1c1'
};

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

  opts.title = 'vote! - response in in console';
  opts.open = true;

  setMenu(opts);
};

var setChangeRoomMenu = function setChangeRoomMenu() {
  var opts = {};
  opts.options = {};

  var offset = 150;
  var keys = Object.keys(ROOMS.current.entrances);

  var _loop = function _loop(i) {
    var door = ROOMS.current.entrances[keys[i]];
    if (door.open) {
      opts.options[door.ID] = new button(200, offset, { text: door.name });
      opts.options[door.ID].callback = function () {
        enterRoom(ROOMS[door.ID]);
        closeMenu();
      };
    } else {
      opts.options[door.ID] = new button(200, offset, { text: door.name + ' [X]' });
      opts.options[door.ID].available = false;
    }
    offset += 70;
  };

  for (var i = 0; i < keys.length; i++) {
    _loop(i);
  }

  opts.title = 'Choose a room to move to';
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

//console.dir(menu.options);

menu.checkClose = function () {
  if (!isInBounds(cursor, { x: 90, y: 100, width: width - 200, height: height - 180 })) closeMenu();
};

menu.toggle = function () {
  //if(roomSelect.open) closeRoomSelect();
  openMenu();
};

var openMenu = function openMenu() {
  //suspendPlayerControls();

  menu.open = true;
  console.log('open menu');
};

var closeMenu = function closeMenu() {
  //restorePlayerControls();

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
    ctx_overlay.fillStyle = 'rgba(100, 115, 139, 0.45)';
    ctx_overlay.strokeStyle = 'black';
    ctx_overlay.lineWidth = 3;
    drawRoundedRect(100, 90, width - 200, height - 180, 7, ctx_overlay, true);

    ctx_overlay.textAlign = 'left';
    fillText(ctx_overlay, menu.title, 170, 120, '15pt courier', 'white');

    var keys = Object.keys(menu.options);
    for (var i = 0; i < keys.length; i++) {
      var btn = menu.options[keys[i]];
      drawButton(btn, btn.text, "white", ctx_overlay);
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

  socket.on('initialJoined', function (data) {
    gameState = STATES.preload;
    canBered = data.Red;
    canBepurple = data.Purple;
    canBegreen = data.Green;
    canBeblue = data.Blue;

    colorOptionred = new colorOption(canvas.width * .1, 150, 150, 300, "Red", canBered);
    colorOptionpurple = new colorOption(canvas.width * .32, 150, 150, 300, "Purple", canBepurple);
    colorOptiongreen = new colorOption(canvas.width * .54, 150, 150, 300, "Green", canBegreen);
    colorOptionblue = new colorOption(canvas.width * .75, 150, 150, 300, "Blue", canBeblue);

    colorOptionblue.available = true;
    colorOptionred.available = true;
    colorOptiongreen.available = true;
    colorOptionpurple.available = true;
  });

  // only runs if it's this user is the first to join a room
  socket.on('setHost', function () {
    isHost = true;
    console.log('I am the host');
    initEnemies(0);
    spawnEnemies();
  });

  // once this user successfully joins
  socket.on("joined", function (data) {
    setUser(data);
    socket.emit('getRoomData', {});
  });

  //if other players join
  socket.on("otherConnects", function (data) {
    setOtherplayers(data);
  });

  // should only run on host client
  socket.on('updatedKeys', update);

  socket.on('updatedFire', function (data) {
    playersProps[hash] = data;
    //console.log(playersProps[data.hash]);
  });

  // should only run on clients that are not the host
  socket.on('updatedPos', update);

  socket.on('updatedFireProps', function (data) {
    if (gameState === STATES.game) {
      canFire = data.canFire;
    }
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

  socket.on('updatedRoom', function (data) {
    if (!isHost) {
      setRoom(data.room);
      coins = data.coins;
      console.log('set room: ' + data.room);
    }
    console.log('got room update');
  });

  socket.on('sendRoomData', function () {
    console.log('got send room req');
    if (isHost) socket.emit('updateRoom', { room: ROOMS.current.ID, coins: coins });
  });

  socket.on('gainedCoins', function (data) {
    console.log('in gain coin');
    if (isHost) {
      coins += data.coinGain;
      //console.log(`coins: ${coins}`);
      socket.emit('updateCoins', { coins: coins });
    }
  });

  socket.on('updatedCoins', function (data) {
    coins = data.coins;
    console.log('coins: ' + coins);
  });

  socket.on('playerCollided', function (data) {
    //console.log('received: player collision detected with enemy');
    playEffect("SlimeShotAtk", false);
    playEffect("OnHit", false);
    players[data.player.hash] = data.player;
  });

  socket.on('reconnect', function () {
    console.log('reconnected');
  });

  socket.on('deleteDisconnect', function (data) {
    delete players[data.hash];
  });

  socket.on('reviveTohost', function (data) {
    console.log("someone is getting revived");
    revive(data.hash, "moving");
  });

  socket.on('revivedtoSer', function (data) {
    console.log("revived message recieved from host");
    players[data.hash] = data;
  });

  socket.on('revivedtoClients', function (data) {
    console.log("revived members being recieved by host");
    players[data.player.hash] = data.player;
  });

  socket.on("reviveAllTohost", function () {
    console.log("revive everyone since we are transitioning");
    reviveAll("moving");
  });

  socket.on('rpcCalled', rpcCall);

  socket.on('playedShootEffect', function () {
    playEffect("Shooting", false);
  });

  socket.on('playedMonsterOnHitEffect', function () {
    playEffect("MonsterOnHit", false);
  });

  socket.on('playedPop', function () {
    playEffect("Pop", false);
  });

  socket.on('playedDeathGrunt', function () {
    playEffect("DeathGrunt", false);
  });

  socket.on('playedCoin', function () {
    playerEffect("Coin", false);
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
  if (cursor.over !== false) {
    cursor.over.callback();
    playEffect("UIButton", false);
  }
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
      var shopBool = buttonTap(shopButton);

      if (startBool) {
        gameState = STATES.characterSelect;
        assignStartupEvents();
        console.log('setting up game');
      }

      if (shopBool) {
        gameState = STATES.shop;
        assignStartupEvents();
        console.log("going to shop");
      }
      checkButton();
      setAnim(cursor, 'click', 'once');
    };
  }

  if (gameState === STATES.shop) {

    canvas_overlay.onmousedown = function () {
      var backBool = buttonTap(backButton);

      if (backBool) {
        gameState = STATES.title;
        assignStartupEvents();
        console.log("back to title screen");
      }
      checkButton();
      setAnim(cursor, 'click', 'once');
    };
  }

  if (gameState === STATES.characterSelect) {

    canvas_overlay.onmousedown = function () {

      var selectBool = buttonTap(selectButton);
      colorOptiontap();
      if (selectBool && color != undefined) {
        removeStartupEvents();
        gameState = STATES.setupGame;
        console.log('setting up game');
        socket.emit('join', { color: color });
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
  //average all player locations
  var xtotal = 0;
  var ytotal = 0;
  var keys = Object.keys(players);
  var avgPos = void 0;

  //if it is the start of game
  if (keys.length == 0) {
    xtotal = canvas.width / 2;
    ytotal = canvas.height / 2;
    avgPos = { x: xtotal, y: ytotal };
  }

  //else count for avg
  else {
      for (var j = 0; j < keys.length; j++) {
        var player = players[keys[j]];
        xtotal += player.x;
        ytotal += player.y;
      }
      avgPos = { x: xtotal / keys.length, y: ytotal / keys.length };
    }

  for (var i = 0; i < enemies.length; i++) {
    var enemiesplaced = false;

    while (enemiesplaced == false) {
      //previous was {20, canvas.width - 20}
      var x = getRandomRange(77.5, 1071.5);
      var y = getRandomRange(66.5, 578.5);

      var testposition = { x: x, y: y };

      var distance = getDistance(avgPos, testposition);

      if (distance >= 200) {
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
var update = function update(data) {
  if (isHost) {
    console.log('keys updated');
    players[data.hash].moveUp = data.input.moveUp;
    players[data.hash].moveLeft = data.input.moveLeft;
    players[data.hash].moveDown = data.input.moveDown;
    players[data.hash].moveRight = data.input.moveRight;
  } else {
    console.log('updatedPos');
    var keys = Object.keys(data.players);
    for (var i = 0; i < keys.length; i++) {
      if (players[data.players[keys[i]].hash]) {
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
var setUser = function setUser(data) {
  hash = data.hash; // set this client's hash to the unique hash the server gives them
  if (color == "blue") {
    players[hash] = new Character(hash, IMAGES.player_blue);
  }
  if (color == "red") {
    players[hash] = new Character(hash, IMAGES.player_red);
  }
  if (color == "green") {
    players[hash] = new Character(hash, IMAGES.player_green);
  }
  if (color == "purple") {
    players[hash] = new Character(hash, IMAGES.player_purple);
  }
  console.log('id: ' + data.id);
  console.log('joined server');
  //gameState = STATES.preload // start animating;
};

var setOtherplayers = function setOtherplayers(data) {
  if (data.hash === hash) return;
  console.log('another user joined');
  if (data.color == "green") {
    players[data.hash] = new Character(data.hash, IMAGES.player_green);
  } else if (data.color == "blue") {
    players[data.hash] = new Character(data.hash, IMAGES.player_blue);
  } else if (data.color == "red") {
    players[data.hash] = new Character(data.hash, IMAGES.player_red);
  }
  if (data.color == "purple") {
    players[data.hash] = new Character(data.hash, IMAGES.player_purple);
  }

  if (isHost) socket.emit('spawnEnemies', { id: data.id, enemies: {} });
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

    //socket.emit("updatePos", {player: plr});
  }
  socket.emit("updatePos", { players: players });
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

  //play audio
  playBgAudio();

  setupDungeonAssets();

  //go to game loop
  gameState = STATES.game;
}; //setup and start the game

var doOnPreloadDone = function doOnPreloadDone() {
  console.log('done loading images');
  startButton = new button(canvas.width / 2 - 100, canvas.height * .75);
  selectButton = new button(canvas.width / 2 - 100, canvas.height * .75);
  shopButton = new button(canvas.width / 2 - 100, canvas.height * .75 + 75);
  backButton = new button(canvas.width / 2 - 100, canvas.height * .75);
  BronzeOption = new shopOption(100, 50, 275, 400, 'BRONZE', 'Get Bronze Unique Cosmetics');
  SilverOption = new shopOption(450, 50, 275, 400, 'SILVER', 'Get Silver Unqiue Cosmetics');
  GoldOption = new shopOption(800, 50, 275, 400, 'GOLD', 'Get Gold Unqiue Cosmetics');

  debugButton = new button(10, 10, { width: 70, height: 35, text: '[debug]' });
  debugButton.callback = menu.toggle;

  moveButton = new button(90, 10, { width: 50, height: 35, text: 'move' });
  moveButton.callback = function () {
    if (moveButton.available) {
      setChangeRoomMenu();
      menu.toggle();
    }
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
  if (cursor.isOverButton(shopButton)) cursor.enterButton(shopButton);
};

var shopLoop = function shopLoop() {
  drawShop();

  if (cursor.isOverButton(backButton)) cursor.enterButton(backButton);
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

  //drawPlaceholder();

  // non-host clients send key updates to server
  if (players[hash]) {

    var input = {
      moveUp: players[hash].moveUp,
      moveLeft: players[hash].moveLeft,
      moveDown: players[hash].moveDown,
      moveRight: players[hash].moveRight
    };

    if (!isHost && gameState === STATES.game) socket.emit('updateKeys', { hash: hash, input: input });
  }
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

    //check to see if people can revive the dead
    reviveWhentouched();

    //see if we need to restart 
    restart();

    // if in last room, make call to RPC
    if (ROOMS.current === room_10) {
      if (endGame === 0) {
        rpcCall();
        socket.emit('rpcCall', {});
        endGame = 1;
      }
    }
  }

  // move particles
  if (particles.length > 0) {
    moveParticles();
  }

  ROOMS.current.drawRoom();

  // play ambience depending on room
  if (ROOMS.current === room_4 || ROOMS.current === room_5 || ROOMS.current === room_6) {
    playAmbience("BirdChirp");
  } else if (ROOMS.current === room_2 || ROOMS.current === room_3 || ROOMS.current === room_8) {
    playAmbience("FireCracking");
  } else {
    playAmbience("none");
  }

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

  if (isHost) {
    //drawButton(debugButton, debugButton.text, '#ffc7c7');
    drawButton(moveButton, moveButton.text, '#ffc7c7');

    //if( cursor.isOverButton(debugButton) ) cursor.enterButton(debugButton);
    if (cursor.isOverButton(moveButton)) cursor.enterButton(moveButton);
  }
  checkMenu();
  drawMenu();

  var keys = Object.keys(players);
  for (var _i = 0; _i < keys.length; _i++) {
    var player = players[keys[_i]];
    //console.log( i + ": has killed " + player.enemiesKilled);
  }

  if (isHost) ROOMS.current.checkGoals();
};

//function to revive all if everyone is dead
var restart = function restart() {
  var keys = Object.keys(players);
  var count = keys.length;
  var playersdead = 0;
  for (var i = 0; i < keys.length; i++) {
    var player = players[keys[i]];
    if (player.hp <= 0) {
      playersdead += 1;
    }
  }
  if (count == playersdead) {
    //get rid of enemies
    //revive everyone
    reviveAll("restart");
    emptyEnemiesandBullets();
    initEnemies(ROOMS.current.enemiesCount);
    PositionReset();
    spawnEnemies();
  }
};

var reviveWhentouched = function reviveWhentouched() {

  var keys = Object.keys(players);
  for (var i = 0; i < keys.length; i++) {
    var reviving = checkdeadtoplayerRadius(keys[i]);
    if (reviving != undefined) {
      //tell the host to revive this player if not the host
      if (!isHost) {
        socket.emit('revivetoSer', { hash: reviving });
      } else {
        //revive this player 
        revive(reviving, "moving");
      }
    }
  }
};
//endregion
