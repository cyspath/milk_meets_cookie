const User = require('../models').User;
const Chat = require('../models').Chat;

exports.saveMessage = (data, socket, receiverSocket) => {
  Chat
    .create(data)
    .then((message) => {
      socket.broadcast.to(receiverSocket).emit('chat message', message);
    })
    .catch((err) => { console.log("500 Error: ", err.name) });
}

exports.fetchMessages =  (req, res, next) => {
  const id1 = req.user.id;
  const id2 = req.query.targetUserId;
  Chat
    .update({ read: true }, { where: { sender_id: id2, receiver_id: id1, read: false } })
    .then((updatedMessages) => {
      Chat
        .findAll({ where: { receiver_id: id1, read: false } })
        .then((unreadMessages) => {
          Chat
            .findAll({ where: { $or: [{ sender_id: id1, receiver_id: id2 }, { sender_id: id2, receiver_id: id1 }] } })
            .then((messages) => {
              res.send({ messages: messages, unreadCount: unreadMessages.length });
            })
        })
    })
    .catch((err) => { console.log("500 Error: ", err.name) });
}

exports.fetchUnreadCount =  (req, res, next) => {
  Chat
    .findAll({
      where: { receiver_id: req.user.id, read: false }
    })
    .then((messages) => {
      res.send({ unreadCount: messages.length });
    })
    .catch((err) => { console.log("500 Error: ", err.name) });
}

exports.fetchUnreadMessages =  (req, res, next) => {
  Chat
    .findAll({
      where: { receiver_id: req.user.id, read: false }
    })
    .then((messages) => {
      res.send(messages);
    })
    .catch((err) => { console.log("500 Error: ", err.name) });
}
