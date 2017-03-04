const seedData = require('../db/seed');
const User = require('../models').User;
const Like = require('../models').Like;

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
