let editMode = true; //maybe if we make a room 'editor'

let doors = { };

/* [dungeon map]
     ___  ___  ___
     |4|--|5|--|6|
     ---  ---  ---
      |    |
___  ___  ___  ___  ____
|0|--|1|  |7|  |9|--|10|
---  ---  ---  ---  ----
      |    |    |
___  ___  ___   |
|3|--|2|  |8|---/
---  ---  ---  
*/

//test rooms
let ROOMS = { };
let room_0 = { };
let room_1 = { };
let room_2 = { };
let room_3 = { };
let room_4 = { };
let room_5 = { };
let room_6 = { };
let room_7 = { };
let room_8 = { };
let room_9 = { };
let room_10 = { };

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
    name: 'lobby',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      right: {
        ID: 'room_1',
        name: 'hall',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_0'] = room_0;
  
  room_1 = new Room({
    ID: 'room_1',
    name: 'hall 1',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      bottom: {
        ID: 'room_2',
        name: 'basement',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: false,
        object: doors.bottom,
      },
      top: {
        ID: 'room_4',
        name: 'roof',
        location: {x: width/2-doors.top.width/2, y: 0},
        open: true,
        visited: false,
        object: doors.top,
      },
      left: {
        ID: 'room_0',
        name: 'lobby',
        location: {x: 0, y: height/2-doors.right.height/2},
        open: true,
        visited: true,
        object: doors.left,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_1'] = room_1;
  
  room_2 = new Room({
    ID: 'room_2',
    name: 'basement 2',
    bg_music: 'exploration',
    bg_image: 'room_2',
    
    entrances: {
      top: {
        ID: 'room_1',
        name: 'hall',
        location: {x: width/2-doors.top.width/2, y: 0},
        object: doors.top,
        open: true,
        visited: true,
      },
      left: {
        ID: 'room_3',
        name: 'storage',
        location: {x: 0, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.left,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_2'] = room_2;
  
  room_3 = new Room({
    ID: 'room_3',
    name: 'storage 3',
    bg_music: 'exploration',
    bg_image: 'room_2',
    
    entrances: {
      right: {
        ID: 'room_2',
        name: 'basement',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: true,
        object: doors.right,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_3'] = room_3;
  
  room_4 = new Room({
    ID: 'room_4',
    name: 'roof 4',
    bg_music: 'exploration',
    bg_image: 'room_1',
    
    entrances: {
      right: {
        ID: 'room_5',
        name: 'roof',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
      bottom: {
        ID: 'room_1',
        name: 'hall',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: true,
        object: doors.bottom,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_4'] = room_4;
  
  room_5 = new Room({
    ID: 'room_5',
    name: 'roof 5',
    bg_music: 'exploration',
    bg_image: 'room_1',
    
    entrances: {
      right: {
        ID: 'room_6',
        name: 'roof',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
      bottom: {
        ID: 'room_7',
        name: 'hall',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: false,
        object: doors.bottom,
      },
      left: {
        ID: 'room_4',
        name: 'roof',
        location: {x: 0, y: height/2-doors.right.height/2},
        open: true,
        visited: true,
        object: doors.left,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_5'] = room_5;
  
  room_6 = new Room({
    ID: 'room_6',
    name: 'roof 6',
    bg_music: 'exploration',
    bg_image: 'room_1',
    
    entrances: {
      left: {
        ID: 'room_5',
        name: 'roof',
        location: {x: 0, y: height/2-doors.right.height/2},
        open: true,
        visited: true,
        object: doors.left,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_6'] = room_6;
  
  room_7 = new Room({
    ID: 'room_7',
    name: 'hall 7',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      bottom: {
        ID: 'room_8',
        name: 'basement',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: false,
        object: doors.bottom,
      },
      top: {
        ID: 'room_5',
        name: 'roof',
        location: {x: width/2-doors.top.width/2, y: 0},
        object: doors.top,
        open: true,
        visited: true,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_7'] = room_7;
  
  room_8 = new Room({
    ID: 'room_8',
    name: 'basement 8',
    bg_music: 'exploration',
    bg_image: 'room_2',
    
    entrances: {
      right: {
        ID: 'room_9',
        name: 'hall',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
      top: {
        ID: 'room_7',
        name: 'hall',
        location: {x: width/2-doors.top.width/2, y: 0},
        object: doors.top,
        open: true,
        visited: true,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_8'] = room_8;
  
  room_9 = new Room({
    ID: 'room_9',
    name: 'hall 9',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      right: {
        ID: 'room_10',
        name: 'hall',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
      bottom: {
        ID: 'room_8',
        name: 'basement',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: true,
        object: doors.bottom,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_9'] = room_9;
  
  room_10 = new Room({
    ID: 'room_10',
    name: 'hall 10',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      left: {
        ID: 'room_9',
        name: 'hall',
        location: {x: 0, y: height/2-doors.right.height/2},
        open: true,
        visited: true,
        object: doors.left,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_10'] = room_10;
  
  ROOMS.current = room_0;
  enterRoom(room_0);
};

const enterRoom = (newRoom) => {
  //set visited bool, and store 
  ROOMS.current.visited = true;
  const lastRoom = ROOMS.current;
  
    
  if(lastRoom != newRoom)
  {
    reviveAll("restart");
  }
  ROOMS.current = newRoom;
  ROOMS.current.entered_from = lastRoom;
  ROOMS.current.loadRoom();
}

//room clear goals
const goal_defeatAllEnemies = () => {
  const keys = Object.keys(ROOMS.current.enemies);
  for(let i = 0; i< keys.length; i++){
    if(ROOMS.current.enemies[keys[i]].hp > 0) return false
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