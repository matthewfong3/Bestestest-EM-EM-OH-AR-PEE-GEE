// when we receive character updates from the server
const update = (data) => {
  
};

// 
const setUser = (data) => {
  hash = data.hash; // set this client's hash to the unique hash the server gives them
  players[data.hash] = data;
  playerCount += 1;
    
  if(playerCount == 4)
  {
      requestAnimationFrame(redraw); // start animating;
  }
};

const setOtherplayers = (data) => {
  players[data.hash] = data;
  playerCount += 1;
    
  if(playerCount == 4)
  {
      requestAnimationFrame(redraw); // start animating;
  }
};

//do the shooting and send to server
const shooting = (data) => {
    
};

// update this client's position and send to server
const updatePosition = () => {
  
};

//find the mouse position
canvas.addEventListener('mousemove',(evt)=>{
        let object = getmousemove(canvas,evt);
        mouseX = object.x;
        mouseY = object.y;
});

//get mouse movement 
const getmousemove = (canvas,evt) => {
let rect = canvas.getBoundingClientRect();
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};
