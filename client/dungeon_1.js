let editMode = true; //maybe if we make a room 'editor'

let doors = { };

//test rooms
let room_0 = { };

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
    bg_image: 'room_1',
    
    entrances: {
      top: {
        ID: 'room_1',
        name: 'roof',
        location: {x: width/2-doors.top.width/2, y: 0},
        object: doors.top,
        open: false,
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
        open: true,
        visited: false,
        object: doors.right,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  });
  
};

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
  
}

const goal_triggerEvents = (events) => {
  
}

const goal_defeatBoss = (boss) => {
  
}
