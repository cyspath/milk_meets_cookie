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
    })
    .catch((err) => { console.log("500 Error: ", err) });
}

exports.resetTables = (req, res, next) => {
  const msg = db.resetTables();
  console.log(`database: reset tables - ${msg}`);
  res.send(msg);
}
