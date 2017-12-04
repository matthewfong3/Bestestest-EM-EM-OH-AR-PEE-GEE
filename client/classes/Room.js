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
  
  
  
};


