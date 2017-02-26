const seedData = require('../db/seed');

exports.seedData = (req, res, next) => {
  res.json(seedData());
}
