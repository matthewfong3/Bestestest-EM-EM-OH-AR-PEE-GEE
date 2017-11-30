const xxh = require('xxhashjs');

let io;

const rooms = {};
let roomNum = 1;
let roomMember = 1;

const setupSockets = (ioServer) => {
  io = ioServer;

  io.on('connection', (sock) => {
    const socket = sock;
    
    socket.on('initialJoin', () => {
      if (!rooms[`room${roomNum}`]) {
        rooms[`room${roomNum}`] = {};
      }

      socket.join(`room${roomNum}`);
      socket.roomNum = roomNum;
      socket.roomMember = roomMember;
      
      socket.emit('initialJoined', {});
      if (roomMember === 4) {
        roomMember = 0;
        roomNum++;
      }
      roomMember++;
    });

    socket.on('join', () => {
      /*if (!rooms[`room${roomNum}`]) {
        rooms[`room${roomNum}`] = {};
      }

      socket.join(`room${roomNum}`);*/

      console.log('user has joined');

      // create an unique hash for each new client
      const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);

      socket.hash = hash;
      

      if (socket.roomMember === 1) {
        rooms[`room${socket.roomNum}`].host = socket.id;
        socket.emit('setHost', {});
      }

      socket.emit('joined', { hash });
      socket.broadcast.emit('otherConnects', { hash, id: socket.id });
      
    });

    // server listens to non-host clients for key updates and sends them to host client
    socket.on('updateKeys', (data) => {
      io.sockets.connected[rooms[`room${socket.roomNum}`].host].emit('updatedKeys', data);
    });

    socket.on('updateFire', (data) => {
      const newData = {
        hash: socket.hash, // set an extra property for host to reference back
        id: socket.id, // set an extra property for server to reference back
        canFire: data.canFire,
        mouse: data.mouse,
        bufferTime: data.bufferTime,
      };
      console.log(rooms[`room${socket.roomNum}`].host);
      io.sockets.connected[rooms[`room${socket.roomNum}`].host].emit('updatedFire', newData);
    });

    // server listens to host client for player position updates and sends them to non-host clients
    socket.on('updatePos', (data) => {
      socket.broadcast.emit('updatedPos', data);
    });

    socket.on('spawnEnemies', (data) => {
      io.sockets.connected[data.id].emit('spawnedEnemies', data);
    });

    socket.on('updateEnemies', (data) => {
      socket.broadcast.emit('updatedEnemies', data);
    });

    socket.on('updateFireProps', (data) => {
      io.sockets.connected[data.id].emit('updatedFireProps', data);
    });

    socket.on('updateBullets', (data) => {
      socket.broadcast.emit('updatedBullets', data);
    });

    socket.on('playerCollide', () => {
      socket.broadcast.emit('playerCollided', {});
    });

    socket.on('disconnect', () => {
      socket.leave(`room${socket.roomNum}`);
      console.log(`${socket.id} has left`);
    });
  });
};

module.exports.setupSockets = setupSockets;
