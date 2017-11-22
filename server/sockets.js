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
      socket.broadcast.emit('otherConnects', { hash });
      if (roomMember === 4) {
        roomMember = 0;
        roomNum++;
      }
      roomMember++;
    });

    socket.on('updateKeys', (data) => {   
      io.sockets.connected[rooms[`room${socket.roomNum}`].host].emit('updatedKeys', data);
    });

    socket.on('updatePos', (data) => {
      socket.broadcast.emit('updatedPos', data);
    });

    socket.on('disconnect', () => {
      socket.leave(`room${socket.roomNum}`);
      console.log('someone has left');
    });
  });
};

module.exports.setupSockets = setupSockets;
