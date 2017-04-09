const sequelize = require('../models/index').sequelize;
const User = require('../models').User;
const Chat = require('../models').Chat;

exports.saveMessage = (data, socket, receiverSocket) => {
  Chat
    .create(data)
    .then((message) => {
      socket.broadcast.to(receiverSocket).emit('chat message', message);
    })
    .catch((err) => { console.log("500 Error: ", err) });
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
    .catch((err) => { console.log("500 Error: ", err) });
}

exports.fetchUnreadCount =  (req, res, next) => {
  Chat
    .findAll({
      where: { receiver_id: req.user.id, read: false }
    })
    .then((messages) => {
      res.send({ unreadCount: messages.length });
    })
    .catch((err) => { console.log("500 Error: ", err) });
}

exports.updateMessagesToRead = (req, res, next) => {
  const ids = req.body.map((m) => m.id);
  Chat
    .update({ read: true }, { where: { id: { $in: ids } } })
    .then((updatedCount) => {
      console.log(updatedCount);
      Chat
        .findAll({
          where: { receiver_id: req.user.id, read: false }
        })
        .then((messages) => {
          res.send({ unreadCount: messages.length, updatedToReadIds: ids });
        })
        .catch((err) => { console.log("500 Error: ", err) });
    })
    .catch((err) => { console.log("500 Error: ", err) });
}

exports.fetchInbox =  (req, res, next) => {
  const id = req.user.id;
  Chat
    .findAll({ where: { $or: [{ sender_id: id }, { receiver_id: id }] }, order: 'id DESC', raw: true })
    .then((messages) => {
      // first group the messages by sender-receiver, and set value to the latest message between sender and receiver
      var latestMessages = {};
      for (var i = 0; i < messages.length; i++) {
        if (!latestMessages[messages[i].sender_receiver_ids]) {
          latestMessages[messages[i].sender_receiver_ids] = Object.assign(messages[i], { unreadCount: 0 });
        }
      }
      Chat
        .findAll({ where: { receiver_id: id, read: false }, raw: true})
        .then((unread_messages) => {
          // assign unreadCount to each sender-receiver
          for (var i = 0; i < unread_messages.length; i++) {
            if (latestMessages[unread_messages[i].sender_receiver_ids]) {
              latestMessages[unread_messages[i].sender_receiver_ids].unreadCount ++;
            }
          }
          // generate chatUsers hash with key = targetUserId in order to get usernames
          var chatUsers = {};
          for (var key in latestMessages) {
            var userId = latestMessages[key].sender_id == id ? latestMessages[key].receiver_id : latestMessages[key].sender_id;
            chatUsers[userId] = latestMessages[key];
          }
          User
            .findAll({ where: { id: Object.keys(chatUsers) }, raw: true})
            .then((users) => {
              // set username for each targetUser
              for (var key in chatUsers) {
                for (var i = 0; i < users.length; i++) {
                  if (users[i].id == key) {
                    chatUsers[key].targetUser = users[i];
                  }
                }
              }
              var values = Object.keys(chatUsers).map(function(key) { return chatUsers[key] });
              res.send({ chatUsers: values });
            })
            .catch((err) => { console.log("500 Error: ", err) });
        })
        .catch((err) => { console.log("500 Error: ", err) });
    })
    .catch((err) => { console.log("500 Error: ", err) });
}
