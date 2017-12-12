//handles map related functions
const COLORS = {
  available: 'white',
  unavailable: '#c1c1c1'
}

const menu = {
  open: false,
  options: { },
  title: 'menu'
};

const setMenu = (props) => {
  menu.open = props.open || false;
  menu.options = props.options || { };
  menu.title = props.title || 'menu title';
};

const setVoteMenu = () => {
  const opts = {};
  opts.options = {
    yes: new button(100, 100, {text: 'yes'}),
    no: new button(100, 170, {text: 'no'}),
    meh: new button(100, 240, {text: 'meh'}),
  }
  
  opts.options.meh.callback = () => console.log('meh');
  opts.options.yes.callback = () => console.log('yes');
  opts.options.no.callback = () => console.log('no');
  
  opts.title = 'vote! - response in in console';
  opts.open = true;
  
  setMenu(opts);
};

const setChangeRoomMenu = () => {
  const opts = {};
  opts.options = { };
  
  let offset = 150
  const keys = Object.keys(ROOMS.current.entrances);
  for(let i = 0; i< keys.length; i++){
    const door = ROOMS.current.entrances[keys[i]];
    if(door.open) {
      opts.options[door.ID] = new button(200, offset, {text: door.name});
      opts.options[door.ID].callback = () => {
        enterRoom(ROOMS[door.ID]);
        closeMenu();
      }
    }
    else{ 
      opts.options[door.ID] = new button(200, offset, {text: `${door.name} [X]`});
      opts.options[door.ID].available = false;
    }
    offset+=70;
  }
  
  opts.title = 'Choose a room to move to';
  opts.open = true;

  setMenu(opts);
};

const setPauseMenu = () => {
  const opts = {};
  
  opts.options = {
    resume: new button(100, 100,{text: 'resume'}),
    quit: new button(100, 170, {text: 'quit'}),
  }
  
  opts.title = 'pause menu';
  opts.open = true;
  
  setMenu(opts);
};

const resetMenu = () => {
  const opts = {};
  
  opts.options = {
    vote: new button(100,100, {text: 'vote'}),
    pause: new button(100,170,{text: 'pause'}),
    unavailable: new button(100,240, { available: false , text: 'unavailable'}),
  }
  
  //fixme: dont know why button constructor wont set avaiible to false vv
  opts.options.unavailable.available=false;
  
  opts.options.vote.callback =  setVoteMenu;
  opts.options.pause.callback = setPauseMenu;
  opts.options.unavailable.callback = () => console.log('button is unavailable');
  
  opts.title = 'testing menu - click outside menu to close and reset';
  
  setMenu(opts);
}; resetMenu();

//console.dir(menu.options);

menu.checkClose = () => {
  if(!isInBounds(cursor, {x: 90, y: 100, width: width-200, height: height-180})) closeMenu();
};

menu.toggle = () => {
  //if(roomSelect.open) closeRoomSelect();
  openMenu();
}

const openMenu = () => {
  //suspendPlayerControls();
  
  menu.open = true;
  console.log('open menu');
}

const closeMenu = () => {
  //restorePlayerControls();
  
  menu.open = false;
  console.log('close menu');
  
  //toremove: reset menu for testing
  resetMenu();
};

const checkMenu = () => {
  if(menu.open){    
    const keys = Object.keys(menu.options);
    for(let i = 0; i< keys.length; i++){
      const btn = menu.options[keys[i]];
      if( cursor.isOverButton(btn) ) cursor.enterButton(btn);
    }
  }
}

const drawMenu = () => {
  if(menu.open){
    ctx_overlay.fillStyle = 'rgba(100, 115, 139, 0.45)';
    ctx_overlay.strokeStyle = 'black';
    ctx_overlay.lineWidth = 3;
    drawRoundedRect(100, 90, width-200, height-180, 7,ctx_overlay, true );
    
    ctx_overlay.textAlign = 'left';
    fillText(ctx_overlay, menu.title, 170, 120, '15pt courier', 'white');
    
    const keys = Object.keys(menu.options);
    for(let i = 0; i< keys.length; i++){
      const btn = menu.options[keys[i]];
      drawButton(btn, btn.text , "white", ctx_overlay);
    }
    
  }
}