class room {

  /* ex connection:
    room_2: { //room ID
      name: 'cellar',
      enter_location: 2, //which door in room you come out of
      spawn_1: {x: 25, y: 25}; //where they are spawned in next
      spawn_2: {x: 25, y: 50};
      spawn_3: {x: 50, y: 25};
      spawn_4: {x: 50, y: 50};
    }
  */ //<- ex connection
  
  constructor(props){
    this.ID = props.ID || -1; //unique name
    this.name = props.name || 'room'; //display name
    this.bg_music = props.bg_music || 'default';
    this.bg_image = props.bg_image || undefined;
    
    this.connection = props.connections || { }; //connected rooms
    this.objects = props.objects || { };  //walls and stuff
    this.goals = props.goals || { };  //clear goals or treasure goals
    this.mobs = props.mobs || { }; //enemies and npcs
    this.items = props.items || { }; //items and treasure chests
    
    this.visited = props.visited || false;
    this.cleared = props.cleared || false;
    this.main_entrance = props.main_entrance || undefined;
    this.entered_from = props.entered_from || undefined;
    
    //where players are spawned in room. set in [move to room]
    this.spawn_1 = props.spawn_1 || undefined;
    this.spawn_2 = props.spawn_2 || undefined;
    this.spawn_3 = props.spawn_3 || undefined;
    this.spawn_4 = props.spawn_4 || undefined;
  }
};

class connection {
  constructor(props){    
    this.ID = props.ID || -1;
    this.name = props.name || 'room';
    this.enter_location = props.enter_location || undefined; //which entrance in next room
    this.spawn_1 = props.spawn_1 || undefined;
    this.spawn_2 = props.spawn_2 || undefined;
    this.spawn_3 = props.spawn_3 || undefined;
    this.spawn_4 = props.spawn_4 || undefined;
  }
}


