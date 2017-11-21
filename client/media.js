//--vars-----------------------------region
let bgTracks = {
  floralLife: { src: 'assets/audio/Floral Life (Henesys).mp3', lastTime: 0 },
  current: { }
}
let effectSounds = [
  "1.mp3" ,"2.mp3", "3.mp3", "4.mp3", "5.mp3", "6.mp3", "7.mp3", "8.mp3"
];

//image preloading vv
let loadQueue = -1;
let numLoaded = 0;

const toLoadImgs = [
  {
    name: 'logo',
    url: 'assets/img/logo.png'
  },
];

const toLoadAnims = [
  {
    name: 'cursor',
    url: 'assets/img/cursor.png',
    animData:  {
      default: {
        row: 1,
        cols: 4,
        total: 4,
        playSpeed: 16,
        height: 50,
        width: 50
      },
      availible: {
        row: 2,
        cols: 3,
        playSpeed: 10
      },
      unavailible: {
        row: 3,
        cols: 3,
        playSpeed: 10
      },
      click: {
        row: 4,
        cols: 3,
        playSpeed: 4
      },
    },
  },
];
//endregion

//--image preloader--------------------region
const preloadImages = (imgArr, targetList) => {
  if(loadQueue === -1) loadQueue = 0;
  targetList.toloadcount = 0;
  targetList.loadcount = 0;
  
  
  for(let i = 0; i< imgArr.length; i++){
    let data = imgArr[i];
    
    let img = new Image();
    img.src = data.url;
    targetList.toloadcount ++;
    loadQueue++;
    //console.log(`toloadcount: ${targetList.toloadcount}`);
    
    img.onload = (e) => {      
      targetList[data.name] = {
        img: img,
        name: data.name,
        height: img.naturalHeight,
        width: img.naturalWidth,
      }
      if(data.animData) targetList[data.name].animData = data.animData;
      
      targetList.loadcount++;
      numLoaded++;
      //console.log(`loaded: ${data.name}, loadcount: ${targetList.loadcount}, anim?: ${data.animData}`);
    };
    
  }
};
//endregion

//--animation/sprites----------------------region
const Sprite = (data) => {
  let sprite = {};
  
  const sheet = data.sheet;
  sprite.sheet = sheet;
  sprite.animData = sheet.animData;
  sprite.filter = 0;
  sprite.x = data.x || 0;
  sprite.y = data.y || 0;
  
  sprite.width = sheet.animData.default.width || sheet.width/sheet.animData.default.cols;
  sprite.height = sheet.animData.default.height || sheet.height/sheet.animData.default.total;
  sprite.z = data.z || 0;
  
  sprite.frameCount = 0;
  sprite.frame = 0;
  sprite.currentAnim = {
    name: 'default',
    onDone: emptyFunct,
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
const setAnim = (targetSprite, anim, playStyle, onDone) => {
  targetSprite.frameWidth = targetSprite.sheet.width/targetSprite.animData[anim].cols;
  
  targetSprite.frameHeight = targetSprite.animData[anim].height || targetSprite.height;
  targetSprite.frameWidth = targetSprite.animData[anim].width || targetSprite.width;
  
  if(targetSprite.currentAnim.name != anim) targetSprite.frame = 0;
  targetSprite.row = targetSprite.animData[anim].row;
  targetSprite.cols = targetSprite.animData[anim].cols;
  targetSprite.currentAnim.name = anim;
  targetSprite.playSpeed = targetSprite.animData[anim].playSpeed;
  
  if(playStyle === 'pingPong') {
    targetSprite.playStyle = 'pingPong';
    if(targetSprite.playDir==-1) targetSprite.playDir = 0;
  }
  else if(playStyle === 'once'){
    targetSprite.playStyle = 'once';
    targetSprite.playDir = 0;
  }
  else if(playStyle === 'onceReverse'){
    targetSprite.playStyle = 'onceReverse';
    targetSprite.playDir = 1;
    targetSprite.frame = targetSprite.cols-1;
  }
  else if(playStyle === 'reverse'){
    targetSprite.playStyle = 'reverse';
    targetSprite.playDir = 1;
    targetSprite.frame = targetSprite.cols-1;
  }
  
  targetSprite.currentAnim.onDone = onDone || emptyFunct;
}
//play current animation for a ssprite (freeze to suspend frame)
const playAnim = (ctx, targetSprite, freeze) => {
  targetSprite.frameCount++;
  
  if(freeze) targetSprite.frame = 0;
  else if(targetSprite.playStyle == 'pingPong') {
    if(targetSprite.frameCount % targetSprite.playSpeed === 0) {

      if(targetSprite.playDir == 0){
        if(targetSprite.frame < targetSprite.cols-1) {
          targetSprite.frame++;
        } else {
          targetSprite.playDir = 1;
        }
      }
      if (targetSprite.playDir == 1){
        if(targetSprite.frame > 0) {
          targetSprite.frame--;
        } else {
          targetSprite.playDir = 0;
          targetSprite.frame++;
        }
      }
    }
  }
  else if(targetSprite.playStyle == 'once'|| targetSprite.playStyle == 'onceReverse') {
    if(targetSprite.frameCount % targetSprite.playSpeed === 0) {

      if(targetSprite.playDir == 0){
        if(targetSprite.frame < targetSprite.cols-1) {
          targetSprite.frame++;
        } else if(targetSprite.currentAnim.onDone != emptyFunct){
          targetSprite.currentAnim.onDone();
          targetSprite.currentAnim.onDone = emptyFunct;
        }
      }
      if (targetSprite.playDir == 1){
        if(targetSprite.frame > 0) {
          targetSprite.frame--;
        } else if(targetSprite.currentAnim.onDone != emptyFunct){
          targetSprite.currentAnim.onDone();
          targetSprite.currentAnim.onDone = emptyFunct;
        }
      }
    }
  } 
  else if(targetSprite.playStyle == 'reverse') {    
    //switch frames after time
    if(targetSprite.frameCount % targetSprite.playSpeed === 0) {
      //move through animation and loop
      if(targetSprite.frame > 0) {
        targetSprite.frame--;
      } else {
        targetSprite.frame = targetSprite.cols-1;
      }
    }
  } 
  else {    
    //switch frames after time
    if(targetSprite.frameCount % targetSprite.playSpeed === 0) {
      //move through animation and loop
      if(targetSprite.frame < targetSprite.cols-1) {
        targetSprite.frame++;
      } else {
        targetSprite.frame = 0;
      }
    }
  }
  
  ctx.drawImage( 
    targetSprite.sheet.img,  
    targetSprite.frameWidth * targetSprite.frame,
    targetSprite.height * (targetSprite.row-1),
    targetSprite.frameWidth, 
    targetSprite.frameHeight,
    targetSprite.x,
    targetSprite.y,
    targetSprite.frameWidth, 
    targetSprite.frameHeight, 
  );
};
//endregion

//--sound---------------------------region
const setupSound = () => {
  bgAudio = document.querySelector("#bgAudio");
  bgAudio.volume=0.25;
  effectAudio = document.querySelector("#effectAudio");
  effectAudio.volume = 0.3;
  bgAudio.src = bgTracks.floralLife.src;
  bgAudio.current = bgTracks.floralLife;
};

const playBgAudio = (reset) => {
  if(reset) bgAudio.currentTime = 0;
  bgAudio.play();
};

const swapBg = (track, reset) => {
  bgTracks.current.lastTime = bgAudio.currentTime;
  bgTracks.current = bgTracks[track];
  bgAudio.src = bgTracks[track].src;
  
  bgAudio.currentTime = bgTracks.current.lastTime;
  if(reset) bgAudio.currentTime = bgTracks.current.lastTime = 0;
  bgAudio.play();
};

const stopBgAudio = (reset) => {
  bgAudio.pause();
  if(reset) bgAudio.currentTime = 0;
};

const playEffect = () => {
  currentEffect = Math.round(Math.random()*8)-1;
  if(currentEffect<0)currentEffect=0;
  effectAudio.src = "assets/audio/" + effectSounds[currentEffect];
  //console.log(currentEffect);
  effectAudio.play();
};
//endregion