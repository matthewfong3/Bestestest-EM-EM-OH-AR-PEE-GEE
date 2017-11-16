"use strict";

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var bullet = function bullet(characterpoint, mousepoint) {
    _classCallCheck(this, bullet);

    // position variables
    this.prevX = 572;
    this.prevY = 324;
    this.x = 572;
    this.y = 324;
    this.destX = 572;
    this.destY = 324;
    this.alpha = 0.05;
    //need to work on this
    this.direction = characterpoint - mousepoint;
};
"use strict";

// function that lerps player's movement
var lerp = function lerp(v0, v1, alpha) {
  return (1 - alpha) * v0 + alpha * v1;
};

var redraw = function redraw(time) {
  updatePosition();
  movement();
  //draw things
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  var keys = Object.keys(players);
  for (var i = 0; i < keys.length; i++) {
    var playerdrawn = players[keys[i]];
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = playerdrawn.fillstyle;
    ctx.arc(playerdrawn.x, playerdrawn.y, playerdrawn.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  }

  animationFrame = requestAnimationFrame(redraw);
};
'use strict';

var canvas = void 0;
var ctx = void 0;

var socket = void 0;
var hash = void 0;
var animationFrame = void 0;

var mouseX = void 0;
var mouseY = void 0;

var players = void 0;

var playerCount = void 0;

var bulletArray = void 0;

var up = void 0;
var down = void 0;
var right = void 0;
var left = void 0;

//handle for key down events
var keyDownHandler = function keyDownHandler(e) {
  var keyPressed = e.which;

  // W OR UP
  if (keyPressed === 87 || keyPressed === 38) {
    // move character up
    up = true;
  }
  // A OR LEFT
  else if (keyPressed === 65 || keyPressed === 37) {
      // move character left
      left = true;
    }
    // S OR DOWN
    else if (keyPressed === 83 || keyPressed === 40) {
        // move character down
        down = true;
      }
      // D OR RIGHT
      else if (keyPressed === 68 || keyPressed === 39) {
          //move character right
          right = true;
        }
};

//handler for key up events
var keyUpHandler = function keyUpHandler(e) {
  var keyPressed = e.which;

  // W OR UP
  if (keyPressed === 87 || keyPressed === 38) {
    // stop character from moving up
    up = false;
  }
  // A OR LEFT
  else if (keyPressed === 65 || keyPressed === 37) {
      // stop character from moving left
      left = false;
    }
    // S OR DOWN
    else if (keyPressed === 83 || keyPressed === 40) {
        // stop character from moving down
        down = false;
      }
      // D OR RIGHT
      else if (keyPressed === 68 || keyPressed === 39) {
          // stop character from moving right
          right = false;
        }
};

var init = function init() {
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
  canvas.addEventListener('mousemove', function (evt) {
    var object = getmousemove(canvas, evt);
    mouseX = object.x;
    mouseY = object.y;
  });

  //if this user joins
  socket.on("joined", function (data) {
    setUser(data);
  });

  //if other players join
  socket.on("otherConnects", function (data) {
    setOtherplayers(data);
  });
};

window.onload = init;
"use strict";

// when we receive character updates from the server
var update = function update(data) {};

// 
var setUser = function setUser(data) {
    hash = data.character.hash; // set this client's hash to the unique hash the server gives them
    players[data.character.hash] = data.character;
    playerCount += 1;

    //if(playerCount == 4)
    //{
    requestAnimationFrame(redraw); // start animating;
    //}
};

var setOtherplayers = function setOtherplayers(data) {
    players[data.hash] = data;
    playerCount += 1;

    //if(playerCount == 4)
    //{
    requestAnimationFrame(redraw); // start animating;
    //}
};

//do the shooting and send to server
var shooting = function shooting(data) {};

// update this client's position and send to server
var updatePosition = function updatePosition() {

    var square = players[hash];

    square.prevX = square.x;
    square.prevY = square.y;

    if (up && square.destY - 20 > 0) {
        square.destY -= 2;
    }
    if (down && square.destY + 20 < canvas.height) {
        square.destY += 2;
    }
    if (left && square.destX - 20 > 0) {
        square.destX -= 2;
    }
    if (right && square.destX + 20 < canvas.width) {
        square.destX += 2;
    }

    square.alpha = 0.05;
    square.lastUpdate = new Date().getTime();
};

// move the sphere arround
var movement = function movement() {

    var keys = Object.keys(players);
    //grab each user
    for (var x = 0; x < keys.length; x++) {
        var square = players[keys[x]];

        if (square.alpha < 1) {
            square.alpha += 0.05;
        }

        square.x = lerp(square.prevX, square.destX, square.alpha);
        square.y = lerp(square.prevY, square.destY, square.alpha);
    }
};

//get mouse movement 
var getmousemove = function getmousemove(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};
