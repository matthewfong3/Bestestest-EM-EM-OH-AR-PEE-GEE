const xxh = require('xxhashjs');

let io;

const rooms = {
  lobby: {},
};
let roomNum = 1;
let roomMember = 1;

const setupSockets = (ioServer) => {
  io = ioServer;

  io.on('connection', (sock) => {
    const socket = sock;

    socket.on('initialJoin', () => {
      const room = 'lobby';
      socket.join(room);
      socket.room = room;
      socket.roomMember = roomMember;


      if (!rooms[`room${roomNum}`]) {
        rooms[`room${roomNum}`] = {};
        rooms[`room${roomNum}`].Red = true;
        rooms[`room${roomNum}`].Blue = true;
        rooms[`room${roomNum}`].Green = true;
        rooms[`room${roomNum}`].Purple = true;
        console.log(`created room: room${roomNum}`);
      }

      socket.emit('initialJoined', {
        Red: rooms[`room${roomNum}`].Red, Blue: rooms[`room${roomNum}`].Blue, Green: rooms[`room${roomNum}`].Green, Purple: rooms[`room${roomNum}`].Purple,
      });

      if (roomMember === 4) {
        roomMember = 1;
        roomNum++;
      } else roomMember++;
    });

    socket.on('join', (data) => {
      socket.leave('lobby');

      socket.join(`room${roomNum}`);
      socket.roomNum = roomNum;
      rooms[`room${roomNum}`][`${socket.roomMember}`] = socket.id;

      if (data.color === 'red') {
        rooms[`room${socket.roomNum}`].Red = false;
      } else if (data.color === 'purple') {
        rooms[`room${socket.roomNum}`].Purple = false;
      } else if (data.color === 'blue') {
        rooms[`room${socket.roomNum}`].Blue = false;
      } else if (data.color === 'green') {
        rooms[`room${socket.roomNum}`].Green = false;
      }

      // create an unique hash for each new client
      const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);

      socket.hash = hash;


      if (socket.roomMember === 1) {
        rooms[`room${socket.roomNum}`].host = socket.id;
        socket.isHost = true;
        console.log(`host has joined room${roomNum}`);

        socket.emit('setHost', {});
      } else console.log(`user has joined room${roomNum}`);

      socket.emit('joined', { hash });
      socket.broadcast.to(`room${socket.roomNum}`).emit('otherConnects', { hash, id: socket.id, color: data.color });
    });

    // server listens to non-host clients for key updates and sends them to host client
    socket.on('updateKeys', (data) => {
      // io.sockets.connected[rooms[`room${socket.roomNum}`].host].emit('updatedKeys', data);
      socket.to(rooms[`room${socket.roomNum}`].host).emit('updatedKeys', data);
    });

    socket.on('updateFire', (data) => {
      const newData = {
        hash: socket.hash, // set an extra property for host to reference back
        id: socket.id, // set an extra property for server to reference back
        canFire: data.canFire,
        mouse: data.mouse,
        bufferTime: data.bufferTime,
      };
      // console.log(`${rooms[`room${socket.roomNum}`].host} is the host`);
      // console.log(`${socket.roomMember} sent this to server`);
      // io.sockets.connected[rooms[`room${socket.roomNum}`].host].emit('updatedFire', newData);
      socket.to(rooms[`room${socket.roomNum}`].host).emit('updatedFire', newData);
    });

    socket.on('revivetoSer', (data) => {
      socket.to(rooms[`room${socket.roomNum}`].host).emit('reviveTohost', data);
    });

    socket.on('getRoomData', () => {
      io.sockets.in(`room${socket.roomNum}`).emit('sendRoomData', {});
      console.log('recieved room data request');
    });

    socket.on('updateRoom', (data) => {
      io.sockets.in(`room${socket.roomNum}`).emit('updatedRoom', data);
      console.log(`updated ${data.room.name} data.`);
    });

    // coin stuff
    socket.on('gainCoins', (data) => {
      io.sockets.in(`room${socket.roomNum}`).emit('gainedCoins', data);
      // console.log(`got ${data.coinGain} coins.`);
    });


    socket.on('updateCoins', (data) => {
      io.sockets.in(`room${socket.roomNum}`).emit('updatedCoins', data);
      // console.log('got coin total update');
    });

    // server listens to host client for player position updates and sends them to non-host clients
    socket.on('updatePos', (data) => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('updatedPos', data);
    });

    socket.on('spawnEnemies', (data) => {
      io.sockets.connected[data.id].emit('spawnedEnemies', data);
    });

    socket.on('updateEnemies', (data) => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('updatedEnemies', data);
    });

    socket.on('updateFireProps', (data) => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('updatedFireProps', data);
    });

    socket.on('updateBullets', (data) => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('updatedBullets', data);
    });

    socket.on('playerCollide', (data) => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('playerCollided', data);
    });

    socket.on('revivedtoSer', (data) => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('revivedtoClients', data);
    });

    socket.on('revivedAlltoSer', () => {
      socket.to(rooms[`room${socket.roomNum}`].host).emit('reviveAllTohost', {});
    });

    socket.on('gainCoins', (data) => {
      socket.to(rooms[`room${socket.roomNum}`].host).emit('gainedCoins', data);
    });

    socket.on('updateCoins', (data) => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('updatedCoins', data);
    });

    socket.on('rpcCall', () => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('rpcCalled', {});
    });

    // sound related events on server
    socket.on('playShootEffect', () => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('playedShootEffect', {});
    });

    socket.on('playMonsterOnHit', () => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('playedMonsterOnHitEffect', {});
    });

    socket.on('playPop', () => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('playedPop', {});
    });

    socket.on('playDeathGrunt', () => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('playedDeathGrunt', {});
    });

    socket.on('playCoin', () => {
      socket.broadcast.to(`room${socket.roomNum}`).emit('playedCoin', {});
    });

    socket.on('disconnect', () => {
      // console.log(socket.roomNum);

      // if(socket.isHost) console.log('host left');

      if (socket.id === rooms[`room${socket.roomNum}`].host) {
        if (rooms[`room${socket.roomNum}`][`${socket.roomMember + 1}`]) {
          const newHostID = rooms[`room${socket.roomNum}`][`${socket.roomMember + 1}`];
          rooms[`room${socket.roomNum}`].host = newHostID;
          socket.to(rooms[`room${socket.roomNum}`].host).emit('setHost', {});
          socket.broadcast.to(`room${socket.roomNum}`).emit('deleteDisconnect', { hash: socket.hash });
        } else {
          console.log('cannot migrate to new host. deprecating room');
          delete rooms[`room${socket.roomNum}`];
          roomMember = 1;
        }
      }
      console.log(`${socket.id} has left`);
      socket.leave(`room${socket.roomNum}`);
    });
  });
};

module.exports.setupSockets = setupSockets;
