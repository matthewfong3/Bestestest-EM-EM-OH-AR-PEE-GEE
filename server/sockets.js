const xxh = require('xxhashjs');

let io;

const rooms = {};
let roomNum = 1;
let roomMember = 1;

const setupSockets = (ioServer) => {
  io = ioServer;

  io.on('connection', (sock) => {
    const socket = sock;

    socket.on('join', () => {
      if (!rooms[`room${roomNum}`]) {
        rooms[`room${roomNum}`] = {};
      }

      socket.join(`room${roomNum}`);

      console.log('user has joined');

      // create an unique hash for each new client
      const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);

      socket.hash = hash;
      socket.roomNum = roomNum;

      if (roomMember === 1) {
        rooms[`room${roomNum}`].host = socket.id;
        socket.emit('setHost', {});
      }

      socket.emit('joined', { hash });
      socket.broadcast.emit('otherConnects', { hash, id: socket.id });
      if (roomMember === 4) {
        roomMember = 0;
        roomNum++;
      }
      roomMember++;
    });

    // server listens to non-host clients for key updates and sends them to host client
    socket.on('updateKeys', (data) => {
      io.sockets.connected[rooms[`room${socket.roomNum}`].host].emit('updatedKeys', data);
    });

    socket.on('updateFire', (data) => {
      // data.hash = socket.hash; // set an extra property for host to reference back
      // data.id = socket.id;     // set an extra property for server to reference back
      const newData = {
        hash: socket.hash,
        id: socket.id,
        canFire: data.canFire,
        mouse: data.mouse,
        bufferTime: data.bufferTime,
      };
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

    socket.on('disconnect', () => {
      socket.leave(`room${socket.roomNum}`);
      console.log('someone has left');
    });
  });
};

module.exports.setupSockets = setupSockets;
