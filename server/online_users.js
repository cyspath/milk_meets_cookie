const onlineUsers = {};
const Controller = require('./controllers/index');

module.exports = (io) => {
  io.on('connection', (socket) => {

    socket.on('online', (user) => {
      console.log(`[socket.io] user ${user.id} ${user.username} ${socket.id} connected`);

      onlineUsers[user.id] = socket.id;
    	io.emit('online', onlineUsers, user);
    });

    socket.on('chat message', (data) => {
      console.log(`[socket.io] message received: ${data.message}`);
      Controller.Chat.saveMessage(data, socket, onlineUsers[data.receiver_id]);
    });

    socket.on('disconnect', () => {
      console.log(`[socket.io] user disconnected: ${socket.id}`);

  		onlineUsers[socket.id] = null;
    	io.emit('exit', onlineUsers, socket.id);
    });

  });
};
