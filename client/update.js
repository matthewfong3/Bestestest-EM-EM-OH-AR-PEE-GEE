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
      requestAnimationFrame(redraw); // start animating;
  //}
};

const setOtherplayers = (data) => {
  players[data.hash] = data;
  playerCount += 1;
    
  //if(playerCount == 4)
  //{
      requestAnimationFrame(redraw); // start animating;
  //}
};

//do the shooting and send to server
const shooting = (data) => {
    
};

// update this client's position and send to server
const updatePosition = () => {
    
    let square = players[hash];

    square.prevX = square.x;
    square.prevY = square.y;

    if(up && square.destY - 20 > 0)
    {
        square.destY -= 2;
    }
    if(down && square.destY + 20 < canvas.height)
    {
        square.destY += 2;
    }
    if(left && square.destX - 20 > 0)
    {
        square.destX -= 2;
    }
    if(right && square.destX + 20 < canvas.width)
    {
        square.destX += 2;
    }

    square.alpha = 0.05;
    square.lastUpdate = new Date().getTime();
};

// move the sphere arround
const movement = () => {

    let keys = Object.keys(players);
    //grab each user
    for(let x =0;x<keys.length;x++)
    {
        let square = players[keys[x]];

        if(square.alpha < 1)
        {
            square.alpha += 0.05;
        }

        square.x = lerp(square.prevX,square.destX,square.alpha);
        square.y = lerp(square.prevY,square.destY,square.alpha);
    }
};


//get mouse movement 
const getmousemove = (canvas,evt) => {
let rect = canvas.getBoundingClientRect();
    return{
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
};
