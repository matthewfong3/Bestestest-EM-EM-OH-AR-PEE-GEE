let editMode = true; //maybe if we make a room 'editor'

let doors = { };

let direction = "right";


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
    name: 'entrance hall',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      right: {
        ID: 'room_1',
        name: '[left] main hall',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
    },
    
    goals: [ goal_defeatAllEnemies ],
    
    
  }); ROOMS['room_0'] = room_0;
  
  room_1 = new Room({
    ID: 'room_1',
    name: 'main hall',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      bottom: {
        ID: 'room_2',
        name: '[down] basement A',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: false,
        object: doors.bottom,
      },
      top: {
        ID: 'room_4',
        name: '[up] roof A',
        location: {x: width/2-doors.top.width/2, y: 0},
        open: true,
        visited: false,
        object: doors.top,
      },
      left: {
        ID: 'room_0',
        name: '[left] entrance hall',
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
    name: 'basement',
    bg_music: 'exploration',
    bg_image: 'room_2',
    
    entrances: {
      top: {
        ID: 'room_1',
        name: '[up] main hall',
        location: {x: width/2-doors.top.width/2, y: 0},
        object: doors.top,
        open: true,
        visited: true,
      },
      left: {
        ID: 'room_3',
        name: '[left] storage room',
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
    name: 'storage room',
    bg_music: 'exploration',
    bg_image: 'room_2',
    
    entrances: {
      right: {
        ID: 'room_2',
        name: '[right] basement',
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
    name: 'roof A',
    bg_music: 'exploration',
    bg_image: 'room_1',
    
    entrances: {
      right: {
        ID: 'room_5',
        name: '[right] roof B',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
      bottom: {
        ID: 'room_1',
        name: '[down] main hall',
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
    name: 'roof B',
    bg_music: 'exploration',
    bg_image: 'room_1',
    
    entrances: {
      right: {
        ID: 'room_6',
        name: '[right] balcony',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
      bottom: {
        ID: 'room_7',
        name: '[down] hall B',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: false,
        object: doors.bottom,
      },
      left: {
        ID: 'room_4',
        name: '[left] roof A',
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
    name: 'balcony',
    bg_music: 'exploration',
    bg_image: 'room_1',
    
    entrances: {
      left: {
        ID: 'room_5',
        name: '[left] roof B' ,
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
    name: 'hall B',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      bottom: {
        ID: 'room_8',
        name: '[down] basement B',
        location: {x: width/2-doors.bottom.width/2, y: height-doors.bottom.height},
        open: true,
        visited: false,
        object: doors.bottom,
      },
      top: {
        ID: 'room_5',
        name: '[up] roof B',
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
    name: 'basement B',
    bg_music: 'exploration',
    bg_image: 'room_2',
    
    entrances: {
      right: {
        ID: 'room_9',
        name: '[right] hall C',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
      top: {
        ID: 'room_7',
        name: '[up] hall B',
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
    name: 'hall C',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      right: {
        ID: 'room_10',
        name: '[right] Throne room',
        location: {x: width-doors.right.width, y: height/2-doors.right.height/2},
        open: true,
        visited: false,
        object: doors.right,
      },
      bottom: {
        ID: 'room_8',
        name: '[down] basement B',
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
    name: 'Throne room',
    bg_music: 'exploration',
    bg_image: 'room_0',
    
    entrances: {
      left: {
        ID: 'room_9',
        name: '[left] hall C',
        location: {x: 0, y: height/2-doors.right.height/2},
        open: true,
        visited: true,
        object: doors.left,
      },
    },
    
    goals: goal_defeatAllEnemies,
    
    
  }); ROOMS['room_10'] = room_10;
  
  room_0.enemiesCount = 0;    
  ROOMS.current = room_0;
  enterRoom(room_0);
};

// setup spawn locations
const spawnLeft = {
    player1:{x: 77.5, y: 280.5},
    player2:{x: 77.5, y: 312.5},
    player3:{x: 77.5, y: 342.5},
    player4:{x: 77.5, y: 372.5},
};

const spawnTop = {
    player1:{x:526.5,y:66.5},
    player2:{x:556.5,y:66.5},
    player3:{x:586.5,y:66.5},
    player4:{x:616.5,y:66.5},
};

const spawnBottom = {
    player1:{x:534,y:578.5},
    player2:{x:564,y:578.5},
    player3:{x:594,y:578.5},
    player4:{x:624,y:578.5},
};

const spawnRight = {
    player1: {x: 1071.5, y: 280.5},
    player2: {x: 1071.5, y: 312.5},
    player3: {x: 1071.5, y: 342.5},
    player4: {x: 1071.5, y: 372.5},
};

const enterRoom = (newRoom) => {
  //set visited bool, and store 
  ROOMS.current.visited = true;
  const lastRoom = ROOMS.current;
    
  ROOMS.current = newRoom;
  ROOMS.current.entered_from = lastRoom;
  playEffect("Unlock", false);
  if(lastRoom != newRoom)
  {
    reviveAll("restart");
  
    positionInNextRoom(lastRoom,ROOMS.current);
    
    if(ROOMS.current.visited == false)
    {
        initEnemies(ROOMS.current.enemiesCount);
        spawnEnemies();
    }
  }
    
  ROOMS.current.loadRoom();
}

//position chars in new room
const positionInNextRoom = (lastRoom,currentRoom) => {
      //try to find which direction we came from
  if(isHost)
  {
      
    emptyEnemiesandBullets();
      
    let entrances = lastRoom.entrances;
    for(let i in entrances)
        {
            if(entrances[i].ID == currentRoom.ID)
            {
                direction = i;
            }
        }
    //put each player in the right position after the program finds where party came from
    if(direction == "right")
    {
        let spawnKeys = Object.keys(spawnLeft);
        let playerKeys = Object.keys(players);
        for(let i =0; i < playerKeys.length; i++)
        {
            let player = players[playerKeys[i]];
            let newLocation = spawnLeft[spawnKeys[i]];
            player.x = newLocation.x;
            player.y = newLocation.y;
            player.prevX = newLocation.x;
            player.prevY = newLocation.y;
            player.destX = newLocation.x;
            player.destY = newLocation.y;
        }
    }
    else if(direction == "left")
    {
        let spawnKeys = Object.keys(spawnRight);
        let playerKeys = Object.keys(players);
        for(let i =0; i < playerKeys.length; i++)
        {
            let player = players[playerKeys[i]];
            let newLocation = spawnRight[spawnKeys[i]];
            player.x = newLocation.x;
            player.y = newLocation.y;
            player.prevX = newLocation.x;
            player.prevY = newLocation.y;
            player.destX = newLocation.x;
            player.destY = newLocation.y;
        }
    }
    else if(direction == "bottom")
    {
        let spawnKeys = Object.keys(spawnTop);
        let playerKeys = Object.keys(players);
        for(let i =0; i < playerKeys.length; i++)
        {
            let player = players[playerKeys[i]];
            let newLocation = spawnTop[spawnKeys[i]];
            player.x = newLocation.x;
            player.y = newLocation.y;
            player.prevX = newLocation.x;
            player.prevY = newLocation.y;
            player.destX = newLocation.x;
            player.destY = newLocation.y;
        }
    }
    else if(direction == "top")
    {
        let spawnKeys = Object.keys(spawnBottom);
        let playerKeys = Object.keys(players);
        for(let i =0; i < playerKeys.length; i++)
        {
            let player = players[playerKeys[i]];
            let newLocation = spawnBottom[spawnKeys[i]];
            player.x = newLocation.x;
            player.y = newLocation.y;
            player.prevX = newLocation.x;
            player.prevY = newLocation.y;
            player.destX = newLocation.x;
            player.destY = newLocation.y;
        }
    }
  }
}

//room clear goals
const goal_defeatAllEnemies = () => {
  const keys = Object.keys(enemies);
  for(let i = 0; i< keys.length; i++){
    if(enemies[keys[i]]) return false
  } 
  return true;
}

const goal_waitForGameStart = () => {
  return gameLocked;
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