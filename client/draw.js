const drawPlayers = (time) => {
  //draw things
  let keys = Object.keys(players);
  for(let i =0; i < keys.length; i++) {
    let playerdrawn = players[keys[i]];
    if(playerdrawn.hp > 0) drawPlayer(playerdrawn);
    else{
        drawDeadPlayer(playerdrawn);
    }
  }
}; //draw all players in the players list

const drawPlayer = (playerdrawn) => {
  if(playerdrawn.object){

      if(playerdrawn.object.name == "player_red")
      {
        playerdrawn.object.img = IMAGES.player_red.img;
      }
      else if(playerdrawn.object.name == "player_green")
      {
        playerdrawn.object.img = IMAGES.player_green.img;
      }
      else if(playerdrawn.object.name == "player_purple")
      {
        playerdrawn.object.img = IMAGES.player_purple.img;
      }
      else if(playerdrawn.object.name == "player_blue")
      {
        playerdrawn.object.img = IMAGES.player_blue.img;
      }

    ctx.drawImage(playerdrawn.object.img, playerdrawn.x-playerdrawn.object.width/2, playerdrawn.y -playerdrawn.object.height/2)
  }else {
  
    ctx.save();
    ctx.beginPath();
    
    ctx.fillStyle = playerdrawn.style;
    ctx.arc(playerdrawn.x,playerdrawn.y,playerdrawn.radius,0,Math.PI * 2,false);
    
    ctx.closePath();
    ctx.fill();
    ctx.restore(); 
  }
}

const drawDeadPlayer = (playerdrawn) => {
    ctx.save();
    ctx.beginPath();
    
    ctx.fillStyle = "black";
    ctx.arc(playerdrawn.x,playerdrawn.y,playerdrawn.radius,0,Math.PI * 2,false);
    
    ctx.closePath();
    ctx.fill();
    ctx.restore(); 
}

const drawBullets = (time) => {
  //draw things
  for(let i =0; i < bulletArray.length; i++)
  {
    let bullet = bulletArray[i];
    drawBullet(bullet);
  }
}

const drawHealthbar = () => {
  //grab this client's player info
  let player = players[hash];
  let playerhealthPercentage = 200;
  if(player){
    playerhealthPercentage = player.hp/player.maxHP * 200;
  } 
  ctx.save();

  ctx.strokeStyle = "black";
  ctx.fillStyle = "red";

  ctx.strokeRect(900,50,200,30);
  ctx.fillRect(900,50,playerhealthPercentage,30);

  ctx.font = "24px Arial";
  ctx.fillStyle = "black";
  ctx.fillText("HP:",925,35);

  ctx.restore();
}

const drawBullet = (bulletdrawn) => {
  ctx.save();
  ctx.beginPath();
  
  ctx.fillStyle = bulletdrawn.style;
  ctx.arc(bulletdrawn.x,bulletdrawn.y,bulletdrawn.radius,0,Math.PI * 2,false);
  
  ctx.closePath();
  ctx.fill();
  ctx.restore(); 
}

const drawEnemies = () => {
  for(let i = 0; i < enemies.length; i++)
    drawEnemy(enemies[i]);
};

const drawEnemy = (enemy) => {
  /*
  ctx.save();
  ctx.beginPath();
  ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.restore(); */
  ctx.drawImage(IMAGES.mob_blue.img, enemy.x-enemy.radius/2, enemy.y -enemy.radius/2)
};

//--draw game screens-------------
const drawPlaceholder = () => {
  ctx_back.fillStyle = '#626262';
  ctx_back.fillRect(0,0,canvas.width,canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '15pt Courier';
  ctx.fillStyle = 'white';
  ctx.fillText('There is nothing here yet', canvas.width/2,canvas.height/2);
}; //just a placeholder screen

const drawPreload = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '15pt Courier';
  ctx.fillStyle = 'white';
  ctx.fillText('Loading App...', canvas.width/2,canvas.height/2);
}; //loading images screen

const drawWait = () => {
  ctx_back.fillStyle = 'black';
  ctx_back.fillRect(0,0,canvas.width,canvas.height);

  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = '15pt Courier';
  ctx.fillStyle = 'white';
  ctx.fillText('waiting for connection to server...', canvas.width/2,canvas.height/2);
}; //waiting for server connction

const drawTitle = () => {
  ctx.fillStyle = '#242424';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = '30pt Courier';
  ctx.fillText('Besteststs MMORPG evar', canvas.width/2,canvas.height/2-10);
  ctx.font = '15pt Courier';
  //ctx.fillText('- Click or press any button to play! -', canvas.width/2,canvas.height/2+40);
  drawButton(startButton,"Start","Color");
  ctx.drawImage(IMAGES.logo.img, canvas.width/2-IMAGES.logo.width/2,canvas.height/2-IMAGES.logo.height/2 -130);
}; //app title screen

const drawCharacterselect = () => {
  ctx.fillStyle = '#242424';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = '30pt Courier';
  ctx.fillText('Select your Character', canvas.width/2,canvas.height * .10);
  ctx.font = '15pt Courier';
  //ctx.fillText('- Click or press any button to play! -', canvas.width/2,canvas.height/2+40);
  drawButton(startButton,"Choose","Color");
  ctx.fillStyle = 'white';

  drawcolorOptions();

  //ctx.drawImage(IMAGES.logo.img, canvas.width/2-25,canvas.height/2-100);


};//character select screen, more of a template right now 

const drawGameOver = () => {
ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = '30pt Courier';
  ctx.fillText('Game Ended', canvas.width/2,canvas.height/2-10);
  ctx.font = '15pt Courier';
  ctx.fillText('- Click or press any button to play again! -', canvas.width/2,canvas.height/2+40);
  ctx.drawImage(IMAGES.logo.img, canvas.width/2-25,canvas.height/2-100);
}; //game over screen

const drawcolorOptions = () => {
  ctx.save();
    
  const plr_width = IMAGES.player_red.width;
  const plr_height = IMAGES.player_red.height;
  
  ctx.strokeStyle = "black";
  
  ctx.font = '30pt Courier';

  if(canBered)
  {
    ctx.fillStyle = "white";
    ctx.fillRect(colorOptionred.x,colorOptionred.y,colorOptionred.width,colorOptionred.height);
    ctx.strokeRect(colorOptionred.x,colorOptionred.y,colorOptionred.width,colorOptionred.height);
    ctx.fillStyle = "black";
    ctx.fillText("Red",colorOptionred.x + 75,colorOptionred.y + colorOptionred.height-40);
    
    ctx.drawImage(IMAGES.player_red.img, colorOptionred.x + colorOptionred.width/2 - plr_width/2 * 2.9, colorOptionred.y + colorOptionred.height/2 -plr_height/2 * 2.9, plr_width*2.9, plr_height*2.9);
  }
  if(canBepurple)
  {
    ctx.fillStyle = "white";
    ctx.fillRect(colorOptionpurple.x,colorOptionpurple.y,colorOptionpurple.width,colorOptionpurple.height);
    ctx.strokeRect(colorOptionpurple.x,colorOptionpurple.y,colorOptionpurple.width,colorOptionpurple.height);
    ctx.fillStyle = "black";
    ctx.fillText("Purple",colorOptionpurple.x + 75,colorOptionpurple.y + colorOptionpurple.height-40);
    
    ctx.drawImage(IMAGES.player_purple.img, colorOptionpurple.x + colorOptionpurple.width/2 - plr_width/2 * 2.9, colorOptionpurple.y + colorOptionpurple.height/2 -plr_height/2 * 2.9, plr_width*2.9, plr_height*2.9);
  }
  if(canBegreen)
  {
    ctx.fillStyle = "white";
    ctx.fillRect(colorOptiongreen.x,colorOptiongreen.y,colorOptiongreen.width,colorOptiongreen.height);
    ctx.strokeRect(colorOptiongreen.x,colorOptiongreen.y,colorOptiongreen.width,colorOptiongreen.height);
    ctx.fillStyle = "black";
    ctx.fillText("Green",colorOptiongreen.x + 75,colorOptiongreen.y + colorOptiongreen.height-40);
    
    ctx.drawImage(IMAGES.player_green.img, colorOptiongreen.x + colorOptiongreen.width/2 - plr_width/2 * 2.9, colorOptiongreen.y + colorOptiongreen.height/2 -plr_height/2 * 2.9, plr_width*2.9, plr_height*2.9);
  }
  if(canBeblue)
  {
    ctx.fillStyle = "white";
    ctx.fillRect(colorOptionblue.x,colorOptionblue.y,colorOptionblue.width,colorOptionblue.height);
    ctx.strokeRect(colorOptionblue.x,colorOptionblue.y,colorOptionblue.width,colorOptionblue.height);
    ctx.fillStyle = "black";
    ctx.fillText("Blue",colorOptionblue.x + 75,colorOptionblue.y +  colorOptionblue.height-40);
    
    ctx.drawImage(IMAGES.player_blue.img, colorOptionblue.x + colorOptionblue.width/2 - plr_width/2 * 2.9, colorOptionblue.y + colorOptionblue.height/2 -plr_height/2 * 2.9, plr_width*2.9, plr_height*2.9);
  }
  
  




  ctx.restore();


}