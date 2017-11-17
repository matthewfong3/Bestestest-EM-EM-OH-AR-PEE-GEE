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

//--sound---------------------------region
const setupSound = () => {
  bgAudio = document.querySelector("#bgAudio");
  bgAudio.volume=0.25;
  effectAudio = document.querySelector("#effectAudio");
  effectAudio.volume = 0.3;
  bgAudio.src = bgTracks.floralLife.src;
  bgAudio.current = bgTracks.floralLife;
};

const playBgAudio = () => {
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

const stopBgAudio = () => {
  bgAudio.pause();
  bgAudio.currentTime = 0;
};

const playEffect = () => {
  currentEffect = Math.round(Math.random()*8)-1;
  if(currentEffect<0)currentEffect=0;
  effectAudio.src = "assets/audio/" + effectSounds[currentEffect];
  //console.log(currentEffect);
  effectAudio.play();
};
//endregion