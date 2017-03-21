const onlineUsers = {};

const Controller = require('./controllers/index');

module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('online', (user) => {
      onlineUsers[user.id] = socket.id;
    	io.emit('online', onlineUsers, user);
      socketLog(`user connected: id: ${user.id}, socket: ${socket.id}`);
    });

    socket.on('chat message', (data) => {
      socketLog(`message received: ${data.message}`);
      Controller.Chat.saveMessage(data, socket, onlineUsers[data.receiver_id]);
    });

    socket.on('disconnect', () => {
      for (var key in onlineUsers) {
        if (onlineUsers[key] === socket.id) {
          io.emit('exit', key);
          delete onlineUsers[key];
          socketLog(`user disconnected: id: ${key}, socket: ${socket.id}`);
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
