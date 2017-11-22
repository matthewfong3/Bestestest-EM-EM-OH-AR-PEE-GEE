const getMouse = (e) => {
  var offset = canvas_overlay.getBoundingClientRect();
    return {
      x: e.clientX - offset.left,
      y: e.clientY - offset.top
    };
}
// ----- bullet Stuff --------------------------------------------------
const fire = (e) => {
  if(canFire){
    let playerPos = {x:players[hash].x,y:players[hash].y};
    let vector = {x:mouse.x - playerPos.x, y: mouse.y - playerPos.y};
    let mag = Math.sqrt((vector.x * vector.x) + (vector.y * vector.y));
    let normVec = {x:vector.x/mag, y:vector.y/mag};
    let bullet = new Bullet(playerPos,normVec);
    bulletArray.push(bullet);
    canFire = false;
  }
};

const firecoolDown = () => {
    if(canFire == false)
    {
        bufferTime += calculateDT();
        if(bufferTime >= 0.5)
        {
          canFire = true;
          bufferTime = 0;
        }
    }
}

const movebullets = () => {
    for(let i =0; i < bulletArray.length; i ++)
    {
       let bullet = bulletArray[i];
       bullet.destX = bullet.x + (bullet.bulletSpeed * bullet.direction.x);
       bullet.destY = bullet.y + (bullet.bulletSpeed * bullet.direction.y);
       bullet.alpha = 0.05;
       bullet.prevX = bullet.x;
       bullet.prevY = bullet.y;
       bullet.x = lerp(bullet.x,bullet.destX,bullet.alpha);
       bullet.y = lerp(bullet.y,bullet.destY,bullet.alpha);
       //bullet.alpha += 0.05;
    }
};

const OutofBoundbullet = () => {
  for(let i =0; i < bulletArray.length; i++)
  {
      let bullet = bulletArray[i];
      if(bullet.x > canvas_overlay.width || bullet.x < 0 || bullet.y > canvas_overlay.height || bullet.y < 0)
      {
        bulletArray.splice(i,1);
      }
  }
}

// -----------------------------------------------------------------

const lerp = (v0, v1, alpha) => {
  return (1 - alpha) * v0 + alpha * v1;
};

const calculateDT = () =>{
  var now,fps;
  now = performance.now(); 
  fps = 1000 / (now - lastTime);
  fps = clampValue(fps, 12, 60);
  lastTime = now; 
  return 1/fps;
};

const clampValue = (value, min, max) => {
  return Math.max(min, Math.min(max, value));
}

const getRandomRange = (min, max) => {
  return Math.random() * (max - min) + min;
};

const getDistance = (c1, c2) => {
  let dx = c2.x - c1.x;
  let dy = c2.y - c1.y;
  return Math.sqrt(dx * dx + dy * dy);
}

//--collision---------------------------------------
//check if point is in square [box]: {x, y, height, width}
const isInBounds = (point, box) => {
  if(point.y < box.y || point.y > box.y + box.height || point.x < box.x || point.x > box.x + box.width) {
    return false;
  }
  return true;
};

//check if point is in circle bounds [circle]: {x, y, radius}
const isInCircle = (point, circle) =>{
    var dx = point.x - circle.x;
    var dy = point.y - circle.y;
    return dx * dx + dy * dy <= circle.radius * circle.radius;
};

//check circle x circle intersections [circle]: {x, y, radius}
const circlesIntersect = (c1, c2) => {
    var distance = getDistance(c1, c2);
    return distance < c1.radius + c2.radius;
};

//--draw--------------------------------------------
const fillText = (targetCtx, string, x, y, font, color, center) => {
	targetCtx.save();
    if(center){        
        targetCtx.textAlign='center';
        targetCtx.textBaseline='middle';
    };
	targetCtx.font = font;
	targetCtx.fillStyle = color;
	targetCtx.fillText(string, x, y);
	targetCtx.restore();
};

const drawRoundedRect = (x, y, w, h, amt, targetCtx, stroke) => {
  targetCtx.save();  
    //targetCtx.fillRect(x,y,w,h);
    if(amt*2 >= h) { amt = h/2; }
    if(amt*2 >= w) { amt = w/2; }

    w-=amt*2; 
    h-=amt*2; 

    targetCtx.beginPath ();
    targetCtx.moveTo (x + amt, y); //top left inner
    
    targetCtx.lineTo (x+w + amt, y); //top side
    targetCtx.quadraticCurveTo (x+w + amt*2, y , x+w+ amt*2, y + amt); //top right corner
    
    targetCtx.lineTo (x+w+amt*2, y+h + amt); //right side
    targetCtx.quadraticCurveTo (x+w + amt*2, y+h + amt*2, x+w + amt, y+h + amt*2); //bottom right corner
    
    targetCtx.lineTo (x+amt, y+h + amt*2); //bottom side
    targetCtx.quadraticCurveTo (x , y+h + amt*2, x, y+h + amt); //bottom right corner
    
    targetCtx.lineTo (x, y + amt); //left side
    targetCtx.quadraticCurveTo (x, y, x + amt, y); //bottom left corner
    
    targetCtx.fill ();
    if(stroke)targetCtx.stroke();
  targetCtx.restore();
};

//draw a ui (top-canvas) button [button]: {x, y, height, width}
const drawButton = (button, text, color) => {
  ctx_top.fillStyle = color || button.color;
  ctx_top.lineWidth = 1.5;
  drawRoundedRect(button.x, button.y, button.width,button.height, 3, ctx_top, true);
  fillText(ctx_top, text || button.text, button.x+button.width/2, button.y+button.height/2, 'bold 13pt Trebuchet MS', button.textColor || 'black', true ); 
};

function wrapText(context, text, x, y, maxWidth, lineHeight) {  
  var words = text.replace( /\n/g, " \n " ).split( " " );
  var line = '';
  
  let totalheight = lineHeight;
  const starty = y;
  
  for(var n = 0; n < words.length; n++) {
    var testLine = line + words[n] + ' ';
    var metrics = context.measureText(testLine);
    var testWidth = metrics.width;
    
    if(words[n] === '\n') {
      context.fillText(line, x, y);
      line = '';
      y += lineHeight;
      totalheight+= lineHeight;
    }
    else if (testWidth > maxWidth && n > 0) {
      context.fillText(line, x, y);
      line = words[n] + ' ';
      y += lineHeight;
      totalheight+= lineHeight;
    }
    else {
      line = testLine;
    }
  }
  context.fillText(line, x, y);
  context.fillRect(x-5, starty, 3, totalheight);
  
  return totalheight;
}