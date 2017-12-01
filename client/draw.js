const drawPlayers = (time) => {
  //draw things
  let keys = Object.keys(players);
  for(let i =0; i < keys.length; i++) {
    let playerdrawn = players[keys[i]];
    if(playerdrawn.hp > 0) drawPlayer(playerdrawn);  
  }
}; //draw all players in the players list

const drawPlayer = (playerdrawn) => {
  ctx.save();
  ctx.beginPath();
  
  ctx.fillStyle = playerdrawn.style;
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
  ctx.save();
  ctx.beginPath();
  ctx.arc(enemy.x, enemy.y, enemy.radius, 0, Math.PI * 2, false);
  ctx.closePath();
  ctx.fillStyle = 'red';
  ctx.fill();
  ctx.restore();
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
  ctx.fillText('waiting for connection ro server...', canvas.width/2,canvas.height/2);
}; //waiting for server connction

const drawTitle = () => {
  ctx.fillStyle = 'black';
  ctx.fillRect(0,0,canvas.width,canvas.height);
  
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = 'white';
  ctx.font = '30pt Courier';
  ctx.fillText('Besteststs MMORPG evar', canvas.width/2,canvas.height/2-10);
  ctx.font = '15pt Courier';
  //ctx.fillText('- Click or press any button to play! -', canvas.width/2,canvas.height/2+40);
  drawButton(startButton,"Start","Color");
  ctx.drawImage(IMAGES.logo.img, canvas.width/2-25,canvas.height/2-100);
}; //app title screen

const drawCharacterselect = () => {
  ctx.fillStyle = 'grey';
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
  ctx.fillRect(canvas.width * .1, 150,150,300);
  ctx.fillRect(canvas.width * .32, 150,150,300);
  ctx.fillRect(canvas.width * .54, 150,150,300);
  ctx.fillRect(canvas.width * .75, 150,150,300);
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