const Controller = require('./controllers/index');
const _ = require('underscore');

const onlineUsers = {};

const debounceEmit = _.debounce((io, event, data) => {
  io.emit(event, data);
}, 500)

module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('online', (user) => {
      onlineUsers[user.id] = socket.id;
      socketLog(`user connected: id: ${user.id}, socket: ${socket.id}`);
      debounceEmit(io, 'online users', onlineUsers)
    });

    socket.on('chat message', (data) => {
      socketLog(`message received: ${data.message}`);
      Controller.Chat.saveMessage(data, socket, onlineUsers[data.receiver_id]);
    });

    socket.on('disconnect', () => {
      for (var key in onlineUsers) {
        if (onlineUsers[key] === socket.id) {
          delete onlineUsers[key];
          socketLog(`user disconnected: id: ${key}, socket: ${socket.id}`);
          debounceEmit(io, 'online users', onlineUsers)
          return;
        }
      }
    });

  });
};

const socketLog = (msg) => {
  console.log('');
  console.log(`[socket.io] ${msg}`);
  console.log('[socket.io] online ids:', Object.keys(onlineUsers));
  console.log('');
}
