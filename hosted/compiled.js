"use strict";

// function that lerps player's movement
var lerp = function lerp(v0, v1, alpha) {
  return (1 - alpha) * v0 + alpha * v1;
};

var redraw = function redraw(time) {
  updatePosition();

  animationFrame = requestAnimationFrame(redraw);
};
'use strict';

var canvas = void 0;
var ctx = void 0;

var socket = void 0;
var hash = void 0;
var animationFrame = void 0;

//handle for key down events
var keyDownHandler = function keyDownHandler(e) {
  var keyPressed = e.which;

  // W OR UP
  if (keyPressed === 87 || keyPressed === 38) {}
  // move character up

  // A OR LEFT
  else if (keyPressed === 65 || keyPressed === 37) {}
    // move character left

    // S OR DOWN
    else if (keyPressed === 83 || keyPressed === 40) {}
      // move character down

      // D OR RIGHT
      else if (keyPressed === 68 || keyPressed === 39) {
          //move character right
        }
};

//handler for key up events
var keyUpHandler = function keyUpHandler(e) {
  var keyPressed = e.which;

  // W OR UP
  if (keyPressed === 87 || keyPressed === 38) {}
  // stop character from moving up

  // A OR LEFT
  else if (keyPressed === 65 || keyPressed === 37) {}
    // stop character from moving left

    // S OR DOWN
    else if (keyPressed === 83 || keyPressed === 40) {}
      // stop character from moving down

      // D OR RIGHT
      else if (keyPressed === 68 || keyPressed === 39) {
          // stop character from moving right
        }
};

var init = function init() {
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext('2d');

  socket = io.connect();

  document.body.addEventListener('keydown', keyDownHandler);
  document.body.addEventListener('keyup', keyUpHandler);
};

window.onload = init;
"use strict";

// when we receive character updates from the server
var update = function update(data) {};

// 
var setUser = function setUser(data) {
  hash = data.hash; // set this client's hash to the unique hash the server gives them

  requestAnimationFrame(redraw); // start animating;
};

// update this client's position and send to server
var updatePosition = function updatePosition() {};
