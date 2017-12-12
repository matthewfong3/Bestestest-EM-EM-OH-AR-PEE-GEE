class Room {

  /* ex entrance
    top: {
      ID: 'room_1',
      name: 'roof',
      location: {x: width/2-doors.top.width/2, y: 0},
      object: doors.top,
      open: false,
      visited: false,
      conditions: [ goal_defeatAllEnemies ]
    },
  */ // <- ex entrance
  
  constructor(props){
    this.ID = props.ID || -1; //unique name
    this.name = props.name || 'room'; //display name
    this.bg_music = props.bg_music || 'default';
    this.bg_image = props.bg_image || undefined;
    
    this.objects = props.objects || { };  //walls and stuff
    this.goals = props.goals || { };  //clear goals or treasure goals
    this.mobs = props.mobs || { }; //enemies and npcs
    this.items = props.items || { }; //items and treasure chests
    
    this.visited = props.visited || false;
    this.cleared = props.cleared || false;
    this.entrances = props.entrances || undefined;     //where players are spawned in room. set in [move to room]
    this.entered_from = props.entered_from || undefined;
    
    this.enemiesCount = Math.floor(Math.random()* 7) + 2;
      
  }
  
  loadRoom(){
    //players = {};
    //bulletArray = [];
    //enemies = [];
    //console.log(`Loading room [${this.name}] ...`);
    this.lockDoors();
  }
  
  unlockDoors(){
    const keys = Object.keys(this.entrances);
    for(let i = 0; i<keys.length; i++){
      const door = this.entrances[keys[i]];
      door.open = true;
    }
  }
  
  lockDoors(){
    const keys = Object.keys(this.entrances);
    for(let i = 0; i<keys.length; i++){
      const door = this.entrances[keys[i]];
      door.open = false;
    }
  }
  
  checkGoals(){
    for(let i = 0; i< this.goals.length; i++){
      const goal = this.goals[i]();
      if(goal === false) return false;
    }
    this.completeRoom();
  }
  
  completeRoom(){
    //console.log(`Room [${this.name}] cleared!`);
    this.unlockDoors();
    
    if(isHost) {
      moveButton.available = true;
      setChangeRoomMenu();
      menu.toggle();
    }
  }
  
  drawDoors() {
    const keys = Object.keys(this.entrances);
    for(let i = 0; i<keys.length; i++){
      const door = this.entrances[keys[i]];
      if(door.open)
        ctx.drawImage(door.object.img_open.img, door.location.x, door.location.y);
      else
        ctx.drawImage(door.object.img_lock.img, door.location.x, door.location.y);
    }
  }
  
  drawItems() {
    const keys = Object.keys(this.items);
    for(let i = 0; i<keys.length; i++){
      const item = this.items[keys[i]];
      if(item.active)
        ctx.drawImage(item.object.active.img, item.location.x, item.location.y);
      else
        ctx.drawImage(item.object.inactive.img, item.location.x, item.location.y);
    }
  }
   
  drawEnemies() {
    const keys = Object.keys(this.mobs);
    for(let i = 0; i<keys.length; i++){
      const mob = this.mobs[keys[i]];
      if(mob.isAlive)
        ctx.drawImage(mob.object.active.img, mob.x-mob.object.width/2, mob.y -mob.object.height/2);
      else
        ctx.drawImage(mob.object.inactive.img, mob.x-mob.object.width/2, mob.y -mob.object.height/2);  
    }
  }
  
  drawRoom() {
    //draw bg -> doors -> items
    if(this.bg_image) ctx.drawImage(IMAGES[this.bg_image].img, 0, 0);
    else ctx.drawImage(IMAGES.dungeon_walls.img, 0, 0);
    this.drawDoors();
    this.drawItems();
    
    //placeholder label for room name
    ctx_overlay.textAlign = 'left';
    fillText(ctx_overlay, this.name, 60, height - 15, '15pt courier', 'black');
  }
};


