const seedData = require('../db/seed');
const db = require('../models');
const User = db.User;
const Like = db.Like;
const Chat = db.Chat;

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
}

exports.resetTables = (req, res, next) => {
  res.send(db.resetTables());
}
