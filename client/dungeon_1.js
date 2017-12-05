let editMode = true; //maybe if we make a room 'editor'

let doors = { };

//test rooms
let ROOMS = { };
let room_0 = { };
let room_1 = { };
let room_2 = { };
let room_3 = { };

const setupDungeonAssets = () => {
  doors.top = {
    img_open: IMAGES.door_top,
    img_lock: IMAGES.door_top_lock,
    width: IMAGES.door_top.width,
    height: IMAGES.door_top.height,
  }
  doors.bottom = {
    img_open: IMAGES.door_bottom,
    img_lock: IMAGES.door_bottom_lock,
    width: IMAGES.door_bottom.width,
    height: IMAGES.door_bottom.height,
  }
  doors.left = {
    img_open: IMAGES.door_left,
    img_lock: IMAGES.door_left_lock,
    width: IMAGES.door_left.width,
    height: IMAGES.door_left.height,
  }
  doors.right = {
    img_open: IMAGES.door_right,
    img_lock: IMAGES.door_right_lock,
    width: IMAGES.door_right.width,
    height: IMAGES.door_right.height,
  }
  
  room_0 = new Room({
    ID: 'room_0',
    name: 'first room',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      top: {
        ID: 'room_1',
        name: 'roof',
        location: {x: width/2-doors.top.width/2, y: 0},
        object: doors.top,
        open: true,
        visited: false,
        conditions: [ goal_defeatAllEnemies ]
      },
      bottom: {
        ID: 'room_2',
        name: 'basement',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: false,
        object: doors.bottom,
      },
      right: {
        ID: 'room_3',
        name: 'hall',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: false,
        visited: false,
        object: doors.right,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_0'] = room_0;
  
  room_1 = new Room({
    ID: 'room_1',
    name: 'roof',
    bg_music: 'exploration',
    bg_image: 'room_1',
    
    entrances: {
      bottom: {
        ID: 'room_0',
        name: 'first room',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: false,
        object: doors.bottom,
      },
      right: {
        ID: 'room_4',
        name: 'balcony',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: false,
        visited: false,
        object: doors.right,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_1'] = room_1;
  
  room_2 = new Room({
    ID: 'room_2',
    name: 'basement',
    bg_music: 'exploration',
    bg_image: 'room_2',
    
    entrances: {
      top: {
        ID: 'room_0',
        name: 'first room',
        location: {x: width/2-doors.top.width/2, y: 0},
        object: doors.top,
        open: true,
        visited: false,
      },
      left: {
        ID: 'room_5',
        name: 'storage',
        location: {x: 0, y: height/2-doors.right.height/2},
        open: false,
        visited: false,
        object: doors.left,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_2'] = room_2;
  
  ROOMS.current = room_0;
  enterRoom(room_0);
};

const enterRoom = (newRoom) => {
  ROOMS.current.visited = true;
  
  
  ROOMS.current = newRoom;
}

//room clear goals
const goal_defeatAllEnemies = (room) => {
  const keys = Object.keys(room.enemies);
  for(let i = 0; i< keys.length; i++){
    if(room.enemies[keys[i]].hp > 0) return false
  } 
  return true;
}

const goal_collectObjects = (toCollect) => {
  
}

const goal_reachArea = (area) => {
  if(area.radius){
    //check circle collision with area
  }else {
    //check box collision with area
  }
}

const goal_triggerEvents = (events) => {
  
}

const goal_defeatBoss = (boss) => {
  
}
