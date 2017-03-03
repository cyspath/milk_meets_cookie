const seedData = require('../db/seed');
const User = require('../models').User;
// const Like = require('../models').Like;

exports.seedData = (req, res, next) => {
  const data = seedData();
  res.json(data);
}

exports.seedDataDump = (req, res, next) => {
  const data = seedData();
  data.users.forEach((params) => {
    User.create(params);
  })
  // data.likes.forEach((params) => {
  //   Like.create(params);
  // })
  res.json(data);
}
