const xxh = require('xxhashjs');

const Character = require("./classes/Character.js");

let io;

const setupSockets = (ioServer) => {
  io = ioServer;

  io.on('connection', (sock) => {
    const socket = sock;

    socket.join('room');

    console.log("user has joined");

    // create an unique hash for each new client
    const hash = xxh.h32(`${socket.id}${new Date().getTime()}`, 0xCAFEBABE).toString(16);

    socket.hash = hash;

    //create a character and send it back to the client
    let character = new Character(hash);

    socket.emit("joined", {character});

    socket.on('disconnect', () => {
      socket.leave('room');
      console.log("someone has left");
    });
  });
};

module.exports.setupSockets = setupSockets;
