const xxh = require('xxhashjs');

let io;

const setupSockets = (ioServer) => {
  io = ioServer;

  io.on('connection', (sock) => {
    const socket = sock;

    socket.join('room');

    // create an unique hash for each new client
    const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);

    socket.hash = hash;

    socket.on('disconnect', () => {
      socket.leave('room');
    });
  });
};

module.exports.setupSockets = setupSockets;
