import app from "./app";
import http from "http";
import settings from "./settings";
const server = http.createServer(app)
const socketIo = require('socket.io');
const io = socketIo(server);
  
  // Socket.io events
  io.on('connection', (socket) => {
    console.log('A user connected');
  
    // Handle chat messages
    socket.on('chat message', (msg) => {
      console.log('message: ' + msg);
      io.emit('chat message', msg);
    });
  
    // Handle disconnection
    socket.on('disconnect', () => {
      console.log('User disconnected');
    });
  });


//set the port
const port = settings.port;
server.listen(port, () => {
    console.info(`Server started on port : ${port}`);
});