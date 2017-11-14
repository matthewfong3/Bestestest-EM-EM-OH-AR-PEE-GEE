// when we receive character updates from the server
const update = (data) => {
  
};

// 
const setUser = (data) => {
  hash = data.hash; // set this client's hash to the unique hash the server gives them
  
  requestAnimationFrame(redraw); // start animating;
};

// update this client's position and send to server
const updatePosition = () => {
  
};