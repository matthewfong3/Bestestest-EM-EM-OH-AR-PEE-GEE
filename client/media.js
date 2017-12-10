//--vars-----------------------------region
let bgTracks = {
  floralLife: { src: 'assets/audio/Floral Life (Henesys).mp3', lastTime: 0 },
  exploration: { src: 'assets/audio/Exploration - Xenoblade Chronicles 2.mp3', lastTime: 0 },
  current: { }
}
let currentTrack = bgTracks.exploration;

let effectSounds = {
  //"1.mp3" ,"2.mp3", "3.mp3", "4.mp3", "5.mp3", "6.mp3", "7.mp3", "8.mp3"
  BarrelBreakBasement: {src:'assets/audio/barrel-break-basement.wav', lastTime:0},
  BarrelBreakHall: {src:'assets/audio/barrel-break-hall.wav', lastTime:0},
  BirdChirp: {src:'assets/audio/bird_chirp.wav', lastTime:0},
  Coin: {src:'assets/audio/coin.wav', lastTime:0},
  DeathGrunt: {src:'assets/audio/death_grunt.wav', lastTime:0},
  FireCracking: {src:'assets/audio/fire_cracking_ambience.wav', lastTime:0},
  HeartBeat: {src:'assets/audio/heartbeat.wav', lastTime:0},
  OnHit: {src:'assets/audio/hit_final.wav', lastTime:0},
  MonsterOnHit: {src:'assets/audio/monster_onHit.wav', lastTime:0},
  Pop: {src:'assets/audio/pop.wav', lastTime:0},
  PotBreakBasement: {src:'assets/audio/pot_break_basement.wav', lastTime:0},
  PotBreakHall: {src:'assets/audio/pot_break_hall.wav', lastTime:0},
  Reload: {src:'assets/audio/reload.WAV', lastTime:0},
  Rumble: {src:'assets/audio/rumble.wav', lastTime:0},
  Shooting: {src:'assets/audio/shooting.wav', lastTime:0},
  SlimeShotAtk: {src:'assets/audio/slime_shot_atk.wav', lastTime:0},
  UIButton: {src:'assets/audio/ui_button_sound.wav', lastTime:0},
  Unlock: {src:'assets/audio/unlock_final.WAV', lastTime:0},
  Wind: {src:'assets/audio/wind_ambience.wav', lastTime:0},
};

//image preloading vv
let loadQueue = -1;
let numLoaded = 0;

const toLoadImgs = [
  {
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
  bgAudio.current = bgTracks.exploration;
  bgAudio.src = bgAudio.current.src;
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

const playEffect = (fileName) => {
  //currentEffect = Math.round(Math.random()*8)-1;
  //if(currentEffect<0)currentEffect=0;
  effectAudio.src = effectSounds[fileName].src; //"assets/audio/" + effectSounds[currentEffect];
  //console.log(currentEffect);
  effectAudio.play();
};
//endregion