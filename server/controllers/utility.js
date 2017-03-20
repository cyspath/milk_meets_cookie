const seedData = require('../db/seed');
const User = require('../models').User;
const Like = require('../models').Like;
const Chat = require('../models').Chat;

exports.seedData = (req, res, next) => {
  const data = seedData();
  res.json(data);
}

exports.seedDataDump = (req, res, next) => {
  const data = seedData();
  User
    .bulkCreate(data.users)
    .then(() => {
      Like
        .bulkCreate(data.likes)
        .then(() => {
          res.json(data);
        })
    });
  // for (var i = 0; i < 10000; i++) {
  //   let si = Math.floor(Math.random() * 35 + 150)
  //   let ri = Math.floor(Math.random() * 35 + 150)
  //   Chat.create({sender_id: si, receiver_id: ri, message: 'WTF'})
  //   console.log('created.');
  //   // SELECT * FROM snorlax.chats where sender_id = 160 AND receiver_id = 160
  // }
}
