const User = require('../models').User;
const Chat = require('../models').Chat;

exports.saveMessage = (data, socket, receiverSocket) => {
  Chat
    .create(data)
    .then((message) => {
      console.log(message, 'trollo');
      socket.broadcast.to(receiverSocket).emit('chat message', message);
    })
    .catch((err) => { console.log("500 Error: ", err.name) });
}

exports.fetchMessages =  (req, res, next) => {
  const id1 = req.user.id;
  const id2 = req.query.targetUserId;
  Chat
    .findAll({
      where: {
        $or: [
          { sender_id: id1, receiver_id: id2 },
          { sender_id: id2, receiver_id: id1 }
        ]
      }
    })
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => { console.log("500 Error: ", err.name) });
}
